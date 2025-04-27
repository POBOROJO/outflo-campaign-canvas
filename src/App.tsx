
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Index";
import MessageGenerator from "./pages/MessageGenerator";
import Leads from "./pages/Leads";
import NotFound from "./pages/NotFound";

// Initialize QueryClient outside of the component to avoid re-initialization on renders
const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <RadixToaster />
            <Toaster />
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
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
