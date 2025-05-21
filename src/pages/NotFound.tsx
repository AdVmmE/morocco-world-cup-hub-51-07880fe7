
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-morocco-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl font-bold text-morocco-red">404</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">Page not found</h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              We couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link to="/">
              <Button size="lg" className="bg-morocco-red hover:bg-red-700">
                Return to Homepage
              </Button>
            </Link>
            
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">You might be looking for:</h2>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/matches" className="text-morocco-green hover:underline">
                  Match Schedule
                </Link>
                <Link to="/stadiums" className="text-morocco-green hover:underline">
                  Stadium Information
                </Link>
                <Link to="/tickets" className="text-morocco-green hover:underline">
                  Ticket Sales
                </Link>
                <Link to="/news" className="text-morocco-green hover:underline">
                  Latest News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
