
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'

// Use lazy loading for the main App component
const App = lazy(() => import('./App.tsx'))

// Create a streamlined loading state
const LoadingFallback = () => (
  <div className="min-h-screen bg-uin-black flex items-center justify-center">
    <div className="w-16 h-16">
      <img 
        src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
        alt="UIN Logo" 
        className="w-full h-auto" 
        width="64"
        height="64"
      />
    </div>
  </div>
)

// Create root outside of render call to improve performance
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render with minimal initial payload
root.render(
  <Suspense fallback={<LoadingFallback />}>
    <App />
  </Suspense>
);
