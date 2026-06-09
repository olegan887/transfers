import React, { createContext, useContext, useState, useEffect } from 'react';
import { basePrices } from '../data/pricing';
import { getGoogleScriptUrl, safeFetchGoogleScript, getBidirectional, cleanUrl } from '../lib/utils';
import { isTimeBlocked as externalIsTimeBlocked } from '../lib/dateUtils';

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
    const controller = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      setErrorDetails(null);
      let GOOGLE_SCRIPT_URL = googleScriptUrl;
      try {
        GOOGLE_SCRIPT_URL = cleanUrl(GOOGLE_SCRIPT_URL);

        if (!GOOGLE_SCRIPT_URL) {
          throw new Error('Google Apps Script URL is empty');
        }

        const response = await safeFetchGoogleScript(GOOGLE_SCRIPT_URL);
        
        if (controller.signal.aborted) return;

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (controller.signal.aborted) return;

        if (data.result === 'success') {
          setRoutes(data.routes || []);
          setBlockedTimes(data.blocked || []);
          setErrorDetails(null);
        } else {
          throw new Error(data.message || 'Unknown error from script');
        }
      } catch (error: any) {
        if (controller.signal.aborted) return;
        console.error('Failed to fetch dynamic data:', error);
        setErrorDetails(`${error.message}. URL starts with: ${GOOGLE_SCRIPT_URL.substring(0, 30)}...`);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [googleScriptUrl, refreshTrigger]);

  const updateGoogleScriptUrl = async (url: string): Promise<boolean> => {
    const cleanedUrl = cleanUrl(url);
    localStorage.setItem('VITE_GOOGLE_SCRIPT_URL', cleanedUrl);
    
    if (cleanedUrl !== googleScriptUrl) {
      setGoogleScriptUrl(cleanedUrl);
    } else {
      setRefreshTrigger(prev => prev + 1);
    }
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

    return getBidirectional(basePrices, from, to);
  };

  const isTimeBlocked = (date: string, time: string): boolean => {
    return externalIsTimeBlocked(blockedTimes, date, time);
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
