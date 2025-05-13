
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';
import { User, Settings, Lock, ShoppingBag, Heart, CreditCard, Bell, Home, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import RecentlyViewed from '@/components/RecentlyViewed';

const profileFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const addressFormSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  isDefault: z.boolean().default(false),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;
type PasswordFormData = z.infer<typeof passwordFormSchema>;
type AddressFormData = z.infer<typeof addressFormSchema>;

const MyAccount: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState([100]);
  
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
    }
  });
  
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });
  
  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: true,
    }
  });
  
  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would update the user profile with an API call
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };
  
  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Here you would update the password with an API call
      toast.success('Password updated successfully');
      passwordForm.reset();
    } catch (error) {
      toast.error('Failed to update password');
    }
  };
  
  const onAddressSubmit = async (data: AddressFormData) => {
    try {
      // Here you would add a new address with an API call
      toast.success('Address added successfully');
      addressForm.reset();
    } catch (error) {
      toast.error('Failed to add address');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="container max-w-6xl py-10">
      <div className="pb-4">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-medium text-lg">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Separator className="my-2" />
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === 'profile' ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  variant={activeTab === 'security' ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('security')}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </Button>
                <Button 
                  variant={activeTab === 'addresses' ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('addresses')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Addresses
                </Button>
                <Button 
                  variant={activeTab === 'preferences' ? "secondary" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('preferences')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  asChild
                >
                  <Link to="/account/orders">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
              </nav>
            </CardContent>
          </Card>
          
          <RecentlyViewed variant="minimal" limit={3} />
          
          <Button variant="outline" onClick={logout} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </Button>
        </aside>
        
        {/* Main Content */}
        <div className="space-y-6">
          {/* Profile Tab Content */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Optional" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Update Profile</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {/* Security Tab Content */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Update Password</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {/* Addresses Tab Content */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>
                    Manage your shipping addresses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6">
                    <p className="text-muted-foreground mb-4">You don't have any saved addresses yet.</p>
                    <Button variant="outline">Add New Address</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add New Address</CardTitle>
                  <CardDescription>
                    Add a new shipping address
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...addressForm}>
                    <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                      <FormField
                        control={addressForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Zip Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={addressForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={addressForm.control}
                        name="isDefault"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2 space-y-0">
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="mt-0">Set as default address</FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit">Add Address</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Preferences Tab Content */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how we contact you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive emails about your orders</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive text messages for order updates</p>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications} 
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive promotions and special offers</p>
                    </div>
                    <Switch 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Product Updates</p>
                      <p className="text-sm text-muted-foreground">Receive updates about products you've purchased</p>
                    </div>
                    <Switch 
                      checked={productUpdates} 
                      onCheckedChange={setProductUpdates}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the site looks for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium">Font Size</p>
                      <p className="text-sm text-muted-foreground">Adjust the text size</p>
                    </div>
                    <div className="pt-2">
                      <Slider
                        defaultValue={fontScale}
                        max={150}
                        min={75}
                        step={5}
                        onValueChange={setFontScale}
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-sm">Smaller</span>
                        <span className="text-sm font-medium">{fontScale}%</span>
                        <span className="text-sm">Larger</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
