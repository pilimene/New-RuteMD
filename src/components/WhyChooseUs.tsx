import { Link } from 'react-router-dom';
import { Clock, Bus, Wallet, ShieldCheck, Wifi, Wind, Armchair, Usb, Coffee, Luggage, Headphones, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n';

export function WhyChooseUs() {
  const { t } = useTranslation();

  const mainFeatures = [
    {
      icon: Clock,
      title: t.whyChooseUs.punctuality,
      desc: t.whyChooseUs.punctualityDesc,
      color: 'text-blue-300'
    },
    {
      icon: ShieldCheck,
      title: t.whyChooseUs.safety,
      desc: t.whyChooseUs.safetyDesc,
      color: 'text-teal-300'
    },
    {
      icon: Bus,
      title: t.whyChooseUs.comfort,
      desc: t.whyChooseUs.comfortDesc,
      color: 'text-indigo-300'
    },
    {
      icon: Wallet,
      title: t.whyChooseUs.fairPrice,
      desc: t.whyChooseUs.fairPriceDesc,
      color: 'text-sky-300'
    }
  ];

  const amenities = [
    { icon: Wifi, label: t.whyChooseUs.wifi },
    { icon: Wind, label: t.whyChooseUs.climate },
    { icon: Armchair, label: t.whyChooseUs.seatsXL },
    { icon: Usb, label: t.whyChooseUs.power },
    { icon: Coffee, label: t.whyChooseUs.drinks },
    { icon: Luggage, label: t.whyChooseUs.freeLuggage },
    { icon: Headphones, label: t.whyChooseUs.support247 },
    { icon: CreditCard, label: t.whyChooseUs.cardCash },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-900/5 overflow-hidden">
          <div className="grid lg:grid-cols-12 min-h-[500px]">

            {/* Left Panel: Core Values (Dark Blue) */}
            <div className="lg:col-span-5 bg-[#012141] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3870db]/20 rounded-full blur-3xl -mr-16 -mt-16" />

              <div className="relative z-10">
                <span className="text-[#3870db] font-bold tracking-wider uppercase text-xs mb-2 block">{t.whyChooseUs.badge}</span>
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {t.whyChooseUs.title} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3870db] to-blue-200">{t.whyChooseUs.titleHighlight}</span>
                </h2>
                <p className="text-blue-100/80 mb-10 text-sm leading-relaxed">
                  {t.whyChooseUs.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {mainFeatures.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`p-2 rounded-lg bg-white/10 ${item.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">{item.title}</h3>
                          <p className="text-blue-200/60 text-xs">{item.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Panel: Amenities (White) */}
            <div className="lg:col-span-7 p-8 md:p-12 bg-white flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-[#012141] text-2xl font-bold mb-2">{t.whyChooseUs.amenitiesTitle}</h3>
                <p className="text-gray-500 text-sm">{t.whyChooseUs.amenitiesDescription}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {amenities.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (idx * 0.05) }}
                      className="group p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 hover:bg-blue-50/50 transition-all duration-300 text-center"
                    >
                      <div className="w-10 h-10 mx-auto rounded-full bg-white shadow-sm text-[#3870db] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[#012141] font-medium text-sm block">{item.label}</span>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3870db] shrink-0" />
                <p className="text-sm text-[#012141] font-medium">
                  {t.whyChooseUs.allIncluded} <Link to="/routes" className="text-[#3870db] cursor-pointer hover:underline">{t.whyChooseUs.bookNow} &rarr;</Link>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
