import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

type CapabilityKey = 'marketingPage' | 'paymentsPage' | 'venturesPage';

type Capability = { title: string; body: string; href?: string };

export function CapabilityPage({ localeKey }: { localeKey: CapabilityKey }) {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();
  const navigate = useNavigate();

  const eyebrow = t(`${localeKey}.eyebrow`);
  const title = t(`${localeKey}.title`);
  const intro = t(`${localeKey}.intro`);
  const rawCapabilities = t(`${localeKey}.capabilities`);
  const capabilities: Capability[] = Array.isArray(rawCapabilities) ? rawCapabilities : [];
  const approach = t(`${localeKey}.approach`);

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container-custom">
          <div className="max-w-4xl">
            <BlurFade delay={0} inView>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                {eyebrow}
              </p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h1 className="text-display max-w-3xl">{title}</h1>
            </BlurFade>
            <BlurFade delay={0.25} inView>
              <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
                {intro}
              </p>
            </BlurFade>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-neutral-950 py-20 md:py-28">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <BlurFade delay={0} inView>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  What we do
                </p>
              </BlurFade>
              <BlurFade delay={0.1} inView>
                <h2 className="text-headline">
                  Specifics, not slogans.
                </h2>
              </BlurFade>
            </div>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                {capabilities.map((c, i) => {
                  const inner = (
                    <div className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-white/10 p-7 last:border-b-0 md:grid-cols-[3rem_1fr] md:p-9 group">
                      <span className="font-mono text-xs text-white/40 md:pt-1.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-title">{c.title}</h3>
                          {c.href && (
                            <ArrowUpRight
                              className="mt-1 h-5 w-5 flex-shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <p className="mt-3 text-white/65 md:text-[0.975rem] md:leading-relaxed">
                          {c.body}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <BlurFade key={i} delay={0.1 + i * 0.08} inView>
                      {c.href ? (
                        <a
                          href={c.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block transition-colors hover:bg-white/[0.04]"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </BlurFade>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-black py-20 md:py-28">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <BlurFade delay={0} inView>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  How we work
                </p>
              </BlurFade>
            </div>
            <div className="lg:col-span-8">
              <BlurFade delay={0.1} inView>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                  {approach}
                </p>
              </BlurFade>
            </div>
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
                className="group inline-flex items-center gap-2 rounded-full bg-white text-ink-900 px-7 py-3.5 text-sm font-semibold hover:bg-white/90 transition-all flex-shrink-0"
              >
                {t('hero.secondaryCta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
