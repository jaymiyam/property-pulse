'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import countUnreadMessage from '../actions/countUnreadMessage';
import { useSession } from 'next-auth/react';

const GlobalContext = createContext(null);

export const useGlobalContext = () => {
  const value = useContext(GlobalContext);
  if (!value) {
    throw new Error('Context can only be used within context provider');
  }
  return value;
};

export const GlobalContextProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      countUnreadMessage().then((res) => {
        if (res.count) setUnreadCount(res.count);
      });
    }
  }, [session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};
