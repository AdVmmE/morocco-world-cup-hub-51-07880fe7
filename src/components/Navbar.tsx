
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Languages, Menu, User, LogOut, Settings, Ticket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from '@/i18n/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock authentication state - replace with your actual auth state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  const navigate = useNavigate();
  
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' }
  ];
  
  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode);
    // Close mobile menu when language changes
    setIsMenuOpen(false);
  };

  // Apply RTL class to body when language changes
  useEffect(() => {
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [isRTL]);

  const handleLogout = () => {
    // Here you would handle logout logic
    setIsAuthenticated(false);
    navigate('/');
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
              <div className={`ml-3 text-lg font-display font-bold ${isRTL ? 'rtl:mr-3 rtl:ml-0' : ''}`}>
                <span className="text-morocco-red">Morocco</span>
                <span className="text-morocco-green"> 2030</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="font-medium hover:text-morocco-red transition-colors">
              {t('navbar.home')}
            </Link>
            <Link to="/matches" className="font-medium hover:text-morocco-red transition-colors">
              {t('navbar.matches')}
            </Link>
            <Link to="/stadiums" className="font-medium hover:text-morocco-red transition-colors">
              {t('navbar.stadiums')}
            </Link>
            <Link to="/tickets" className="font-medium hover:text-morocco-red transition-colors">
              {t('navbar.tickets')}
            </Link>
            <Link to="/news" className="font-medium hover:text-morocco-red transition-colors">
              {t('navbar.news')}
            </Link>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Languages className="mr-2 h-4 w-4" />
                  {languages.find(lang => lang.code === currentLanguage)?.label || 'English'} 
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem 
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={language.code === currentLanguage ? "bg-muted" : ""}
                  >
                    {language.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-1 rounded-full">
                    <div className="h-8 w-8 rounded-full bg-morocco-green flex items-center justify-center text-white">
                      <User className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="h-4 w-4 mr-2" />
                    {t('profile.profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Ticket className="h-4 w-4 mr-2" />
                    {t('profile.myTickets')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="h-4 w-4 mr-2" />
                    {t('profile.settings')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('auth.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="flex items-center gap-1" onClick={() => navigate('/auth')}>
                <User className="h-4 w-4" />
                {t('navbar.signIn')}
              </Button>
            )}
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
                {t('navbar.home')}
              </Link>
              <Link to="/matches" className="px-4 py-2 hover:bg-muted rounded-md">
                {t('navbar.matches')}
              </Link>
              <Link to="/stadiums" className="px-4 py-2 hover:bg-muted rounded-md">
                {t('navbar.stadiums')}
              </Link>
              <Link to="/tickets" className="px-4 py-2 hover:bg-muted rounded-md">
                {t('navbar.tickets')}
              </Link>
              <Link to="/news" className="px-4 py-2 hover:bg-muted rounded-md">
                {t('navbar.news')}
              </Link>
              
              {/* Language Selection */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Select Language</p>
                <div className="flex space-x-2">
                  {languages.map((language) => (
                    <Button
                      key={language.code}
                      variant={language.code === currentLanguage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleLanguageChange(language.code)}
                    >
                      {language.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Authentication */}
              <div className="px-4 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-muted rounded-md">
                      <User className="h-4 w-4 mr-2" />
                      {t('profile.profile')}
                    </Link>
                    <Button 
                      className="w-full mt-2 bg-red-500 hover:bg-red-600" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('auth.logout')}
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      navigate('/auth');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t('navbar.signIn')}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
