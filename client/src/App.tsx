import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
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
import UpdateSunset from "./pages/UpdateSunset/UpdateSunset";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  console.log("Production or Dev mode?? :>> ", import.meta.env.MODE);
  return (
    <>
      <AuthContextProvider>
        <MenuProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Root />}>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/sunsets" element={<Sunsets />} />
                <Route path="/sunsets/add" element={<AddSunset />} />
                <Route path="/sunsets/:id/update" element={<UpdateSunset />} />
                <Route path="/sunsets/:id" element={<DetailSunset />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
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
