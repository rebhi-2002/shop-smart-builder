
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Privacy Policy</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto prose">
        <p className="text-sm text-muted-foreground">Last updated: May 12, 2025</p>
        
        <section className="mt-6">
          <p>
            At ShopHub ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you visit our website 
            and use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that 
            you have read and understand this Privacy Policy.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>1. Collection of Information</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul>
            <li>Register for an account</li>
            <li>Place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Participate in promotions or surveys</li>
            <li>Contact our customer service</li>
          </ul>
          <p>This personal information may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment information</li>
            <li>Date of birth</li>
          </ul>
          
          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device and 
            usage of our website. This information may include:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages viewed and time spent</li>
            <li>Links clicked</li>
            <li>Search terms used</li>
            <li>Date and time of visits</li>
          </ul>
        </section>
        
        <section className="mt-6">
          <h2>2. Use of Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Processing and fulfilling your orders</li>
            <li>Managing your account</li>
            <li>Providing customer support</li>
            <li>Sending transactional emails</li>
            <li>Sending marketing communications (if you have opted in)</li>
            <li>Improving our website and services</li>
            <li>Personalizing your shopping experience</li>
            <li>Detecting and preventing fraud</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>
        
        <section className="mt-6">
          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and track information about your browsing 
            activities on our website. Cookies are small text files that are stored on your device when you visit 
            a website.
          </p>
          <p>
            Types of cookies we use:
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> Necessary for the functioning of our website</li>
            <li><strong>Functional cookies:</strong> Enable personalized features</li>
            <li><strong>Analytical cookies:</strong> Help us understand how visitors interact with our website</li>
            <li><strong>Marketing cookies:</strong> Track your browsing habits to deliver targeted advertising</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences. However, disabling certain cookies 
            may limit your ability to use some features of our website.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>4. Disclosure of Information</h2>
          <p>
            We may share your information with:
          </p>
          <ul>
            <li><strong>Service providers:</strong> Companies that help us operate our business, such as payment processors, shipping companies, and marketing agencies</li>
            <li><strong>Business partners:</strong> Trusted third parties with whom we collaborate</li>
            <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
            <li><strong>Affiliated companies:</strong> Our subsidiaries and parent company</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            from accidental loss, unauthorized access, disclosure, alteration, and destruction. However, no method 
            of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>6. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate or incomplete information</li>
            <li>Deletion of your personal information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Objection to processing</li>
            <li>Withdrawal of consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>7. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13. If we learn that we have collected personal information from a child 
            under 13, we will promptly delete that information.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. We will post the updated Privacy Policy on this page and 
            update the "Last updated" date at the top.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>Email: privacy@shophub.com</p>
          <p>Phone: 1-800-123-4567</p>
          <p>Address: 123 Main Street, Suite 456, Anytown, USA 12345</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
