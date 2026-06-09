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
  const storedUrl = localStorage.getItem('VITE_GOOGLE_SCRIPT_URL');
  const envUrl = (import.meta.env as any).VITE_GOOGLE_SCRIPT_URL;
  const rawUrl = storedUrl || envUrl || DEFAULT_GOOGLE_SCRIPT_URL;
  return rawUrl.trim().replace(/^["']|["']$/g, '');
}
