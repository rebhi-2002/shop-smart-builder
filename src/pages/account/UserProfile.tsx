import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { countries } from 'countries-list';
import { Country } from 'countries-list';
import { states } from '@/lib/states';
import { cn } from '@/lib/utils';

// Define the Zod schema for the user profile form
const userProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  bio: z.string().max(160).optional(),
});

// Define the Zod schema for the address form
const addressSchema = z.object({
  street: z.string().min(2, {
    message: "Street address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().regex(/^[0-9]{5}(?:-[0-9]{4})?$/, {
    message: "Please enter a valid zip code.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
});

// Define the types for the form data
type UserProfileFormData = z.infer<typeof userProfileSchema>;
type AddressFormData = z.infer<typeof addressSchema>;

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, logout } = useAuth();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
  const [address, setAddress] = useState<AddressFormData>({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  // Initialize the user profile form
  const profileForm = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    },
    mode: "onChange",
  });

  // Initialize the address form
  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: address,
    mode: "onChange",
  });

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      profileForm.reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
      });

      // Load address from local storage or use default values
      const storedAddress = localStorage.getItem('address');
      if (storedAddress) {
        const parsedAddress = JSON.parse(storedAddress);
        setAddress(parsedAddress);
        addressForm.reset(parsedAddress);
      } else {
        setAddress({
          street: user.street || '',
          city: user.city || '',
          state: user.state || '',
          zip: user.zip || '',
          country: user.country || '',
        });
        addressForm.reset({
          street: user.street || '',
          city: user.city || '',
          state: user.state || '',
          zip: user.zip || '',
          country: user.country || '',
        });
      }
      setProfilePicture(user.profilePicture || null);
    }
  }, [user, profileForm, addressForm]);

  // Handle profile update form submission
  const handleProfileUpdate = async (data: UserProfileFormData) => {
    setIsProfileLoading(true);
    try {
      await updateUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        bio: data.bio,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Profile update error:', error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  // Handle address update form submission
  const handleAddressUpdate = async (data: AddressFormData) => {
    setIsAddressLoading(true);
    try {
      await updateUserProfile({
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
      });

      // Update address state
      setAddress(prevAddress => ({
        ...prevAddress,
        street: data.street || prevAddress.street,
        city: data.city || prevAddress.city,
        state: data.state || prevAddress.state,
        zip: data.zip || prevAddress.zip,
        country: data.country || prevAddress.country
      }));

      // Save address to local storage
      localStorage.setItem('address', JSON.stringify(data));
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error('Failed to update address');
      console.error('Address update error:', error);
    } finally {
      setIsAddressLoading(false);
    }
  };

  // Handle profile picture change
  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProfilePictureLoading(true);
    try {
      // Simulate uploading the image and getting a URL
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
      await updateUserProfile({ profilePicture: imageUrl });
      toast.success('Profile picture updated successfully');
    } catch (error) {
      toast.error('Failed to update profile picture');
      console.error('Profile picture update error:', error);
    } finally {
      setIsProfilePictureLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Simulate account deletion
        await new Promise(resolve => setTimeout(resolve, 1000));
        logout();
        navigate('/');
        toast.success('Account deleted successfully');
      } catch (error) {
        toast.error('Failed to delete account');
        console.error('Account deletion error:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm mb-4">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <span className="mx-1 text-muted-foreground">&raquo;</span>
        <span className="font-medium">My Account</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Account Navigation */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account">
                  My Profile
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account/orders">
                  My Orders
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Security
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Notifications
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Profile Information */}
        <div className="md:col-span-2">
          <Accordion type="single" collapsible>
            {/* Profile Section */}
            <AccordionItem value="profile">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">Profile Information</h2>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar>
                        {profilePicture ? (
                          <AvatarImage src={profilePicture} alt="Profile Picture" />
                        ) : (
                          <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <label htmlFor="profile-picture-input" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2">
                          {isProfilePictureLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            <>
                              Change Picture
                            </>
                          )}
                        </label>
                        <Input
                          type="file"
                          id="profile-picture-input"
                          accept="image/*"
                          onChange={handleProfilePictureChange}
                          className="hidden"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommended size: 150x150 pixels.
                        </p>
                      </div>
                    </div>

                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={profileForm.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={profileForm.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email" {...field} type="email" />
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
                                <Input placeholder="Phone Number" {...field} type="tel" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Write a short bio about yourself."
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isProfileLoading}>
                          {isProfileLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Update Profile'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Address Section */}
            <AccordionItem value="address">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">Address Information</h2>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Update Address</CardTitle>
                    <CardDescription>Update your address information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...addressForm}>
                      <form onSubmit={addressForm.handleSubmit(handleAddressUpdate)} className="space-y-4">
                        <FormField
                          control={addressForm.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Street Address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
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
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {states.map((state) => (
                                        <SelectItem key={state.abbreviation} value={state.name}>
                                          {state.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Zip Code" {...field} />
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
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(countries).map(([key, country]) => (
                                        <SelectItem key={key} value={country.name}>
                                          {country.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button type="submit" disabled={isAddressLoading}>
                          {isAddressLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            'Update Address'
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Account Deletion Section */}
            <AccordionItem value="delete">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">Delete Account</h2>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Delete Account</CardTitle>
                    <CardDescription>Permanently delete your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Warning: Deleting your account will permanently remove all your data from our
                      system. This action cannot be undone.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
