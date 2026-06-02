import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, IndianRupee, Users, TrendingUp, Award, Target, Handshake, BookOpen, LineChart as ChartIcon, Coins, ShieldAlert } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar, Cell } from "recharts";

const partnershipFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  organization: z.string().min(2, "Organization name is required"),
  location: z.string().min(2, "Location is required"),
  experience: z.string(),
  partnershipType: z.string(),
  expectedBusiness: z.string(),
  message: z.string().min(10, "Please provide more details about your interest"),
});

type PartnershipFormData = z.infer<typeof partnershipFormSchema>;

export default function Partnership() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [monthlyVolume, setMonthlyVolume] = useState<number>(30);
  const [averageRevenue, setAverageRevenue] = useState<number>(3500);

  // Generate projection data over 12 months
  const monthlyProjections = useMemo(() => {
    const data = [];
    let franchiseSum = 0;
    let associateSum = 0;
    let channelSum = 0;

    const franchiseMonthly = Math.max(0, (monthlyVolume * averageRevenue * 0.70) - 5000);
    const associateMonthly = monthlyVolume * averageRevenue * 0.20;
    const channelMonthly = monthlyVolume * averageRevenue * 0.45;

    for (let month = 1; month <= 12; month++) {
      franchiseSum += franchiseMonthly;
      associateSum += associateMonthly;
      channelSum += channelMonthly;
      data.push({
        name: `M${month}`,
        "Franchise Partner": Math.round(franchiseSum),
        "Business Associate": Math.round(associateSum),
        "Channel Partner": Math.round(channelSum)
      });
    }
    return data;
  }, [monthlyVolume, averageRevenue]);

  // Investment vs Year 1 returns
  const comparisonData = useMemo(() => {
    const franchiseReturn = Math.max(0, (monthlyVolume * averageRevenue * 0.70 * 12) - 60000);
    const associateReturn = monthlyVolume * averageRevenue * 0.20 * 12;
    const channelReturn = monthlyVolume * averageRevenue * 0.45 * 12;

    return [
      {
        name: "Franchise Partner",
        "Initial Investment": 500000,
        "Projected Year 1 Earnings": Math.round(franchiseReturn),
      },
      {
        name: "Business Associate",
        "Initial Investment": 0,
        "Projected Year 1 Earnings": Math.round(associateReturn),
      },
      {
        name: "Channel Partner",
        "Initial Investment": 150000,
        "Projected Year 1 Earnings": Math.round(channelReturn),
      }
    ];
  }, [monthlyVolume, averageRevenue]);

  const form = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      location: "",
      experience: "",
      partnershipType: "",
      expectedBusiness: "",
      message: "",
    },
  });

  const createPartnershipInquiryMutation = useMutation({
    mutationFn: async (data: PartnershipFormData) => {
      const response = await apiRequest("POST", "/api/inquiries", {
        ...data,
        subject: `Partnership Application - ${data.partnershipType}`,
        type: "partnership",
      });
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Partnership Application Submitted!",
        description: "Thank you for your interest. Our partnership team will contact you within 48 hours.",
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

  const onSubmit = (data: PartnershipFormData) => {
    createPartnershipInquiryMutation.mutate(data);
  };

  const benefits = [
    {
      icon: IndianRupee,
      title: "High Earning Potential",
      description: "Earn up to ₹20 lakh per year with our commission structure",
      highlight: "₹20L/year"
    },
    {
      icon: Users,
      title: "Extensive Service Portfolio",
      description: "Access to 25+ services covering all legal and tax requirements",
      highlight: "25+ Services"
    },
    {
      icon: TrendingUp,
      title: "Business Growth Support",
      description: "Marketing materials, leads, and business development assistance",
      highlight: "Growth Support"
    },
    {
      icon: BookOpen,
      title: "Complete Training",
      description: "Comprehensive training on all services and processes",
      highlight: "Free Training"
    }
  ];

  const partnershipTypes = [
    {
      title: "Franchise Partner",
      description: "Establish your own LegalEase Pro center with full branding rights",
      investment: "₹5 - 15 Lakhs",
      earning: "₹15 - 20 Lakhs/year",
      features: ["Exclusive territory rights", "Complete setup support", "Marketing assistance", "Ongoing training"]
    },
    {
      title: "Business Associate",
      description: "Refer clients and earn commission on every successful service",
      investment: "No Investment",
      earning: "₹5 - 10 Lakhs/year", 
      features: ["Commission-based model", "Flexible working", "Marketing support", "Regular incentives"]
    },
    {
      title: "Channel Partner",
      description: "Integrate our services into your existing business operations",
      investment: "₹1 - 3 Lakhs",
      earning: "₹8 - 15 Lakhs/year",
      features: ["API integration", "White-label solutions", "Technical support", "Revenue sharing"]
    }
  ];

  const testimonials = [
    {
      name: "Rahul Verma",
      location: "Mumbai, Maharashtra",
      partnership: "Franchise Partner",
      testimonial: "Joining LegalEase Pro was the best business decision I made. In 2 years, I've built a thriving practice with consistent monthly income.",
      earnings: "₹18L/year",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Agarwal",
      location: "Bangalore, Karnataka", 
      partnership: "Business Associate",
      testimonial: "The support from LegalEase Pro team is exceptional. I earn substantial commission while helping my clients with quality services.",
      earnings: "₹8L/year",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const steps = [
    { step: "1", title: "Apply Online", description: "Submit your partnership application with required details" },
    { step: "2", title: "Evaluation", description: "Our team reviews your application and business potential" },
    { step: "3", title: "Interview", description: "Personal interview to understand your goals and capabilities" },
    { step: "4", title: "Onboarding", description: "Complete documentation, training, and setup process" },
    { step: "5", title: "Launch", description: "Start your partnership journey with full support" }
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
                Partnership Application Submitted!
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="text-success-description">
                Thank you for your interest in partnering with LegalEase Pro. Our partnership team will review your application and contact you within 48 hours.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                className="bg-primary text-primary-foreground"
                data-testid="button-apply-again"
              >
                Submit Another Application
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-partnership-title">
            Partner With LegalEase Pro
          </h1>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-partnership-description">
            Join India's fastest-growing network of legal and tax service providers. Build a profitable business while helping clients achieve compliance excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors" data-testid="button-apply-now">
              Apply for Partnership
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" data-testid="button-download-brochure">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-benefits-title">Partnership Benefits</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-benefits-description">
              Unlock unlimited earning potential with comprehensive support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 relative overflow-hidden" data-testid={`benefit-${index}`}>
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  {benefit.highlight}
                </Badge>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-types-title">Choose Your Partnership Model</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-types-description">
              Flexible partnership options to suit your business goals and investment capacity
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <Card key={index} className="relative" data-testid={`partnership-type-${index}`}>
                {index === 0 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                  <p className="text-muted-foreground">{type.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Investment:</span>
                      <span className="text-primary font-bold">{type.investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Earning Potential:</span>
                      <span className="text-green-600 font-bold">{type.earning}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="text-green-600 mr-2 h-4 w-4" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" data-testid={`button-learn-more-${index}`}>
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Earnings Calculator */}
      <section className="py-20 bg-gradient-to-b from-background to-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 mb-4">
              <ChartIcon className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Earnings Calculator</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="earnings-calc-title">Interactive Earnings Projections</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estimate your monthly volume and average service fees to visualize your annual revenue potential across all partnership tiers.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Inputs / Sliders Card */}
            <Card className="lg:col-span-1 shadow-md border-slate-100 bg-white">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Coins className="text-emerald-600 h-5 w-5" />
                  Volume Parameters
                </CardTitle>
                <CardDescription>Adjust sliders to see potential earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                
                {/* Sliders 1: registrations */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Monthly Service Transactions</Label>
                    <Badge variant="secondary" className="font-mono text-xs">{monthlyVolume} Clients</Badge>
                  </div>
                  <Slider 
                    min={5} 
                    max={150} 
                    step={5} 
                    value={[monthlyVolume]} 
                    onValueChange={(val) => setMonthlyVolume(val[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>5 clients/mo</span>
                    <span>150 clients/mo</span>
                  </div>
                </div>

                {/* Slider 2: average revenue */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Average Value per Service (₹)</Label>
                    <Badge variant="secondary" className="font-mono text-xs">₹{averageRevenue}</Badge>
                  </div>
                  <Slider 
                    min={1000} 
                    max={10000} 
                    step={500} 
                    value={[averageRevenue]} 
                    onValueChange={(val) => setAverageRevenue(val[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>₹1,000</span>
                    <span>₹10,000</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-emerald-600" />
                    How earnings are calculated:
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li><strong>Franchise:</strong> 70% share of billing minus ₹5,000 operations overhead.</li>
                    <li><strong>Channel Partner:</strong> 45% white-label revenue sharing.</li>
                    <li><strong>Business Associate:</strong> 20% commission on every referral.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recharts Visualizations */}
            <div className="lg:col-span-2 space-y-6">
              
              <Tabs defaultValue="projections" className="w-full">
                <div className="flex justify-end mb-4">
                  <TabsList className="bg-slate-100 p-0.5 border">
                    <TabsTrigger value="projections" className="px-4 py-1 text-xs font-semibold rounded-md">12-Month Cumulative Projections</TabsTrigger>
                    <TabsTrigger value="comparison" className="px-4 py-1 text-xs font-semibold rounded-md">Investment vs Year 1 Return</TabsTrigger>
                  </TabsList>
                </div>

                {/* Tab Content 1: Line Chart Projections */}
                <TabsContent value="projections">
                  <Card className="shadow-md border-slate-100 bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Cumulative Revenue Growth Chart</CardTitle>
                      <CardDescription>Earning trend over a 12-month period (₹)</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyProjections} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorFranchise" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorChannel" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorAssociate" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis 
                            stroke="#64748b" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(value) => `₹${value / 1000}k`}
                          />
                          <RechartsTooltip 
                            formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`]}
                            contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                          <Area type="monotone" dataKey="Franchise Partner" stroke="var(--primary)" fillOpacity={1} fill="url(#colorFranchise)" strokeWidth={2} />
                          <Area type="monotone" dataKey="Channel Partner" stroke="var(--chart-3)" fillOpacity={1} fill="url(#colorChannel)" strokeWidth={2} />
                          <Area type="monotone" dataKey="Business Associate" stroke="var(--chart-2)" fillOpacity={1} fill="url(#colorAssociate)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab Content 2: Bar Chart Comparison */}
                <TabsContent value="comparison">
                  <Card className="shadow-md border-slate-100 bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Capital Investment vs Year 1 Earnings</CardTitle>
                      <CardDescription>Check return on investment (ROI) profile</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis 
                            stroke="#64748b" 
                            fontSize={10} 
                            tickLine={false} 
                            axisLine={false} 
                            tickFormatter={(value) => `₹${value / 1000}k`}
                          />
                          <RechartsTooltip 
                            formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`]}
                            contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                          />
                          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                          <Bar dataKey="Initial Investment" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                          <Bar dataKey="Projected Year 1 Earnings" fill="var(--chart-2)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Earnings Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-4 bg-emerald-50/50 border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Franchise Year 1 Est.</span>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    ₹{Math.max(0, (monthlyVolume * averageRevenue * 0.70 * 12) - 60000).toLocaleString("en-IN")}
                  </div>
                  <span className="text-[9px] text-muted-foreground">Approx. Return (70% share)</span>
                </Card>
                
                <Card className="p-4 bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">Channel Year 1 Est.</span>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    ₹{(monthlyVolume * averageRevenue * 0.45 * 12).toLocaleString("en-IN")}
                  </div>
                  <span className="text-[9px] text-muted-foreground">Approx. Return (45% share)</span>
                </Card>

                <Card className="p-4 bg-orange-50/50 border border-orange-100">
                  <span className="text-[10px] uppercase font-bold text-orange-800 tracking-wider">Associate Year 1 Est.</span>
                  <div className="text-xl font-bold text-slate-800 mt-1">
                    ₹{(monthlyVolume * averageRevenue * 0.20 * 12).toLocaleString("en-IN")}
                  </div>
                  <span className="text-[9px] text-muted-foreground">Approx. Return (20% share)</span>
                </Card>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Partner Success Stories */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">Partner Success Stories</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-testimonials-description">
              Hear from our successful partners across India
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6" data-testid={`testimonial-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <Badge variant="secondary" className="mt-1">{testimonial.partnership}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{testimonial.earnings}</p>
                      <p className="text-xs text-muted-foreground">Annual Earnings</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-process-title">Simple Application Process</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-process-description">
              Get started with your partnership journey in 5 easy steps
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border transform -translate-y-1/2 hidden lg:block"></div>
            <div className="grid lg:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative" data-testid={`process-step-${index}`}>
                  <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-application-title">Apply for Partnership</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-application-description">
              Fill out the form below and our partnership team will get in touch with you
            </p>
          </div>
          
          <Card>
            <CardContent className="p-8">
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
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} data-testid="input-phone" />
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
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} data-testid="input-location" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization/Business Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter organization name" {...field} data-testid="input-organization" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relevant Experience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-experience">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0-1">0-1 years</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="partnershipType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Partnership Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-partnership-type">
                                <SelectValue placeholder="Select partnership type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="franchise">Franchise Partner</SelectItem>
                              <SelectItem value="associate">Business Associate</SelectItem>
                              <SelectItem value="channel">Channel Partner</SelectItem>
                              <SelectItem value="undecided">Not Sure - Need Guidance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="expectedBusiness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Monthly Business Volume</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-business-volume">
                                <SelectValue placeholder="Select volume" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="50-100">₹50K - ₹1L</SelectItem>
                              <SelectItem value="100-300">₹1L - ₹3L</SelectItem>
                              <SelectItem value="300-500">₹3L - ₹5L</SelectItem>
                              <SelectItem value="500+">₹5L+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to partner with LegalEase Pro? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your business goals, target market, and why you're interested in this partnership..."
                            className="min-h-24"
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
                    disabled={createPartnershipInquiryMutation.isPending}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="button-submit-application"
                  >
                    {createPartnershipInquiryMutation.isPending ? "Submitting..." : "Submit Partnership Application"}
                    <Handshake className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">Ready to Build Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-cta-description">
            Join thousands of successful partners who are building profitable businesses with LegalEase Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors" data-testid="button-call-partnership">
              <Target className="mr-2 h-5 w-5" />
              Call Partnership Team
            </Button>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" data-testid="button-schedule-meeting">
              <Award className="mr-2 h-5 w-5" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
