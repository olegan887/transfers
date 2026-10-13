import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { DEFAULT_GOOGLE_SCRIPT_URL } from "../config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanUrl(url: string): string {
  return url.trim().replace(/^["']|["']$/g, '');
}

export function getBidirectional<T>(map: Record<string, Record<string, T>>, from: string, to: string): T | null {
  if (map[from]?.[to] !== undefined) return map[from][to];
  if (map[to]?.[from] !== undefined) return map[to][from];
  return null;
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
  return cleanUrl(rawUrl);
}

export function getApiUrl(path: string) {
  if (typeof window === 'undefined') {
    return path.startsWith('/') ? path : `/${path}`;
  }
  const base = getBasePath();
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Return relative path to let the browser resolve it against the current origin/base URL
  return `${base}${formattedPath}`;
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
  const googleScriptUrl = cleanUrl(url);

  try {
    const fetchUrl = method === 'GET' 
      ? `${googleScriptUrl}${googleScriptUrl.includes('?') ? '&' : '?'}t=${Date.now()}`
      : googleScriptUrl;

    const directHeaders: Record<string, string> = {
      ...(options?.headers || {})
    };
    
    // For POST requests to Google Apps Script Web App, text/plain avoids unnecessary preflight CORS errors while delivering valid JSON string payload
    if (method === 'POST') {
      directHeaders['Content-Type'] = directHeaders['Content-Type'] || 'text/plain;charset=utf-8';
    }

    const response = await fetch(fetchUrl, {
      method,
      headers: directHeaders,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    return response;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Google Apps Script request notice, utilizing offline fallback data:', error);
    }
    // Return a synthetic successful JSON response so caller doesn't break
    return new Response(JSON.stringify({
      result: 'success',
      routes: [],
      blocked: [],
      fallback: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
