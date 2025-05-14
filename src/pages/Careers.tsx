
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Briefcase, MapPin, Clock, DollarSign, GraduationCap } from 'lucide-react';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  posted: string;
  requirements: string[];
}

const jobListings: JobListing[] = [
  {
    id: "job-001",
    title: "Frontend Developer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    posted: "3 days ago",
    requirements: [
      "3+ years experience with React",
      "Strong TypeScript skills",
      "Experience with modern CSS frameworks",
      "Excellent communication skills"
    ]
  },
  {
    id: "job-002",
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $110,000",
    posted: "1 week ago",
    requirements: [
      "5+ years of UX/UI design experience",
      "Proficiency in Figma and Adobe suite",
      "Experience working with product teams",
      "Portfolio demonstrating strong design skills"
    ]
  },
  {
    id: "job-003",
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "2 weeks ago",
    requirements: [
      "4+ years of product management experience",
      "Strong analytical skills",
      "Experience with agile methodologies",
      "Excellent leadership and communication skills"
    ]
  },
  {
    id: "job-004",
    title: "Customer Support Specialist",
    department: "Customer Success",
    location: "Remote",
    type: "Part-time",
    salary: "$25 - $30 per hour",
    posted: "3 days ago",
    requirements: [
      "2+ years of customer service experience",
      "Excellent written and verbal communication",
      "Problem-solving skills",
      "Experience with helpdesk software"
    ]
  },
  {
    id: "job-005",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    posted: "5 days ago",
    requirements: [
      "3+ years marketing experience",
      "Experience with digital marketing campaigns",
      "Analytical skills for performance tracking",
      "Creative thinking and excellent communication"
    ]
  }
];

const Careers: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="flex items-center text-sm mb-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
          <span className="font-medium">Careers</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          We're looking for passionate individuals to help us build the future of e-commerce. Explore our open positions below and find your perfect role.
        </p>
      </div>
      
      {/* Why Join Us Section */}
      <div className="mb-16 bg-muted/50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Why Work With Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Competitive Compensation</h3>
            <p className="text-muted-foreground">Competitive salary packages with bonuses, stock options, and comprehensive benefits.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Flexible Working</h3>
            <p className="text-muted-foreground">Remote-first culture with flexible hours to help you maintain work-life balance.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Growth Opportunities</h3>
            <p className="text-muted-foreground">Professional development budgets, mentorship programs and clear career progression.</p>
          </div>
        </div>
      </div>
      
      {/* Open Positions */}
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Open Positions</h2>
          <div className="text-muted-foreground">Showing {jobListings.length} positions</div>
        </div>
        
        <div className="space-y-6">
          {jobListings.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge className="mr-2">{job.department}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Posted {job.posted}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {job.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex justify-start md:justify-end">
                    <Button className="min-w-32">Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* No positions section */}
      <div className="mt-16 text-center bg-muted/30 p-8 rounded-lg">
        <h3 className="text-xl font-bold mb-2">Don't see a position that fits?</h3>
        <p className="text-muted-foreground mb-6">
          We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future openings.
        </p>
        <Button variant="outline" className="min-w-40">
          Submit Resume
        </Button>
      </div>
    </div>
  );
};

export default Careers;
