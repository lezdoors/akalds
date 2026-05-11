import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

export function CTABand() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-r from-primary to-primary/80 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <BlurFade delay={0} inView>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-white">
              {t('ctaBand.title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-xl md:text-2xl text-white/70 mb-14 leading-relaxed max-w-2xl mx-auto">
              {t('ctaBand.description')}
            </p>
          </BlurFade>
          <BlurFade delay={0.3} inView>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() => navigate(getLocalizedPath('/contact'))}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-neutral-900 font-bold text-lg hover:bg-white/90 hover:scale-[1.02] transition-all duration-300 shadow-2xl shadow-black/10"
              >
                {t('ctaBand.primaryCta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate(getLocalizedPath('/contact'))}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                {t('ctaBand.secondaryCta')}
              </button>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
