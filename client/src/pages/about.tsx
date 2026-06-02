import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { CheckCircle, Users, Shield, Award, Target, Eye, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, count: "25 Lakh+", label: "Tax Returns Filed", color: "text-blue-600" },
    { icon: Users, count: "40,000+", label: "Strategic Partners", color: "text-green-600" },
    { icon: Shield, count: "100+", label: "Expert Team", color: "text-purple-600" },
    { icon: Award, count: "19,000+", label: "Cities Covered", color: "text-orange-600" },
  ];

  const achievements = [
    "Authorized by Income Tax Department as e-Return Intermediary (ERI)",
    "Registered with Startup India under Government of India Startup India Scheme",
    "Supported by iStart (Government of Rajasthan Initiative for startups)",
    "ISO 27001:2013 certified for information security management",
    "Partner with leading banks and financial institutions across India",
    "99.9% customer satisfaction rate with 24/7 support availability"
  ];

  const team = [
    {
      name: "Rajesh Sharma",
      role: "Chief Executive Officer",
      qualification: "CA, MBA",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Priya Agarwal", 
      role: "Chief Technology Officer",
      qualification: "B.Tech, M.Tech",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Amit Kumar",
      role: "Head of Legal Services",
      qualification: "LLB, LLM",
      experience: "18+ years", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every service we provide, ensuring accuracy and compliance at all times."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building long-term relationships based on trust, transparency, and reliable service delivery."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Our customers are at the center of everything we do. Their success is our success."
    },
    {
      icon: Eye,
      title: "Innovation",
      description: "Continuously innovating our processes and technology to provide better, faster solutions."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-about-title">
            About LegalEase Pro
          </h1>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-about-description">
            India's most trusted online platform for legal and tax services, serving individuals and businesses with complete compliance solutions since 2018.
          </p>
          <Link href="/contact" data-testid="button-contact-us">
            <Button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`about-stat-${index}`}>
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
                  <stat.icon className={`h-8 w-8 mx-auto ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{stat.count}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="text-mission-title">Our Mission & Vision</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Target className="mr-3 h-6 w-6 text-primary" />
                    Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-mission">
                    To democratize access to legal and tax services by providing affordable, accurate, and efficient solutions through technology. We aim to simplify complex compliance requirements and empower individuals and businesses to focus on their growth.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Eye className="mr-3 h-6 w-6 text-primary" />
                    Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-vision">
                    To become India's leading digital platform for comprehensive legal and financial services, transforming how individuals and businesses manage their compliance needs through innovation, expertise, and exceptional customer experience.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Team collaboration in modern office" 
                className="rounded-2xl shadow-lg"
                data-testid="img-mission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-values-title">Our Core Values</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-values-description">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 h-full" data-testid={`value-${index}`}>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-team-title">Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-team-description">
              Experienced professionals leading LegalEase Pro to new heights
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden" data-testid={`team-member-${index}`}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <div className="space-y-1">
                    <Badge variant="secondary">{member.qualification}</Badge>
                    <p className="text-sm text-muted-foreground">{member.experience} experience</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Awards and certifications display" 
                className="rounded-2xl shadow-lg"
                data-testid="img-achievements"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8" data-testid="text-achievements-title">
                Our Achievements & Certifications
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start" data-testid={`achievement-${index}`}>
                    <CheckCircle className="text-green-600 mr-3 h-6 w-6 flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{achievement}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link href="/partnership" data-testid="button-join-us">
                  <Button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Join Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">Ready to Experience Excellence?</h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-cta-description">
            Join thousands of satisfied customers who trust LegalEase Pro for their legal and tax service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" data-testid="button-explore-services">
              <Button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Explore Our Services
              </Button>
            </Link>
            <Link href="/contact" data-testid="button-contact-expert">
              <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Contact Our Experts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
