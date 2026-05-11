import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/common/SEOHead';
import { getPageSEO } from '@/utils/seo';

const SERVICE_ITEMS = [
  { key: 'administrative', icon: FileText, path: '/services/administrative' },
  { key: 'assurance', icon: Shield, path: '/services/assurance' },
  { key: 'centreContact', icon: Phone, path: '/services/centre-contact' },
] as const;

export default function Services() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const seoConfig = getPageSEO('services');
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-100px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  return (
    <>
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        canonical={seoConfig.canonical}
        structuredData={seoConfig.structuredData}
      />
      <main>
        {/* Hero */}
        <section className="section-padding pt-32 pb-20" ref={heroRef}>
          <div className="container-custom text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {t('services.title')}
            </motion.h1>
            <motion.p
              className="text-body-large"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t('services.description')}
            </motion.p>
          </div>
        </section>

        {/* Service cards */}
        <section className="section-padding bg-neutral-950" ref={cardsRef}>
          <div className="container-custom max-w-6xl mx-auto space-y-16">
            {SERVICE_ITEMS.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 1;
              const features = [0, 1, 2, 3].map(
                (i) => t(`services.items.${service.key}.features.${i}`)
              ).filter((f) => f && !f.startsWith('services.'));

              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-premium overflow-hidden"
                >
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}>
                    {/* Icon panel */}
                    <div className="lg:w-1/3 bg-primary/10 flex items-center justify-center p-12">
                      <div className="w-24 h-24 rounded-3xl bg-primary/15 text-primary flex items-center justify-center">
                        <Icon className="w-12 h-12" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:w-2/3 p-8 lg:p-12 flex flex-col justify-center">
                      <h2 className="text-title mb-4">
                        {t(`services.items.${service.key}.title`)}
                      </h2>
                      <p className="text-white/60 leading-relaxed mb-6">
                        {t(`services.items.${service.key}.description`)}
                      </p>

                      {/* Feature bullets */}
                      <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                        {features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        to={getLocalizedPath(service.path)}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
                      >
                        {t('common.learnMore')}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section-padding" ref={ctaRef}>
          <motion.div
            className="container-custom text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-headline mb-4">{t('ctaBand.title')}</h2>
            <p className="text-body-large mb-8">
              {t('ctaBand.description')}
            </p>
            <Link
              to={getLocalizedPath('/contact')}
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('ctaBand.primaryCta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>
      </main>
    </>
  );
}
