import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useState, useEffect, ReactNode } from "react";
import { Models } from "react-native-appwrite";

type GlobalProviderType = {
  children: ReactNode;
};

type GlobalContextType = {
  user: Models.DocumentList<Models.Document> | Models.Document | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<
      Models.Document | Models.DocumentList<Models.Document> | undefined
    >
  >;
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: GlobalProviderType) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<
    Models.DocumentList<Models.Document> | Models.Document | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(undefined);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
