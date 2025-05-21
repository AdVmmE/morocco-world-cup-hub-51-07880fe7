
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  
  const languages = ['English', 'Français', 'العربية'];
  
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    // In a real implementation, this would change the app's language
    // and potentially adjust text direction for Arabic
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <div className="w-12 h-12 bg-morocco-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                M30
              </div>
              <div className="ml-3 text-lg font-display font-bold">
                <span className="text-morocco-red">Morocco</span>
                <span className="text-morocco-green"> 2030</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="font-medium hover:text-morocco-red transition-colors">
              Home
            </Link>
            <Link to="/matches" className="font-medium hover:text-morocco-red transition-colors">
              Matches
            </Link>
            <Link to="/stadiums" className="font-medium hover:text-morocco-red transition-colors">
              Stadiums
            </Link>
            <Link to="/tickets" className="font-medium hover:text-morocco-red transition-colors">
              Tickets
            </Link>
            <Link to="/news" className="font-medium hover:text-morocco-red transition-colors">
              News
            </Link>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  {currentLanguage} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem 
                    key={language}
                    onClick={() => handleLanguageChange(language)}
                    className={language === currentLanguage ? "bg-muted" : ""}
                  >
                    {language}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Login Button */}
            <Button className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="px-4 py-2 hover:bg-muted rounded-md">
                Home
              </Link>
              <Link to="/matches" className="px-4 py-2 hover:bg-muted rounded-md">
                Matches
              </Link>
              <Link to="/stadiums" className="px-4 py-2 hover:bg-muted rounded-md">
                Stadiums
              </Link>
              <Link to="/tickets" className="px-4 py-2 hover:bg-muted rounded-md">
                Tickets
              </Link>
              <Link to="/news" className="px-4 py-2 hover:bg-muted rounded-md">
                News
              </Link>
              
              {/* Language Selection */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Select Language</p>
                <div className="flex space-x-2">
                  {languages.map((language) => (
                    <Button
                      key={language}
                      variant={language === currentLanguage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLanguageChange(language)}
                    >
                      {language}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="px-4 pt-2">
                <Button className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
