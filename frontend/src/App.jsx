import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import NavBar from "./components/NavBar"
import ScrollToTop from "./components/ScrollToTop"
import Footer from "./components/Footer"


import HomePage from "./pages/HomePage"
import SignUpPages from "./pages/SignUpPages"
import LogInPage from "./pages/LogInPage"
import LoadingScreen from "./components/LoadingScreen"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import ProductPage from "./pages/ProductPage"
import Categories from "./pages/Categories"
import PurchaseSuccess from "./pages/PurchaseSuccess"
import PurchaseCancel from "./pages/PurchaseCancel"

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
            <ScrollToTop />
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={(!user.email && !user.userName) ? <SignUpPages /> : <Navigate to="/" replace />} />
              <Route path="/login" element={(!user.email && !user.userName) ? <LogInPage /> : <Navigate to="/" replace />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/category/:category" element={<Categories />} />
              <Route
                path="/purchase-success"
                element={
                  (user.email && user.userName) ?
                    <PurchaseSuccess />
                    :
                    <Navigate to="/login" replace />
                }

              />
              <Route
                path="/purchase-cancel"
                element={
                  (user.email && user.userName) ?
                    <PurchaseCancel />
                    :
                    <Navigate to="/login" replace />
                }

              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
        <Toaster />
      </div>
    )
  }


}

export default App
