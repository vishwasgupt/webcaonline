import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ui/service-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "wouter";
import { Service } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, CreditCard, UserCheck, Mail, Users, MapPin, Shield, Clock, Headphones, Medal, Star, Sparkles, ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Home() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const stats = [
    { icon: FileText, count: "25 Lakh+", label: "Tax Returns Filed" },
    { icon: Users, count: "40,000+", label: "Strategic Partners" },
    { icon: UserCheck, count: "100+", label: "Expert Team" },
    { icon: MapPin, count: "19,000+", label: "Cities Covered" },
  ];

  const taxProfileData = [
    { name: "Salaried Employees", value: 45, fill: "hsl(var(--primary))" },
    { name: "SMEs & Businesses", value: 30, fill: "hsl(var(--chart-2))" },
    { name: "Professionals & Freelancers", value: 15, fill: "hsl(var(--chart-3))" },
    { name: "HNIs & Capital Gains", value: 10, fill: "hsl(var(--chart-4))" }
  ];

  const filingsGrowthData = [
    { quarter: "Q1 FY24", Filings: 420000 },
    { quarter: "Q2 FY24", Filings: 580000 },
    { quarter: "Q3 FY24", Filings: 710000 },
    { quarter: "Q4 FY24", Filings: 890000 },
    { quarter: "Q1 FY25", Filings: 1120000 }
  ];

  const processSteps = [
    { icon: FileText, title: "1. Fill Application", description: "Complete our simple online form with your basic details and requirements" },
    { icon: CreditCard, title: "2. Make Payment", description: "Secure online payment with multiple options and transparent pricing" },
    { icon: UserCheck, title: "3. Expert Processing", description: "Our certified experts handle your application with complete accuracy" },
    { icon: Mail, title: "4. Get Confirmation", description: "Receive confirmation and documents via email with tracking support" },
  ];

  const features = [
    { icon: Shield, title: "Authorized & Certified", description: "Authorized by Income Tax Department as e-Return Intermediary (ERI) and registered under Startup India" },
    { icon: Users, title: "Expert Team", description: "Team of 100+ Chartered Accountants and legal experts ensuring accuracy and compliance" },
    { icon: Shield, title: "Secure & Safe", description: "Bank-level security with encrypted data transmission and secure document storage" },
    { icon: Clock, title: "Quick Processing", description: "Fast turnaround time with real-time status updates and notifications" },
    { icon: Headphones, title: "24/7 Support", description: "Round-the-clock customer support via phone, email, and chat" },
    { icon: Medal, title: "100% Satisfaction", description: "Unconditional refund guarantee if you're not satisfied with our service" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Software Engineer, Delhi",
      rating: 5,
      comment: "Excellent service for ITR filing. The process was smooth and the expert guidance helped me get maximum refund. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma", 
      role: "Entrepreneur, Mumbai",
      rating: 5,
      comment: "Got my company registered within 15 days. The team was professional and kept me updated throughout the process. Great experience!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Amit Patel",
      role: "Business Owner, Bangalore", 
      rating: 5,
      comment: "Outstanding support for GST registration and returns. The pricing is transparent and the service is top-notch. Saved me a lot of time!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="text-hero-title">
                India's Most Trusted Online Legal & Tax Services
              </h1>
              <p className="text-xl mb-8 text-blue-100" data-testid="text-hero-description">
                File your Income Tax Return, register your business, and access comprehensive legal services with our expert team. Over 25 lakh+ tax returns filed successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/service/itr-filing" data-testid="button-file-itr">
                  <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    <FileText className="mr-2 h-5 w-5" />
                    File ITR Now
                  </Button>
                </Link>
                <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" data-testid="button-watch-demo">
                  <i className="fas fa-play mr-2"></i>
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="lg:text-right">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional business team" 
                className="rounded-2xl shadow-2xl"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="stats-card text-white p-6 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 mx-auto" />
                </div>
                <h3 className="text-3xl font-bold text-primary" data-testid={`stat-count-${index}`}>{stat.count}</h3>
                <p className="text-muted-foreground" data-testid={`stat-label-${index}`}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Visual Insights Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mt-16 pt-12 border-t border-slate-200">
            
            {/* Pie Chart: Taxpayer Profiles */}
            <Card className="shadow-sm border-slate-100 bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="text-primary h-5 w-5" />
                  Taxpayer Profile Distribution
                </CardTitle>
                <CardDescription>Breakdown of users filing returns through LegalEase Pro</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taxProfileData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {taxProfileData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 space-y-2 mt-4 md:mt-0 text-xs">
                  {taxProfileData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b pb-1.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-semibold text-slate-800">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart: Filing growth */}
            <Card className="shadow-sm border-slate-100 bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="text-primary h-5 w-5" />
                  Quarterly E-Filings Volumetric Growth
                </CardTitle>
                <CardDescription>Total tax filings completed (Quarter-over-Quarter)</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filingsGrowthData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                    <XAxis dataKey="quarter" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="#64748b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value / 100000}L`}
                    />
                    <RechartsTooltip 
                      formatter={(value) => [`${Number(value).toLocaleString("en-IN")} filings`, "Total Filings"]}
                      contentStyle={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }}
                    />
                    <Bar dataKey="Filings" fill="hsl(var(--chart-2))" radius={[5, 5, 0, 0]} maxBarSize={45} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

          </div>

          {/* Interactive Tax Calculator CTA Card */}
          <Card className="mt-8 border border-primary/20 bg-gradient-to-r from-blue-50/50 via-indigo-50/10 to-white overflow-hidden shadow-sm">
            <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full translate-x-8 -translate-y-8"></div>
              <div className="space-y-2 max-w-2xl">
                <Badge className="bg-primary/20 text-primary border-none font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 w-fit">
                  <Sparkles className="h-3 w-3" /> New Calculator
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Confused about the Old vs New Tax Slabs?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Estimate your income tax liability instantly using our newly launched side-by-side tax regime planner. Visualise deductions under 80C, 80D, standard deductions, and maximize your savings.
                </p>
              </div>
              <div className="w-full md:w-auto shrink-0 z-10">
                <Link href="/tax-calculator">
                  <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/95 flex items-center justify-center gap-2 h-11 px-6 rounded-lg font-semibold shadow-md">
                    Go to Tax Calculator <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-services-title">Our Comprehensive Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-description">
              From tax filing to business registration, we provide end-to-end legal and financial solutions for individuals and businesses across India.
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="h-64 animate-pulse">
                  <CardContent className="p-6">
                    <div className="bg-gray-200 rounded-full w-16 h-16 mx-auto mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-3 rounded mb-4"></div>
                    <div className="bg-gray-200 h-8 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6" data-testid="services-grid">
              {services?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-process-title">4 Simple Steps to Complete Your Service</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-process-description">Our streamlined process makes it easy to get the legal and tax services you need</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`process-step-${index}`}>
                <div className="bg-primary/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4" data-testid={`process-title-${index}`}>{step.title}</h3>
                <p className="text-muted-foreground" data-testid={`process-description-${index}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ITR Options Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-itr-title">Choose Your ITR Filing Option</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-itr-description">Select the option that best suits your needs and expertise level</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 shadow-lg" data-testid="card-self-file">
              <div className="text-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2">Self-File ITR</h3>
                <p className="text-muted-foreground">File your income tax return by yourself. It's fast and easy.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Simple and intuitive interface</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Step-by-step guidance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Instant e-verification</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>24/7 support available</span>
                </li>
              </ul>
              <Link href="/service/itr-filing" data-testid="button-start-self-filing">
                <Button className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
                  Start Self Filing
                </Button>
              </Link>
            </Card>
            
            <Card className="p-8 shadow-lg" data-testid="card-expert-file">
              <div className="text-center mb-6">
                <div className="bg-orange-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-orange-600 h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2">File with Expert</h3>
                <p className="text-muted-foreground">Expert ITR filing with maximum refund calculated for you.</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Certified CA assistance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Maximum refund optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Complete accuracy guarantee</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-600 mr-3 h-5 w-5" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link href="/service/itr-filing" data-testid="button-start-with-expert">
                <Button className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors">
                  Start with Expert
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-features-title">Why Choose LegalEase Pro?</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-features-description">We endeavour to help you manage your compliance requirements effectively</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6" data-testid={`feature-${index}`}>
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4" data-testid={`feature-title-${index}`}>{feature.title}</h3>
                <p className="text-muted-foreground" data-testid={`feature-description-${index}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="text-testimonials-title">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-testimonials-description">Trusted by thousands of individuals and businesses across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 shadow-lg" data-testid={`testimonial-${index}`}>
                <div className="flex items-center mb-6">
                  <div className="text-yellow-400 text-xl">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current inline" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6" data-testid={`testimonial-comment-${index}`}>"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} testimonial`} 
                    className="w-12 h-12 rounded-full mr-4"
                    data-testid={`testimonial-avatar-${index}`}
                  />
                  <div>
                    <h4 className="font-semibold" data-testid={`testimonial-name-${index}`}>{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground" data-testid={`testimonial-role-${index}`}>{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6" data-testid="text-partnership-title">Become Our Partner</h2>
              <p className="text-xl text-muted-foreground mb-8" data-testid="text-partnership-description">
                Join our network of successful partners and grow your business with our comprehensive legal and tax services.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-4 h-6 w-6" />
                  <span className="text-lg">Earn from all our services together with registrations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-4 h-6 w-6" />
                  <span className="text-lg">Accelerated growth through targeted business network</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-4 h-6 w-6" />
                  <span className="text-lg">Earn up to ₹20 lakh per year</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-4 h-6 w-6" />
                  <span className="text-lg">Complete training and education on all services</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/partnership" data-testid="button-join-partner">
                  <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Join as Partner
                  </Button>
                </Link>
                <Link href="/partnership" data-testid="button-learn-more">
                  <Button variant="outline" className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Business partnership meeting" 
                className="rounded-2xl shadow-lg"
                data-testid="img-partnership"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" data-testid="text-cta-title">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-blue-100" data-testid="text-cta-description">
            Join thousands of satisfied customers and let our experts handle your legal and tax requirements with complete accuracy and compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" data-testid="button-get-started-now">
              <Button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                <i className="fas fa-rocket mr-2"></i>
                Get Started Now
              </Button>
            </Link>
            <Link href="/contact" data-testid="button-talk-expert">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">
                <i className="fas fa-phone mr-2"></i>
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
