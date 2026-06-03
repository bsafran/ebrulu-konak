import React, { createContext, useCallback, useRef } from 'react';

export const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const scrollPositions = useRef({});

  const saveScrollPosition = useCallback((path) => {
    scrollPositions.current[path] = window.scrollY;
  }, []);

  const restoreScrollPosition = useCallback((path) => {
    if (scrollPositions.current[path] !== undefined) {
      window.scrollTo(0, scrollPositions.current[path]);
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ saveScrollPosition, restoreScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};
