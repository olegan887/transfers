import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
    return 'https://script.google.com/macros/s/AKfycby6Z_J5r00-EsbLlNZ3OlQFi_RNTU8eVOOTWTMFx4aIN_nBVt-743oxAmYLLBwmxKo/exec';
  }
  const storedUrl = localStorage.getItem('VITE_GOOGLE_SCRIPT_URL');
  const envUrl = (import.meta.env as any).VITE_GOOGLE_SCRIPT_URL;
  const rawUrl = storedUrl || envUrl || 'https://script.google.com/macros/s/AKfycby6Z_J5r00-EsbLlNZ3OlQFi_RNTU8eVOOTWTMFx4aIN_nBVt-743oxAmYLLBwmxKo/exec';
  return rawUrl.trim().replace(/^["']|["']$/g, '');
}
