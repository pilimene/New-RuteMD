import { Calendar, Ticket, Bus } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n';

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Calendar,
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
    },
    {
      icon: Ticket,
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
    },
    {
      icon: Bus,
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-[#012141] to-[#001a30] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#3870db] font-bold tracking-wider uppercase text-xs">{t.howItWorks.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{t.howItWorks.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#012141] border border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(56,112,219,0.2)] group-hover:shadow-[0_0_30px_rgba(56,112,219,0.4)] transition-all z-10 relative">
                  <Icon className="w-7 h-7 text-[#3870db]" />
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-2xl blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-blue-200/60 text-sm max-w-xs">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
