import React, {ReactNode, createContext, useContext, useState} from 'react';
import {UserData} from '../models/UserModel';

interface UserContextType {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Provider not found');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const userContextValue: UserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
