import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VerifyCertificate from "./pages/VerifyCertificate";
import IssueCertificate from "./pages/IssueCertificate";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCertificates from "./pages/MyCertificates";
import QRScanner from "./pages/QRScanner";



function App() {
  return (
    <BrowserRouter>

    <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        

        <Route
          path="/verify/:id"
          element={<VerifyCertificate />}
        />
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/certificates"
  element={
    <ProtectedRoute>
      <MyCertificates />
    </ProtectedRoute>
  }
/>

<Route
  path="/issue"
  element={
    <ProtectedRoute>
      <IssueCertificate />
    </ProtectedRoute>
  }
/>

<Route
 path="/scan"
 element={<QRScanner />}
/>


      </Routes>

    </BrowserRouter>
  );
}

export default App;