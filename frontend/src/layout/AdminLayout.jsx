import { useLocation, Link, Outlet } from 'react-router-dom';
//Framework And Functional Library
import React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//UI Library
import { Separator } from "@/components/ui/separator"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/ui/app-sidebar"

//Set Up
const queryClient = new QueryClient()

const NavigationHeader = () => {
    const location = useLocation(); 
    const pathnames = location.pathname.split("/")

    const routeToTabName = {
        "admin" : "Admin Dashboard", 
        "product" : "Product", 
        "order" : "Order"
    }

    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
            <BreadcrumbList>
            {pathnames.map((route, index) => {

                if (route in routeToTabName) {
                    return (
                        <>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink>
                            {routeToTabName[route]}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index != (pathnames.length-1) && <BreadcrumbSeparator className="hidden md:block" />}
                        </>
                    )
                }  
            })}
            </BreadcrumbList>
        </Breadcrumb>
        </div>
    </header>
    )
}

function AdminLayout() {
return (
  <QueryClientProvider client={queryClient}>
    <SidebarProvider>
      <AppSidebar/>
      <main className='w-full'>
        <NavigationHeader/>
        <Outlet />
      </main>
    </SidebarProvider>
  </QueryClientProvider>
  )
}

export default AdminLayout;
