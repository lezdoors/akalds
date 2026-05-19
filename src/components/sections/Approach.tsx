import { useTranslation } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

export function Approach() {
  const { t } = useTranslation();
  const paragraphs = t('approach.paragraphs') as string[];

  return (
    <section className="border-t border-stone-200 bg-[#f5f4ed] py-24 lg:py-32 text-stone-900">
      <div className="container-custom">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <BlurFade delay={0} inView>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                {t('approach.eyebrow')}
              </p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-headline">{t('approach.title')}</h2>
            </BlurFade>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-7 text-lg leading-relaxed text-stone-700 md:space-y-9 md:text-xl">
              {paragraphs.map((p, i) => (
                <BlurFade key={i} delay={0.15 + i * 0.1} inView>
                  <p>{p}</p>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
