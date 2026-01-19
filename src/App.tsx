import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { RouteSelectionPage } from './components/RouteSelectionPage';
import { RouteDetailsPage } from './components/RouteDetailsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BusCharterPage } from './components/BusCharterPage';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routes" element={<RouteSelectionPage />} />
        <Route path="/route/:routeId" element={<RouteDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/bus-charter" element={<BusCharterPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}