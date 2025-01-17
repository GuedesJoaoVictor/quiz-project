import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import Main from './views/pages/Main';
import Register from './views/pages/Register';
import Login from './views/pages/Login';

export default function MainRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<Login/>}/> {/* todo - create a not found page*/} 
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainRoutes/>
  </StrictMode>,
);
