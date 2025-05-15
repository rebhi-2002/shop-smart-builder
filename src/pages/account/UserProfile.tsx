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
  CreditCard, CheckCircle, Bell, Mail, MapPin, Phone, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Update the User interface to include phone and bio fields
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'customer';
  phone: string; // Added phone property
  bio: string; // Added bio property
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
  };
}

const UserProfile = () => {
  const { user, logout, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState<string>(user?.phone || '');
  const [bio, setBio] = useState<string>(user?.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    if (!user) return;

    const updatedUser = { ...user, name, email, phone, bio };
    try {
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
                      <Button onClick={handleUpdateProfile}>Save Changes</Button>
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
                    <Button variant="outline">
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
                    <Button variant="outline">
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
                    <Button variant="outline">
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
                    <Button variant="outline">
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
    </motion.div>
  );
};

export default UserProfile;
