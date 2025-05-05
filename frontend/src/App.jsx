import React from "react"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
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
import AdminPage from "./pages/AdminPage/Admin"

import { useUserStore } from "./store/useUserStore"

export default function App() {
  const { user, checkAuth, checkingAuth } = useUserStore()

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin route uses its own layout */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Main site routes with NavBar + Footer */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route index element={<HomePage />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}
