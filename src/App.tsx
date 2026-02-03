import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ScrollToTop } from './components/ScrollToTop';
import { useLanguage } from './i18n';

const GA_MEASUREMENT_ID = 'G-2CHB70F2EM';

function GoogleTagPageView() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;
    const pagePath = location.pathname + location.search;
    const pageLocation = window.location.origin + pagePath;
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_location: pageLocation,
    });
  }, [location.pathname, location.search]);
  return null;
}

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

// Language wrapper component to sync URL with language context
function LanguageRoute({ children }: { children: React.ReactNode }) {
  const { lang } = useParams<{ lang: string }>();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (lang === 'ro' || lang === 'ru') {
      setLanguage(lang);
    }
  }, [lang, setLanguage]);

  return <>{children}</>;
}

// Root redirect component
function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('rutemd-language');
    if (savedLang === 'ro' || savedLang === 'ru') {
      navigate(`/${savedLang}`, { replace: true });
      return;
    }

    // Auto-detect from browser
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (browserLang?.toLowerCase().startsWith('ru')) {
      navigate('/ru', { replace: true });
    } else {
      navigate('/ro', { replace: true });
    }
  }, [navigate]);

  return <PageLoader />;
}

export default function App() {
  return (
    <Router>
      <GoogleTagPageView />
      <Analytics />
      <SpeedInsights />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<LanguageRoute><HomePage /></LanguageRoute>} />
          <Route path="/:lang/routes" element={<LanguageRoute><RouteSelectionPage /></LanguageRoute>} />
          <Route path="/:lang/route/:routeId" element={<LanguageRoute><RouteDetailsPage /></LanguageRoute>} />
          <Route path="/:lang/about" element={<LanguageRoute><AboutPage /></LanguageRoute>} />
          <Route path="/:lang/contact" element={<LanguageRoute><ContactPage /></LanguageRoute>} />
          <Route path="/:lang/bus-charter" element={<LanguageRoute><BusCharterPage /></LanguageRoute>} />
          
          {/* Fallback - redirect to language-prefixed route */}
          <Route path="*" element={<Navigate to="/ro" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}