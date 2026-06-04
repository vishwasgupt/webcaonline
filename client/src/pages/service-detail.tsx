import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceApplicationForm from "@/components/forms/service-application-form";
import { Service } from "@shared/schema";
import { ArrowLeft, CheckCircle, Clock, CreditCard, Shield } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function ServiceDetail() {
  const [, params] = useRoute("/service/:id");
  const [showForm, setShowForm] = useState(false);

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: ['/api/services', params?.id],
    enabled: !!params?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4" data-testid="text-service-not-found">Service Not Found</h1>
          <p className="text-muted-foreground mb-8">The requested service could not be found.</p>
          <Link href="/services" data-testid="button-back-to-services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowForm(false)}
              className="mb-4"
              data-testid="button-back-to-details"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Service Details
            </Button>
            <h1 className="text-3xl font-bold text-foreground" data-testid="text-application-title">
              Apply for {service.name}
            </h1>
          </div>
          
          <ServiceApplicationForm 
            service={service} 
            onSuccess={() => setShowForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/services" data-testid="link-back-services">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <i className={`${service.icon} text-primary text-2xl`} data-testid="service-icon"></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground" data-testid="service-title">{service.name}</h1>
                  <Badge variant="secondary" className="mt-2" data-testid="service-category">{service.category}</Badge>
                </div>
              </div>
              <p className="text-lg text-muted-foreground" data-testid="service-description">{service.description}</p>
            </div>

            {/* Service Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center" data-testid={`feature-${index}`}>
                      <CheckCircle className="text-green-600 mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.requiredDocuments.map((document, index) => (
                    <div key={index} className="flex items-center" data-testid={`document-${index}`}>
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="text-sm">{document}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Process Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {service.steps.map((step, index) => (
                    <div key={index} className="flex items-start" data-testid={`step-${index}`}>
                      <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{step}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Service Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="service-price">
                    {/^\d+$/.test(service.price) ? `₹${service.price}` : service.price}
                  </div>
                  <p className="text-sm text-muted-foreground">One-time fee</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="text-muted-foreground mr-3 h-5 w-5" />
                    <div>
                      <p className="font-medium">Processing Time</p>
                      <p className="text-sm text-muted-foreground" data-testid="processing-time">{service.processingTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Shield className="text-muted-foreground mr-3 h-5 w-5" />
                    <div>
                      <p className="font-medium">100% Secure</p>
                      <p className="text-sm text-muted-foreground">Bank-level security</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <CreditCard className="text-muted-foreground mr-3 h-5 w-5" />
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-sm text-muted-foreground">Multiple payment options</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setShowForm(true)}
                  data-testid="button-apply-now"
                >
                  Apply Now
                </Button>

                <div className="text-center">
                  <Link href="/contact" data-testid="link-contact-expert">
                    <Button variant="outline" className="w-full">
                      Contact Expert
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Our experts are here to help you with any questions about this service.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">📞 +91 99999 99999</p>
                    <p className="font-medium">✉️ support@legaleasepro.com</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
