
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/sonner";
import { Loader2, Settings, Bell, ShieldAlert, CreditCard, Home, Package2, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  
  // Additional state for new features
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States'
  });
  const [shippingAddress, setShippingAddress] = useState({
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'United States'
  });
  const [useAsBilling, setUseAsBilling] = useState(true);
  
  // Mock payment methods
  const paymentMethods = [
    { id: '1', type: 'visa', last4: '4242', expMonth: 12, expYear: 2025, isDefault: true },
    { id: '2', type: 'mastercard', last4: '5555', expMonth: 6, expYear: 2024, isDefault: false }
  ];
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email);
      setAvatarUrl(user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`);
      setPhoneNumber(user.phone || '');
      setBio(user.bio || '');
    }
  }, [user]);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully!");
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsUpdating(false);
    }, 1500);
  };

  const handleUpdateNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Notification preferences updated!");
      setIsUpdating(false);
    }, 1500);
  };

  const handleUpdateAddresses = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Addresses updated successfully!");
      setIsUpdating(false);
    }, 1500);
  };
  
  const handleSetDefaultPayment = (id: string) => {
    toast.success("Default payment method updated!");
  };
  
  const handleDeletePayment = (id: string) => {
    toast.success("Payment method removed!");
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="grid md:grid-cols-4 gap-6">
        {/* Profile Summary Card */}
        <div>
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={avatarUrl} alt={user.name || 'User'} />
                <AvatarFallback>{(user.name || 'User').substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Account Type:</span>
                  <span className="font-medium capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="font-medium">June 2023</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Orders:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Wishlist Items:</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/account/orders')}>
                <Package2 className="mr-2 h-4 w-4" />
                View My Orders
              </Button>
            </CardFooter>
          </Card>

          {/* Navigation Menu */}
          <div className="mt-6">
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Privacy & Security
                </Button>
              </div>
              <div className="border-t py-2">
                <Button variant="ghost" className="w-full justify-start text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateProfile}>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium mb-1">
                        Profile Picture
                      </label>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={avatarUrl} />
                          <AvatarFallback>{(name || 'U').substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <Button type="button" variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Full Name
                        </label>
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          placeholder="Your full name" 
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="Your email address" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Your phone number" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium mb-1">
                        Bio
                      </label>
                      <Textarea 
                        id="bio" 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us a bit about yourself" 
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="birthdate" className="block text-sm font-medium mb-1">
                          Birthdate (Optional)
                        </label>
                        <Input 
                          id="birthdate" 
                          type="date" 
                        />
                      </div>
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium mb-1">
                          Preferred Language
                        </label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select Language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <form onSubmit={handleChangePassword}>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter your current password" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <Input 
                        id="new-password" 
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Enter your new password" 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password" 
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Change Password'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-factor authentication</h4>
                      <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Recovery codes</h4>
                      <p className="text-sm text-muted-foreground">View your recovery codes</p>
                    </div>
                    <Button variant="outline" size="sm">View Codes</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Manage devices where you're currently logged in</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Chrome on Windows</h4>
                        <p className="text-sm text-muted-foreground">Current session • Active now</p>
                      </div>
                      <span className="text-sm text-green-500 font-medium">Current</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Safari on iPhone</h4>
                        <p className="text-sm text-muted-foreground">Last active: 2 days ago</p>
                      </div>
                      <Button variant="ghost" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-red-500">Sign Out From All Devices</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <form onSubmit={handleUpdateNotifications}>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <Switch 
                          id="email-notifications" 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="email-notifications">Email notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your account activity.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <Switch 
                          id="order-updates" 
                          checked={orderUpdates} 
                          onCheckedChange={setOrderUpdates}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="order-updates">Order updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive updates on your order status.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <Switch 
                          id="promotions" 
                          checked={promotions} 
                          onCheckedChange={setPromotions}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="promotions">Promotions</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about sales, discounts, and special offers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <Switch 
                          id="newsletter" 
                          checked={newsletter} 
                          onCheckedChange={setNewsletter}
                        />
                        <div className="space-y-1">
                          <Label htmlFor="newsletter">Newsletter</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive our weekly newsletter with product updates and blog posts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button type="submit" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Save Preferences'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="addresses">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>Used for payment processing</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleUpdateAddresses}>
                    <CardContent className="space-y-4">
                      <div>
                        <label htmlFor="billing-street" className="block text-sm font-medium mb-1">
                          Street Address
                        </label>
                        <Input 
                          id="billing-street" 
                          value={billingAddress.street} 
                          onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})} 
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="billing-city" className="block text-sm font-medium mb-1">
                            City
                          </label>
                          <Input 
                            id="billing-city" 
                            value={billingAddress.city} 
                            onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})} 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="billing-state" className="block text-sm font-medium mb-1">
                            State/Province
                          </label>
                          <Input 
                            id="billing-state" 
                            value={billingAddress.state} 
                            onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})} 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="billing-postal-code" className="block text-sm font-medium mb-1">
                            Postal Code
                          </label>
                          <Input 
                            id="billing-postal-code" 
                            value={billingAddress.postalCode} 
                            onChange={(e) => setBillingAddress({...billingAddress, postalCode: e.target.value})} 
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="billing-country" className="block text-sm font-medium mb-1">
                            Country
                          </label>
                          <Select 
                            value={billingAddress.country} 
                            onValueChange={(value) => setBillingAddress({...billingAddress, country: value})}
                          >
                            <SelectTrigger id="billing-country">
                              <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="United States">United States</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                              <SelectItem value="Australia">Australia</SelectItem>
                              <SelectItem value="Germany">Germany</SelectItem>
                              <SelectItem value="France">France</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Update Billing Address'
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Shipping Address</CardTitle>
                        <CardDescription>Where your orders will be shipped</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="same-as-billing" 
                          checked={useAsBilling} 
                          onCheckedChange={setUseAsBilling} 
                        />
                        <Label htmlFor="same-as-billing" className="text-sm">
                          Same as billing
                        </Label>
                      </div>
                    </div>
                  </CardHeader>
                  <form onSubmit={handleUpdateAddresses}>
                    <CardContent className="space-y-4">
                      {useAsBilling ? (
                        <div className="text-center py-6 text-muted-foreground">
                          Using billing address for shipping
                        </div>
                      ) : (
                        <>
                          <div>
                            <label htmlFor="shipping-street" className="block text-sm font-medium mb-1">
                              Street Address
                            </label>
                            <Input 
                              id="shipping-street" 
                              value={shippingAddress.street} 
                              onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})} 
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="shipping-city" className="block text-sm font-medium mb-1">
                                City
                              </label>
                              <Input 
                                id="shipping-city" 
                                value={shippingAddress.city} 
                                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} 
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="shipping-state" className="block text-sm font-medium mb-1">
                                State/Province
                              </label>
                              <Input 
                                id="shipping-state" 
                                value={shippingAddress.state} 
                                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} 
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="shipping-postal-code" className="block text-sm font-medium mb-1">
                                Postal Code
                              </label>
                              <Input 
                                id="shipping-postal-code" 
                                value={shippingAddress.postalCode} 
                                onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})} 
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="shipping-country" className="block text-sm font-medium mb-1">
                                Country
                              </label>
                              <Select 
                                value={shippingAddress.country} 
                                onValueChange={(value) => setShippingAddress({...shippingAddress, country: value})}
                              >
                                <SelectTrigger id="shipping-country">
                                  <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="United States">United States</SelectItem>
                                  <SelectItem value="Canada">Canada</SelectItem>
                                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                  <SelectItem value="Australia">Australia</SelectItem>
                                  <SelectItem value="Germany">Germany</SelectItem>
                                  <SelectItem value="France">France</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      {!useAsBilling && (
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Update Shipping Address'
                          )}
                        </Button>
                      )}
                    </CardFooter>
                  </form>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-6 bg-card flex items-center justify-center border rounded">
                            {method.type === 'visa' && <span className="font-bold text-blue-600">VISA</span>}
                            {method.type === 'mastercard' && <span className="font-bold text-red-600">MC</span>}
                          </div>
                          <div>
                            <p className="font-medium">**** **** **** {method.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {method.expMonth}/{method.expYear}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.isDefault ? (
                            <Badge>Default</Badge>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleSetDefaultPayment(method.id)}
                            >
                              Set as default
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500" 
                            onClick={() => handleDeletePayment(method.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add New Payment Method
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
