import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({children}) => {
  const [status, setStatus] = useState({
    loading: false,
  });
  return (
    <AppContext.Provider value={{ status, setStatus }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
