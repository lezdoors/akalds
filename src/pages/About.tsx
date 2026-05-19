import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { BlurFade } from '@/components/ui/blur-fade';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';

type Section = { eyebrow: string; title: string; body: string };

export default function About() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  const rawSections = t('aboutPage.sections');
  const sections: Section[] = Array.isArray(rawSections) ? rawSections : [];

  return (
    <>
      <SEOHead
        title={`${t('aboutPage.title')} | Akal Digital Services`}
        description={t('aboutPage.intro')}
        canonical="https://www.akalds.com/about"
      />

      <main className="bg-black text-white">
        <section className="pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container-custom">
            <div className="max-w-4xl">
              <BlurFade delay={0} inView>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  {t('aboutPage.eyebrow')}
                </p>
              </BlurFade>
              <BlurFade delay={0.1} inView>
                <h1 className="text-display max-w-3xl">{t('aboutPage.title')}</h1>
              </BlurFade>
              <BlurFade delay={0.25} inView>
                <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
                  {t('aboutPage.intro')}
                </p>
              </BlurFade>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-neutral-950 py-20 md:py-28">
          <div className="container-custom">
            <div className="space-y-20 md:space-y-28">
              {sections.map((s, i) => (
                <div key={i} className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <BlurFade delay={0} inView>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                        {s.eyebrow}
                      </p>
                    </BlurFade>
                    <BlurFade delay={0.1} inView>
                      <h2 className="text-headline">{s.title}</h2>
                    </BlurFade>
                  </div>
                  <div className="lg:col-span-8">
                    <BlurFade delay={0.2} inView>
                      <p className="text-lg md:text-xl text-white/75 leading-relaxed">
                        {s.body}
                      </p>
                    </BlurFade>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-black py-20 md:py-28">
          <div className="container-custom">
            <BlurFade delay={0} inView>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45 mb-3">
                    {t('contact.title')}
                  </p>
                  <h2 className="text-headline max-w-2xl">
                    {t('contact.subtitle')}
                  </h2>
                </div>
                <button
                  onClick={() => navigate(getLocalizedPath('contact'))}
                  className="group inline-flex items-center gap-2 rounded-full bg-white text-stone-900 px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition-all flex-shrink-0"
                >
                  {t('hero.secondaryCta')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
    </>
  );
}
