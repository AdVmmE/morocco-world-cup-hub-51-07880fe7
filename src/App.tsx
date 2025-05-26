
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Matches from "./pages/Matches";
import Stadiums from "./pages/Stadiums";
import StadiumDetail from "./pages/StadiumDetail";
import CityDetail from "./pages/CityDetail";
import MoroccoCities from "./pages/MoroccoCities";
import Tickets from "./pages/Tickets";
import News from "./pages/News";
import Auth from "./pages/Auth";
import UserProfile from "./pages/UserProfile";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import CardDemo from "./pages/CardDemo";
import { LanguageProvider } from "./i18n/LanguageContext";

// Import i18n initialization
import "./i18n/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/stadiums" element={<Stadiums />} />
              <Route path="/stadium/:id" element={<StadiumDetail />} />
              <Route path="/city/:name" element={<CityDetail />} />
              <Route path="/morocco-cities" element={<MoroccoCities />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/news" element={<News />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/cards" element={<CardDemo />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
