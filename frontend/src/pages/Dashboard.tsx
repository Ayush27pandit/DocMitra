import * as React from "react";
import {
  BarChart3,
  ChevronDown,
  Home,
  Users,
  TrendingUp,
  Plus,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import DashboardOverview from "@/component/Dashboard/Dashboard-overview";
// import {RentAgreement} from "@/component/Dashboard/RentAgreement";
import InvoiceGen from "@/component/Dashboard/InvoiceGen";
import FreelanceContract from "@/component/Dashboard/FreelanceContract";
import History from "@/component/Dashboard/History";
import ContractPage from "@/component/EmployeeHiring/Contract-page";

// Navigation data
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: Home,
    },
    {
      title: "Templates",
      url: "templates",
      icon: BarChart3,
      items: [
        {
          title: "Rent Agreement",
          url: "rent-agreement",
        },
        {
          title: "Invoice Generator",
          url: "invoice-generator",
        },
        {
          title: "Client Onboarding Form",
          url: "client-form",
        },
        {
          title: "Freelance Contract",
          url: "freelance-contract",
        },
      ],
    },
    {
      title: "History",
      url: "history",
      icon: Users,
    },
  ],
};

// Route components mapping
const routeComponents: Record<string, React.ComponentType> = {
  dashboard: DashboardOverview,

  // "rent-agreement": RentAgreement,
  "invoice-generator": InvoiceGen,
  "client-form": ContractPage,
  "freelance-contract": FreelanceContract,
  history: History,
};

// Breadcrumb mapping
const breadcrumbMap: Record<string, { parent?: string; title: string }> = {};

function AppSidebar({
  currentRoute,
  onNavigate,
}: {
  currentRoute: string;
  onNavigate: (route: string) => void;
}) {
  const username = JSON.parse(localStorage.getItem("username")!);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onNavigate("dashboard")}
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <TrendingUp className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">DocMitra</span>
                  <span className="text-xs">All in one platform</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <React.Fragment key={item.title}>
                  {item.items ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={currentRoute === subItem.url}
                                >
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => onNavigate(subItem.url)}
                                  >
                                    <span>{subItem.title}</span>
                                  </div>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={currentRoute === item.url}
                        asChild
                      >
                        <div
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={() => onNavigate(item.url)}
                        >
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                <Users className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{username}</span>
                <span className="truncate text-xs">john@example.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// Outlet component that renders the current route
function Outlet({ currentRoute }: { currentRoute: string }) {
  const Component = routeComponents[currentRoute] || DashboardOverview;
  return <Component />;
}

export default function Dashboard() {
  const [currentRoute, setCurrentRoute] = React.useState(() => {
    return localStorage.getItem("currentRoute") || "dashboard";
  });

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    localStorage.setItem("currentRoute", route);
  };

  const currentBreadcrumb = breadcrumbMap[currentRoute];

  return (
    <SidebarProvider>
      <AppSidebar currentRoute={currentRoute} onNavigate={handleNavigate} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {currentBreadcrumb?.parent && (
                  <>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#" className="cursor-pointer">
                        {currentBreadcrumb.parent}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {currentBreadcrumb?.title || "Dashboard"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <Button size="sm">
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet currentRoute={currentRoute} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
