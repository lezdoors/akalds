import { motion } from 'framer-motion';
import { Eye, Zap, ShieldCheck, HeartHandshake, MapPin, Building, Handshake, Shield, CreditCard } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { getPageSEO } from '@/utils/seo';
import { useTranslation } from '@/contexts/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const valuesConfig = [
  { key: 'transparency', icon: Eye },
  { key: 'performance', icon: Zap },
  { key: 'compliance', icon: ShieldCheck },
  { key: 'proximity', icon: HeartHandshake },
] as const;

const companyInfoConfig = [
  { key: 'address', icon: MapPin },
  { key: 'registration', icon: Building },
  { key: 'partner', icon: Handshake },
  { key: 'rgpd', icon: Shield },
  { key: 'stripe', icon: CreditCard },
] as const;

export default function About() {
  const { t } = useTranslation();
  const seoConfig = getPageSEO('about');

  return (
    <>
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        canonical={seoConfig.canonical}
        structuredData={seoConfig.structuredData}
      />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="section-padding pt-32 pb-20">
          <div className="container-custom">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-display mb-6">{t('about.title')}</h1>
              <p className="text-body-large">
                {t('about.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-neutral-950">
          <div className="container-custom max-w-3xl">
            <motion.div
              className="card-premium p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-headline mb-4">{t('about.mission.title')}</h2>
              <p className="text-body-large">
                {t('about.mission.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="section-padding bg-gradient-to-b from-neutral-950 to-neutral-900">
          <div className="container-custom">
            <motion.h2
              className="text-headline text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('about.values.title')}
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {valuesConfig.map((value, index) => (
                <motion.div
                  key={value.key}
                  className="card-premium p-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-title mb-2">
                        {t(`about.values.items.${value.key}.title`)}
                      </h3>
                      <p className="text-white/60 leading-relaxed">
                        {t(`about.values.items.${value.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="section-padding">
          <div className="container-custom max-w-3xl">
            <div className="space-y-6">
              {companyInfoConfig.map((item, index) => (
                <motion.div
                  key={item.key}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-white/80 whitespace-pre-line leading-relaxed">
                    {t(`about.company.${item.key}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
