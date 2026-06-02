import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">LegalEase Pro</h3>
            <p className="text-gray-300 mb-6">
              India's most trusted online platform for legal and tax services. Serving individuals and businesses with complete compliance solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl" data-testid="link-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl" data-testid="link-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl" data-testid="link-linkedin">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl" data-testid="link-youtube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/service/itr-filing" data-testid="footer-link-itr"><span className="hover:text-white transition-colors">Income Tax Filing</span></Link></li>
              <li><Link href="/service/gst-registration" data-testid="footer-link-gst"><span className="hover:text-white transition-colors">GST Services</span></Link></li>
              <li><Link href="/service/company-registration" data-testid="footer-link-company"><span className="hover:text-white transition-colors">Company Registration</span></Link></li>
              <li><Link href="/service/trademark-registration" data-testid="footer-link-trademark"><span className="hover:text-white transition-colors">Trademark Registration</span></Link></li>
              <li><Link href="/service/digital-signature" data-testid="footer-link-dsc"><span className="hover:text-white transition-colors">Digital Signature</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/faq" data-testid="footer-link-help"><span className="hover:text-white transition-colors">Help Center</span></Link></li>
              <li><Link href="/faq" data-testid="footer-link-faq"><span className="hover:text-white transition-colors">FAQ</span></Link></li>
              <li><Link href="/contact" data-testid="footer-link-contact"><span className="hover:text-white transition-colors">Contact Us</span></Link></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-track">Track Application</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="footer-link-refund">Refund Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center" data-testid="contact-phone">
                <Phone className="h-4 w-4 mr-3" />
                <span>+91 99999 99999</span>
              </div>
              <div className="flex items-center" data-testid="contact-email">
                <Mail className="h-4 w-4 mr-3" />
                <span>support@legaleasepro.com</span>
              </div>
              <div className="flex items-center" data-testid="contact-address">
                <MapPin className="h-4 w-4 mr-3" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center" data-testid="contact-hours">
                <Clock className="h-4 w-4 mr-3" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm" data-testid="text-copyright">
              © 2024 LegalEase Pro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="footer-link-privacy">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="footer-link-terms">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="footer-link-refund-policy">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
