import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Constants
const CALENDLY_URL = 'https://calendly.com/ninajchapuis/30min?text_color=0f172a&primary_color=6366f1&utm_source=website&utm_medium=sticky_cta&utm_campaign=mobile';
const STORAGE_KEY = 'sticky-cta-dismissed';
const SHOW_DELAY = 600;

export function StickyMobileCTA() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Check if we should hide on current page
  const shouldHideOnCurrentPage = location.pathname === '/contact' || location.pathname.includes('/contact');

  // Check session storage for dismissed state
  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  // Monitor Calendly overlay
  useEffect(() => {
    const checkCalendlyOverlay = () => {
      const calendlyOverlay = document.querySelector('.calendly-overlay, .calendly-popup-widget, [data-calendly]');
      setIsCalendlyOpen(!!calendlyOverlay);
    };

    const observer = new MutationObserver(checkCalendlyOverlay);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Initial check
    checkCalendlyOverlay();

    return () => observer.disconnect();
  }, []);

  // Handle mobile keyboard
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      const keyboardHeight = Math.max(0, windowHeight - viewportHeight);
      setKeyboardHeight(keyboardHeight);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => window.visualViewport?.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  // Show with delay after page load
  useEffect(() => {
    if (!isMobile || isDismissed || shouldHideOnCurrentPage || isCalendlyOpen) {
      setIsVisible(false);
      return;
    }

    let showTimer: number | NodeJS.Timeout;
    
    if ('requestIdleCallback' in window) {
      showTimer = window.requestIdleCallback(() => {
        setTimeout(() => setIsVisible(true), SHOW_DELAY);
      });
    } else {
      showTimer = setTimeout(() => setIsVisible(true), SHOW_DELAY);
    }

    return () => {
      if ('requestIdleCallback' in window && typeof showTimer === 'number') {
        window.cancelIdleCallback(showTimer);
      } else {
        clearTimeout(showTimer as NodeJS.Timeout);
      }
    };
  }, [isMobile, isDismissed, shouldHideOnCurrentPage, isCalendlyOpen, location.pathname]);

  const handleCalendlyClick = useCallback(() => {
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'sticky_cta_click', {
        event_category: 'engagement',
        event_label: location.pathname,
        value: 1
      });
    }

    // Custom event
    window.dispatchEvent(new CustomEvent('sticky_cta_click', {
      detail: { page: location.pathname, destination: 'calendly' }
    }));

    // Open Calendly
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  }, [location.pathname]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }, []);

  // Don't render on desktop or when conditions aren't met
  if (!isMobile || !isVisible || isDismissed || shouldHideOnCurrentPage || isCalendlyOpen) {
    return null;
  }

  return (
    <>
      {/* Reserved space to prevent layout shift */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
      
      {/* Sticky CTA Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ 
          transform: keyboardHeight > 0 ? `translateY(-${keyboardHeight}px)` : 'translateY(0)',
          paddingBottom: 'env(safe-area-inset-bottom)'
        }}
        role="region"
        aria-label="Quick actions"
      >
        {/* Background with gradient and blur */}
        <div className="relative bg-gradient-to-r from-primary via-primary to-purple-600 backdrop-blur-sm bg-opacity-90 border-t border-white/10 shadow-lg rounded-t-2xl">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Hide quick actions"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Optional secondary link */}
              <Link 
                to="/contact" 
                className="text-white/80 text-sm hover:text-white transition-colors focus:outline-none focus:underline"
              >
                Contact
              </Link>

              {/* Primary CTA Button */}
              <Button
                onClick={handleCalendlyClick}
                className="flex-1 min-h-[44px] bg-white/90 hover:bg-white text-primary font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:transition-none"
                data-cta="sticky-mobile"
                data-destination="calendly"
                role="button"
                aria-label="Book a strategy call on Calendly"
              >
                Book a Strategy Call
                <ArrowRight className="ml-2 w-4 h-4 opacity-80" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}