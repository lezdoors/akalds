import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/common/EnhancedErrorBoundary';

const Index = lazy(() => import('@/pages/Index'));
const Marketing = lazy(() => import('@/pages/Marketing'));
const Payments = lazy(() => import('@/pages/Payments'));
const Ventures = lazy(() => import('@/pages/Ventures'));
const About = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const MentionsLegales = lazy(() => import('@/pages/MentionsLegales'));
const Confidentialite = lazy(() => import('@/pages/Confidentialite'));
const RGPD = lazy(() => import('@/pages/RGPD'));
const NotFound = lazy(() => import('@/pages/EnhancedNotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const routeElements = (
  <>
    <Route index element={<Index />} />
    <Route path="marketing" element={<Marketing />} />
    <Route path="payments" element={<Payments />} />
    <Route path="ventures" element={<Ventures />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="mentions-legales" element={<MentionsLegales />} />
    <Route path="confidentialite" element={<Confidentialite />} />
    <Route path="rgpd" element={<RGPD />} />
  </>
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      {routeElements}
    </Route>
    <Route path="/en" element={<Layout />}>
      {routeElements}
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <ErrorBoundary showDetails={process.env.NODE_ENV === 'development'}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <HelmetProvider>
            <BrowserRouter>
              <LanguageProvider defaultLanguage="fr">
                <Suspense fallback={<div className="min-h-screen" />}>
                  <AppRoutes />
                </Suspense>
                <Toaster />
                <Sonner />
              </LanguageProvider>
            </BrowserRouter>
          </HelmetProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
