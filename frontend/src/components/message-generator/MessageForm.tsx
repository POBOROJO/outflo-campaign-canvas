import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, RefreshCcw } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { generateMessage } from "@/api/message";
import { IMessage } from "@/types/message";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional(),
  summary: z.string().optional(),
});

type MessageFormValues = z.infer<typeof formSchema>;

export function MessageGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      jobTitle: "",
      company: "",
      location: "",
      summary: "",
    },
  });

  const onSubmit = async (data: MessageFormValues) => {
    setIsGenerating(true);
    try {
      const payload = {
        ...data,
        job_title: data.jobTitle,
      };
      const generatedMessage = await generateMessage(payload as IMessage);
      setMessage(generatedMessage);
      toast({
        title: "Message Generated",
        description: "Your LinkedIn message has been successfully generated.",
      });
    } catch (error) {
      toast({
        title: "Failed to generate message",
        description:
          error.message ||
          "An error occurred while generating your message. Please check if the backend server is running.",
        variant: "destructive",
      });
      console.error("Error details:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!message) return;

    navigator.clipboard
      .writeText(message)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "Message has been copied to your clipboard.",
        });
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy message to clipboard.",
          variant: "destructive",
        });
      });
  };

  const resetForm = () => {
    form.reset();
    setMessage(null);
    setCopied(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>LinkedIn Message Generator</CardTitle>
          <CardDescription>
            Fill in the details below to generate a personalized connection
            message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Marketing Director" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Summary (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief description of their background or relevant experience"
                        className="resize-none h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isGenerating}
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    "Generate Message"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Generated Message</CardTitle>
          <CardDescription>
            Your personalized LinkedIn connection message
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[200px]">
          {isGenerating ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          ) : message ? (
            <div className="bg-muted/50 p-4 rounded-md">
              <p className="whitespace-pre-wrap">{message}</p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center text-muted-foreground">
                <p>Fill out the form and click "Generate Message"</p>
                <p>to see your personalized message here</p>
              </div>
            </div>
          )}
        </CardContent>
        {message && (
          <CardFooter className="flex justify-end">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="hover-scale"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy to Clipboard
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
