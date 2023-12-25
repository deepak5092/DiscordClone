import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./pages/Register"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Register></Register>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
} 