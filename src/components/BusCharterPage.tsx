import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  ChevronRight,
  ChevronDown,
  Users,
  Trophy,
  Briefcase,
  PartyPopper,
  Building2,
  CheckCircle2,
  Clock,
  Shield,
  Headphones,
  MapPin,
  Usb,
  Armchair,
  ChevronLeft,
  Tv,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent } from './ui/dialog';
import { motion } from 'motion/react';

export function BusCharterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedBus, setSelectedBus] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [centerIndex, setCenterIndex] = useState(1);

  const services = [
    {
      icon: <MapPin className="w-8 h-8 text-[#3870db]" />,
      title: "Excursii și Tururi Organizate",
      description: "Transport confortabil pentru grupuri turistice în străinătate"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-[#3870db]" />,
      title: "Transport pentru Evenimente Corporate",
      description: "Conferințe, training-uri, team building-uri"
    },
    {
      icon: <Trophy className="w-8 h-8 text-[#3870db]" />,
      title: "Deplasări Sportive și Cantonamente",
      description: "Transport sigur pentru echipe și suporteri"
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#3870db]" />,
      title: "Transport pentru Târguri și Expoziții",
      description: "Delegații de afaceri în Europa"
    },
    {
      icon: <Users className="w-8 h-8 text-[#3870db]" />,
      title: "Transport Angajați și Personal",
      description: "Curse regulate pentru fabrici și companii"
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-[#3870db]" />,
      title: "Evenimente Speciale și Sărbători",
      description: "Nunți, botezuri, aniversări"
    }
  ];

  const advantages = [
    "Flotă proprie - Nu suntem brokeri sau intermediari",
    "Șoferi profesioniști cu experiență internațională",
    "Autocare verificate tehnic și asigurate complet",
    "Flexibilitate totală în planificarea rutelor",
    "Suport pe toată durata călătoriei",
    "Prețuri flexibile fără costuri ascunse"
  ];

  const fleet = [
    { 
      seats: "22", 
      type: "Mercedes Sprinter 519", 
      mainImage: "https://images.unsplash.com/photo-1713273136386-0b696bd08154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pYnVzJTIwOCUyMHNlYXRzfGVufDF8fHx8MTc2MzQxMDcxMnww&ixlib=rb-4.1.0&q=80&w=1080",
      galleryImages: [
        "https://images.unsplash.com/photo-1713273136386-0b696bd08154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pYnVzJTIwOCUyMHNlYXRzfGVufDF8fHx8MTc2MzQxMDcxMnww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1631450007927-17fc9e29a031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pYnVzJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNDEwNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    { 
      seats: "50", 
      type: "Setra", 
      mainImage: "https://images.unsplash.com/photo-1702605042180-0c2d567953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaCUyMGJ1cyUyMDMwJTIwc2VhdHN8ZW58MXx8fHwxNzYzNDEwNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      galleryImages: [
        "https://images.unsplash.com/photo-1702605042180-0c2d567953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaCUyMGJ1cyUyMDMwJTIwc2VhdHN8ZW58MXx8fHwxNzYzNDEwNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1579372785655-a81b19e99b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0b3VyJTIwYnVzfGVufDF8fHx8MTc2MzQwMDgyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    { 
      seats: "51", 
      type: "Mercedes Travego", 
      mainImage: "https://images.unsplash.com/photo-1631450007927-17fc9e29a031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pYnVzJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNDEwNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      galleryImages: [
        "https://images.unsplash.com/photo-1631450007927-17fc9e29a031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pYnVzJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNDEwNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1713273136386-0b696bd08154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pYnVzJTIwOCUyMHNlYXRzfGVufDF8fHx8MTc2MzQxMDcxMnww&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    { 
      seats: "53", 
      type: "Mercedes Tourismo", 
      mainImage: "https://images.unsplash.com/photo-1579372785655-a81b19e99b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0b3VyJTIwYnVzfGVufDF8fHx8MTc2MzQwMDgyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      galleryImages: [
        "https://images.unsplash.com/photo-1579372785655-a81b19e99b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0b3VyJTIwYnVzfGVufDF8fHx8MTc2MzQwMDgyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1762378724772-68c054805e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2FjaCUyMGJ1c3xlbnwxfHx8fDE3NjM0MTA3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    },
    { 
      seats: "59", 
      type: "Setra Comfort Class", 
      mainImage: "https://images.unsplash.com/photo-1762378724772-68c054805e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2FjaCUyMGJ1c3xlbnwxfHx8fDE3NjM0MTA3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      galleryImages: [
        "https://images.unsplash.com/photo-1762378724772-68c054805e8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2FjaCUyMGJ1c3xlbnwxfHx8fDE3NjM0MTA3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1702605042180-0c2d567953a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FjaCUyMGJ1cyUyMDMwJTIwc2VhdHN8ZW58MXx8fHwxNzYzNDEwNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
      ]
    }
  ];

  const faqs = [
    {
      question: "Cu cât timp înainte trebuie să rezerv?",
      answer: "Recomandăm rezervarea cu cel puțin 30 zile înainte pentru a asigura disponibilitatea. Pentru evenimente mai mari sau în sezonul de vârf, sugerăm rezervarea cu 5-6 săptămâni în avans. Totuși, acceptăm și rezervări last-minute în funcție de disponibilitate."
    },
    {
      question: "Ce documente sunt necesare pentru călătorii internaționale?",
      answer: "Pentru călătorii internaționale, fiecare pasager trebuie să aibă pașaport valabil sau buletin (în funcție de destinație) și eventual vize necesare. Noi ne ocupăm de toate documentele necesare pentru vehicul și șofer. Vă vom oferi o listă completă după confirmarea rezervării."
    },
    {
      question: "Este inclus șoferul în preț?",
      answer: "Da, prețul include șoferul profesionist cu experiență internațională. Dar nu include cheltuielile șoferului legate de cazare si masa. Nu există costuri ascunse."
    },
    {
      question: "Pot modifica traseul după semnarea contractului?",
      answer: "Da, oferim flexibilitate maximă, în funcție de distanță și program."
    },
    {
      question: "Ce se întâmplă în caz de întârzieri?",
      answer: "În cazuri rare de probleme tehnice, asigurăm un vehicul de rezervă în cel mai scurt timp. De asemenea, șoferii noștri sunt instruiți să gestioneze orice situație neprevăzută și să vă țină la curent."
    },
    {
      question: "Ce facilități sunt disponibile în autocare?",
      answer: "Toate vehiculele noastre sunt echipate cu aer condiționat, prize USB pentru fiecare scaun, sistem audio-video și scaune reclinabile confortabile. La cerere, putem asigura apă îmbuteliată și răcoritoare."
    }
  ];
  
  const partners = [
    "https://images.unsplash.com/photo-1732788562330-633380e99349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29ycG9yYXRlJTIwbG9nbyUyMGJsYWNrJTIwb24lMjB3aGl0ZXxlbnwxfHx8fDE3NjQ4MDQyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1633796212691-0cfba2ab1dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbXBhbnklMjBsb2dvJTIwc3ltYm9sfGVufDF8fHx8MTc2NDgwNDI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1595409583957-5d1ec5869de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjBicmFuZCUyMGxvZ28lMjBtYXJrfGVufDF8fHx8MTc2NDgwNDI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1763792396324-17f2b907a263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBidXNpbmVzcyUyMGxvZ28lMjBkZXNpZ24lMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2NDgwNDI2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1560005360-f5df6037001a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBsb2dvJTIwZGVzaWdufGVufDF8fHx8MTc2NDgwNDI2OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1753037366208-be3fba467e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBvZ3JhcGh5JTIwbG9nbyUyMGRlc2lnbiUyMG1pbmltYWx8ZW58MXx8fHwxNzY0ODA0MjY5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-[#012141] py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-[14px] text-blue-200/60">
            <Link to="/" className="hover:text-white transition-colors">Acasă</Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="hover:text-white transition-colors">Servicii</span>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-white font-medium">Închiriere Autocare</span>
          </div>
        </div>
      </div>

      {/* Combined Hero & Fleet Showcase Section */}
      <section className="py-20 bg-gradient-to-r from-[#012141] to-[#001a30] relative overflow-hidden min-h-[900px] flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3870db] rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#3870db] rounded-full blur-[80px]" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          {/* Content Header */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white mb-6 font-bold text-5xl md:text-7xl leading-tight tracking-tight"
            >
              Închiriere Autocare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3870db] to-white">Pentru Destinații Internaționale</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 max-w-2xl mx-auto text-xl leading-relaxed font-light"
            >
              Flotă proprie de autocare moderne, Premium & Comfort. 
              De la microbuze pentru grupuri mici, la autocare turistice de lux.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-8 text-white/70"
            >
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <Clock className="w-5 h-5 text-[#3870db]" />
                <span>Asistență inclusă</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <Shield className="w-5 h-5 text-[#3870db]" />
                <span>Autocare moderne</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#3870db]" />
                <span>Prețuri flexibile</span>
              </div>
            </motion.div>
          </div>
          
          {/* Interactive Fleet Carousel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative h-[600px] flex items-center justify-center"
          >
            {/* Navigation Buttons */}
            <button
              onClick={() => setCenterIndex((prev) => (prev === 0 ? fleet.length - 1 : prev - 1))}
              className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all text-white border border-white/10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setCenterIndex((prev) => (prev === fleet.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full transition-all text-white border border-white/10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Carousel Cards */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
              {fleet.map((vehicle, index) => {
                const distance = index - centerIndex;
                const absDistance = Math.abs(distance);
                
                const isCenter = distance === 0;
                const isVisible = absDistance <= 2;
                
                if (!isVisible) return null;
                
                const scale = isCenter ? 1 : 0.75 - (absDistance - 1) * 0.1;
                const opacity = isCenter ? 1 : 0.5 - (absDistance - 1) * 0.2;
                const zIndex = 10 - absDistance;
                const offsetX = distance * 320; // Increased spacing
                
                return (
                  <motion.div
                    key={index}
                    className="absolute cursor-pointer"
                    onClick={() => setCenterIndex(index)}
                    initial={false}
                    animate={{
                      x: `${offsetX}px`,
                      scale: scale,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    style={{
                      width: '420px',
                    }}
                  >
                    <div className={`bg-white rounded-[30px] overflow-hidden transition-all duration-500 ${isCenter ? 'shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20' : 'shadow-xl grayscale-[0.5]'}`}>
                      <div className="flex flex-col items-center gap-6 p-8">
                        {/* Image */}
                        <div className="relative w-full max-w-[340px] aspect-[4/3]">
                          <div className="absolute inset-0 bg-gray-100 rounded-2xl transform scale-[1.02]" />
                          <div className="relative w-full h-full rounded-2xl overflow-hidden ring-4 ring-gray-50 shadow-md">
                            <ImageWithFallback
                              src={vehicle.mainImage}
                              alt={vehicle.type}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="w-full text-center">
                          <h3 className="text-[#012141] text-3xl font-bold mb-2 tracking-tight">
                            {vehicle.type}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
                            <Users className="w-5 h-5" />
                            <span className="text-lg font-medium">{vehicle.seats} Locuri</span>
                          </div>
                          
                          {isCenter && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBus(index);
                                setCurrentImageIndex(0);
                              }}
                              className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-8 py-3 rounded-full font-medium shadow-lg shadow-blue-500/30 transition-all"
                            >
                              Vezi Galerie Foto
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {fleet.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCenterIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === centerIndex ? 'bg-white w-12' : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bus Gallery Dialog - Moved logic outside loop for cleaner DOM */}
      <Dialog open={selectedBus !== null} onOpenChange={(open: boolean) => !open && setSelectedBus(null)}>
        <DialogContent className="max-w-4xl bg-white border-none p-0 overflow-hidden rounded-2xl">
          {selectedBus !== null && (
            <div className="flex flex-col">
              <div className="relative h-[500px] bg-black">
                <ImageWithFallback
                  src={fleet[selectedBus].galleryImages[currentImageIndex]}
                  alt={`${fleet[selectedBus].type} - Poză ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedBus(null)}
                  className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  aria-label="Închide"
                >
                  <X className="w-6 h-6" />
                </button>
                
                {/* Navigation Overlays */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === 0 ? fleet[selectedBus].galleryImages.length - 1 : prev - 1
                    )}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === fleet[selectedBus].galleryImages.length - 1 ? 0 : prev + 1
                    )}
                    className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold">{fleet[selectedBus].type}</h3>
                  <p className="opacity-80">{fleet[selectedBus].seats} Locuri Pasageri</p>
                </div>
              </div>

              {/* Thumbnails & Features */}
              <div className="p-6 bg-white">
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                  {fleet[selectedBus].galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex ? 'border-[#3870db]' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <ImageWithFallback src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-[#3870db]" />
                    <div className="text-sm font-medium text-gray-900">{fleet[selectedBus].seats} Locuri</div>
                  </div>
                  <div className="text-center">
                    <Armchair className="w-6 h-6 mx-auto mb-2 text-[#3870db]" />
                    <div className="text-sm font-medium text-gray-900">Scaune Reglabile</div>
                  </div>
                  <div className="text-center">
                    <Usb className="w-6 h-6 mx-auto mb-2 text-[#3870db]" />
                    <div className="text-sm font-medium text-gray-900">Prize USB</div>
                  </div>
                  <div className="text-center">
                    <Tv className="w-6 h-6 mx-auto mb-2 text-[#3870db]" />
                    <div className="text-sm font-medium text-gray-900">Multimedia</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Services Section */}
      <section className="py-12 bg-white border-t border-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-[#012141] font-bold text-2xl md:text-3xl tracking-tight">
                Servicii Specializate
              </h2>
              <p className="text-gray-500 text-sm mt-1">Soluții de transport adaptate pentru orice nevoie</p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-gray-100 mx-8"></div>
            <Link to="/contact">
              <Button variant="ghost" className="text-[#3870db] hover:text-[#2b5bb8] text-sm font-medium group">
                Contactează-ne <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group flex items-start p-4 bg-gray-50/80 hover:bg-white rounded-xl border border-transparent hover:border-blue-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 cursor-default"
              >
                <div className="shrink-0 mr-4 bg-white p-2.5 rounded-lg shadow-sm border border-gray-100 group-hover:border-blue-100 group-hover:scale-105 transition-all duration-300">
                  <div className="scale-75 origin-center transform">
                    {service.icon}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="text-[#012141] font-bold text-sm mb-1 group-hover:text-[#3870db] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Advantages */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-[#012141] mb-8 font-medium text-3xl">
                De Ce să Alegeți RuteMD?
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {advantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-1 bg-green-100 p-1.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-[#012141] text-lg font-medium leading-snug">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-[#012141] mb-6 font-medium text-3xl">Solicită o Ofertă</h2>
              <p className="text-[#6a6a6a] mb-8">
                Completează formularul și te vom contacta în cel mai scurt timp cu o ofertă personalizată pentru călătoria ta.
              </p>
              <div className="space-y-10">
                <Card className="p-8 bg-white rounded-[20px] border-none shadow-lg overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#3870db]/5 rounded-bl-full -mr-8 -mt-8" />
                   
                   <div className="relative space-y-8">
                      {/* Phone */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Headphones className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Telefon & Rezervări</p>
                          <div className="space-y-1">
                            <a href="tel:+37369101912" className="block text-xl font-bold text-[#012141] hover:text-[#3870db] transition-colors">
                              +373 69 10 19 12
                            </a>
                            <a href="tel:+37368501182" className="block text-xl font-bold text-[#012141] hover:text-[#3870db] transition-colors">
                              +373 68 50 11 82
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Briefcase className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Email</p>
                          <a href="mailto:mdrute@gmail.com" className="text-lg font-semibold text-[#012141] hover:text-[#3870db] transition-colors">
                            mdrute@gmail.com
                          </a>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Oficiul Nostru</p>
                          <p className="text-lg font-semibold text-[#012141]">
                            Hotelul Chișinău, etajul 2, of. 202<br />
                            blvd. Negruzzi 7, Chișinău
                          </p>
                        </div>
                      </div>
                      
                      {/* Schedule */}
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Clock className="w-6 h-6 text-[#3870db]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Disponibilitate</p>
                          <p className="text-lg font-semibold text-[#012141]">
                            Prin apel telefonic sau email
                          </p>
                        </div>
                      </div>
                   </div>
                </Card>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-[#012141] mb-6 font-medium text-3xl">Întrebări Frecvente</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-[15px] overflow-hidden shadow-sm border border-gray-100"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-[#012141] pr-4">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronDown className="w-5 h-5 text-[#3870db] flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-6 text-[#6a6a6a] text-[15px] leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Section - Infinite Marquee */}
      <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
           <h2 className="text-[#012141] font-bold text-2xl md:text-3xl tracking-tight mb-2">
              Parteneri de Încredere
            </h2>
            <div className="h-1 w-20 bg-[#3870db] mx-auto rounded-full mb-4"/>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              Companii de top care aleg serviciile noastre pentru transportul angajaților și evenimente corporate.
            </p>
        </div>

        <div className="relative flex overflow-hidden group">
           {/* Gradients for fade effect */}
           <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
           <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
           
           <motion.div 
             className="flex items-center gap-16 md:gap-24 min-w-full"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 30 
             }}
           >
             {[...partners, ...partners].map((src, i) => (
                <div key={i} className="relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <ImageWithFallback 
                    src={src} 
                    alt="Partner Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
             ))}
           </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}