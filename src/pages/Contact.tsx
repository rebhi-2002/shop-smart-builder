
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelect = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Contact</span>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        {/* Contact Info & Form */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Contact Information */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions, feedback, or need assistance? We're here to help.
                Reach out to us using any of the methods below or fill out the contact form.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">support@shophub.com</p>
                  <p className="text-muted-foreground">sales@shophub.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Call Us</h3>
                  <p className="text-muted-foreground">Customer Service: 1-800-123-4567</p>
                  <p className="text-muted-foreground">Sales Inquiries: 1-800-765-4321</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Office Location</h3>
                  <p className="text-muted-foreground">123 Main Street</p>
                  <p className="text-muted-foreground">Suite 456</p>
                  <p className="text-muted-foreground">Anytown, USA 12345</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Business Hours</h3>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM EST</p>
              <p className="text-muted-foreground">Sunday: Closed</p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="md:col-span-3 border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Your Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <Select value={formData.subject} onValueChange={handleSelect} required>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="orders">Order Status</SelectItem>
                      <SelectItem value="returns">Returns & Refunds</SelectItem>
                      <SelectItem value="feedback">Product Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="How can we help you?"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="border-t pt-10 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about orders, shipping, returns, and more.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">How can I track my order?</h3>
              <p className="text-muted-foreground">
                Once your order ships, you'll receive a shipping confirmation email with tracking 
                information. You can also track your order through your account dashboard.
              </p>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">What is your return policy?</h3>
              <p className="text-muted-foreground">
                We accept returns within 30 days of delivery. Items must be in their original condition.
                Visit our <Link to="/shipping-returns" className="text-primary hover:underline">Returns Policy</Link> page for more details.
              </p>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">Do you offer international shipping?</h3>
              <p className="text-muted-foreground">
                Yes, we ship to most countries worldwide. Shipping rates and delivery times vary by location.
              </p>
            </div>
            
            <div className="border rounded-lg p-5">
              <h3 className="font-semibold text-lg mb-2">How do I change or cancel my order?</h3>
              <p className="text-muted-foreground">
                If you need to change or cancel your order, please contact us as soon as possible.
                We process orders quickly, so there's a limited window for modifications.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Button asChild variant="outline">
              <Link to="/faq">View All FAQs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
