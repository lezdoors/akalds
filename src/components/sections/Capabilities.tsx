import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

type CapabilityKey = 'marketing' | 'payments' | 'ventures';

const CAPABILITY_ITEMS: {
  key: CapabilityKey;
  path: string;
  // CSS gradient art placeholder — swap with /brand/capabilities/<key>.jpg
  // once the Higgsfield hero renders land.
  art: string;
}[] = [
  {
    key: 'marketing',
    path: '/marketing',
    art:
      'radial-gradient(120% 80% at 30% 40%, #6989ff 0%, #2541b2 45%, #0a1530 100%), linear-gradient(135deg, #2541b2, #0a1530)',
  },
  {
    key: 'payments',
    path: '/payments',
    art:
      'radial-gradient(120% 90% at 70% 30%, #5fd2e4 0%, #186b8a 50%, #0a1530 100%), linear-gradient(135deg, #186b8a, #0a1530)',
  },
  {
    key: 'ventures',
    path: '/ventures',
    art:
      'radial-gradient(130% 90% at 50% 70%, #ffb89a 0%, #b8568f 45%, #2a1b6b 100%), linear-gradient(135deg, #b8568f, #2a1b6b)',
  },
];

export function Capabilities() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  return (
    <section
      id="capabilities"
      className="bg-[#0a1530] py-24 lg:py-32 text-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20">
          <BlurFade delay={0} inView>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
              {t('capabilities.eyebrow')}
            </p>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.015em] leading-[1.1] text-white">
              {t('capabilities.title')}
            </h2>
          </BlurFade>
        </div>

        {/* Image-led cards */}
        <div className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {CAPABILITY_ITEMS.map((item, idx) => {
            const title = t(`capabilities.items.${item.key}.title`);
            const desc = t(`capabilities.items.${item.key}.shortDescription`);
            return (
              <BlurFade key={item.key} delay={0.15 + idx * 0.1} inView>
                <Link
                  to={getLocalizedPath(item.path)}
                  className="group block"
                >
                  {/* Art tile */}
                  <div
                    className="aspect-[4/3] w-full rounded-md overflow-hidden mb-6 transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ background: item.art }}
                    aria-hidden="true"
                  />
                  {/* Title row */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl lg:text-2xl font-semibold text-white">
                      {title}
                    </h3>
                    <ArrowUpRight
                      className="w-5 h-5 text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.2}
                    />
                  </div>
                  {/* Body */}
                  <p className="text-white/70 leading-relaxed text-[0.975rem]">
                    {desc}
                  </p>
                </Link>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
