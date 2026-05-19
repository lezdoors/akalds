import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '@/components/ui/blur-fade';
import { ArrowRight } from 'lucide-react';

const HERO_BG =
  'https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=2670&auto=format&fit=crop';

export function Hero() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center -mt-16 lg:-mt-20">
      <img src={HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <BlurFade delay={0.1} inView>
          <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur mb-10">
            <span className="inline-flex items-center text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-black bg-white/90 rounded-full py-1 px-2.5">
              Akal
            </span>
            <span className="text-sm font-medium text-white/85">{t('hero.badge')}</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <h1 className="text-display">
            {t('hero.headline')}
          </h1>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
        </BlurFade>

        <BlurFade delay={0.55} inView>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-12">
            <button
              onClick={() => {
                const el = document.getElementById('capabilities');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else navigate(getLocalizedPath('about'));
              }}
              className="inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition-all duration-300"
            >
              {t('hero.primaryCta')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(getLocalizedPath('contact'))}
              className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/20 px-7 py-3.5 text-sm font-medium text-white/85 hover:text-white hover:ring-white/40 transition-all"
            >
              {t('hero.secondaryCta')}
            </button>
          </div>
        </BlurFade>

        <BlurFade delay={0.75} inView>
          <div className="mt-20 mb-10">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-white/45 text-xs font-medium uppercase tracking-[0.18em]">
              <span>England &amp; Wales</span>
              <span aria-hidden className="text-white/20">·</span>
              <span>Companies House No&nbsp;17229387</span>
              <span aria-hidden className="text-white/20">·</span>
              <span>Covent Garden, London</span>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
