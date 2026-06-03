import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const scrollPositions = {};

export const useScrollRestoration = () => {
  const location = useLocation();

  useEffect(() => {
    // Restore scroll position when component mounts
    const savedPosition = scrollPositions[location.pathname];
    if (savedPosition !== undefined) {
      window.scrollTo(0, savedPosition);
    } else {
      window.scrollTo(0, 0);
    }

    // Save scroll position when component unmounts or route changes
    return () => {
      scrollPositions[location.pathname] = window.scrollY;
    };
  }, [location.pathname]);
};
