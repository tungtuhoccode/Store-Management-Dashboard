import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"

import NavBar from "./components/NavBar"


import HomePage from "./pages/HomePage"
import SignUpPages from "./pages/SignUpPages"
import LogInPage from "./pages/LogInPage"
import LoadingScreen from "./components/LoadingScreen"

import { useUserStore } from "./store/useUserStore"

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (checkingAuth) return <LoadingScreen />
  else {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-50 pt-20">
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={(!user.email && !user.userName) ? <SignUpPages /> : <Navigate to="/" replace />} />
              <Route path="/login" element={(!user.email && !user.userName) ? <LogInPage /> : <Navigate to="/" replace />} />
            </Routes>

          </BrowserRouter>
        </div>
      </div>
    )
  }


}

export default App
