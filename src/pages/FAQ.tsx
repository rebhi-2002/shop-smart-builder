
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">FAQ</span>
        </div>
      </div>
      
      {/* FAQ Content */}
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shopping & Orders</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I place an order?</AccordionTrigger>
              <AccordionContent>
                <p>To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                <p>Once your order has been shipped, you'll receive a confirmation email with tracking information. You can also check the status of your order by logging into your account and visiting the "My Orders" section.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                <p>We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are securely processed and encrypted.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping & Delivery</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="shipping-1">
              <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
              <AccordionContent>
                <p>Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery. International shipping may take 7-14 business days depending on the destination.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping-2">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                <p>Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that additional customs fees may apply for international orders.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping-3">
              <AccordionTrigger>Is free shipping available?</AccordionTrigger>
              <AccordionContent>
                <p>We offer free standard shipping on all domestic orders over $50. International orders over $100 may qualify for free shipping depending on the destination.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Returns & Refunds</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="returns-1">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                <p>We accept returns within 30 days of delivery for most items. Products must be in their original condition with all packaging. Please visit our Returns & Refunds page for detailed instructions.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="returns-2">
              <AccordionTrigger>How do I request a refund?</AccordionTrigger>
              <AccordionContent>
                <p>To request a refund, please initiate a return through your account. Once we receive and inspect your return, we'll process your refund to the original payment method within 5-7 business days.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="returns-3">
              <AccordionTrigger>Are there any items that cannot be returned?</AccordionTrigger>
              <AccordionContent>
                <p>For hygiene and safety reasons, certain items like personal care products, undergarments, and food items cannot be returned once opened. Please check the product description for any specific return restrictions.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Account & Technical Support</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account-1">
              <AccordionTrigger>How do I create an account?</AccordionTrigger>
              <AccordionContent>
                <p>Click the "Register" link in the top right corner of our website to create an account. You'll need to provide your name, email address, and create a password.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="account-2">
              <AccordionTrigger>I forgot my password. How can I reset it?</AccordionTrigger>
              <AccordionContent>
                <p>Click the "Login" link and then select "Forgot Password." Enter your email address, and we'll send you instructions to reset your password.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="account-3">
              <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
              <AccordionContent>
                <p>Our customer support team is available via email at support@shophub.com or by phone at 1-800-123-4567, Monday through Friday from 9am to 5pm EST. You can also visit our Contact page to submit a support ticket.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Still Have Questions */}
      <div className="mt-12 text-center py-8 border-t border-b">
        <h3 className="text-xl font-semibold mb-2">Still Have Questions?</h3>
        <p className="mb-6 text-muted-foreground max-w-xl mx-auto">
          If you couldn't find the answer to your question, our customer support team is here to help.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline">
            <Link to="mailto:support@shophub.com">Email Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
