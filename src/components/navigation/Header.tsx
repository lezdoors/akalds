import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, Globe, Sun, Moon, Monitor } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

// Navigation items configuration
const navigationItems = [
  { key: 'marketing', path: 'marketing' },
  { key: 'payments', path: 'payments' },
  { key: 'ventures', path: 'ventures' },
  { key: 'about', path: 'about' },
  { key: 'contact', path: 'contact' },
];

// Scroll hook for performance optimization
function useScrollBehavior() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollState);
    };

    let timeoutId: number;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = window.setTimeout(() => {
        handleScroll();
        timeoutId = 0;
      }, 16);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return { isScrolled };
}

// Active link detection hook
function useActiveLink() {
  const location = useLocation();
  const { language } = useLanguage();

  const isActiveLink = useCallback((path: string) => {
    const currentPath = location.pathname;
    const expectedPath = language === 'fr' ? `/fr/${path}` : `/${path}`;

    if (path === '' || path === 'home') {
      return currentPath === '/' || currentPath === '/fr';
    }

    return currentPath === expectedPath || currentPath.startsWith(expectedPath + '/');
  }, [location.pathname, language]);

  return { isActiveLink };
}

// Language selector component
const LanguageSelector = memo(() => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (newLanguage: 'en' | 'fr') => {
    if (newLanguage === language) return;

    const currentPath = location.pathname;
    let newPath: string;

    if (language === 'en' && newLanguage === 'fr') {
      newPath = `/fr${currentPath}`;
    } else if (language === 'fr' && newLanguage === 'en') {
      newPath = currentPath.replace(/^\/fr/, '') || '/';
    } else {
      return;
    }

    setLanguage(newLanguage);
    navigate(newPath, { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 h-9 px-3 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label={t('nav.language')}
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">{language.toUpperCase()}</span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-neutral-900/95 backdrop-blur-md border border-white/10">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={cn(
            "cursor-pointer transition-colors duration-200 text-white/80 hover:text-white",
            language === 'en' && "bg-primary/20 text-white"
          )}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('fr')}
          className={cn(
            "cursor-pointer transition-colors duration-200 text-white/80 hover:text-white",
            language === 'fr' && "bg-primary/20 text-white"
          )}
        >
          Francais
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

// Theme selector component
const ThemeSelector = memo(() => {
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Toggle theme"
        >
          <ThemeIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-neutral-900/95 backdrop-blur-md border border-white/10">
        <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer text-white/80 hover:text-white">
          <Sun className="w-4 h-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer text-white/80 hover:text-white">
          <Moon className="w-4 h-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer text-white/80 hover:text-white">
          <Monitor className="w-4 h-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

// Services dropdown for desktop
// Navigation link component
const NavigationLink = memo(({
  item,
  isActive,
}: {
  item: { key: string; path: string };
  isActive: boolean;
}) => {
  const { t, getLocalizedPath } = useLanguage();

  const linkPath = getLocalizedPath(item.path);

  return (
    <Link
      to={linkPath}
      className={cn(
        "relative text-white/70 hover:text-white transition-all duration-300 group",
        "font-medium tracking-tight",
        isActive && "text-white font-semibold"
      )}
    >
      {t(`nav.${item.key}`)}
      <span
        className={cn(
          "absolute -bottom-1 left-1/2 h-0.5 bg-primary transform -translate-x-1/2",
          isActive ? "w-full" : "w-0"
        )}
      />
    </Link>
  );
});

// Mobile navigation component
const MobileNavigation = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, getLocalizedPath } = useLanguage();
  const { isActiveLink } = useActiveLink();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(getLocalizedPath(path));
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden h-11 w-11 p-0 touch-target text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:w-80 bg-neutral-950/95 backdrop-blur-xl border-l border-white/10"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-bold tracking-tight text-white">
            Navigation
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-2 mt-8">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "text-left text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200",
                "text-white/70 hover:bg-white/5 hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-primary/20",
                "min-h-[44px] flex items-center",
                isActiveLink(item.path) && "bg-primary/15 text-white font-semibold"
              )}
            >
              {t(`nav.${item.key}`)}
            </button>
          ))}

          {/* Mobile CTA */}
          <div className="pt-6 border-t border-white/10">
            <Button
              onClick={() => handleNavigation('contact')}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {t('nav.getStarted')}
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/40">Language</span>
              <LanguageSelector />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/40">Theme</span>
              <ThemeSelector />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
});

// Main header component
export const Header = memo(() => {
  const { isScrolled } = useScrollBehavior();
  const { isActiveLink } = useActiveLink();
  const { language, t, getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  const homePath = language === 'fr' ? '/fr' : '/';

  return (
    <>
      {/* Skip navigation for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-primary text-white px-4 py-2 rounded-md"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div>
              <Link to={homePath} className="flex items-center gap-2.5 group" aria-label="Akal Digital Services - Accueil">
                <img
                  src="/brand/akal-logo-white.png"
                  alt=""
                  width="40"
                  height="40"
                  className="h-8 lg:h-9 w-auto transition-opacity group-hover:opacity-90"
                />
                <span className="hidden sm:inline text-lg lg:text-xl font-bold tracking-tight text-white">
                  AKAL
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8" role="navigation">
              {navigationItems.map((item) => (
                <div key={item.key}>
                  <NavigationLink
                    item={item}
                    isActive={isActiveLink(item.path)}
                  />
                </div>
              ))}
            </nav>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSelector />
              <ThemeSelector />

              {/* CTA Button */}
              <div>
                <Button
                  onClick={() => navigate(getLocalizedPath('contact'))}
                  className={cn(
                    "bg-white/10 hover:bg-white/20 text-white font-semibold ring-1 ring-white/20",
                    "px-6 py-2 h-10 rounded-lg backdrop-blur",
                    "hover:shadow-lg",
                    "transition-all duration-300",
                    "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                  )}
                >
                  {t('nav.getStarted')}
                </Button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center space-x-2">
              <LanguageSelector />
              <MobileNavigation />
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
});

Header.displayName = 'Header';
