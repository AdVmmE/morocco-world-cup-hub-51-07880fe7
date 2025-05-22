
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import ForgotPassword from "@/components/auth/ForgotPassword";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-morocco-red">
              Morocco <span className="text-morocco-green">2030</span>
            </h1>
            <p className="text-gray-600 mt-2">
              {activeTab === "login" ? "Welcome back to the World Cup experience" : 
               activeTab === "register" ? "Join us for the World Cup journey" :
               "We'll help you recover your account"}
            </p>
          </div>
          
          <Card className="overflow-hidden border-t-4 border-morocco-red shadow-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Login onForgotPasswordClick={() => setActiveTab("forgotPassword")} />
              </TabsContent>
              <TabsContent value="register">
                <Register onSuccess={() => setActiveTab("login")} />
              </TabsContent>
              <TabsContent value="forgotPassword">
                <ForgotPassword onBackToLoginClick={() => setActiveTab("login")} />
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="mb-4">
              {activeTab !== "forgotPassword" && (
                <>
                  {activeTab === "login" ? "New to Morocco 2030? " : "Already have an account? "}
                  <button
                    onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
                    className="text-morocco-green hover:underline font-medium"
                  >
                    {activeTab === "login" ? "Create an account" : "Sign in"}
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
