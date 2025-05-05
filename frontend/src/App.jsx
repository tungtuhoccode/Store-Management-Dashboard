import React from "react"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import NavBar from "./components/NavBar"
import ScrollToTop from "./components/ScrollToTop"
import Footer from "./components/Footer"
import LoadingScreen from "./components/LoadingScreen"

import HomePage from "./pages/HomePage"
import SignUpPages from "./pages/SignUpPages"
import LogInPage from "./pages/LogInPage"
import Shop from "./pages/Shop"
import Cart from "./pages/Cart"
import ProductPage from "./pages/ProductPage"
import Categories from "./pages/Categories"
import AdminPage from "./pages/AdminPage/Admin"
import PurchaseSuccess from "./pages/PurchaseSuccess"
import PurchaseCancel from "./pages/PurchaseCancel"

import { useUserStore } from "./store/useUserStore"

export default function App() {
  const { user, checkAuth, checkingAuth } = useUserStore()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (checkingAuth) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin route (no NavBar/Footer) */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Public and purchase routes with NavBar + Footer layout */}
          <Route
            element={
              <>
                <NavBar />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route
              path="signup"
              element={
                !user.email && !user.userName ? (
                  <SignUpPages />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="login"
              element={
                !user.email && !user.userName ? (
                  <LogInPage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="category/:category" element={<Categories />} />
            <Route
              path="purchase-success"
              element={
                user.email && user.userName ? (
                  <PurchaseSuccess />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="purchase-cancel"
              element={
                user.email && user.userName ? (
                  <PurchaseCancel />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster />
    </div>
  )
}
