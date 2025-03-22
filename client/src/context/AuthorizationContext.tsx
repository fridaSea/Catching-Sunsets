import { createContext, ReactNode, useEffect, useState } from "react";
import { GetSunsetOkResponse, NewSunset, User } from "../types/customTypes";
import { getUserProfileApi, loginUserApi } from "../api/authorisation";
import { baseUrl } from "../utilities/urls";

//3 Define providers props type
type AuthContextProviderProps = {
  children: ReactNode;
};

//5. Define the type for the context
type AuthContextType = {
  // registration: (email: string, password: string) => Promise<boolean>;
  registration: (
    email: string,
    password: string,
    usernamr: string
  ) => Promise<void>;
  // login: (email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loggedUser: User | null;
  getUserProfile: () => Promise<void>;
  updateUser: (userUpdate: User) => Promise<void>;
  updateSunset: (sunsetUpdate: NewSunset) => Promise<void>;
  getSunsetPost: () => Promise<void>;
  createdSunset: NewSunset | null;
};

//6 Create a variable with the initial value of all the elements we share in our context (at least the ones ...)
const contextInitialValue: AuthContextType = {
  registration: () => {
    throw new Error("context not initialized");
  },
  login: () => {
    throw new Error("context not initialized");
  },
  logout: () => {
    throw new Error("context not initialized");
  },
  loggedUser: null,
  getUserProfile: () => {
    throw new Error("context not initialized");
  },
  updateUser: () => {
    throw new Error("context not initialized");
  },
  updateSunset: () => {
    throw new Error("context not initialized");
  },
  createdSunset: null,
  getSunsetPost: () => {
    throw new Error("context not initialized");
  },
};

// 1. Create and export the context
export const AuthContext = createContext<AuthContextType>(contextInitialValue);

// 2 Create and export the provider
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // 4 Move to the provider all the states and functions you want to share bzw. when starting a new project you create them directly there
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const token = localStorage.getItem("token");

  const [user, setUser] = useState<User | null>(null);

  const getUserProfile = async () => {
    return getUserProfileApi();
  };

  const checkUserStatus = async (force = false) => {
    if (token) {
      setIsAuthenticated(true);

      if (!user || force) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        try {
          const response = await fetch(
            `${baseUrl}/api/users/profile`,
            requestOptions
          );
          if (!response.ok) {
            //console.log("Log in again, redirect user to login page");
            return;
          }

          if (response.ok) {
            const result = await response.json();
            setLoggedUser(result.userProfile);
            //console.log("result.userProfile :>> ", result.userProfile);
          }
        } catch (error) {
          console.log("error :>> ", error);
        }
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const registration = async (
    email: string,
    password: string,
    username: string
  ): Promise<void> => {
    console.log("email, password:>>", email, password);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("username", username);
      urlencoded.append("email", email);
      urlencoded.append("password", password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      const response = await fetch(
        `${baseUrl}/api/user/register`,
        requestOptions
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Registration Failed");
      }

      const result = await response.json();

      if (response.status >= 400) {
        throw new Error(result.message);
      } else {
        localStorage.setItem("token", result.token);
        setUser(result.user);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
    useEffect(() => {
      checkUserStatus();
    }, []);
  };

  //Login & Logout functionality
  const login = async (email: string, password: string) => {
    try {
      await loginUserApi(email, password);

      // Hole die Benutzerdaten sofort nach dem Login
      const userProfile = await getUserProfile(); // Hier sicherstellen, dass die Benutzerdaten geladen werden
      setLoggedUser(userProfile);

      setIsAuthenticated(true); // Den Authentifizierungsstatus setzen
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setLoggedUser(null);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  // UPDATE USER
  const updateUser = async (updatedUser: User) => {
    // TODO implement method to send updated user to backend
    console.log("SEND USER UPDATE", updateUser, "TO BACKEND");

    setLoggedUser(updatedUser);
    console.log("updatedUser :>> ", updatedUser);
  };

  // UPDATE SUNSET
  const [loggedSunset, setLoggedSunset] = useState<NewSunset | null>(null);
  const updateSunset = async (updatedSunset: NewSunset) => {
    console.log("SEND Sunset UPDATE", updateSunset, "TO BACKEND");
    setLoggedSunset(updatedSunset);
  };

  // useEffect wird einmalig beim ersten Laden der Komponente ausgeführt
  useEffect(() => {
    // Profilinformationen automatisch abrufen, wenn die Seite geladen wird
    getUserProfile();
  }, []);

  useEffect(() => {
    localStorage.getItem("token");
    if (loggedUser?.id) {
      console.log("%c user is logged in", "color:green");
    } else {
      console.log("%c user is logged out", "color:red");
    }
    return () => {};
  }, [loggedUser]);

  return (
    <AuthContext.Provider
      value={{
        getUserProfile,
        loggedUser,
        registration,
        updateUser,
        loggedSunset,
        updateSunset,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
