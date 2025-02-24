import { BrowserRouter, Route, Routes } from "react-router";
import Home from '../pages/Home/Home';
import Registration from '../pages/Registration/Registration';


import './App.css'

// const Root = () => {
//   return (
//     <>
//     TO DO - Navbar/ Footer einfügen
//     </>
//   )
// }


function App() {

  return (
    <>
    {/* <AuthContextProvider> */}
      <BrowserRouter>
        <Routes>
          {/* <Route element={<Root/>}> */}
          {/* <Route index element={<Home/>}/> */}
          <Route path="/home" element={<Home/>}/>
          <Route path="/registration" element={<Registration/>}/>
          {/* <Route path="/sunsets" element={<Sunsets/>}/> */}

          {/* </Route> */}
        </Routes>
      </BrowserRouter>
     {/* </AuthContextProvider> */}
    </>
  )
}

export default App


