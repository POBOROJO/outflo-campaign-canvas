import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AppHeader } from "@/components/layout/AppHeader";
import { CampaignList } from "@/components/campaigns/CampaignList";
import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { Button } from "@/components/ui/button";
import { Campaign, CampaignStatus } from "@/types/campaign";
import { sampleCampaigns, generateId, getCurrentDate } from "@/lib/sample-data";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  leads: z.string().optional(),
  accountIds: z.string().optional(),
});

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(sampleCampaigns);
  const [isLoading, setIsLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | undefined>(undefined);
  const { toast } = useToast();

  const handleCreateCampaign = () => {
    setCurrentCampaign(undefined);
    setFormOpen(true);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setFormOpen(true);
  };

  const handleDeleteCampaign = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the campaign status to deleted
      setCampaigns(prevCampaigns =>
        prevCampaigns.map(campaign => 
          campaign.id === id 
            ? { ...campaign, status: 'deleted' as CampaignStatus, updatedAt: getCurrentDate() }
            : campaign
        )
      );
      
      return true;
    } catch (error) {
      console.error("Error deleting campaign:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCampaignStatus = async (id: string, status: CampaignStatus) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the campaign status
      setCampaigns(prevCampaigns =>
        prevCampaigns.map(campaign => 
          campaign.id === id 
            ? { ...campaign, status, updatedAt: getCurrentDate() }
            : campaign
        )
      );
      
      return true;
    } catch (error) {
      console.error("Error toggling campaign status:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Process form data
      const formattedLeads = values.leads 
        ? values.leads.split('\n').filter(Boolean) 
        : [];
        
      const formattedAccountIds = values.accountIds
        ? values.accountIds.split('\n').filter(Boolean)
        : [];
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (currentCampaign) {
        // Update existing campaign
        setCampaigns(prevCampaigns =>
          prevCampaigns.map(campaign => 
            campaign.id === currentCampaign.id
              ? {
                  ...campaign,
                  name: values.name,
                  description: values.description || '',
                  status: values.status as CampaignStatus,
                  leads: formattedLeads,
                  accountIds: formattedAccountIds,
                  updatedAt: getCurrentDate(),
                }
              : campaign
          )
        );
      } else {
        // Create new campaign
        const newCampaign: Campaign = {
          id: generateId(),
          name: values.name,
          description: values.description || '',
          status: values.status as CampaignStatus,
          leads: formattedLeads,
          accountIds: formattedAccountIds,
          createdAt: getCurrentDate(),
          updatedAt: getCurrentDate(),
        };
        
        setCampaigns(prevCampaigns => [...prevCampaigns, newCampaign]);
      }
      
      setFormOpen(false);
      return true;
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
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
