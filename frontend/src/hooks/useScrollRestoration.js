import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollContext } from '../context/ScrollContext';

export const useScrollRestoration = () => {
  const { restoreScrollPosition, saveScrollPosition } = useContext(ScrollContext);
  const location = useLocation();

  useEffect(() => {
    // Scroll position'ı restore et (biraz delay ile smooth olması için)
    setTimeout(() => {
      restoreScrollPosition(location.pathname);
    }, 0);

    // Cleanup: unmount olduğunda scroll position'ı save et
    return () => {
      saveScrollPosition(location.pathname);
    };
  }, [location.pathname, restoreScrollPosition, saveScrollPosition]);
};
