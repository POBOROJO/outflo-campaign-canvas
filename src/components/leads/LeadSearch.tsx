import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Search, X, ExternalLink, Info } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Lead } from "@/types/lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";

const formSchema = z.object({
  query: z.string().min(1, "Search query is required"),
});

export function LeadSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Lead[] | null>(null);
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    setResults(null);
  };
  
  const addToCampaign = (lead: Lead) => {
    toast({
      title: "Lead added to campaign",
      description: `${lead.fullName} has been added to your campaign.`,
    });
  };

  function generateMockResults(query: string): Lead[] {
    const searchTerms = query.toLowerCase().split(" ");
    
    return mockLeads.filter(lead => {
      const leadText = `${lead.fullName} ${lead.headline} ${lead.jobTitle} ${lead.company} ${lead.location}`.toLowerCase();
      return searchTerms.some(term => leadText.includes(term));
    });
  }

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
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : results ? (
        results.length > 0 ? (
          <>
            <p className="text-muted-foreground">
              Found {results.length} leads matching your search
            </p>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        Headline
                        <Tooltip content="Professional headline from LinkedIn">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>LinkedIn URL</TableHead>
                    <TableHead>About</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <img src={lead.avatarUrl} alt={lead.fullName} />
                          </Avatar>
                          {lead.fullName}
                        </div>
                      </TableCell>
                      <TableCell>{lead.headline}</TableCell>
                      <TableCell>{lead.jobTitle}</TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>{lead.location}</TableCell>
                      <TableCell>
                        <a
                          href={lead.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          View Profile
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {lead.about}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              We couldn't find any leads matching your search query. 
              Try using different keywords or check the LinkedIn URL.
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
            Enter a LinkedIn profile URL, name, company, or job title to find relevant leads.
          </p>
        </div>
      )}
    </div>
  );
}

const mockLeads: Lead[] = [
  {
    id: "1",
    fullName: "Owen Kurtz",
    headline: "Supply Chain & Manufacturing",
    jobTitle: "Founder",
    company: "Nest Traffic",
    location: "Fort Myers, FL",
    profileUrl: "https://linkedin.com/in/owen-kurtz",
    avatarUrl: "/placeholder.svg",
    about: "/"
  },
  {
    id: "2",
    fullName: "Alexander Ulreich",
    headline: "CEO @STRAT3GIC 📈 3X Exit",
    jobTitle: "Founder & CEO | We Help B2B",
    company: "STRAT3GIC Marketing Agency",
    location: "United States",
    profileUrl: "https://linkedin.com/in/alexander-ulreich",
    avatarUrl: "/placeholder.svg",
    about: "A DRIVEN ENTREPRENEUR"
  },
  {
    id: "3",
    fullName: "Drew Wolber",
    headline: "Entrepreneur, Proud Husband",
    jobTitle: "Co-Founder & Managing Partner",
    company: "FOAM Creative",
    location: "Austin, TX",
    profileUrl: "https://linkedin.com/in/drew-wolber",
    avatarUrl: "/placeholder.svg",
    about: "/"
  },
  {
    id: "4",
    fullName: "Ben McGary",
    headline: "MANUFACTURERS: Grow with LinkedIn",
    jobTitle: "Tech Stack Expert",
    company: "TactStack",
    location: "Box Elder, SD",
    profileUrl: "https://linkedin.com/in/ben-mcgary",
    avatarUrl: "/placeholder.svg",
    about: "Hi, I'm Ben McGary 👋 I DRIVE RESULTS"
  },
  {
    id: "5",
    fullName: "Shannon Hostetler",
    headline: "Co-Founder & COO, North Star Lead Gen",
    jobTitle: "Co-Founder & COO",
    company: "North Star Lead Gen",
    location: "Mount Juliet, TN",
    profileUrl: "https://linkedin.com/in/shannon-hostetler",
    avatarUrl: "/placeholder.svg",
    about: "/"
  }
];
