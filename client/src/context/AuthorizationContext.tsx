import { createContext, ReactNode, useEffect, useState } from "react";
import { GetGalleryOkResponse, NewPost, User } from "../types/customTypes";
import { getUserProfileApi } from "../api/authorisation";
import { baseUrl } from "../utilities/urls";

//3 Define providers props type
type AuthContextProviderProps = {
  children: ReactNode;
};

//5. Define the type for the context
type AuthContextType = {
  registration: (email: string, password: string) => Promise<boolean>;
  // login: (email: string, password: string) => Promise<boolean>;
  // logout: () => void;
  loggedUser: User | null;
  getUserProfile: () => Promise<void>;
  updateUser: (userUpdate: User) => Promise<void>;
  updateGallery: (galleryUpdate: NewPost) => Promise<void>;
};

//6 Create a variable with the initial value of all the elements we share in our context (at least the ones ...)
const contextInitialValue: AuthContextType = {
  registration: () => {
    throw new Error("context not initialized");
  },
  // login: () => {throw new Error("context not initialized")},
  // logout: () => {throw new Error("context not initialized")},
  loggedUser: null,
  getUserProfile: () => {
    throw new Error("context not initialized");
  },
  updateUser: () => {
    throw new Error("context not initialized");
  },
  updateGallery: () => {
    throw new Error("context not initialized");
  },
};

// 1. Create and export the context
export const AuthContext = createContext<AuthContextType>(contextInitialValue);

// 2 Create and export the provider
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // 4 Move to the provider all the states and functions you want to share bzw. when starting a new project you create them directly there

  // NEW - Profile
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  const getUserProfile = async () => {
    // const token = localStorage.getItem("token");

    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", `Bearer ${token}`);

    // const requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   // redirect: "follow"
    // };

    // try {
    //   const response = await fetch(
    //     `${baseUrl}/api/users/profile`,
    //     requestOptions
    //   );
    //   //console.log('response :>> ', response);
    //   if (!response.ok) {
    //     console.error("something went wrong");
    //   }
    //   // if it is okay, we gonna transfer the response to a json
    //   const result = (await response.json()) as GetProfileOkResponse;
    //   //console.log('result :>> ', result);
    //   setLoggedUser(result.user);
    //   // console.log('loggedUser :>> ', loggedUser);
    //   // console.log('result.user :>> ', result.user);
    // } catch (error) {
    //   console.log("error :>> ", error);
    // }
    getUserProfileApi().then(
      (user) => {
        setLoggedUser(user);
      },
      (error) => {
        console.log("error :>> ", error);
      }
    );
  };

  // const [newImage, setNewImage] = useState<User | null>(null);
  // const getGallery = async () => {
  //   const myHeaders = new Headers();

  //   const requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //   };

  //   try {
  //     const response = await fetch(
  //       `${baseUrl}/api/image/upload`,
  //       requestOptions
  //     );
  //     console.log('response :>> ', response);
  //     if (!response.ok) {
  //       console.error("something went wrong");
  //     }
  //     // if it is okay, we gonna transfer the response to a json
  //     const result = (await response.json()) as GetGalleryOkResponse;
  //     //console.log('result :>> ', result);
  //     setNewImage(result.user);
  //     // console.log('newImage :>> ', newImage);
  //     // console.log('result.user :>> ', result.user);
  //   } catch (error) {
  //     console.log("error :>> ", error);
  //   }

  // OLD - übertragen von crazy reads TO DO
  const [user, setUser] = useState<User | null>(null);

  const registration = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    console.log("email, password:>>", email, password);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed up
      const user = userCredential.user;
      const userEmail = user.email;
      const id = user.uid;

      if (userEmail && id) {
        setUser({ email: userEmail, id });
        return true;
      } else {
        // return false
        throw new Error("Userinformation not found");
      }
    } catch (err) {
      const error = err as Error;
      console.log("error message:>>", error.message);
      return false;
    }

    //Login & Logout functionality
    // const LoginForm = async (email:string, password:string) => {
    //     // setUser();
    //     console.log("email, password:>>", email, password);
    //   try {
    //     const userLoginCredential = await signInWithEmailAndPassword(auth, email, password)
    //     const user = userLoginCredential.user;
    //     const userEmail = user.email;
    //     const id = user.uid;

    //     if (userEmail && id) {
    //       setUser({email: userEmail, id});
    //       return true
    //     }else {
    //       // return false
    //       throw new Error ("Userinformation not found");
    //     }

    //     // console.log("user logged in:>>", user);

    //   } catch (err) {
    //     const error = err as Error
    //     console.log("error message:>>", error.message);
    //     return false
    //   }

    //   }

    // this function I gonna call it, everytime I want to know if my user is logged in or not: Whenever it is called, it will connect with firebas and bring back any user / the user, that are logged in.
    // if it finds it, we will see the information, if not, we will see the message, that the user is signed out.
    //   const checkUserStatus = () => {
    //     onAuthStateChanged(auth, (user) => {
    //       if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         // const uid = user.uid;
    //           const userEmail = user.email;
    //           const id = user.uid;
    //           if (userEmail && id) {
    //             setUser({email: userEmail, id});
    //           }else {
    //             throw new Error ("Userinformation not found");
    //           }
    //         // ...
    //         console.log("%c user is logged in", "color:green", user.email);

    //       } else {
    //         // User is signed out
    //         console.log("%c user is signed out", "color:red");
    //         setUser(null);
    //     };
    //   });
    //   }

    //   const logout = () => {
    //     signOut(auth)
    //     .then(() => {
    //       // Sign-out successful.
    //       console.log("%c user is signed out", "color:red");
    //       setUser(null);
    //     }).catch((error) => {
    //       // An error happened. - The user could not be signed out.
    //       console.log("Probmelm sogning out user");
    //     });
    //   }

    //   useEffect(() => {
    //     checkUserStatus();
    //   }, [])
    // }}

    //7 in providers property value include the elements (states, functions, variables) you want to share and  .....
  };

  const updateUser = async (updatedUser: User) => {
    // TODO implement method to send updated uswer to backend
    console.log("SEND USER UPDATE", updateUser, "TO BACKEND");
    setLoggedUser(updatedUser);
  };

  const updateGallery = async (updatedGallery: NewPost) => {
    console.log("SEND GALLERY UPDATE", updateGallery, "TO BACKEND");
    setNewImage(updatedGallery);
  };

  //NEW
  // useEffect wird einmalig beim ersten Laden der Komponente ausgeführt
  useEffect(() => {
    // Profilinformationen automatisch abrufen, wenn die Seite geladen wird
    getUserProfile();
  }, []);

  //NEW
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("%c user is logged in", "color:green");
    } else {
      console.log("%c user is logged out", "color:red");
    }
    return () => {};
  }, []);

  return (
    <AuthContext.Provider
      value={{
        getUserProfile,
        loggedUser,
        registration,
        updateUser,
        updateGallery,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
