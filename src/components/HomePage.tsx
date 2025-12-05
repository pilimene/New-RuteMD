import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { BookingWidget } from './BookingWidget';
import { WhyChooseUs } from './WhyChooseUs';
import { PopularRoutes } from './PopularRoutes';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { Footer } from './Footer';

import { StatsSection } from './StatsSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <BookingWidget />
        <StatsSection />
        <PopularRoutes />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
