import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { BlurFade } from '@/components/ui/blur-fade';
import { ShinyText } from '@/components/ui/shiny-text';
import { ArrowUpRight } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-black text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/media/akal-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />

      <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col pt-24 lg:pt-28 pb-12 lg:pb-16">
        {/* Top band */}
        <BlurFade delay={0.1} inView>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 mb-8 lg:mb-10">
            <p className="max-w-md text-sm md:text-base text-white/80 leading-relaxed">
              {t('hero.description')}
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed lg:text-right">
              {t('hero.topRightStat')}
            </p>
          </div>
        </BlurFade>

        {/* Center hero block */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <BlurFade delay={0.4} inView>
            <h1
              className="font-medium tracking-tighter text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
              style={{ lineHeight: 0.85 }}
            >
              <span className="block">{t('hero.headlineLine1')}</span>
              <ShinyText
                baseColor="#64CEFB"
                shineColor="#ffffff"
                speed={3}
                spread={100}
                className="block"
              >
                {t('hero.headlineLine2')}
              </ShinyText>
            </h1>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <button
              onClick={() => navigate(getLocalizedPath('contact'))}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-black ring-1 ring-white/20 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-white hover:bg-stone-900 hover:ring-white/40 transition-all"
            >
              {t('hero.ctaPrimary')}
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </BlurFade>
        </div>

      </div>
    </section>
  );
}
