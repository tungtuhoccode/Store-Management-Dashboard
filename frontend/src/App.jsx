import React from "react"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { Toaster } from "react-hot-toast"

import MainLayout from "./layout/MainLayout"

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
import AdminPage from "./pages/AdminPage/Admin"

import { useUserStore } from "./store/useUserStore"

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (location.pathname == "/admin") 
    return <AdminPage/>

  if (checkingAuth) return <LoadingScreen />
  else {
    return (
        <BrowserRouter>
          {/* Common route */}
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={(!user.email && !user.userName) ? <SignUpPages /> : <Navigate to="/" replace />} />
              <Route path="/login" element={(!user.email && !user.userName) ? <LogInPage /> : <Navigate to="/" replace />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/contact" element={<HomePage />} />
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
            </Route>

            {/* admin route */}
            <Route
              path="/admin"
              element={
                (user && user.userRole === "admin") ?
                  <AdminPage /> :
                  <Navigate to="/login" replace />
              }
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
    )
  }
}

export default App

