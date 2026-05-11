import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/common/SEOHead';
import { getPageSEO } from '@/utils/seo';
import { useTranslation } from '@/contexts/LanguageContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function VenteDeLeads() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const seoConfig = getPageSEO('venteLeads');

  const features = [0, 1, 2, 3].map((i) => t(`venteLeads.features.${i}`));

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
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <h1 className="text-display mb-6">
                {t('venteLeads.title')}
              </h1>
              <p className="text-body-large">
                {t('venteLeads.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro + Features */}
        <section className="section-padding bg-neutral-950">
          <div className="container-custom max-w-3xl">
            <motion.p
              className="text-body-large mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t('venteLeads.intro')}
            </motion.p>

            <ul className="space-y-5 mb-12">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg text-white/80">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary text-white hover:bg-primary/90">
                <Link to={getLocalizedPath('contact')}>
                  {t('venteLeads.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
