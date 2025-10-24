import { useState } from 'react'
import './App.css'
import "@radix-ui/themes/styles.css";
import Dashboard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
