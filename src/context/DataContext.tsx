import React, { createContext, useContext, useState, useEffect } from 'react';
import { basePrices, DEFAULT_FEATURED_ROUTES, RouteItem } from '../data/pricing';
import { getGoogleScriptUrl, safeFetchGoogleScript, getBidirectional, cleanUrl } from '../lib/utils';
import { isTimeBlocked as externalIsTimeBlocked } from '../lib/dateUtils';

type RouteData = RouteItem;
type BlockedTime = { date: string; time: string };

const getInitialRoutes = (): RouteData[] => {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('cached_transfer_routes');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }
  return DEFAULT_FEATURED_ROUTES;
};

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
  const [routes, setRoutes] = useState<RouteData[]>(getInitialRoutes);
  const [blockedTimes, setBlockedTimes] = useState<BlockedTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [googleScriptUrl, setGoogleScriptUrl] = useState(getGoogleScriptUrl());
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchData = async () => {
      let GOOGLE_SCRIPT_URL = googleScriptUrl;
      try {
        GOOGLE_SCRIPT_URL = cleanUrl(GOOGLE_SCRIPT_URL);

        if (!GOOGLE_SCRIPT_URL) {
          return;
        }

        const response = await safeFetchGoogleScript(GOOGLE_SCRIPT_URL);
        
        if (controller.signal.aborted) return;

        if (!response.ok) {
          return;
        }
        
        const data = await response.json();
        
        if (controller.signal.aborted) return;

        if (data && data.result === 'success') {
          if (Array.isArray(data.routes) && data.routes.length > 0) {
            setRoutes(data.routes);
            try {
              localStorage.setItem('cached_transfer_routes', JSON.stringify(data.routes));
            } catch (e) {
              // ignore
            }
          }
          if (Array.isArray(data.blocked)) {
            setBlockedTimes(data.blocked);
          }
          setErrorDetails(null);
        }
      } catch (error: any) {
        if (controller.signal.aborted) return;
        console.warn('Silent pricing background sync:', error?.message || error);
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
