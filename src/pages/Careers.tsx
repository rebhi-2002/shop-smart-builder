
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const jobOpenings = [
  {
    id: 'job-1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our team. The ideal candidate should have strong experience with React, TypeScript, and modern frontend frameworks.',
    requirements: [
      'At least 5 years of experience with frontend development',
      'Proficiency in React, TypeScript, and state management libraries',
      'Experience with responsive design and CSS frameworks',
      'Strong understanding of web performance optimization',
      'Excellent problem-solving skills'
    ]
  },
  {
    id: 'job-2',
    title: 'E-commerce Marketing Specialist',
    department: 'Marketing',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our marketing team to help grow our e-commerce business. You will be responsible for developing and implementing marketing strategies to increase online sales.',
    requirements: [
      'At least 3 years of experience in e-commerce marketing',
      'Experience with SEO, SEM, and social media marketing',
      'Knowledge of email marketing and customer retention strategies',
      'Experience with marketing analytics tools',
      'Strong communication skills'
    ]
  },
  {
    id: 'job-3',
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'We are seeking a talented Product Manager to drive the development of our e-commerce platform. You will work closely with design, engineering, and marketing teams.',
    requirements: [
      'At least 4 years of experience in product management',
      'Experience with e-commerce platforms and technologies',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
      'Technical background is a plus'
    ]
  },
  {
    id: 'job-4',
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Part-time',
    description: 'Help our customers have the best shopping experience by providing excellent support. You will be responsible for answering customer inquiries and resolving issues.',
    requirements: [
      'At least 1 year of experience in customer support',
      'Excellent communication skills',
      'Problem-solving mindset',
      'Patience and empathy',
      'Available to work some weekends'
    ]
  },
  {
    id: 'job-5',
    title: 'Warehouse Manager',
    department: 'Operations',
    location: 'Chicago, IL',
    type: 'Full-time',
    description: 'Oversee the daily operations of our warehouse, including inventory management, shipping, and receiving. Ensure timely and accurate order fulfillment.',
    requirements: [
      'At least 3 years of experience in warehouse management',
      'Experience with inventory management systems',
      'Strong leadership and organizational skills',
      'Knowledge of safety regulations',
      'Ability to work in a fast-paced environment'
    ]
  }
];

const Careers = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Careers</h1>
        <div className="flex items-center text-sm mt-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Careers</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-shop-900 to-shop-700 text-white rounded-lg overflow-hidden mb-12">
        <div className="p-8 md:p-12 md:w-3/5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Team
          </h2>
          <p className="text-lg opacity-90 mb-6">
            We are looking for talented individuals who are passionate about e-commerce and want to make a difference. Explore our current openings below.
          </p>
          <Button asChild size="lg" className="bg-white text-shop-900 hover:bg-gray-100">
            <a href="#job-openings">View Open Positions</a>
          </Button>
        </div>
        <div className="hidden md:block absolute right-0 top-0 h-full w-2/5 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center">
          <div className="absolute inset-0 bg-shop-900/30"></div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Why Join Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <CardTitle>Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We believe in promoting from within and providing our team members with opportunities to learn and advance their careers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle>Competitive Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We offer competitive salaries, health insurance, retirement plans, and generous paid time off to ensure our team has what they need.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle>Collaborative Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We foster a collaborative environment where everyone's ideas are valued and innovation is encouraged at all levels of the company.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Openings */}
      <div id="job-openings" className="mb-12 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">Current Job Openings</h2>
        
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Departments</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {jobOpenings.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          
          <TabsContent value="engineering" className="space-y-4">
            {jobOpenings.filter(job => job.department === 'Engineering').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          
          <TabsContent value="marketing" className="space-y-4">
            {jobOpenings.filter(job => job.department === 'Marketing').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            {jobOpenings.filter(job => job.department === 'Support').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
          
          <TabsContent value="operations" className="space-y-4">
            {jobOpenings.filter(job => job.department === 'Operations').map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the hiring process like?</AccordionTrigger>
            <AccordionContent>
              Our hiring process typically includes an initial application review, a phone screening, a technical or skills assessment, and one to two interviews. The entire process usually takes 2-3 weeks depending on the role.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Do you offer remote work options?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer both fully remote positions and hybrid options depending on the role and department. Each job posting will clearly state the location requirements.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What benefits do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer a comprehensive benefits package that includes health, dental, and vision insurance, 401(k) matching, paid time off, parental leave, professional development stipends, and employee discounts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Do you have internship programs?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer internship programs in various departments throughout the year. These opportunities will be posted on our careers page when available.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>How can I prepare for an interview?</AccordionTrigger>
            <AccordionContent>
              Research our company and products, review the job description thoroughly, prepare examples of your relevant experience, and be ready to discuss how your skills align with our needs. For technical roles, be prepared to demonstrate your technical knowledge.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact CTA */}
      <div className="bg-muted p-8 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Don't see the right position?</h3>
        <p className="text-muted-foreground mb-6">
          We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
        </p>
        <Button asChild>
          <Link to="/contact">Contact Our Recruiting Team</Link>
        </Button>
      </div>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job }: { job: typeof jobOpenings[0] }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.title}</CardTitle>
            <CardDescription className="mt-1">{job.department} • {job.location} • {job.type}</CardDescription>
          </div>
          <Button>Apply Now</Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{job.description}</p>
        <div>
          <h4 className="font-semibold mb-2">Requirements:</h4>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end">
        <Button variant="outline" className="mr-2">Share</Button>
        <Button>Apply Now</Button>
      </CardFooter>
    </Card>
  );
};

export default Careers;
