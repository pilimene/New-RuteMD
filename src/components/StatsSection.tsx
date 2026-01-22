import { Users, Map, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n';

export function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    { 
      label: t.stats.passengersTransported, 
      value: '20.000+', 
      icon: Users,
      color: 'from-blue-400 to-blue-600'
    },
    { 
      label: t.stats.kilometersTraveled, 
      value: '1.2M+', 
      icon: Map,
      color: 'from-indigo-400 to-indigo-600'
    },
    { 
      label: t.stats.yearsOfExcellence, 
      value: '20+', 
      icon: Calendar,
      color: 'from-sky-400 to-sky-600'
    },
    { 
      label: t.stats.competenceLevel, 
      value: '100%', 
      icon: ShieldCheck,
      color: 'from-teal-400 to-teal-600'
    },
  ];
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
              <dd className={`order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}