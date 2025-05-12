
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
      
      {/* Hero Section */}
      <div className="relative h-80 rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?q=80&w=2076&auto=format&fit=crop" 
          alt="ShopHub Team" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl text-white">
            <h2 className="text-4xl font-bold mb-4">We're ShopHub</h2>
            <p className="text-xl opacity-90">
              Creating exceptional online shopping experiences since 2015
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
        <p className="mb-4">
          ShopHub was founded in 2015 with a simple mission: to make online shopping better for everyone. 
          What started as a small store with just a few products has grown into a comprehensive marketplace 
          offering thousands of quality items across multiple categories.
        </p>
        <p className="mb-4">
          Our founders, Alex and Samantha Chen, recognized that online shopping often lacked the personal 
          touch and quality assurance that customers experience in physical stores. They set out to create 
          an e-commerce platform that combines the convenience of online shopping with the trust and 
          service of traditional retail.
        </p>
        <p>
          Today, ShopHub serves customers worldwide, partnering with trusted manufacturers and brands 
          to bring you the best products at competitive prices. We've maintained our commitment to 
          quality, affordability, and exceptional customer service throughout our journey.
        </p>
      </div>
      
      {/* Our Values */}
      <div className="bg-muted/30 py-16 px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-10">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We carefully curate our product offerings to ensure everything we sell meets our high standards. 
                Every item is tested and verified before becoming part of our catalog.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Customer-Centric</h3>
              <p className="text-muted-foreground">
                Our customers are at the heart of everything we do. We actively listen to feedback and continually 
                improve our products and services to exceed your expectations.
              </p>
            </div>
            
            <div className="bg-background p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Ethical Business</h3>
              <p className="text-muted-foreground">
                We prioritize ethical sourcing and fair business practices. This means reasonable pricing, fair 
                treatment of suppliers, and a commitment to reducing our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Meet Our Team */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold text-center mb-10">Meet Our Leadership Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60" 
                alt="Alex Chen" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Alex Chen</h3>
            <p className="text-muted-foreground text-sm">Co-Founder & CEO</p>
          </div>
          
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60" 
                alt="Samantha Chen" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Samantha Chen</h3>
            <p className="text-muted-foreground text-sm">Co-Founder & COO</p>
          </div>
          
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60" 
                alt="Michael Rodriguez" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Michael Rodriguez</h3>
            <p className="text-muted-foreground text-sm">CTO</p>
          </div>
          
          <div className="text-center">
            <div className="aspect-square rounded-full overflow-hidden mb-4">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=60" 
                alt="Aisha Johnson" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">Aisha Johnson</h3>
            <p className="text-muted-foreground text-sm">CMO</p>
          </div>
        </div>
      </div>
      
      {/* Our Achievements */}
      <div className="bg-muted/30 py-16 px-4 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-10">Our Achievements</h2>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1M+</div>
              <p className="font-medium">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <p className="font-medium">Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <p className="font-medium">Countries Served</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="font-medium">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Join Our Team */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-semibold mb-6">Join Our Team</h2>
        <p className="mb-6">
          We're always looking for talented, passionate people to join our growing team. If you're 
          interested in working with us, check out our current openings.
        </p>
        <Button asChild>
          <Link to="/careers">View Career Opportunities</Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
