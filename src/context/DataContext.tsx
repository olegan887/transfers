import React, { createContext, useContext, useState, useEffect } from 'react';
import { basePrices } from '../data/pricing';
import { getGoogleScriptUrl, safeFetchGoogleScript } from '../lib/utils';

type RouteData = { from: string; to: string; price: number; available: boolean };
type BlockedTime = { date: string; time: string };

interface DataContextType {
  routes: RouteData[];
  blockedTimes: BlockedTime[];
  loading: boolean;
  errorDetails: string | null;
  getBasePrice: (from: string, to: string) => number | null;
  isTimeBlocked: (date: string, time: string) => boolean;
  googleScriptUrl: string;
  updateGoogleScriptUrl: (url: string) => Promise<boolean>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [googleScriptUrl, setGoogleScriptUrl] = useState(getGoogleScriptUrl());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorDetails(null);
      let GOOGLE_SCRIPT_URL = googleScriptUrl;
      try {
        // Clean up the URL in case it was pasted with quotes or spaces
        GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');

        if (!GOOGLE_SCRIPT_URL) {
          throw new Error('Google Apps Script URL is empty');
        }

        // Fetch using safeFetchGoogleScript which automatically falls back to direct call on failure
        const response = await safeFetchGoogleScript(GOOGLE_SCRIPT_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === 'success') {
          setRoutes(data.routes || []);
          setBlockedTimes(data.blocked || []);
          setErrorDetails(null);
        } else {
          throw new Error(data.message || 'Unknown error from script');
        }
      } catch (error: any) {
        console.error('Failed to fetch dynamic data:', error);
        setErrorDetails(`${error.message}. URL starts with: ${GOOGLE_SCRIPT_URL.substring(0, 30)}...`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [googleScriptUrl, refreshTrigger]);

  const updateGoogleScriptUrl = async (url: string): Promise<boolean> => {
    const cleanedUrl = url.trim().replace(/^["']|["']$/g, '');
    localStorage.setItem('VITE_GOOGLE_SCRIPT_URL', cleanedUrl);
    setGoogleScriptUrl(cleanedUrl);
    setRefreshTrigger(prev => prev + 1);
    return true;
  };

  const getBasePrice = (from: string, to: string): number | null => {
    const dynamicRoute = routes.find(r => 
      (r.from === from && r.to === to) || (r.from === to && r.to === from)
    );
    
    if (dynamicRoute) {
      if (!dynamicRoute.available) return null;
      return dynamicRoute.price;
    }

    if (basePrices[from]?.[to]) return basePrices[from][to];
    if (basePrices[to]?.[from]) return basePrices[to][from];

    return null;
  };

  const isTimeBlocked = (date: string, time: string) => {
    if (!date || !time) return false;

    return blockedTimes.some(b => {
      if (!b.date) return false;

      let bDateStr = b.date.toString().trim();
      let bDate = bDateStr;

      // Handle Excel/Sheets serial numbers (e.g., 46106 for 2026-03-25)
      if (!isNaN(Number(bDateStr)) && Number(bDateStr) > 40000) {
        const excelDate = Number(bDateStr);
        const d = new Date((excelDate - 25569) * 86400 * 1000);
        const y = d.getUTCFullYear();
        const m = String(d.getUTCMonth() + 1).padStart(2, '0');
        const day = String(d.getUTCDate()).padStart(2, '0');
        bDate = `${y}-${m}-${day}`;
      } else {
        // Handle DD.MM.YYYY or DD/MM/YYYY
        // Only split by dot if it's not an ISO string with milliseconds
        if (!bDateStr.includes('T') && bDateStr.includes('.')) {
          bDateStr = bDateStr.split('.').reverse().join('-');
        }
        if (!bDateStr.includes('T') && bDateStr.includes('/')) {
          bDateStr = bDateStr.split('/').reverse().join('-');
        }
        
        const d = new Date(bDateStr);
        if (!isNaN(d.getTime())) {
          // If it's an ISO string with a timezone offset (e.g., "2026-03-24T21:00:00.000Z")
          // Add 12 hours to push it to the intended local day
          if (bDateStr.includes('T') && bDateStr.endsWith('Z')) {
            d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
          }
          const y = d.getUTCFullYear();
          const m = String(d.getUTCMonth() + 1).padStart(2, '0');
          const day = String(d.getUTCDate()).padStart(2, '0');
          bDate = `${y}-${m}-${day}`;
        }
      }

      if (bDate !== date) return false;

      if (!b.time) return true; // Whole day blocked
      
      let timeStr = b.time.toString().trim();
      
      // If time is an ISO string from Google Sheets (e.g. "1899-12-30T07:00:00.000Z")
      if (timeStr.includes('T')) {
        const d = new Date(timeStr);
        // Use local hours since the user booking is likely in the same timezone
        timeStr = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
      } else if (!timeStr.includes(':') && !isNaN(Number(timeStr))) {
        // If it's a raw Excel/Sheets time fraction (e.g., 0.375 for 9:00 AM)
        const fraction = Number(timeStr);
        const totalMinutes = Math.round(fraction * 24 * 60);
        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;
        timeStr = `${h}:${String(m).padStart(2, '0')}`;
      }
      
      // Parse user time
      const uParts = time.split(':');
      const uTimeInMinutes = parseInt(uParts[0], 10) * 60 + parseInt(uParts[1], 10);

      // Check if it's a range like "14:30-16:30" or "14:30 - 16:30"
      if (timeStr.includes('-')) {
        const [startStr, endStr] = timeStr.split('-');
        const parseMinutes = (t: string) => {
          const parts = t.trim().split(':');
          return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        };
        
        const startMins = parseMinutes(startStr);
        const endMins = parseMinutes(endStr);
        
        if (!isNaN(startMins) && !isNaN(endMins)) {
          return uTimeInMinutes >= startMins && uTimeInMinutes <= endMins;
        }
      }
      
      // If it's a single time like "14:30" or "14:30:00"
      const bParts = timeStr.split(':');
      const bTimeInMinutes = parseInt(bParts[0], 10) * 60 + parseInt(bParts[1], 10);
      
      if (!isNaN(bTimeInMinutes)) {
        // Block a 3-hour window by default (1.5 hours before and 1.5 hours after)
        // This prevents someone booking at 14:31 if 14:30 is blocked.
        return Math.abs(bTimeInMinutes - uTimeInMinutes) <= 90; 
      }
      
      return false;
    });
  };

  return (
    <DataContext.Provider value={{ routes, blockedTimes, loading, errorDetails, getBasePrice, isTimeBlocked, googleScriptUrl, updateGoogleScriptUrl }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
