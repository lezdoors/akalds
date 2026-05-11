import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  smooth?: boolean;
  behavior?: ScrollBehavior;
}

export function ScrollToTop({ 
  smooth = false,
  behavior = 'auto'
}: ScrollToTopProps = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : behavior,
    });
  }, [pathname, smooth, behavior]);

  return null;
}

// Hook for programmatic scrolling
export function useScrollToTop() {
  const scrollToTop = (smooth = false) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  return scrollToTop;
}

// Hook for scrolling to specific elements
export function useScrollToElement() {
  const scrollToElement = (
    elementId: string, 
    options?: ScrollIntoViewOptions
  ) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        ...options,
      });
    }
  };

  return scrollToElement;
}

// Hook for scroll position tracking
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > previousScrollY ? 'down' : 'up');
      
      previousScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollY, scrollDirection };
}