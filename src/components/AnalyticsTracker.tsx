import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/** Fires a consent-aware page_view on every route change. */
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // let the new page set its <title> first
    const t = window.setTimeout(() => {
      trackPageView(location.pathname + location.search);
    }, 60);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsTracker;
