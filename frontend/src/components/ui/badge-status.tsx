
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CampaignStatus = 'active' | 'inactive' | 'deleted';

interface StatusBadgeProps {
  status: CampaignStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "px-2 py-0.5 font-medium",
        status === 'active' && "badge-active",
        status === 'inactive' && "badge-inactive",
        status === 'deleted' && "badge-deleted"
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
