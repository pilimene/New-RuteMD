import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy load pages for better performance (code splitting)
const HomePage = lazy(() => import('./components/HomePage').then(m => ({ default: m.HomePage })));
const RouteSelectionPage = lazy(() => import('./components/RouteSelectionPage').then(m => ({ default: m.RouteSelectionPage })));
const RouteDetailsPage = lazy(() => import('./components/RouteDetailsPage').then(m => ({ default: m.RouteDetailsPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const BusCharterPage = lazy(() => import('./components/BusCharterPage').then(m => ({ default: m.BusCharterPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#3870db] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Analytics />
      <SpeedInsights />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/routes" element={<RouteSelectionPage />} />
          <Route path="/route/:routeId" element={<RouteDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/bus-charter" element={<BusCharterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}