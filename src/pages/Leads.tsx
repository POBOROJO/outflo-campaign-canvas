
import { AppHeader } from "@/components/layout/AppHeader";
import { LeadSearch } from "@/components/leads/LeadSearch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeProvider } from "next-themes";

const LeadsPage = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <AppHeader title="Lead Search" />
            
            <main className="flex-1 p-4 md:p-6">
              <LeadSearch />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default LeadsPage;
