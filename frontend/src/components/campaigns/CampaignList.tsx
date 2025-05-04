import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { StatusBadge, CampaignStatus } from "@/components/ui/badge-status";
import { CampaignTableSkeleton } from "./CampaignTableSkeleton";
import { ICampaign } from "@/types/campaign";

interface CampaignListProps {
  campaigns: ICampaign[] | undefined;
  isLoading: boolean;
  onEdit: (campaign: ICampaign) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, status: CampaignStatus) => void;
}

export function CampaignList({
  campaigns,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: CampaignListProps) {
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await onDelete(id);
      toast({
        title: "Campaign deleted",
        description: "The campaign has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Failed to delete campaign",
        description: "An error occurred while trying to delete the campaign.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (
    id: string,
    currentStatus: CampaignStatus
  ) => {
    try {
      setTogglingId(id);
      const newStatus: CampaignStatus =
        currentStatus === "active" ? "inactive" : "active";
      await onToggleStatus(id, newStatus);
      toast({
        title: `Campaign ${
          newStatus === "active" ? "activated" : "deactivated"
        }`,
        description: `The campaign status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Failed to update status",
        description:
          "An error occurred while trying to update the campaign status.",
        variant: "destructive",
      });
    } finally {
      setTogglingId(null);
    }
  };

  console.log("[CampaignList.tsx] Received campaigns prop:", campaigns);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Leads</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <CampaignTableSkeleton />
        </TableBody>
      </Table>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
        <div className="bg-muted/50 rounded-full p-6 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </div>
        <h3 className="font-semibold text-xl mb-1">No campaigns found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Get started by creating your first campaign. Campaigns allow you to
          organize and track your marketing efforts.
        </p>
      </div>
    );
  }

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="rounded-md border animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Campaign Name</TableHead>
            <TableHead className="w-[300px]">Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Leads</TableHead>
            <TableHead>Accounts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign._id} className="animate-fade-in">
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{truncateText(campaign.description, 80)}</TableCell>
              <TableCell>
                <StatusBadge status={campaign.status} />
              </TableCell>
              <TableCell>{campaign.leads?.length || 0}</TableCell>
              <TableCell>{campaign.accountIDs?.length || 0}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(campaign)}
                    disabled={campaign.status === "deleted"}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(campaign._id)}
                    disabled={
                      deletingId === campaign._id ||
                      campaign.status === "deleted"
                    }
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
