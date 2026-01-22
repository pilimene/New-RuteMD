import { Button } from './ui/button';
import { Phone, MessageCircle } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#012141] via-[#001a30] to-[#012141]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-4 font-medium text-[64px] leading-none">
          Gata să Călătorești?
        </h2>
        <p className="text-white/90 mb-8 max-w-2xl mx-auto text-[18px]">
          Contactează-ne pentru rezervări sau informații suplimentare. Suntem aici să te ajutăm!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-[#3870db] hover:bg-[#2b5bb8] text-white px-8 font-bold rounded-[8px]">
            <Phone className="w-5 h-5 mr-2" />
            +373 123 456 78
          </Button>
          <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 px-8 backdrop-blur-sm rounded-[8px]">
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </Button>
        </div>

        <p className="text-white/70 text-[14px] mt-6">
          Răspundem în mai puțin de 5 minute
        </p>
      </div>
    </section>
  );
}