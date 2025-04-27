
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

interface AppHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AppHeader({ title, actionLabel, onAction }: AppHeaderProps) {
  return (
    <header className="bg-background border-b border-border flex items-center justify-between p-4 md:px-6 md:py-4 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-2">
        {actionLabel && onAction && (
          <Button onClick={onAction} className="hidden sm:inline-flex animate-fade-in">
            {actionLabel}
          </Button>
        )}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
