
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Briefcase, Building, Users, Clock, MapPin, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const jobs: Job[] = [
  {
    id: 'job-001',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    experience: '2+ years',
    postedDate: '2025-04-28',
    description: 'We are looking for a talented Frontend Developer to join our growing team. You will be responsible for building user interfaces for our e-commerce platform.',
    responsibilities: [
      'Develop and maintain responsive web applications',
      'Write clean, maintainable, and efficient code',
      'Collaborate with backend developers and designers',
      'Optimize applications for performance and scalability',
      'Implement and maintain code standards and best practices'
    ],
    requirements: [
      'Experience with React and modern JavaScript',
      'Proficiency in HTML, CSS, and front-end frameworks',
      'Knowledge of responsive design principles',
      'Experience with version control systems like Git',
      'Bachelor\'s degree in Computer Science or related field'
    ]
  },
  {
    id: 'job-002',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Remote',
    experience: '3+ years',
    postedDate: '2025-05-05',
    description: 'We are seeking a creative UX/UI Designer to craft beautiful user interfaces and experiences for our digital products.',
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Collaborate with product managers and developers',
      'Develop user personas and journey maps',
      'Maintain and evolve our design system'
    ],
    requirements: [
      'Strong portfolio demonstrating UI/UX skills',
      'Experience with design tools like Figma or Sketch',
      'Understanding of accessibility standards',
      'Knowledge of design principles and usability',
      'Excellent communication and collaboration skills'
    ]
  },
  {
    id: 'job-003',
    title: 'E-commerce Marketing Specialist',
    department: 'Marketing',
    location: 'Chicago, IL',
    type: 'Full-time',
    experience: '2+ years',
    postedDate: '2025-05-10',
    description: 'Join our marketing team to help drive customer acquisition and retention strategies for our e-commerce platform.',
    responsibilities: [
      'Develop and implement marketing campaigns',
      'Analyze marketing metrics and prepare reports',
      'Manage social media accounts and content calendar',
      'Coordinate email marketing initiatives',
      'Collaborate with the content team for promotional materials'
    ],
    requirements: [
      'Experience in e-commerce marketing',
      'Knowledge of SEO, SEM, and social media marketing',
      'Analytical skills with experience using marketing tools',
      'Excellent written and verbal communication',
      'Bachelor\'s degree in Marketing or related field'
    ]
  }
];

const Careers: React.FC = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null
  });
  
  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate days since posting
  const getDaysSincePosting = (date: string) => {
    const postedDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedJob) return;
    
    if (!applicationForm.name || !applicationForm.email || !applicationForm.coverLetter) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real application, this would submit the form to a server
    toast.success(`Application submitted for ${selectedJob.title}`);
    setSelectedJob(null);
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
      resume: null
    });
  };
  
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
      {!selectedJob && (
        <div className="relative bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-8 mb-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Team</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We're looking for passionate individuals to help us build the future of e-commerce.
              Explore our open positions and find your perfect role.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Search for positions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
              <Button onClick={() => setSearchQuery('')}>
                {searchQuery ? 'Clear Search' : 'View All Positions'}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Job Application Form */}
      {selectedJob && (
        <div className="mb-10">
          <Button 
            variant="ghost" 
            className="mb-4"
            onClick={() => setSelectedJob(null)}
          >
            ← Back to all positions
          </Button>
          
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
                      <CardDescription className="mt-2">{selectedJob.department} · {selectedJob.location}</CardDescription>
                    </div>
                    <Badge variant={selectedJob.type === 'Remote' ? 'outline' : 'default'}>
                      {selectedJob.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>Department: <span className="font-medium">{selectedJob.department}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Location: <span className="font-medium">{selectedJob.location}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Experience: <span className="font-medium">{selectedJob.experience}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Posted: <span className="font-medium">{getDaysSincePosting(selectedJob.postedDate)} days ago</span></span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Job Description</h3>
                    <p className="text-muted-foreground">{selectedJob.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {selectedJob.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {selectedJob.requirements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this position</CardTitle>
                  <CardDescription>Fill out the form below to apply</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleApply} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm({...applicationForm, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="resume">Resume/CV</Label>
                      <Input 
                        id="resume" 
                        type="file" 
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setApplicationForm({...applicationForm, resume: file});
                        }}
                      />
                      <p className="text-xs text-muted-foreground">PDF, DOCX formats (Max size: 5MB)</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="coverLetter">Cover Letter *</Label>
                      <Textarea 
                        id="coverLetter" 
                        rows={5}
                        placeholder="Why are you interested in this position?"
                        value={applicationForm.coverLetter}
                        onChange={(e) => setApplicationForm({...applicationForm, coverLetter: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Submit Application</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {/* Job Listings */}
      {!selectedJob && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Open Positions</h2>
            <p className="text-muted-foreground">{filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} available</p>
          </div>
          
          {filteredJobs.length === 0 ? (
            <Card className="text-center p-8">
              <h3 className="text-xl font-medium mb-2">No positions found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
              <Button onClick={() => setSearchQuery('')}>View All Positions</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:border-primary transition-colors">
                  <CardContent className="flex flex-col md:flex-row justify-between items-start gap-4 p-6">
                    <div className="flex gap-4 items-start">
                      <div className="hidden sm:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building className="h-3.5 w-3.5" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {job.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Posted {getDaysSincePosting(job.postedDate)} days ago
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center mt-4 md:mt-0">
                      <Badge variant={job.type === 'Remote' ? 'outline' : 'default'} className="hidden md:inline-flex">
                        {job.type}
                      </Badge>
                      <Button onClick={() => handleViewJob(job)}>View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Join Us Section */}
      {!selectedJob && (
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Why Join Our Team?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Great Team Culture</h3>
                <p className="text-muted-foreground">Join a supportive team that values collaboration and innovation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                    <path d="M3 10h18"></path>
                    <path d="M10 16h4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Flexible Work Hours</h3>
                <p className="text-muted-foreground">Work when you're most productive with our flexible scheduling.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <polyline points="22 7 12 2 2 7"></polyline>
                    <polyline points="22 17 12 22 2 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                    <line x1="12" x2="12" y1="2" y2="22"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground">Develop your skills and advance your career with our support.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                    <circle cx="12" cy="10" r="8"></circle>
                    <path d="M12 14v4"></path>
                    <path d="M9 18h6"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Competitive Benefits</h3>
                <p className="text-muted-foreground">Enjoy comprehensive health benefits, retirement plans, and more.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
