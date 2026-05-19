import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

const CAPABILITY_ITEMS = [
  { key: 'marketing', path: '/marketing' },
  { key: 'payments', path: '/payments' },
  { key: 'ventures', path: '/ventures' },
] as const;

export function Capabilities() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  return (
    <section
      id="capabilities"
      className="border-t border-stone-200 bg-[#f5f4ed] py-24 lg:py-32 text-stone-900"
    >
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <BlurFade delay={0} inView>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                {t('capabilities.eyebrow')}
              </p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-headline">
                {t('capabilities.title')}
              </h2>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="mt-6 max-w-md text-stone-600 leading-relaxed">
                {t('capabilities.description')}
              </p>
            </BlurFade>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
              {CAPABILITY_ITEMS.map((item, idx) => {
                const eyebrow = t(`capabilities.items.${item.key}.eyebrow`);
                const title = t(`capabilities.items.${item.key}.title`);
                const desc = t(`capabilities.items.${item.key}.shortDescription`);
                const cta = t(`capabilities.items.${item.key}.ctaLabel`);
                return (
                  <BlurFade key={item.key} delay={0.1 + idx * 0.1} inView>
                    <Link
                      to={getLocalizedPath(item.path)}
                      className="group grid grid-cols-[3rem_1fr] gap-x-6 border-b border-stone-200 p-7 last:border-b-0 transition-colors hover:bg-[#f5f4ed] md:grid-cols-[4rem_1fr] md:p-9"
                    >
                      <span className="font-mono text-xs text-stone-400 md:pt-2">
                        {eyebrow}
                      </span>
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-title text-stone-900">
                            {title}
                          </h3>
                          <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-stone-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stone-900" />
                        </div>
                        <p className="mt-4 text-stone-600 md:text-[0.975rem] md:leading-relaxed">
                          {desc}
                        </p>
                        <span className="mt-5 inline-flex items-center text-xs font-medium uppercase tracking-[0.16em] text-stone-500 group-hover:text-stone-900 transition-colors">
                          {cta}
                        </span>
                      </div>
                    </Link>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
