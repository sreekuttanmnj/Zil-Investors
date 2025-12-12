import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Lock, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function InvestorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    toast.success("Request sent successfully! We'll be in touch shortly.");
  };

  const handleReset = () => {
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Card className="bg-green-50 border-green-100 h-full flex flex-col justify-center items-center text-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-3">Request Received</h3>
        <div className="space-y-2 max-w-xs mx-auto mb-8">
          <p className="text-green-800 font-medium">
            Thank you for your interest in Zil Money.
          </p>
          <p className="text-green-700 text-sm">
            Our Investor Relations team has been notified. You will receive an email with data room access credentials within 24 hours.
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleReset}
          className="bg-white border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Submit Another Request
        </Button>
      </Card>
    );
  }

  return (
    <Card className="h-full border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Lock className="h-5 w-5 text-slate-600" />
          </div>
          <CardTitle>Request Data Room Access</CardTitle>
        </div>
        <CardDescription>
          Get full access to our financial model, legal documents, and due diligence materials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="Jane" required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Doe" required disabled={isSubmitting} />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="jane@fund.com" required disabled={isSubmitting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="firm">Firm / Organization</Label>
            <Input id="firm" placeholder="Acme Ventures" required disabled={isSubmitting} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea id="message" placeholder="Specific areas of interest..." disabled={isSubmitting} />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-slate-900 hover:bg-slate-800 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Request..." : "Request Access"}
          </Button>
          
          <p className="text-xs text-center text-slate-500 mt-4 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" /> Protected by NDA. Qualified investors only.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
