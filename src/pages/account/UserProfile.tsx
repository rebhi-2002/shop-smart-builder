
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  User as UserIcon, Settings, ShieldCheck, Lock, LogOut, 
  CreditCard, CheckCircle, Bell, Mail, MapPin, Phone, 
  FileText, Save, UserCog, Star, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface ColorScheme {
  name: string;
  value: string;
  textColor: string;
}

interface LanguageOption {
  code: string;
  name: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  last4?: string;
  expiry?: string;
  isDefault: boolean;
}

const UserProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [address, setAddress] = useState(user?.address || {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPreferencesDialogOpen, setIsPreferencesDialogOpen] = useState(false);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false,
    productUpdates: true,
    serviceAnnouncements: true,
    securityAlerts: true,
    priceDrop: false,
    newProducts: true,
    reviewRequests: true,
    backInStock: true
  });

  // Language and preferences state
  const [language, setLanguage] = useState('en');
  const [colorScheme, setColorScheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [newsletterFrequency, setNewsletterFrequency] = useState('weekly');
  
  // Address dialog state
  const [editingAddress, setEditingAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
    country: user?.address?.country || 'United States'
  });

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'card-1',
      type: 'card',
      name: 'Visa ending in 4242',
      last4: '4242',
      expiry: '06/25',
      isDefault: true
    },
    {
      id: 'paypal-1',
      type: 'paypal',
      name: 'PayPal Account',
      isDefault: false
    }
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    allowTracking: true,
    showActivity: false,
    profileVisibility: 'friends',
    storeHistory: true,
    allowRecommendations: true
  });

  // Color schemes options
  const colorSchemes: ColorScheme[] = [
    { name: 'System Default', value: 'system', textColor: 'text-foreground' },
    { name: 'Light Mode', value: 'light', textColor: 'text-foreground' },
    { name: 'Dark Mode', value: 'dark', textColor: 'text-foreground' },
    { name: 'High Contrast', value: 'high-contrast', textColor: 'text-foreground' }
  ];

  // Language options
  const languages: LanguageOption[] = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' }
  ];

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const updatedUser = { 
        ...user, 
        name, 
        email, 
        phone, 
        bio,
        address
      };
      
      await updateUser(updatedUser);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile.");
    }
  };

  const handlePasswordChange = async () => {
    // Validation
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    
    try {
      // In a real app, this would call an API to change the password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Password updated successfully");
      
      // Clear form and close dialog
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsPasswordDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };
  
  const handleEnable2FA = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Two-factor authentication enabled");
      setIs2FADialogOpen(false);
    } catch (error) {
      toast.error("Failed to enable 2FA. Please try again.");
    }
  };
  
  const handleSaveNotificationSettings = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Notification preferences updated");
      setIsNotificationsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update notification settings.");
    }
  };
  
  const handleSavePrivacySettings = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Privacy settings updated");
      setIsPrivacyDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update privacy settings.");
    }
  };

  const handleSavePreferences = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Preferences updated");
      setIsPreferencesDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update preferences.");
    }
  };

  const handleAddPaymentMethod = async () => {
    try {
      if (!newPaymentMethod.cardNumber || !newPaymentMethod.cardName || !newPaymentMethod.expiry || !newPaymentMethod.cvc) {
        toast.error("Please fill in all card details");
        return;
      }
      
      // In real app, would validate card details and make API call
      
      // Simulate adding new payment method
      const last4 = newPaymentMethod.cardNumber.slice(-4);
      const newCard: PaymentMethod = {
        id: `card-${Date.now()}`,
        type: 'card',
        name: `Card ending in ${last4}`,
        last4,
        expiry: newPaymentMethod.expiry,
        isDefault: paymentMethods.length === 0
      };
      
      setPaymentMethods([...paymentMethods, newCard]);
      setNewPaymentMethod({
        type: 'card',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvc: ''
      });
      
      toast.success("Payment method added");
      setIsPaymentDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add payment method.");
    }
  };
  
  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast.success("Payment method removed");
  };
  
  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    toast.success("Default payment method updated");
  };

  const handleSaveAddress = () => {
    setAddress(editingAddress);
    toast.success("Shipping address updated");
    setIsAddressDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout.");
    }
  };

  if (!user) {
    return <div>Loading or not authenticated...</div>;
  }

  return (
    <motion.div
      className="container mx-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserIcon className="mr-2 h-5 w-5" />
            My Profile
          </CardTitle>
          <CardDescription>
            Manage your profile information and settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Personal Information</h2>
                    <p className="text-sm text-muted-foreground">
                      Update your personal details.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <img
                      src={user.avatar || "https://via.placeholder.com/150"}
                      alt="Avatar"
                      className="rounded-full w-24 h-24 object-cover"
                    />
                    <Button variant="outline">Change Avatar</Button>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      placeholder="Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                      Role
                    </label>
                    <div className="mt-1">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                      {user.role === 'user' && (
                        <Button variant="link" className="p-0 h-auto ml-2 text-xs text-blue-500">
                          Request Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    placeholder="A brief description about you"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    className="min-h-[100px]"
                  />
                </div>
                <Separator />
                <div className="flex justify-end">
                  {isEditing ? (
                    <div className="space-x-2">
                      <Button variant="ghost" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Security Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your password and security preferences.
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Change Password</p>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIsPasswordDialogOpen(true)}>
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIs2FADialogOpen(true)}>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Enable 2FA
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Login History</p>
                      <p className="text-sm text-muted-foreground">
                        Review your recent login activity.
                      </p>
                    </div>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Activity
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Connected Devices</p>
                      <p className="text-sm text-muted-foreground">
                        Manage devices connected to your account.
                      </p>
                    </div>
                    <Button variant="outline">
                      <UserCog className="mr-2 h-4 w-4" />
                      Manage Devices
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Preferences</h2>
                  <p className="text-sm text-muted-foreground">
                    Customize your experience with notification and privacy settings.
                  </p>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Notification Settings</p>
                      <p className="text-sm text-muted-foreground">
                        Choose what notifications you receive.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIsNotificationsDialogOpen(true)}>
                      <Bell className="mr-2 h-4 w-4" />
                      Edit Notifications
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Privacy Settings</p>
                      <p className="text-sm text-muted-foreground">
                        Manage your data and privacy preferences.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIsPrivacyDialogOpen(true)}>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Edit Privacy
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">App Preferences</p>
                      <p className="text-sm text-muted-foreground">
                        Customize language, theme, and accessibility settings.
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => setIsPreferencesDialogOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payment">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Payment Methods</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your payment methods for faster checkout.
                  </p>
                </div>
                <Separator />
                
                <div className="space-y-4">
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No payment methods added yet.</p>
                    </div>
                  ) : (
                    paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between border p-4 rounded-md">
                        <div className="flex items-center space-x-4">
                          {method.type === 'card' ? (
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                          ) : method.type === 'paypal' ? (
                            <div className="text-blue-600 font-bold text-sm">PayPal</div>
                          ) : (
                            <div className="text-green-600 font-bold text-sm">Bank</div>
                          )}
                          
                          <div>
                            <p className="font-medium">{method.name}</p>
                            {method.expiry && (
                              <p className="text-sm text-muted-foreground">Expires: {method.expiry}</p>
                            )}
                            {method.isDefault && (
                              <Badge variant="outline" className="mt-1">Default</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {!method.isDefault && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSetDefaultPayment(method.id)}
                            >
                              Set Default
                            </Button>
                          )}
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemovePaymentMethod(method.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                  
                  <Button onClick={() => setIsPaymentDialogOpen(true)}>
                    Add Payment Method
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Shipping Addresses</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your shipping addresses for faster checkout.
                  </p>
                </div>
                <Separator />
                
                {address.street ? (
                  <div className="border p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-sm">{address.street}</p>
                        <p className="text-sm">{address.city}, {address.state} {address.zip}</p>
                        <p className="text-sm">{address.country}</p>
                        <p className="text-sm mt-1">{phone}</p>
                        <Badge variant="outline" className="mt-2">Default</Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingAddress(address);
                          setIsAddressDialogOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No shipping address added yet.</p>
                    <Button onClick={() => setIsAddressDialogOpen(true)} className="mt-4">
                      Add Shipping Address
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            View Purchase History
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
      
      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-password" className="text-right">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-password" className="text-right">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>Cancel</Button>
            <Button onClick={handlePasswordChange}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 2FA Dialog */}
      <Dialog open={is2FADialogOpen} onOpenChange={setIs2FADialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Add an extra layer of security to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center">
              <div className="mx-auto w-48 h-48 bg-gray-100 flex items-center justify-center mb-4">
                <p className="text-sm text-gray-500">QR Code Placeholder</p>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code with your authenticator app. You will be asked for a code from the app when you log in.
              </p>
              <p className="font-medium">Backup Code: XXXX-XXXX-XXXX-XXXX</p>
              <p className="text-xs text-muted-foreground mt-1">
                Save this code in a secure place. You can use it if you lose access to your authenticator app.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIs2FADialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEnable2FA}>Enable 2FA</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Notifications Dialog */}
      <Dialog open={isNotificationsDialogOpen} onOpenChange={setIsNotificationsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogDescription>
              Choose what notifications you receive.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive important updates via email</p>
              </div>
              <Switch 
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  emailNotifications: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Order Updates</p>
                <p className="text-xs text-muted-foreground">Get notified about order status changes</p>
              </div>
              <Switch 
                checked={notificationSettings.orderUpdates}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  orderUpdates: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Promotional Emails</p>
                <p className="text-xs text-muted-foreground">Receive marketing emails about sales and promotions</p>
              </div>
              <Switch 
                checked={notificationSettings.promotionalEmails}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  promotionalEmails: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Product Updates</p>
                <p className="text-xs text-muted-foreground">Get notified about new products and restocks</p>
              </div>
              <Switch 
                checked={notificationSettings.productUpdates}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  productUpdates: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Price Drop Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified when items in your wishlist drop in price</p>
              </div>
              <Switch 
                checked={notificationSettings.priceDrop}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  priceDrop: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Back in Stock</p>
                <p className="text-xs text-muted-foreground">Get notified when out-of-stock items become available</p>
              </div>
              <Switch 
                checked={notificationSettings.backInStock}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  backInStock: checked
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Security Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified about important security updates</p>
              </div>
              <Switch 
                checked={notificationSettings.securityAlerts}
                onCheckedChange={(checked) => setNotificationSettings({
                  ...notificationSettings,
                  securityAlerts: checked
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotificationsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNotificationSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Privacy Dialog */}
      <Dialog open={isPrivacyDialogOpen} onOpenChange={setIsPrivacyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Privacy Settings</DialogTitle>
            <DialogDescription>
              Manage how your data is used and shared.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Data Usage</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics" className="text-sm">Allow anonymous usage analytics</Label>
                <Switch 
                  id="analytics" 
                  checked={privacySettings.allowTracking} 
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, allowTracking: checked})
                  } 
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="personalization" className="text-sm">Allow personalized recommendations</Label>
                <Switch 
                  id="personalization" 
                  checked={privacySettings.allowRecommendations} 
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, allowRecommendations: checked})
                  } 
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="store-history" className="text-sm">Store browsing history</Label>
                <Switch 
                  id="store-history" 
                  checked={privacySettings.storeHistory} 
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, storeHistory: checked})
                  } 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Account Visibility</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-visible" className="text-sm">Who can see my profile</Label>
                <Select 
                  value={privacySettings.profileVisibility} 
                  onValueChange={(value) => 
                    setPrivacySettings({...privacySettings, profileVisibility: value})
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="friends">Only Friends</SelectItem>
                    <SelectItem value="none">No One</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="activity-visible" className="text-sm">Show my activity in public feeds</Label>
                <Switch 
                  id="activity-visible"  
                  checked={privacySettings.showActivity} 
                  onCheckedChange={(checked) => 
                    setPrivacySettings({...privacySettings, showActivity: checked})
                  } 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Data Management</h3>
              <Button variant="outline" className="w-full text-sm" size="sm">
                Download My Data
              </Button>
              <Button variant="destructive" className="w-full text-sm" size="sm">
                Delete My Account
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrivacyDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePrivacySettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* App Preferences Dialog */}
      <Dialog open={isPreferencesDialogOpen} onOpenChange={setIsPreferencesDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>App Preferences</DialogTitle>
            <DialogDescription>
              Customize the application to your preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Display</h3>
              <div className="grid gap-2">
                <Label htmlFor="color-scheme">Color Theme</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorSchemes.map((scheme) => (
                      <SelectItem key={scheme.value} value={scheme.value}>
                        <span className={scheme.textColor}>{scheme.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Accessibility</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="text-sm">Reduced Motion</Label>
                <Switch 
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-sm">High Contrast Mode</Label>
                <Switch 
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Language</h3>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Communication Preferences</h3>
              <div className="grid gap-2">
                <Label htmlFor="newsletter">Newsletter Frequency</Label>
                <Select value={newsletterFrequency} onValueChange={setNewsletterFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreferencesDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Address Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Add or update your shipping address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="address-street">Street Address</Label>
              <Input
                id="address-street"
                value={editingAddress.street}
                onChange={(e) => setEditingAddress({...editingAddress, street: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address-city">City</Label>
              <Input
                id="address-city"
                value={editingAddress.city}
                onChange={(e) => setEditingAddress({...editingAddress, city: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="address-state">State/Province</Label>
                <Input
                  id="address-state"
                  value={editingAddress.state}
                  onChange={(e) => setEditingAddress({...editingAddress, state: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address-zip">ZIP/Postal Code</Label>
                <Input
                  id="address-zip"
                  value={editingAddress.zip}
                  onChange={(e) => setEditingAddress({...editingAddress, zip: e.target.value})}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address-country">Country</Label>
              <Select 
                value={editingAddress.country} 
                onValueChange={(value) => setEditingAddress({...editingAddress, country: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="France">France</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                  <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                  <SelectItem value="Egypt">Egypt</SelectItem>
                  <SelectItem value="Kuwait">Kuwait</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddressDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAddress}>Save Address</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Method Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new payment method to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select 
                value={newPaymentMethod.type} 
                onValueChange={(value: 'card' | 'paypal' | 'bank') => 
                  setNewPaymentMethod({...newPaymentMethod, type: value})
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {newPaymentMethod.type === 'card' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={newPaymentMethod.cardNumber}
                    onChange={(e) => 
                      setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    placeholder="Name on card"
                    value={newPaymentMethod.cardName}
                    onChange={(e) => 
                      setNewPaymentMethod({...newPaymentMethod, cardName: e.target.value})
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-expiry">Expiry Date</Label>
                    <Input
                      id="card-expiry"
                      placeholder="MM/YY"
                      value={newPaymentMethod.expiry}
                      onChange={(e) => 
                        setNewPaymentMethod({...newPaymentMethod, expiry: e.target.value})
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="card-cvc">CVC</Label>
                    <Input
                      id="card-cvc"
                      placeholder="CVC"
                      type="password"
                      value={newPaymentMethod.cvc}
                      onChange={(e) => 
                        setNewPaymentMethod({...newPaymentMethod, cvc: e.target.value})
                      }
                    />
                  </div>
                </div>
              </>
            )}
            
            {newPaymentMethod.type === 'paypal' && (
              <div className="text-center py-4">
                <p className="mb-4">You will be redirected to PayPal to complete the setup.</p>
                <Button className="w-full" onClick={() => window.open('https://www.paypal.com', '_blank')}>
                  Connect with PayPal
                </Button>
              </div>
            )}
            
            {newPaymentMethod.type === 'bank' && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" placeholder="Enter bank name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input id="account-number" placeholder="Enter account number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="routing-number">Routing Number</Label>
                  <Input id="routing-number" placeholder="Enter routing number" />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default UserProfile;
