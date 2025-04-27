
import { AppHeader } from "@/components/layout/AppHeader";
import { MessageGenerator } from "@/components/message-generator/MessageForm";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeProvider } from "next-themes";

const MessageGeneratorPage = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <AppHeader title="LinkedIn Message Generator" />
            
            <main className="flex-1 p-4 md:p-6">
              <MessageGenerator />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default MessageGeneratorPage;
