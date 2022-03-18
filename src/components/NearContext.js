import React, { createContext, useState } from 'react';

const NearContext = createContext();

const NearProvider = ({children}) => {
  const [NearStatus, setNearStatus] = useState({});

  return (
    <NearContext.Provider value={{NearStatus, setNearStatus}}>
      {children}
    </NearContext.Provider>
  );
};

export { NearContext, NearProvider };
