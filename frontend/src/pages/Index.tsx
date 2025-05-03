import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AppHeader } from "@/components/layout/AppHeader";
import { CampaignList } from "@/components/campaigns/CampaignList";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { Button } from "@/components/ui/button";
import { ICampaign, CampaignStatus } from "@/types/campaign";
import {
  getCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
} from "@/api/campaigns";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  leads: z.string().optional(),
  accountIds: z.string().optional(),
});

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<ICampaign | undefined>(
    undefined
  );
  const { toast } = useToast();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const fetchedCampaigns = await getCampaigns();
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        toast({
          title: "Failed to fetch campaigns",
          description: "Could not load campaigns from the server.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, [toast]);

  const handleCreateCampaign = () => {
    setCurrentCampaign(undefined);
    setFormOpen(true);
  };

  const handleEditCampaign = (campaign: ICampaign) => {
    setCurrentCampaign(campaign);
    setFormOpen(true);
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      await deleteCampaign(id);
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
      toast({
        title: "Campaign deleted",
        description: "The campaign has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast({
        title: "Failed to delete campaign",
        description: "An error occurred while trying to delete the campaign.",
        variant: "destructive",
      });
    }
  };

  const handleToggleCampaignStatus = async (
    id: string,
    status: CampaignStatus
  ) => {
    const currentCampaign = campaigns.find((c) => c._id === id);
    if (!currentCampaign) return;

    const newStatus: CampaignStatus =
      status === "active" ? "inactive" : "active";

    try {
      const updated = await updateCampaign(id, {
        ...currentCampaign,
        status: newStatus,
      });
      setCampaigns((prev) => prev.map((c) => (c._id === id ? updated : c)));
      toast({
        title: `Campaign ${
          newStatus === "active" ? "activated" : "deactivated"
        }`,
        description: `The campaign status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error toggling campaign status:", error);
      toast({
        title: "Failed to update status",
        description:
          "An error occurred while trying to update the campaign status.",
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const formattedLeads = values.leads
        ? values.leads.split("\n").filter(Boolean)
        : [];
      const formattedAccountIds = values.accountIds
        ? values.accountIds.split("\n").filter(Boolean)
        : [];

      const campaignData: Partial<ICampaign> = {
        name: values.name,
        description: values.description || "",
        status: values.status,
        leads: formattedLeads,
        accountIDs: formattedAccountIds,
      };

      if (currentCampaign) {
        const updated = await updateCampaign(
          currentCampaign._id,
          campaignData as ICampaign
        );
        setCampaigns((prev) =>
          prev.map((c) => (c._id === currentCampaign._id ? updated : c))
        );
        toast({ title: "Campaign updated" });
      } else {
        const newCampaign = await addCampaign(campaignData as ICampaign);
        setCampaigns((prev) => [...prev, newCampaign]);
        toast({ title: "Campaign created" });
      }

      setFormOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Failed to save campaign",
        description: "An error occurred while saving the campaign.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AppHeader
        title="Campaign Dashboard"
        actionLabel="Create Campaign"
        onAction={handleCreateCampaign}
      />

      <main className="flex-1 p-4 md:p-6">
        <div className="sm:hidden flex justify-center mb-6">
          <Button onClick={handleCreateCampaign} className="w-full sm:w-auto">
            Create Campaign
          </Button>
        </div>

        <CampaignList
          campaigns={campaigns}
          isLoading={isLoading}
          onEdit={handleEditCampaign}
          onDelete={handleDeleteCampaign}
          onToggleStatus={handleToggleCampaignStatus}
        />

        <CampaignForm
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleFormSubmit}
          campaign={currentCampaign}
          isSubmitting={isSubmitting}
        />
      </main>
    </>
  );
};

export default Dashboard;
