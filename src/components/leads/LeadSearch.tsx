
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>Headline</TooltipTrigger>
                          <TooltipContent>
                            Professional headline from LinkedIn
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>LinkedIn URL</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={lead.avatarUrl} alt={lead.fullName} />
                            <AvatarFallback>{lead.fullName.charAt(0)}</AvatarFallback>
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
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addToCampaign(lead)}
                        >
                          Add to Campaign
                        </Button>
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
              <Search className="h-12 w-12 text-muted-foreground" />
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
            <Search className="h-12 w-12 text-muted-foreground" />
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

// Expanded mock leads data
const mockLeads: Lead[] = [
  {
    id: "1",
    fullName: "Sarah Thompson",
    headline: "Chief Marketing Officer | B2B SaaS Marketing Expert",
    jobTitle: "CMO",
    company: "InnovateX Technologies",
    location: "San Francisco, CA",
    profileUrl: "https://linkedin.com/in/sarah-thompson",
    avatarUrl: "/placeholder.svg",
    about: "Passionate marketing leader with 15+ years of experience in transforming B2B SaaS marketing strategies."
  },
  {
    id: "2", 
    fullName: "Michael Rodriguez",
    headline: "Senior Product Manager | AI & Machine Learning",
    jobTitle: "Senior Product Manager",
    company: "DataNova Solutions",
    location: "New York, NY",
    profileUrl: "https://linkedin.com/in/michael-rodriguez",
    avatarUrl: "/placeholder.svg",
    about: "Building cutting-edge AI products that solve real-world business challenges."
  },
  {
    id: "3",
    fullName: "Emily Chen",
    headline: "Startup Founder | FinTech Innovator",
    jobTitle: "CEO & Founder",
    company: "PayLite Technologies",
    location: "Boston, MA",
    profileUrl: "https://linkedin.com/in/emily-chen",
    avatarUrl: "/placeholder.svg",
    about: "Disrupting the financial technology landscape with innovative payment solutions."
  },
  {
    id: "4",
    fullName: "David Nguyen",
    headline: "Enterprise Sales Director | Cloud Solutions",
    jobTitle: "Sales Director",
    company: "CloudPro Services",
    location: "Seattle, WA",
    profileUrl: "https://linkedin.com/in/david-nguyen",
    avatarUrl: "/placeholder.svg",
    about: "Helping enterprise clients transform their digital infrastructure through cutting-edge cloud technologies."
  },
  {
    id: "5",
    fullName: "Jessica Martinez",
    headline: "VP of Engineering | Scaling High-Performance Teams",
    jobTitle: "VP of Engineering",
    company: "TechNova Innovations",
    location: "Austin, TX",
    profileUrl: "https://linkedin.com/in/jessica-martinez",
    avatarUrl: "/placeholder.svg",
    about: "Building and leading world-class engineering teams that deliver exceptional software products."
  },
  {
    id: "6",
    fullName: "Alex Kim",
    headline: "Digital Transformation Consultant | Strategy & Innovation",
    jobTitle: "Senior Consultant",
    company: "Global Strategy Partners",
    location: "Chicago, IL",
    profileUrl: "https://linkedin.com/in/alex-kim",
    avatarUrl: "/placeholder.svg",
    about: "Guiding organizations through complex digital transformation journeys."
  },
  {
    id: "7",
    fullName: "Rachel Patel",
    headline: "UX Design Leader | Customer Experience Strategist",
    jobTitle: "Head of UX Design",
    company: "UserCentric Labs",
    location: "Portland, OR",
    profileUrl: "https://linkedin.com/in/rachel-patel",
    avatarUrl: "/placeholder.svg",
    about: "Creating intuitive and delightful user experiences that drive business success."
  },
];

export default LeadSearch;
