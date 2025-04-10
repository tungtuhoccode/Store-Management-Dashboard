import { BrowserRouter, Routes, Route } from "react-router-dom"

import NavBar from "./components/NavBar"


import HomePage from "./pages/HomePage"
import SignUpPages from "./pages/SignUpPages"
import LogInPage from "./pages/LogInPage"


function App() {


  return (
    <div className="min-h-screen relative overflow-hidden">

      <div className="relative z-50 pt-20">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPages />} />
            <Route path="/login" element={<LogInPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )

}

export default App
