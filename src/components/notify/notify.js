import { createContext, useContext, useState } from 'react';

export const NotifiContext = createContext();

export const Notifi = ({ children }) => {
  const [errorCode, setErrorCode] = useState(0);
  return (
    <NotifiContext.Provider value={{ errorCode,setErrorCode }}>
      {children}
    </NotifiContext.Provider>
  );
};
