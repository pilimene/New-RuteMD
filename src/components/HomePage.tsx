import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { BookingWidget } from './BookingWidget';
import { WhyChooseUs } from './WhyChooseUs';
import { PopularRoutes } from './PopularRoutes';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { Footer } from './Footer';
import { StatsSection } from './StatsSection';
import { SEO } from './SEO';
import { useTranslation } from '../i18n';

function scrollToAmenities() {
  const el = document.getElementById('amenities');
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export function HomePage() {
  const { language } = useTranslation();

  // Scroll to #amenities on load or when hash changes (e.g. user opens /ro#amenities)
  useEffect(() => {
    if (window.location.hash !== '#amenities') return;
    const timer = setTimeout(scrollToAmenities, 400);
    return () => clearTimeout(timer);
  }, [language]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === '#amenities') scrollToAmenities();
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // SEO content based on language - Focus on PRIMARY route (Chisinau - Istanbul)
  const seoContent = {
    ro: {
      title: 'Autocar Chișinău - Istanbul | Transport Moldova - Turcia | Bilete Online',
      description: 'Transport cu autocarul Chișinău - Istanbul. Curse regulate Moldova - Turcia. Bilete online de la 1000 MDL. Autocare moderne Mercedes, plecare Duminică, confort premium. Rezervă acum!',
      keywords: 'autocar chisinau istanbul, bilete autocar istanbul, transport moldova turcia, curse autocar chisinau istanbul, autocar moldova turcia, bilete autocar turcia, transport international moldova turcia, curse regulate chisinau istanbul, autocar mercedes chisinau istanbul, rutemd'
    },
    ru: {
      title: 'Автобус Кишинёв - Стамбул | Перевозки Молдова - Турция | Билеты Онлайн',
      description: 'Автобусные перевозки Кишинёв - Стамбул. Регулярные рейсы Молдова - Турция. Билеты онлайн от 1000 MDL. Современные автобусы Mercedes, отправление в воскресенье, премиум комфорт. Бронируйте сейчас!',
      keywords: 'автобус кишинев стамбул, билеты автобус стамбул, перевозки молдова турция, рейсы автобус кишинев стамбул, автобус молдова турция, билеты автобус турция, международные перевозки молдова турция, регулярные рейсы кишинев стамбул, автобус мерседес кишинев стамбул, rutemd'
    }
  };

  const content = seoContent[language];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": content.title,
    "description": content.description,
    "url": "https://rutemd.md/",
    "inLanguage": language === 'ru' ? 'ru-RU' : 'ro-RO',
    "isPartOf": {
      "@type": "WebSite",
      "name": "RUTEMD",
      "url": "https://rutemd.md"
    },
    "about": {
      "@type": "TripAction",
      "name": language === 'ru' ? "Автобус Кишинёв - Стамбул" : "Autocar Chișinău - Istanbul",
      "fromLocation": {
        "@type": "City",
        "name": language === 'ru' ? "Кишинёв" : "Chișinău",
        "containedInPlace": {
          "@type": "Country",
          "name": language === 'ru' ? "Молдова" : "Moldova"
        }
      },
      "toLocation": {
        "@type": "City",
        "name": language === 'ru' ? "Стамбул" : "Istanbul",
        "containedInPlace": {
          "@type": "Country",
          "name": language === 'ru' ? "Турция" : "Turcia"
        }
      }
    },
    "mainEntity": {
      "@type": "Offer",
      "name": language === 'ru' ? "Билеты автобус Кишинёв - Стамбул" : "Bilete autocar Chișinău - Istanbul",
      "price": "1000",
      "priceCurrency": "MDL",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "Service",
        "name": language === 'ru' ? "Автобусный рейс Кишинёв - Стамбул" : "Cursă autocar Chișinău - Istanbul",
        "provider": {
          "@type": "BusCompany",
          "name": "RUTEMD"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO 
        title={content.title}
        description={content.description}
        keywords={content.keywords}
        canonicalUrl="https://rutemd.md/"
        structuredData={structuredData}
        lang={language}
      />
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
