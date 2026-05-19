import { useTranslation } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';
import { Boxes, Bolt, Cpu } from 'lucide-react';

const ITEMS = [
  { key: 'consumer', Icon: Boxes },
  { key: 'energy', Icon: Bolt },
  { key: 'digital', Icon: Cpu },
] as const;

export function PortfolioStrip() {
  const { t } = useTranslation();

  return (
    <section className="border-t border-stone-200 bg-[#faf7f2] py-20 lg:py-24 text-stone-900">
      <div className="container-custom">
        <div className="flex flex-col gap-10 lg:gap-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <BlurFade delay={0} inView>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {t('portfolio.eyebrow')}
                </p>
              </BlurFade>
              <BlurFade delay={0.1} inView>
                <h2 className="text-headline">{t('portfolio.title')}</h2>
              </BlurFade>
            </div>
            <div className="lg:col-span-5">
              <BlurFade delay={0.2} inView>
                <p className="text-stone-600 leading-relaxed lg:text-right">
                  {t('portfolio.description')}
                </p>
              </BlurFade>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 md:grid-cols-3">
            {ITEMS.map((item, idx) => (
              <BlurFade key={item.key} delay={0.15 + idx * 0.1} inView>
                <div className="group flex h-full flex-col gap-4 bg-white p-8 md:p-10 transition-colors hover:bg-[#faf7f2]">
                  <item.Icon
                    className="h-7 w-7 text-stone-900"
                    strokeWidth={1.4}
                  />
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
                    {t(`portfolio.items.${item.key}.eyebrow`)}
                  </p>
                  <h3 className="text-2xl md:text-[1.65rem] font-semibold tracking-tight text-stone-900">
                    {t(`portfolio.items.${item.key}.title`)}
                  </h3>
                  <p className="text-stone-600 leading-relaxed text-[0.975rem]">
                    {t(`portfolio.items.${item.key}.body`)}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
