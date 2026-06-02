import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, HelpCircle, FileText, Building, CreditCard, Shield, Phone } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "", label: "All Categories", icon: HelpCircle },
    { id: "tax", label: "Tax Services", icon: FileText },
    { id: "business", label: "Business Registration", icon: Building },
    { id: "payment", label: "Payment & Pricing", icon: CreditCard },
    { id: "security", label: "Security & Privacy", icon: Shield },
  ];

  const faqs = [
    {
      category: "tax",
      question: "How long does ITR filing take?",
      answer: "ITR filing typically takes 3-5 working days from document submission to e-verification. This includes expert review, data entry, filing with the IT department, and final e-verification. For complex returns with multiple income sources, it may take up to 7 working days."
    },
    {
      category: "tax", 
      question: "What documents do I need for ITR filing?",
      answer: "You'll need: PAN Card, Aadhaar Card, Form 16 (for salaried), Bank statements, Investment proofs (80C, 80D), Interest certificates, Property documents (if applicable), Business income details (for self-employed), and Capital gains statements (if any)."
    },
    {
      category: "tax",
      question: "Can I file ITR if I missed the deadline?",
      answer: "Yes, you can file a belated return within 2 years from the end of the assessment year. However, late filing attracts penalties: ₹5,000 for income above ₹5 lakhs, ₹1,000 for income below ₹5 lakhs. No penalty if total income is below ₹2.5 lakhs."
    },
    {
      category: "tax",
      question: "How do I e-verify my ITR?",
      answer: "You can e-verify using: 1) Aadhaar OTP, 2) Net banking, 3) Bank account number + Debit card, 4) Digital Signature Certificate (DSC), 5) Pre-validated bank account. E-verification must be completed within 120 days of filing."
    },
    {
      category: "tax",
      question: "What is the difference between GST registration types?",
      answer: "Regular GST: For businesses with turnover >₹40 lakhs (₹20 lakhs for NE states). Composition: Simplified scheme with lower tax rates but restrictions. Casual: For temporary business activities. Non-resident: For foreign entities doing business in India."
    },
    {
      category: "business",
      question: "How long does company registration take?",
      answer: "Private Limited Company registration takes 15-20 working days including: Name approval (1-2 days), DSC & DIN (2-3 days), MOA/AOA preparation (1-2 days), Filing incorporation (7-10 days), PAN/TAN application (3-5 days). Timeline may vary based on documentation and government processing."
    },
    {
      category: "business",
      question: "What is the minimum capital required for company registration?",
      answer: "There's no minimum paid-up capital requirement for Private Limited Companies. You can start with ₹1,000 or even ₹100. However, authorized capital affects government fees: ₹1,000 fee for up to ₹1 lakh authorized capital, higher fees for larger amounts."
    },
    {
      category: "business",
      question: "Do I need a physical office for company registration?",
      answer: "Yes, you need a registered office address with proper documentation (rent agreement/ownership proof + NOC from owner). The address should be genuine as authorities may conduct verification. Virtual offices or shared spaces are acceptable with proper agreements."
    },
    {
      category: "business",
      question: "What is the difference between LLP and Private Limited Company?",
      answer: "LLP: Limited liability, no minimum capital, fewer compliances, partners liable for their acts only. Pvt Ltd: Separate legal entity, easier to raise funds, more credibility, directors have fiduciary duties, more compliance requirements but better for scaling business."
    },
    {
      category: "business", 
      question: "How long is a trademark valid?",
      answer: "Trademark registration is valid for 10 years from the date of filing. It can be renewed indefinitely for 10-year periods by paying renewal fees. You should file for renewal 6 months before expiry to avoid additional late fees."
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods: Net banking, Credit/Debit cards (Visa, Mastercard, RuPay), UPI payments, Digital wallets (Paytm, PhonePe, Google Pay), NEFT/RTGS bank transfers. All payments are processed through secure, PCI-DSS compliant payment gateways."
    },
    {
      category: "payment",
      question: "Do you provide refunds?",
      answer: "Yes, we offer 100% satisfaction guarantee. If you're not satisfied with our service quality, we provide unconditional refund within 30 days of service delivery. Refunds for cancellations before service initiation are processed within 5-7 working days."
    },
    {
      category: "payment", 
      question: "Are there any hidden charges?",
      answer: "No, we believe in complete transparency. All our service prices are clearly mentioned upfront including government fees. The only additional charges would be for expedited processing (if available) or additional services requested during the process."
    },
    {
      category: "payment",
      question: "Do you offer EMI options?",
      answer: "Yes, we offer EMI options for services above ₹10,000 through our banking partners. You can choose 3, 6, or 12-month EMI plans. EMI processing involves minimal additional charges as per bank terms. Check eligibility during checkout."
    },
    {
      category: "security",
      question: "Is my personal data safe with LegalEase Pro?",
      answer: "Absolutely. We use bank-level security with 256-bit SSL encryption for data transmission. All documents are stored in secure, encrypted cloud servers with restricted access. We're ISO 27001:2013 certified and comply with all data protection regulations."
    },
    {
      category: "security",
      question: "Who has access to my documents?",
      answer: "Only authorized team members working on your case have access to your documents. All employees sign strict confidentiality agreements. We maintain detailed access logs and never share your information with third parties without explicit consent."
    },
    {
      category: "security",
      question: "How long do you retain customer data?",
      answer: "We retain your data as per legal requirements: 7 years for tax documents, 30 years for company incorporation records. You can request data deletion after required retention periods. We have clear data retention and deletion policies in place."
    },
    {
      category: "general",
      question: "Do you provide post-service support?",
      answer: "Yes, we provide comprehensive post-service support including: 1 year free support for queries, assistance with government correspondences, renewal reminders, compliance calendar, and priority support for additional services."
    },
    {
      category: "general",
      question: "What if I need to make changes after service completion?",
      answer: "Minor changes/corrections are provided free within 30 days. Major changes that require re-filing attract additional charges as per complexity. We'll always inform you about charges before proceeding with any paid changes."
    },
    {
      category: "general",
      question: "How can I track my application status?",
      answer: "You'll receive an application number after payment. Use this to track status on our website, or contact our support team. We send regular updates via SMS and email at each stage of processing."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const quickHelp = [
    {
      title: "Call Our Experts",
      description: "Get immediate assistance from our certified professionals",
      action: "Call Now: +91 99999 99999",
      icon: Phone
    },
    {
      title: "Live Chat Support", 
      description: "Chat with our support team for quick queries",
      action: "Start Chat",
      icon: HelpCircle
    },
    {
      title: "Schedule Consultation",
      description: "Book a free consultation with our experts",
      action: "Book Now",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="text-faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-faq-description">
            Find answers to common questions about our legal and tax services. Can't find what you're looking for? Our experts are here to help.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 text-lg py-6"
              data-testid="input-search-faq"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`filter-${category.id || 'all'}`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl text-muted-foreground mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2" data-testid="text-no-results">No results found</h3>
              <p className="text-muted-foreground mb-6" data-testid="text-no-results-description">
                Try adjusting your search terms or browse different categories
              </p>
              <Button onClick={() => { setSearchTerm(""); setSelectedCategory(""); }} data-testid="button-clear-filters">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <Card key={index} data-testid={`faq-item-${index}`}>
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 hover:bg-muted/50 transition-colors">
                        <CardTitle className="text-left text-lg font-medium pr-4">
                          {faq.question}
                        </CardTitle>
                        <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-help-title">Need More Help?</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-help-description">
              Our expert team is available 24/7 to assist you with any questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickHelp.map((help, index) => (
              <Card key={index} className="text-center p-6" data-testid={`help-option-${index}`}>
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <help.icon className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{help.title}</h3>
                  <p className="text-muted-foreground mb-4">{help.description}</p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid={`button-${help.action.toLowerCase().replace(/\s+/g, '-')}`}>
                    {help.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-topics-title">Popular Help Topics</h2>
            <p className="text-xl text-muted-foreground" data-testid="text-topics-description">
              Quick links to our most requested information
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/service/itr-filing" data-testid="link-itr-help">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <CardContent className="pt-6 text-center">
                  <FileText className="text-primary h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">ITR Filing Guide</h3>
                  <p className="text-sm text-muted-foreground">Complete guide to income tax return filing</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/service/gst-registration" data-testid="link-gst-help">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <CardContent className="pt-6 text-center">
                  <Building className="text-primary h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">GST Registration</h3>
                  <p className="text-sm text-muted-foreground">Everything about GST registration process</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/service/company-registration" data-testid="link-company-help">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <CardContent className="pt-6 text-center">
                  <Building className="text-primary h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Company Registration</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step company incorporation guide</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/contact" data-testid="link-expert-help">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow p-6">
                <CardContent className="pt-6 text-center">
                  <HelpCircle className="text-primary h-8 w-8 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Expert Consultation</h3>
                  <p className="text-sm text-muted-foreground">Get personalized help from our experts</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-bg text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="text-cta-title">Still Have Questions?</h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="text-cta-description">
            Our expert team is here to provide personalized assistance for all your legal and tax service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-contact-expert">
              <Button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <HelpCircle className="mr-2 h-5 w-5" />
                Contact Expert
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors" data-testid="button-call-support">
              <Phone className="mr-2 h-5 w-5" />
              Call Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
