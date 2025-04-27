
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lead } from "@/types/lead";

interface LeadCardProps {
  lead: Lead;
  onAddToCampaign?: (lead: Lead) => void;
}

export function LeadCard({ lead, onAddToCampaign }: LeadCardProps) {
  return (
    <Card className="animate-fade-in hover-scale">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{lead.fullName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <div>
          <p className="font-medium">{lead.jobTitle}</p>
          <p className="text-muted-foreground text-sm">{lead.company}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              clipRule="evenodd"
            />
          </svg>
          <span>{lead.location}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <a
          href={lead.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary flex items-center gap-1 hover:underline"
        >
          View Profile <ExternalLink className="h-3 w-3" />
        </a>
        {onAddToCampaign && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddToCampaign(lead)}
          >
            Add to Campaign
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
