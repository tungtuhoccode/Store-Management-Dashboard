import React from 'react'
import { Button } from "../../components/ui/button"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import AppSidebar from "../../components/ui/app-sidebar"

function AdminPage() {
return (
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
    </main>
  </SidebarProvider>
  )
}

export default AdminPage;
