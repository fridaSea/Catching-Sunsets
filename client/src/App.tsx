import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import LoginForm from "./pages/Login/LoginForm";
import Sunsets from "./pages/Sunsets/Sunsets";
import Profile from "./pages/Profile/Profile";
import Footer from "./components/Footer/Footer";
import { MenuProvider } from "./context/MenuContext";
import NavBar from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./context/AuthorizationContext";
import ErrorPage from "./pages/Error Page/ErrorPage";
import AddSunset from "./pages/AddSunset/AddSunset";
import DetailSunset from "./pages/DetailSunset/DetailSunset";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
//import ProtectedRoute from "./components/ProtectedRoute";

const Root = () => {
  return (
    <>
      {/* TO DO - Footer einfügen */}
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  // TO DO - This has to be moved to the AuthContext, when it is ready
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     console.log("%c user is logged in", "color:green");
  //   } else {
  //     console.log("%c user is logged out", "color:red");
  //   }
  //   return () => {};
  // }, []);

  return (
    <>
      <AuthContextProvider>
        <MenuProvider>
          <BrowserRouter>
            <Routes>
              {/* //REVIEW the two routes for Home component are redundant */}
              <Route element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/sunsets" element={<Sunsets />} />
                <Route path="/sunsets/add" element={<AddSunset />} />
                {/* <Route path="/sunsets/:id" element={<UpdateSunset />} /> */}
                <Route path="/sunsets/:id" element={<DetailSunset />} />
                {/* <Route path="/profile" element={<Profile />} /> */}

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* <Route path="/faq" element={<FAQ/>}/> */}
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MenuProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
