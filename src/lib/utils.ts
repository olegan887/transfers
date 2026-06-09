import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_GOOGLE_SCRIPT_URL } from "../config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath() {
  if (typeof window === 'undefined') return '';
  const path = window.location.pathname;
  if (path.includes('/blog')) {
    return path.substring(0, path.indexOf('/blog'));
  }
  if (path.includes('/success')) {
    return path.substring(0, path.indexOf('/success'));
  }
  return path.replace(/\/$/, '');
}

export function getLinkPath(targetPath: string) {
  const base = getBasePath();
  const formattedTarget = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
  
  // For the root link /, keep it as base path or / if base is empty
  if (targetPath === '/' || targetPath === '') {
    return base || '/';
  }
  
  return `${base}${formattedTarget}`;
}

export function getGoogleScriptUrl() {
  if (typeof window === 'undefined') {
    return DEFAULT_GOOGLE_SCRIPT_URL;
  }
  let storedUrl = localStorage.getItem('VITE_GOOGLE_SCRIPT_URL');
  
  // If the user has the old script URL cached in localStorage, clear it so they use the new default
  const oldUrl = 'https://script.google.com/macros/s/AKfycbxwwfZI69flEry9JRACIu-M48fAA2C9A_oBDfumPaZTwp8NEd6yeSwOYcIHNv7yNEZI/exec';
  if (storedUrl && (storedUrl.trim().replace(/^["']|["']$/g, '') === oldUrl)) {
    localStorage.removeItem('VITE_GOOGLE_SCRIPT_URL');
    storedUrl = null;
  }

  const envUrl = (import.meta.env as any).VITE_GOOGLE_SCRIPT_URL;
  const rawUrl = storedUrl || envUrl || DEFAULT_GOOGLE_SCRIPT_URL;
  return rawUrl.trim().replace(/^["']|["']$/g, '');
}

export function getApiUrl(path: string) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('run.app'))) {
    return cleanPath;
  }
  return `https://ais-pre-eamemo4u5k7i6q4xkkj7a5-636191656390.europe-west2.run.app${cleanPath}`;
}

export async function safeFetchGoogleScript(
  url: string,
  options?: {
    method?: 'GET' | 'POST';
    body?: any;
    headers?: Record<string, string>;
  }
): Promise<Response> {
  const method = options?.method || 'GET';
  const googleScriptUrl = url.trim().replace(/^["']|["']$/g, '');

  // 1. Try to fetch via Express backend proxy (which bypasses ad-blockers and CORS)
  try {
    const proxyUrl = getApiUrl('/api/google-proxy');
    const headers: Record<string, string> = {
      'X-Google-Script-Url': googleScriptUrl,
      ...(options?.headers || {}),
    };
    if (method === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(proxyUrl, {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (response.ok) {
      return response;
    }
    
    console.warn(`Proxy request returned status ${response.status}, falling back to direct fetch`);
  } catch (proxyError) {
    console.error('Proxy request failed, falling back to direct fetch:', proxyError);
  }

  // 2. Fallback: Direct Fetch to Google Apps Script.
  // Google Apps Script doesn't support preflight CORS for application/json POST requests,
  // so we must send text/plain for POSTs to bypass CORS preflight.
  const fetchUrl = method === 'GET' 
    ? `${googleScriptUrl}${googleScriptUrl.includes('?') ? '&' : '?'}t=${Date.now()}`
    : googleScriptUrl;

  const directHeaders: Record<string, string> = {};
  if (method === 'POST') {
    directHeaders['Content-Type'] = 'text/plain;charset=utf-8';
  }

  return fetch(fetchUrl, {
    method,
    headers: directHeaders,
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
}
