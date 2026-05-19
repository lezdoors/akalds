import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/EnhancedErrorBoundary';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';

export function Layout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex flex-col">
        <ScrollToTop />
        <Header />
        <main id="main-content" className="flex-1" role="main">
          <ErrorBoundary>
            <Suspense fallback={<div className="min-h-screen" />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
