
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Mail, Lock, Shield } from "lucide-react";
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const adminLoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  rememberMe: z.boolean().default(false),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AdminLogin = () => {
  const { t } = useTranslation();

  const form = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: AdminLoginFormValues) => {
    try {
      // Here you would integrate with your MySQL backend for admin auth
      console.log("Admin login submitted with:", values);
      
      // Mock success for now - replace with actual API call later
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin dashboard.",
      });
      
      // Navigate to admin dashboard
    } catch (error) {
      console.error("Admin login failed:", error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-morocco-blue rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-morocco-blue">Admin</span> Portal
            </h1>
            <p className="text-gray-600 mt-2">
              Secure access for World Cup 2030 administrators
            </p>
          </div>
          
          <Card className="border-t-4 border-morocco-blue shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{t('auth.adminLogin')}</CardTitle>
              <CardDescription>
                {t('auth.adminLoginDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {t('auth.email')}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="admin@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          {t('auth.password')}
                        </FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-medium cursor-pointer">
                            {t('auth.rememberMe')}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    
                    <a className="text-sm text-morocco-blue hover:underline">
                      {t('auth.forgotPassword')}
                    </a>
                  </div>
                  
                  <Button type="submit" className="w-full bg-morocco-blue hover:bg-blue-700">
                    {t('auth.secureLogin')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {t('auth.accessRestricted')}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
