import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

export function CTABand() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative bg-stone-900 border-t border-stone-800 py-24 lg:py-32 overflow-hidden text-white">
      <div className="container-custom relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <BlurFade delay={0} inView>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                {t('contact.title')}
              </p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-display">
                {t('contact.subtitle')}
              </h2>
            </BlurFade>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
            <BlurFade delay={0.25} inView>
              <a
                href={`mailto:${t('contact.info.emailAddress')}`}
                className="font-display text-2xl md:text-3xl font-medium tracking-tight text-white underline decoration-white/30 decoration-1 underline-offset-[6px] hover:decoration-white transition-colors"
              >
                {t('contact.info.emailAddress')}
              </a>
            </BlurFade>
            <BlurFade delay={0.35} inView>
              <button
                onClick={() => navigate(getLocalizedPath('contact'))}
                className="group inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-all"
              >
                {t('hero.secondaryCta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
