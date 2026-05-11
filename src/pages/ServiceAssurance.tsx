import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/components/common/SEOHead';
import { getPageSEO } from '@/utils/seo';
import { ServiceProcess } from '@/components/sections/ServiceProcess';
import { ServiceFAQ } from '@/components/sections/ServiceFAQ';

export default function ServiceAssurance() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const seoConfig = getPageSEO('assurance');

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const partnerRef = useRef(null);
  const partnerInView = useInView(partnerRef, { once: true, margin: '-100px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const features = [0, 1, 2, 3].map((i) => t(`services.items.assurance.features.${i}`));

  const steps = [0, 1, 2, 3].map((i) => ({
    step: t(`services.items.assurance.process.${i}.step`),
    description: t(`services.items.assurance.process.${i}.description`),
  }));

  const faqItems = [0, 1, 2].map((i) => ({
    question: t(`services.items.assurance.faq.${i}.question`),
    answer: t(`services.items.assurance.faq.${i}.answer`),
  }));

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
            <motion.div
              className="w-20 h-20 rounded-3xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Shield className="w-10 h-10" />
            </motion.div>
            <motion.h1
              className="text-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('services.items.assurance.title')}
            </motion.h1>
            <motion.p
              className="text-body-large"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('services.items.assurance.description')}
            </motion.p>
          </div>
        </section>

        {/* Features grid */}
        <section className="section-padding bg-neutral-950" ref={featuresRef}>
          <div className="container-custom max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-premium p-6 flex items-start gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <span className="text-lg font-medium text-white">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Zenassur partnership box */}
        <section className="section-padding" ref={partnerRef}>
          <div className="container-custom max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={partnerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center"
            >
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-title mb-2">Partenariat Zenassur France</h3>
              <p className="text-white/60">Courtier agr&eacute;&eacute;, inscrit &agrave; l'Orias</p>
            </motion.div>
          </div>
        </section>

        {/* Process timeline */}
        <ServiceProcess steps={steps} title={t('services.items.assurance.title')} />

        {/* FAQ */}
        <ServiceFAQ items={faqItems} />

        {/* CTA */}
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
