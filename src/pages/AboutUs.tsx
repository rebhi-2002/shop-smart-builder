
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">About Us</span>
        </div>
      </div>
      
      {/* Company Story */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2015, ShopHub began with a simple vision: to create an online shopping experience that combines convenience, quality, and personalization. What started as a small operation in a garage has grown into a thriving e-commerce platform serving thousands of customers worldwide.
            </p>
            <p>
              Our journey has been defined by a commitment to innovation and customer satisfaction. We've continuously evolved our platform, expanded our product range, and refined our services based on customer feedback and changing market trends.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" 
              alt="Company office" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Mission & Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Mission & Values</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Quality First</h3>
            <p className="text-muted-foreground">We meticulously curate our product catalog, working only with trusted brands and suppliers who share our commitment to excellence.</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Happiness</h3>
            <p className="text-muted-foreground">Our customers are at the heart of everything we do. We're dedicated to providing exceptional service, from browsing to delivery and beyond.</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Innovation</h3>
            <p className="text-muted-foreground">We continuously explore new technologies and approaches to improve the shopping experience and make it more personalized and efficient.</p>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Meet Our Team</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="CEO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Michael Brown</h3>
            <p className="text-primary">CEO & Founder</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="COO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Sarah Johnson</h3>
            <p className="text-primary">Chief Operations Officer</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/67.jpg" 
                alt="CTO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">David Chen</h3>
            <p className="text-primary">Chief Technology Officer</p>
          </div>
          
          <div className="text-center">
            <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/17.jpg" 
                alt="CMO" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Amelia Rodriguez</h3>
            <p className="text-primary">Chief Marketing Officer</p>
          </div>
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="bg-primary/5 rounded-lg p-8 text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Want to Join Our Team?</h2>
        <p className="max-w-2xl mx-auto mb-6">
          We're always looking for talented individuals who are passionate about e-commerce and creating exceptional customer experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/careers">View Open Positions</Link>
          </Button>
          <Button variant="outline">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
