import React from 'react'
import { Button } from "../../components/ui/button"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import AppSidebar from "../../components/ui/app-sidebar"
import AdminProductPage from './AdminProductPage/AdminProductPage'

function AdminPage() {
return (
  <SidebarProvider>
    <AppSidebar />

    <main>
    <SidebarTrigger className="" />
      <AdminProductPage/>
    </main>
  </SidebarProvider>
  )
}

export default AdminPage;
