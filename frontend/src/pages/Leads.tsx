import { useState, useEffect, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { searchLeads, getAllLeads } from "../api/leads";
import { ILeadProfile } from "../types/lead";
import { debounce } from "lodash"; // Make sure lodash is installed (`pnpm add lodash @types/lodash`)
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Leads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ILeadProfile[]>([]);
  const [allLeads, setAllLeads] = useState<ILeadProfile[]>([]); // State to store all leads
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Track initial load
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all leads
  const fetchAllLeads = useCallback(async () => {
    setIsLoading(true); // Use general loading state
    setError(null);
    try {
      const response = await getAllLeads();
      if (response.success) {
        setAllLeads(response.data);
        if (!searchTerm) {
          // Only update results if search is empty
          setResults(response.data);
        }
      } else {
        setError(response.message || "Failed to fetch leads");
        setAllLeads([]);
        setResults([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setAllLeads([]);
      setResults([]);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false); // Mark initial load complete
    }
  }, [searchTerm]); // Depend on searchTerm to potentially re-populate results

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      debounce(async (term: string) => {
        if (!term) {
          // If search term is cleared, show all leads again
          setResults(allLeads);
          setIsLoading(false);
          setError(null);
          return;
        }
        // Only trigger search if term is not empty
        setIsLoading(true);
        setError(null);
        try {
          const response = await searchLeads(term);
          if (response.success) {
            setResults(response.data);
          } else {
            setError(response.message || "Failed to fetch leads");
            setResults([]); // Clear results on search error
          }
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 500),
    [allLeads] // Dependencies for useMemo (values used inside the async function)
  );

  // Fetch all leads on initial mount
  useEffect(() => {
    fetchAllLeads();
  }, [fetchAllLeads]);

  // Trigger search or show all leads based on search term
  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      // If search term is empty and we are not initial loading, show all leads
      if (!isInitialLoading) {
        setResults(allLeads);
        setError(null); // Clear any previous search errors
      }
    }
    // Cleanup function to cancel debounce on unmount or term change
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch, allLeads, isInitialLoading]);

  const leadsToDisplay = results; // Always display the 'results' state

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">
        {searchTerm ? "Search Results" : "All Leads"} ({leadsToDisplay.length})
      </h1>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search leads or clear to view all..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xl"
        />
      </div>

      {/* Show initial loading indicator */}
      {isInitialLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading Leads...</span>
        </div>
      )}

      {/* Show search loading indicator (only when not initial loading) */}
      {isLoading && !isInitialLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Searching...</span>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Message when search yields no results */}
      {!isLoading && !error && searchTerm && leadsToDisplay.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No leads found matching your search term.
        </p>
      )}

      {/* Message when there are no leads at all (initial load finished) */}
      {!isLoading &&
        !error &&
        !searchTerm &&
        !isInitialLoading &&
        leadsToDisplay.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No leads have been saved yet.
          </p>
        )}

      {/* Display leads */}
      {!isLoading && leadsToDisplay.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadsToDisplay.map((lead) => (
            <Card key={lead._id}>
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <Avatar>
                  <AvatarImage src={lead.imageUrl} alt={lead.name} />
                  <AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{lead.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {lead.jobTitle}
                  </p>
                </div>
                {lead.profileUrl && (
                  <a
                    href={lead.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-1">
                  {lead.company} {lead.location && `• ${lead.location}`}
                </p>
                {lead.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {lead.summary}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leads;
