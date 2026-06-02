import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.string(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "general",
    },
  });

  const createInquiryMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    createInquiryMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 99999 99999", "+91 88888 88888"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email Support", 
      details: ["support@legaleasepro.com", "info@legaleasepro.com"],
      description: "Send us your queries anytime"
    },
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Business Park, Sector 18", "New Delhi - 110001, India"],
      description: "Visit our office for consultations"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["24/7 Online Support", "Office: Mon-Sat 9 AM - 7 PM"],
      description: "We're here when you need us"
    }
  ];

  const faqs = [
    {
      question: "How long does ITR filing take?",
      answer: "ITR filing typically takes 3-5 working days including review and e-verification."
    },
    {
      question: "What documents do I need for company registration?",
      answer: "You'll need director documents, address proof, MOA & AOA, consent letters, and incorporation forms."
    },
    {
      question: "Is my data secure with LegalEase Pro?",
      answer: "Yes, we use bank-level security with encrypted data transmission and secure document storage."
    },
    {
      question: "Do you provide refunds if not satisfied?",
      answer: "Yes, we offer 100% satisfaction guarantee with unconditional refund if you're not satisfied."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600 h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4" data-testid="text-success-title">
                Message Sent Successfully!
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="text-success-description">
                Thank you for contacting LegalEase Pro. Our expert team will review your message and get back to you within 24 hours.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                className="bg-primary text-primary-foreground"
                data-testid="button-send-another"
              >
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-contact-title">
            Contact Our Experts
          </h1>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-contact-description">
            Get in touch with our professional team for personalized legal and tax service assistance. We're here to help you navigate your compliance requirements.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6" data-testid={`contact-info-${index}`}>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="text-form-title">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-inquiry-type">
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="tax">Tax Services</SelectItem>
                              <SelectItem value="business">Business Registration</SelectItem>
                              <SelectItem value="legal">Legal Services</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter message subject" {...field} data-testid="input-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your message or questions..."
                            className="min-h-32"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={createInquiryMutation.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-send-message"
                  >
                    {createInquiryMutation.isPending ? "Sending..." : "Send Message"}
                    <MessageCircle className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>

            {/* Office Image and Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="text-office-title">Visit Our Office</h3>
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                    alt="LegalEase Pro office building" 
                    className="w-full h-64 object-cover"
                    data-testid="img-office"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-3 h-5 w-5 mt-1" />
                    <div>
                      <p className="font-medium">Head Office</p>
                      <p className="text-muted-foreground text-sm">123 Business Park, Sector 18<br />New Delhi - 110001, India</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-primary mr-3 h-5 w-5 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground text-sm">Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: Online support only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} data-testid={`faq-${index}`}>
                        <h4 className="font-medium mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">Need Immediate Assistance?</h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-cta-description">
            Our expert team is available 24/7 to help you with your legal and tax service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors" data-testid="button-call-now">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91 99999 99999
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" data-testid="button-email-us">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
