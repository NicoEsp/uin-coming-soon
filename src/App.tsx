
import { lazy, Suspense, useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Simple loading fallback - efficient implementation
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-uin-black">
    <div className="w-8 h-8 border-t-2 border-uin-purple rounded-full animate-spin"></div>
  </div>
);

// Lazy load page components to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Create QueryClient with optimized cache settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false, // Reduce unnecessary refetches
      cacheTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  // Optimize initial route loading
  const [isRouteReady, setIsRouteReady] = useState(false);
  
  useEffect(() => {
    // Defer route initialization until after critical content loads
    const timer = setTimeout(() => {
      setIsRouteReady(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isRouteReady) return <PageLoader />;
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
