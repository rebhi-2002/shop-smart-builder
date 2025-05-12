
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShippingReturns = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shipping & Returns</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Shipping & Returns</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-3xl mx-auto">
        {/* Shipping Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Processing Time</h3>
              <p className="text-muted-foreground">
                Orders are typically processed within 1-2 business days after payment confirmation. 
                During peak seasons or promotional periods, processing may take up to 3 business days.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Shipping Methods & Delivery Times</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3">Shipping Method</th>
                      <th className="text-left p-3">Estimated Delivery Time</th>
                      <th className="text-left p-3">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3">Standard Shipping</td>
                      <td className="p-3">3-5 business days</td>
                      <td className="p-3">$4.99 (Free over $50)</td>
                    </tr>
                    <tr>
                      <td className="p-3">Express Shipping</td>
                      <td className="p-3">1-2 business days</td>
                      <td className="p-3">$12.99</td>
                    </tr>
                    <tr>
                      <td className="p-3">International Shipping</td>
                      <td className="p-3">7-14 business days</td>
                      <td className="p-3">$24.99+ (varies by location)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Tracking Your Order</h3>
              <p className="text-muted-foreground mb-2">
                Once your order ships, you'll receive a shipping confirmation email with tracking information.
                You can also track your order by logging into your account and visiting the "My Orders" section.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link to="/account/orders">Track Your Orders</Link>
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">International Shipping</h3>
              <p className="text-muted-foreground">
                We ship to most countries worldwide. Please note that international orders may be subject to 
                import duties and taxes, which are the responsibility of the recipient. Delivery times may 
                vary based on customs processing at your location.
              </p>
            </div>
          </div>
        </section>
        
        {/* Returns Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Returns Policy</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Return Eligibility</h3>
              <p className="text-muted-foreground">
                Most items can be returned within 30 days of delivery. To be eligible for a return, items must be:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>In their original condition</li>
                <li>Unworn, unwashed, and undamaged</li>
                <li>In the original packaging with all tags attached</li>
                <li>Accompanied by the original receipt or proof of purchase</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Non-Returnable Items</h3>
              <p className="text-muted-foreground">
                For hygiene and safety reasons, the following items cannot be returned:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                <li>Personal care products once opened or used</li>
                <li>Undergarments and swimwear</li>
                <li>Food and perishable items</li>
                <li>Gift cards</li>
                <li>Customized or personalized items</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Return Process</h3>
              <ol className="list-decimal pl-5 mt-2 space-y-2 text-muted-foreground">
                <li>Initiate your return by logging into your account and selecting the items you wish to return</li>
                <li>Print the provided return label</li>
                <li>Pack the items securely in their original packaging</li>
                <li>Attach the return label to your package</li>
                <li>Drop off your package at the nearest shipping location</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Refunds</h3>
              <p className="text-muted-foreground">
                Once we receive and inspect your return, we'll send you an email to notify you that we have 
                received your returned item. We'll also notify you of the approval or rejection of your refund.
              </p>
              <p className="text-muted-foreground mt-2">
                If approved, your refund will be processed, and a credit will automatically be applied to your 
                original method of payment within 5-7 business days.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Exchanges</h3>
              <p className="text-muted-foreground">
                If you need to exchange an item for a different size or color, please return your original purchase 
                and place a new order for the desired item. This ensures the fastest processing time.
              </p>
            </div>
          </div>
        </section>
        
        {/* Return Shipping */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Return Shipping</h2>
          <p className="text-muted-foreground">
            Return shipping is free for defective or incorrectly shipped items. For all other returns, a 
            shipping fee of $5.99 will be deducted from your refund amount.
          </p>
        </section>
        
        {/* Contact for Questions */}
        <div className="bg-muted/30 p-6 rounded-lg mt-8">
          <h3 className="font-semibold text-lg mb-2">Questions About Shipping or Returns?</h3>
          <p className="text-muted-foreground mb-4">
            Our customer service team is available to assist you with any questions about your order, 
            shipping, or returns.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;
