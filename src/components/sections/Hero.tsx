import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '@/components/ui/blur-fade';
import { ArrowRight } from 'lucide-react';

const HERO_BG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop';

export function Hero() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center -mt-16 lg:-mt-20">
      {/* Background */}
      <img
        src={HERO_BG}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <BlurFade delay={0.1} inView>
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur mb-8">
            <span className="inline-flex items-center text-xs font-semibold text-black bg-white/90 rounded-full py-0.5 px-2.5">
              Akal
            </span>
            <span className="text-sm font-medium text-white/90">
              {t('hero.badge')}
            </span>
          </div>
        </BlurFade>

        {/* Headline */}
        <BlurFade delay={0.25} inView>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
            {t('hero.headline')}
          </h1>
        </BlurFade>

        {/* Description */}
        <BlurFade delay={0.4} inView>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.55} inView>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-10">
            <button
              onClick={() => navigate(getLocalizedPath('contact'))}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur px-8 py-4 text-base font-medium text-white hover:bg-white/20 transition-all duration-300"
            >
              {t('hero.primaryCta')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(getLocalizedPath('services'))}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium text-white/80 hover:text-white transition-colors"
            >
              {t('hero.secondaryCta')}
            </button>
          </div>
        </BlurFade>

        {/* Trust indicators */}
        <BlurFade delay={0.7} inView>
          <div className="mt-20 mb-10">
            <p className="text-sm text-white/50 mb-6">
              {t('whyChooseUs.description')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400/60" />
                <span className="text-sm font-medium">Conforme RGPD</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400/60" />
                <span className="text-sm font-medium">Partenaire Zenassur</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400/60" />
                <span className="text-sm font-medium">Paiements Stripe</span>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
