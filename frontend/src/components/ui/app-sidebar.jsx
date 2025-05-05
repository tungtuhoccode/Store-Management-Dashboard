import {   
  Bell,
  CircleUser,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Calendar, Home, Inbox, Search, Settings,
  ChevronsUpDown
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    title: "Products",
    url: "#",
    icon: Package,
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export default function AppSidebar() {
  return (
    <Sidebar 
    collapsible="icon"
    >

      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Icon container */}
              <div className="flex aspect-square w-8 h-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Package2 className="w-4 h-4" />
              </div>

              {/* Two-line text */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">VNTT Ware</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>

              {/* Chevron indicator */}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
