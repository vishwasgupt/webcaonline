import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Service, Application } from "@shared/schema";
import { CheckCircle } from "lucide-react";

const applicationFormSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email address"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  formData: z.record(z.any()),
});

type ApplicationFormData = z.infer<typeof applicationFormSchema>;

interface ServiceApplicationFormProps {
  service: Service;
  onSuccess?: (application: Application) => void;
}

export default function ServiceApplicationForm({ service, onSuccess }: ServiceApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState<Application | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      formData: {},
    },
  });

  const createApplicationMutation = useMutation({
    mutationFn: async (data: ApplicationFormData) => {
      const response = await apiRequest("POST", "/api/applications", {
        ...data,
        serviceId: service.id,
      });
      return response.json();
    },
    onSuccess: (application: Application) => {
      queryClient.invalidateQueries({ queryKey: ['/api/applications'] });
      setSubmittedApplication(application);
      setIsSubmitted(true);
      onSuccess?.(application);
      toast({
        title: "Application Submitted Successfully!",
        description: `Your application number is: ${application.applicationNumber}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const steps = [
    { title: "Personal Information", description: "Basic details" },
    { title: "Service Details", description: "Specific requirements" },
    { title: "Review & Submit", description: "Confirm details" },
  ];

  const onSubmit = (data: ApplicationFormData) => {
    const completeData = {
      ...data,
      formData: {
        ...data.formData,
        step1: {
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
        },
      },
    };
    createApplicationMutation.mutate(completeData);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isSubmitted && submittedApplication) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-600 h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-success-title">
            Application Submitted Successfully!
          </h2>
          <p className="text-muted-foreground mb-6" data-testid="text-success-description">
            Thank you for choosing LegalEase Pro. Your application has been received and is being processed.
          </p>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-semibold" data-testid="text-application-number">
              Application Number: {submittedApplication.applicationNumber}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              You will receive updates on your registered email address.
            </p>
          </div>
          <Button 
            onClick={() => window.location.href = '/services'} 
            className="bg-primary text-primary-foreground"
            data-testid="button-browse-services"
          >
            Browse More Services
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center" data-testid={`step-${index}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-px bg-muted mx-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle data-testid="form-title">{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 0 && (
                <>
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold" data-testid="text-service-details">Service: {service.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Price</label>
                      <p className="text-2xl font-bold text-primary" data-testid="text-service-price">₹{service.price}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Processing Time</label>
                      <p className="text-lg" data-testid="text-processing-time">{service.processingTime}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Required Documents</label>
                    <ul className="list-disc pl-5 space-y-1" data-testid="list-required-documents">
                      {service.requiredDocuments.map((doc, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{doc}</li>
                      ))}
                    </ul>
                  </div>

                  <FormField
                    control={form.control}
                    name="formData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Requirements (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please mention any specific requirements or questions..."
                            className="min-h-20"
                            onChange={(e) => field.onChange({ ...field.value, additionalRequirements: e.target.value })}
                            data-testid="textarea-requirements"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold" data-testid="text-review-title">Review Your Application</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Personal Information</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Name:</span> {form.getValues("customerName")}</p>
                        <p><span className="font-medium">Email:</span> {form.getValues("customerEmail")}</p>
                        <p><span className="font-medium">Phone:</span> {form.getValues("customerPhone")}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Service Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Service:</span> {service.name}</p>
                        <p><span className="font-medium">Price:</span> ₹{service.price}</p>
                        <p><span className="font-medium">Processing Time:</span> {service.processingTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">What happens next?</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>You'll receive an email confirmation with your application number</li>
                      <li>Our expert will review your application and contact you within 24 hours</li>
                      <li>You'll be guided through the document submission process</li>
                      <li>We'll process your application and keep you updated on progress</li>
                      <li>You'll receive the final documents via email once completed</li>
                    </ol>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              data-testid="button-previous"
            >
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep} data-testid="button-next">
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={createApplicationMutation.isPending}
                className="bg-primary text-primary-foreground"
                data-testid="button-submit"
              >
                {createApplicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
