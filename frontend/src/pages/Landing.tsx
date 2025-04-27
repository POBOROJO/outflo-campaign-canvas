
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            Welcome to <span className="text-primary">OutFlo</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 animate-slide-in">
            Streamline your campaign management and lead generation with our powerful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in">
            <Button asChild size="lg" className="hover-scale">
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover-scale">
              <Link to="/message-generator">Try Message Generator</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-card border hover-scale">
            <h3 className="text-xl font-semibold mb-3">Campaign Management</h3>
            <p className="text-muted-foreground">Create and manage your outreach campaigns efficiently.</p>
          </div>
          <div className="p-6 rounded-lg bg-card border hover-scale">
            <h3 className="text-xl font-semibold mb-3">Lead Generation</h3>
            <p className="text-muted-foreground">Find and engage with potential leads automatically.</p>
          </div>
          <div className="p-6 rounded-lg bg-card border hover-scale">
            <h3 className="text-xl font-semibold mb-3">Message Generator</h3>
            <p className="text-muted-foreground">Create personalized outreach messages in seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
