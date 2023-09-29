import { useEffect, useState } from 'react';

const usePersistedState = (initialState, sessionStorageKey) => {
  const [state, setState] = useState(() => {
    const persisitedvalue = sessionStorage.getItem(sessionStorageKey);

    return persisitedvalue ? JSON.parse(persisitedvalue) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  return [state, setState];
};

export const useSearchStr = () => {
  return usePersistedState('', 'searchString');
};
