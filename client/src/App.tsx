import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';


import './App.css'
import Navbar from "./components/Navbar/Navbar";
import Sunsets from "./pages/Sunsets/Sunsets";
import Profile from "./pages/Profile/Profile";

const Root = () => {
  return (
    <>
    {/* TO DO - Footer einfügen */}
     <Navbar/>  
     <Outlet/>  
     {/* <Footer/>   */}
    </>
  )
}


function App() {

  return (
    <>
    {/* <AuthContextProvider> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Root/>}>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/sunsets" element={<Sunsets/>}/>
          <Route path="/profile" element={<Profile/>}/>
          {/* <Route path="/faq" element={<FAQ/>}/> */}

          </Route>
        </Routes>
      </BrowserRouter>
     {/* </AuthContextProvider> */}
    </>
  )
}

export default App


