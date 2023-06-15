import Login from "./pages/Login";
import GoogleAuth from './GoogleAuth';
import { BrowserRouter as Routers, Route, Routes, Navigate } from "react-router-dom";
import Profile from "./pages/Profile";
import { useEffect, useState } from "react";

function App() {

const [auth, setAuth]=useState()
useEffect(()=>{
  setAuth(localStorage.getItem('jwt'))
  console.log(auth)
})
  return (
    <Routers>
    <div className="App">
        {/* <Login/> */}
        <GoogleAuth/>
    </div>
    <Routes>
      <Route path='/' element={auth?<Navigate to="/profile"/>:<Login/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    </Routers>
  );
}

export default App;
