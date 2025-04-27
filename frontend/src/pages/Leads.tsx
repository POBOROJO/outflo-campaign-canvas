
import { AppHeader } from "@/components/layout/AppHeader";
import { LeadSearch } from "@/components/leads/LeadSearch";

const LeadsPage = () => {
  return (
    <>
      <AppHeader title="Lead Search" />
      
      <main className="flex-1 p-4 md:p-6">
        <LeadSearch />
      </main>
    </>
  );
};

export default LeadsPage;
