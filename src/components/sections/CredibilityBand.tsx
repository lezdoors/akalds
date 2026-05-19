import { useTranslation } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

type Stat = { value: string; labelKey: string };

const STATS: Stat[] = [
  { value: '17229387', labelKey: 'credibility.stats.companyNumber' },
  { value: '19.05.2026', labelKey: 'credibility.stats.incorporated' },
  { value: 'WC2H 9JQ', labelKey: 'credibility.stats.registeredOffice' },
  { value: 'SIC 62090', labelKey: 'credibility.stats.sector' },
];

export function CredibilityBand() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-stone-900 bg-stone-900 py-20 lg:py-28 text-stone-50">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <BlurFade delay={0} inView>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                {t('credibility.eyebrow')}
              </p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-headline text-stone-50">
                {t('credibility.title')}
              </h2>
            </BlurFade>
            <BlurFade delay={0.2} inView>
              <p className="mt-6 max-w-md text-stone-400 leading-relaxed">
                {t('credibility.description')}
              </p>
            </BlurFade>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-stone-700/60">
              {STATS.map((stat, idx) => (
                <BlurFade key={stat.labelKey} delay={0.15 + idx * 0.08} inView>
                  <div className="bg-stone-900 p-8 md:p-10 h-full">
                    <div className="font-mono text-2xl md:text-3xl font-medium tracking-tight text-stone-50 mb-2">
                      {stat.value}
                    </div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-400">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
