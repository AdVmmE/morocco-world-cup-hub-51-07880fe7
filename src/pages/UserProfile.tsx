
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { UserRound, Mail, Lock, Settings, Ticket } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required",
  }),
  newPassword: z.string().min(8, {
    message: "New password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const { t } = useTranslation();

  // Mock user data - replace with actual API call
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+212 612 345 678",
    city: "Casablanca",
    country: "Morocco",
    ticketsPurchased: 2,
    favoriteTeam: "Morocco",
    memberSince: "January 2023",
    avatar: "https://lovable.dev/opengraph-image-p98pqg.png"
  });

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      city: userData.city,
      country: userData.country,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (values: ProfileFormValues) => {
    try {
      // Here you would integrate with your MySQL backend
      console.log("Profile updated with:", values);
      
      // Mock success for now - replace with actual API call later
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    try {
      // Here you would integrate with your MySQL backend
      console.log("Password updated with:", values);
      
      // Mock success for now - replace with actual API call later
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      passwordForm.reset();
    } catch (error) {
      console.error("Password update failed:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update your password. Please verify your current password and try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    // Here you would handle the logout logic
    console.log("User logged out");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Navigate to home page or login page
  };

  // Mock purchased tickets for the bookings tab
  const tickets = [
    { id: "T-2023-1", match: "Morocco vs. Spain", date: "June 15, 2030", stadium: "Grand Stade de Casablanca", price: "€150" },
    { id: "T-2023-2", match: "Morocco vs. Portugal", date: "June 21, 2030", stadium: "Stade Mohammed V", price: "€120" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="bg-gradient-to-b from-morocco-red to-morocco-green py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 -mt-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* User sidebar */}
                <div className="md:w-1/3">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 relative">
                        <img
                          src={userData.avatar}
                          alt={userData.name}
                          className="rounded-full w-full h-full object-cover border-4 border-morocco-green"
                        />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Change Profile Picture</DialogTitle>
                              <DialogDescription>
                                Upload a new profile picture
                              </DialogDescription>
                            </DialogHeader>
                            {/* Image upload would go here */}
                            <div className="grid gap-4 py-4">
                              <Button className="w-full">Upload Image</Button>
                              <Button variant="outline" className="w-full">Cancel</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <CardTitle className="text-2xl">{userData.name}</CardTitle>
                      <CardDescription className="flex justify-center items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {userData.email}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.favoriteTeam')}</p>
                          <p className="font-medium">{userData.favoriteTeam}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.ticketsPurchased')}</p>
                          <p className="font-medium">{userData.ticketsPurchased}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{t('profile.memberSince')}</p>
                          <p className="font-medium">{userData.memberSince}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full text-morocco-red hover:text-red-700"
                        onClick={handleLogout}
                      >
                        {t('auth.logout')}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                {/* Main content */}
                <div className="flex-1">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-8">
                      <TabsTrigger value="profile">
                        <UserRound className="h-4 w-4 mr-2" />
                        {t('profile.profile')}
                      </TabsTrigger>
                      <TabsTrigger value="security">
                        <Lock className="h-4 w-4 mr-2" />
                        {t('profile.security')}
                      </TabsTrigger>
                      <TabsTrigger value="bookings">
                        <Ticket className="h-4 w-4 mr-2" />
                        {t('profile.bookings')}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('profile.personalInformation')}</CardTitle>
                          <CardDescription>
                            {t('profile.updateProfileInfo')}
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
                                    <FormLabel>{t('auth.name')}</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your name" {...field} />
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
                                    <FormLabel>{t('auth.email')}</FormLabel>
                                    <FormControl>
                                      <Input placeholder="your.email@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={profileForm.control}
                                  name="phone"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('profile.phone')}</FormLabel>
                                      <FormControl>
                                        <Input placeholder="+1 (555) 123-4567" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={profileForm.control}
                                  name="city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>{t('profile.city')}</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Your city" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              
                              <FormField
                                control={profileForm.control}
                                name="country"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('profile.country')}</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Your country" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button type="submit" className="bg-morocco-green hover:bg-green-700">
                                {t('profile.saveChanges')}
                              </Button>
                            </form>
                          </Form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="security">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('profile.changePassword')}</CardTitle>
                          <CardDescription>
                            {t('profile.updatePasswordDesc')}
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
                                    <FormLabel>{t('profile.currentPassword')}</FormLabel>
                                    <FormControl>
                                      <Input type="password" placeholder="••••••••" {...field} />
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
                                    <FormLabel>{t('profile.newPassword')}</FormLabel>
                                    <FormControl>
                                      <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                      {t('profile.passwordRequirements')}
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>{t('profile.confirmPassword')}</FormLabel>
                                    <FormControl>
                                      <Input type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <Button type="submit" className="bg-morocco-red hover:bg-red-700">
                                {t('profile.updatePassword')}
                              </Button>
                            </form>
                          </Form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="bookings">
                      <Card>
                        <CardHeader>
                          <CardTitle>{t('profile.myTickets')}</CardTitle>
                          <CardDescription>
                            {t('profile.ticketsDesc')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {tickets.length > 0 ? (
                            <div className="space-y-4">
                              {tickets.map((ticket) => (
                                <div key={ticket.id} className="border rounded-md p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h3 className="font-bold">{ticket.match}</h3>
                                      <p className="text-sm text-gray-500">{ticket.date} • {ticket.stadium}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold">{ticket.price}</p>
                                      <p className="text-xs text-gray-500">Ticket ID: {ticket.id}</p>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <Button variant="outline" size="sm" className="mr-2">
                                      {t('profile.viewDetails')}
                                    </Button>
                                    <Button size="sm">
                                      {t('profile.downloadTicket')}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8">
                              <Ticket className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                              <h3 className="text-lg font-medium">{t('profile.noTickets')}</h3>
                              <p className="text-gray-500 mt-1">{t('profile.noTicketsDesc')}</p>
                              <Button className="mt-4 bg-morocco-green hover:bg-green-700">
                                {t('profile.browseMatches')}
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
