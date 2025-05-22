
import React, { useState } from 'react';
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
import { toast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";
import { useTranslation } from 'react-i18next';

const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordProps {
  onBackToLoginClick: () => void;
}

const ForgotPassword = ({ onBackToLoginClick }: ForgotPasswordProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      // Here you would integrate with your MySQL backend
      console.log("Forgot password submitted with:", values);
      
      // Mock success for now - replace with actual API call later
      toast({
        title: "Reset Link Sent",
        description: "If an account exists with this email, you will receive a password reset link shortly.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
      toast({
        title: "Request Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 text-center">
        <div className="bg-green-50 rounded-full mx-auto h-20 w-20 flex items-center justify-center mb-6">
          <Mail className="h-10 w-10 text-morocco-green" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{t('auth.checkYourEmail')}</h2>
        <p className="text-gray-600 mb-6">
          {t('auth.resetLinkSent')}
        </p>
        <Button
          variant="outline"
          onClick={onBackToLoginClick}
          className="mx-auto flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('auth.backToLogin')}
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <button
        onClick={onBackToLoginClick}
        className="flex items-center text-gray-500 hover:text-morocco-red mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        {t('auth.backToLogin')}
      </button>
      
      <h2 className="text-2xl font-bold text-center mb-4">{t('auth.resetPassword')}</h2>
      <p className="text-center text-gray-600 mb-6">
        {t('auth.resetInstructions')}
      </p>
      
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
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-morocco-green hover:bg-green-700">
            {t('auth.sendResetLink')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPassword;
