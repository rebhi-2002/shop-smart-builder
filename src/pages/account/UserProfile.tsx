
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
import { 
  User as UserIcon, Settings, ShieldCheck, Lock, LogOut, 
  CreditCard, CheckCircle, Bell, Mail, MapPin, Phone, FileText, Save
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const UserProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [is2FADialogOpen, setIs2FADialogOpen] = useState(false);
  const [isNotificationsDialogOpen, setIsNotificationsDialogOpen] = useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  
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
    serviceAnnouncements: true
  });
  
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const updatedUser = { 
        ...user, 
        name, 
        email, 
        phone, 
        bio 
      };
      
      await updateUser(updatedUser);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile.",
      });
    }
  };

  const handlePasswordChange = async () => {
    // Validation
    if (!currentPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your current password.",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New password must be at least 8 characters long.",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New password and confirmation do not match.",
      });
      return;
    }
    
    try {
      // In a real app, this would call an API to change the password
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      // Clear form and close dialog
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsPasswordDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update password. Please try again.",
      });
    }
  };
  
  const handleEnable2FA = async () => {
    try {
      // In a real app, this would set up 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been enabled for your account.",
      });
      
      setIs2FADialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to enable 2FA. Please try again.",
      });
    }
  };
  
  const handleSaveNotificationSettings = async () => {
    try {
      // In a real app, this would save notification preferences
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Notification Settings Saved",
        description: "Your notification preferences have been updated.",
      });
      
      setIsNotificationsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update notification settings.",
      });
    }
  };
  
  const handleSavePrivacySettings = async () => {
    try {
      // In a real app, this would save privacy settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Privacy Settings Saved",
        description: "Your privacy preferences have been updated.",
      });
      
      setIsPrivacyDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update privacy settings.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to logout.",
      });
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
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                    Bio
                  </label>
                  <Input
                    id="bio"
                    placeholder="A brief description about you"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
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
                      <FileText className="mr-2 h-4 w-4" />
                      Edit Privacy
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
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
              <label htmlFor="current-password" className="text-right">Current Password</label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="new-password" className="text-right">New Password</label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="confirm-password" className="text-right">Confirm Password</label>
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
                <p className="text-xs text-muted-foreground">Receive emails for important updates</p>
              </div>
              <Button 
                variant={notificationSettings.emailNotifications ? "default" : "outline"}
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  emailNotifications: !notificationSettings.emailNotifications
                })}
              >
                {notificationSettings.emailNotifications ? "On" : "Off"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Order Updates</p>
                <p className="text-xs text-muted-foreground">Get notified about order status changes</p>
              </div>
              <Button 
                variant={notificationSettings.orderUpdates ? "default" : "outline"}
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  orderUpdates: !notificationSettings.orderUpdates
                })}
              >
                {notificationSettings.orderUpdates ? "On" : "Off"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Promotional Emails</p>
                <p className="text-xs text-muted-foreground">Receive marketing emails about sales and promotions</p>
              </div>
              <Button 
                variant={notificationSettings.promotionalEmails ? "default" : "outline"}
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  promotionalEmails: !notificationSettings.promotionalEmails
                })}
              >
                {notificationSettings.promotionalEmails ? "On" : "Off"}
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Product Updates</p>
                <p className="text-xs text-muted-foreground">Get notified about new products and restocks</p>
              </div>
              <Button 
                variant={notificationSettings.productUpdates ? "default" : "outline"}
                onClick={() => setNotificationSettings({
                  ...notificationSettings,
                  productUpdates: !notificationSettings.productUpdates
                })}
              >
                {notificationSettings.productUpdates ? "On" : "Off"}
              </Button>
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
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Data Usage</h3>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="analytics" defaultChecked />
                <label htmlFor="analytics" className="text-sm">Allow anonymous usage analytics</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="personalization" defaultChecked />
                <label htmlFor="personalization" className="text-sm">Allow personalized recommendations</label>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Account Visibility</h3>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="profile-visible" defaultChecked />
                <label htmlFor="profile-visible" className="text-sm">Make profile visible to others</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="activity-visible" />
                <label htmlFor="activity-visible" className="text-sm">Show my activity in public feeds</label>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Data Removal</h3>
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
    </motion.div>
  );
};

export default UserProfile;
