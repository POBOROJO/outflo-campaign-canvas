
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Index";
import MessageGenerator from "./pages/MessageGenerator";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";
import { AppHeader } from "./components/layout/AppHeader";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <RadixToaster />
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/*"
                element={
                  <SidebarProvider>
                    <div className="min-h-screen flex w-full">
                      <AppSidebar />
                      <div className="flex-1 flex flex-col">
                        <div className="fixed top-4 left-4 z-50 md:hidden">
                          <SidebarTrigger className="bg-background shadow-md" />
                        </div>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/message-generator" element={<MessageGenerator />} />
                          <Route path="/leads" element={<Leads />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </div>
                  </SidebarProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
