import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Search, X } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LeadCard } from "./LeadCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Lead } from "@/types/lead";

const formSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export function LeadSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Lead[] | null>(mockLeads);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock some search results based on the query
      const mockResults = generateMockResults(data.query);
      setResults(mockResults);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "An error occurred while searching for leads.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    form.reset();
    setResults(mockLeads);
  };

  // Generate mock results based on search query
  function generateMockResults(query: string): Lead[] {
    const searchTerms = query.toLowerCase().split(" ");

    // Filter our mock data based on the search query
    return mockLeads.filter((lead) => {
      const leadText =
        `${lead.fullName} ${lead.jobTitle} ${lead.company} ${lead.location}`.toLowerCase();
      return searchTerms.some((term) => leadText.includes(term));
    });
  }

  // Render skeleton cards for loading state
  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <Skeleton className="h-[180px] rounded-md" />
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative animate-fade-in"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter LinkedIn URL, name, company, or job title"
                      className="pl-10 pr-16"
                      {...field}
                    />
                    {field.value && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-12 top-1"
                        onClick={clearSearch}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
                      </Button>
                    )}
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1"
                      disabled={isLoading || !form.formState.isValid}
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderSkeletons()}
        </div>
      ) : results ? (
        results.length > 0 ? (
          <>
            <p className="text-muted-foreground animate-fade-in">
              {form.getValues().query
                ? `Found ${results.length} leads matching your search`
                : `Showing all ${results.length} leads`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {results.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </>
        ) : (
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="font-semibold text-xl mb-1">No leads found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              We couldn't find any leads matching your search query. Try using
              different keywords or check the LinkedIn URL.
            </p>
          </div>
        )
      ) : (
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <h3 className="font-semibold text-xl mb-1">Search for leads</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            Enter a LinkedIn profile URL, name, company, or job title to find
            relevant leads.
          </p>
        </div>
      )}
    </div>
  );
}

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: "1",
    fullName: "Sarah Johnson",
    jobTitle: "Marketing Director",
    company: "TechCorp",
    location: "San Francisco, CA",
    profileUrl: "https://linkedin.com/in/sarah-johnson",
  },
  {
    id: "2",
    fullName: "Michael Chen",
    jobTitle: "Growth Manager",
    company: "Startify",
    location: "New York, NY",
    profileUrl: "https://linkedin.com/in/michael-chen",
  },
  {
    id: "3",
    fullName: "David Rodriguez",
    jobTitle: "VP of Sales",
    company: "CloudScale",
    location: "Austin, TX",
    profileUrl: "https://linkedin.com/in/david-rodriguez",
  },
  {
    id: "4",
    fullName: "Emily Wilson",
    jobTitle: "Head of Growth",
    company: "Innovate Inc",
    location: "Boston, MA",
    profileUrl: "https://linkedin.com/in/emily-wilson",
  },
  {
    id: "5",
    fullName: "James Park",
    jobTitle: "Business Development",
    company: "TechCorp",
    location: "Seattle, WA",
    profileUrl: "https://linkedin.com/in/james-park",
  },
  {
    id: "6",
    fullName: "Priya Sharma",
    jobTitle: "Marketing Manager",
    company: "GlobalTech",
    location: "Chicago, IL",
    profileUrl: "https://linkedin.com/in/priya-sharma",
  },
];
