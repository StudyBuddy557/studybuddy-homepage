// lib/analytics/utm.ts
/**
 * UTM Parameter Persistence Utilities
 * 
 * Handles capturing, persisting, and retrieving UTM parameters across
 * session storage (ephemeral) and cookies (7-day persistence).
 */

import type { UTMParams } from './types';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const STORAGE_KEY = 'studybuddy_utms';
const COOKIE_NAME = 'sb_utm';
const COOKIE_DAYS = 7;

/**
 * Extract UTM parameters from URL search params
 */
export function extractUTMsFromURL(url: string = typeof window !== 'undefined' ? window.location.href : ''): UTMParams {
  const utms: UTMParams = {};
  
  try {
    const urlObj = new URL(url);
    const params = urlObj.searchParams;
    
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        utms[key] = value;
      }
    });
  } catch (error) {
    console.error('[UTM] Failed to parse URL:', error);
  }
  
  return utms;
}

/**
 * Get current UTM parameters from session storage or cookie
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  // Try session storage first (highest priority)
  try {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      if (Object.keys(parsed).length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('[UTM] Failed to read from sessionStorage:', error);
  }
  
  // Fall back to cookie
  try {
    const cookieValue = getCookie(COOKIE_NAME);
    if (cookieValue) {
      const decoded = decodeURIComponent(cookieValue);
      const parsed = JSON.parse(decoded);
      // Restore to session storage for faster access
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    }
  } catch (error) {
    console.error('[UTM] Failed to read from cookie:', error);
  }
  
  return {};
}

/**
 * Persist UTM parameters to session storage and cookie
 */
export function persistUTMParams(utms: UTMParams): void {
  if (typeof window === 'undefined') return;
  if (Object.keys(utms).length === 0) return;
  
  const serialized = JSON.stringify(utms);
  
  // Save to session storage
  try {
    sessionStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('[UTM] Failed to write to sessionStorage:', error);
  }
  
  // Save to cookie for 7-day persistence
  try {
    const encoded = encodeURIComponent(serialized);
    setCookie(COOKIE_NAME, encoded, COOKIE_DAYS);
  } catch (error) {
    console.error('[UTM] Failed to write cookie:', error);
  }
}

/**
 * Initialize UTM tracking on page load
 * Captures UTMs from URL and persists them if present
 */
export function initializeUTMTracking(): void {
  if (typeof window === 'undefined') return;
  
  // Extract UTMs from current URL
  const urlUTMs = extractUTMsFromURL(window.location.href);
  
  // If new UTMs are present, they override stored ones
  if (Object.keys(urlUTMs).length > 0) {
    persistUTMParams(urlUTMs);
    return;
  }
  
  // Otherwise, ensure existing UTMs are in session storage
  const existingUTMs = getUTMParams();
  if (Object.keys(existingUTMs).length > 0) {
    // Refresh session storage from cookie if needed
    try {
      const sessionData = sessionStorage.getItem(STORAGE_KEY);
      if (!sessionData) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(existingUTMs));
      }
    } catch (error) {
      console.error('[UTM] Failed to refresh sessionStorage:', error);
    }
  }
}

/**
 * Clear all stored UTM parameters
 */
export function clearUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('[UTM] Failed to clear sessionStorage:', error);
  }
  
  try {
    setCookie(COOKIE_NAME, '', -1);
  } catch (error) {
    console.error('[UTM] Failed to clear cookie:', error);
  }
}

/**
 * Get a cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

/**
 * Set a cookie with expiration
 */
function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  
  const expires = `expires=${date.toUTCString()}`;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const sameSite = '; SameSite=Lax';
  const path = '; path=/';
  
  document.cookie = `${name}=${value}; ${expires}${path}${sameSite}${secure}`;
}
