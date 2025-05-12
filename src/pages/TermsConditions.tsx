
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Terms & Conditions</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto prose">
        <p className="text-sm text-muted-foreground">Last updated: May 12, 2025</p>
        
        <section className="mt-6">
          <h2>1. Introduction</h2>
          <p>
            Welcome to ShopHub ("we," "our," or "us"). By accessing or using our website at shophub.com (the "Site"), 
            you agree to be bound by these Terms and Conditions ("Terms"). Please read these Terms carefully before 
            using our services. If you do not agree with any part of these Terms, you must not use our Site.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>2. Eligibility</h2>
          <p>
            By using the Site, you represent and warrant that you are at least 18 years of age and possess the 
            legal authority to enter into agreements. If you are under 18, you may use the Site only with the 
            involvement and consent of a parent or legal guardian.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>3. Account Registration</h2>
          <p>
            To access certain features of the Site, you may be required to register for an account. When registering, 
            you agree to provide accurate, current, and complete information. You are responsible for maintaining the 
            confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>4. Products and Purchases</h2>
          <p>
            4.1. All product descriptions, images, and specifications are provided for illustrative purposes only. 
            While we strive for accuracy, we do not guarantee that product descriptions or other content on the Site 
            are accurate, complete, reliable, current, or error-free.
          </p>
          <p>
            4.2. Prices displayed on the Site are in US dollars unless otherwise specified. We reserve the right to 
            change prices at any time without notice.
          </p>
          <p>
            4.3. The inclusion of any products on our Site does not constitute a guarantee that these products will 
            be available when you place an order.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>5. Order Acceptance and Fulfillment</h2>
          <p>
            5.1. Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve 
            the right to accept or decline your order for any reason.
          </p>
          <p>
            5.2. We reserve the right to cancel any order if we determine that the product is mispriced, out of stock, 
            or if we suspect fraudulent activity.
          </p>
          <p>
            5.3. We will make every effort to fulfill orders within the estimated delivery times, but we are not 
            responsible for delays beyond our control.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>6. Payment Terms</h2>
          <p>
            6.1. We accept various payment methods as indicated on our Site at checkout.
          </p>
          <p>
            6.2. By providing payment information, you represent and warrant that you are authorized to use the 
            payment method provided and that the payment information is accurate and complete.
          </p>
          <p>
            6.3. All payments are processed securely through our third-party payment processors. Your payment 
            information is subject to the privacy policies and terms of these payment processors.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>7. Returns and Refunds</h2>
          <p>
            For information about returns and refunds, please refer to our 
            <Link to="/shipping-returns" className="text-primary hover:underline"> Shipping & Returns </Link> 
            page.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>8. Intellectual Property Rights</h2>
          <p>
            8.1. All content on the Site, including text, graphics, logos, images, software, and other material 
            ("Content"), is owned by us or our licensors and is protected by copyright, trademark, and other 
            intellectual property laws.
          </p>
          <p>
            8.2. You may not reproduce, distribute, modify, display, perform, or otherwise use any Content without 
            our prior written permission.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>9. User Conduct</h2>
          <p>
            You agree not to:
          </p>
          <ul>
            <li>Use the Site in any way that violates any applicable law or regulation;</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site;</li>
            <li>Attempt to gain unauthorized access to any part of the Site;</li>
            <li>Use the Site to transmit any harmful code or material;</li>
            <li>Impersonate or misrepresent your affiliation with any person or entity;</li>
            <li>Interfere with the proper functioning of the Site.</li>
          </ul>
        </section>
        
        <section className="mt-6">
          <h2>10. Limitation of Liability</h2>
          <p>
            10.1. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages arising out of or relating to your use of the Site.
          </p>
          <p>
            10.2. In no event shall our total liability exceed the amount paid by you, if any, for accessing the 
            Site or purchasing products through the Site.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>11. Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the United States. 
            Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction 
            of the courts in the United States.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>12. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. All changes are effective immediately when 
            posted on the Site. Your continued use of the Site following the posting of revised Terms constitutes 
            your acceptance of such changes.
          </p>
        </section>
        
        <section className="mt-6">
          <h2>13. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>Email: legal@shophub.com</p>
          <p>Phone: 1-800-123-4567</p>
          <p>Address: 123 Main Street, Suite 456, Anytown, USA 12345</p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
