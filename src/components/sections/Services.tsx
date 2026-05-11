import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation, useLanguage } from '@/contexts/LanguageContext';
import { TextParallaxContent } from '@/components/ui/text-parallax-content-scroll';
import { BlurFade } from '@/components/ui/blur-fade';

const SERVICE_ITEMS = [
  {
    key: 'administrative',
    path: '/services/administrative',
    imgUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop',
  },
  {
    key: 'assurance',
    path: '/services/assurance',
    imgUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2670&auto=format&fit=crop',
  },
  {
    key: 'centreContact',
    path: '/services/centre-contact',
    imgUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2670&auto=format&fit=crop',
  },
] as const;

export function Services() {
  const { t } = useTranslation();
  const { getLocalizedPath } = useLanguage();

  return (
    <section>
      {/* Section header */}
      <div className="py-20 lg:py-28 bg-neutral-950">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <BlurFade delay={0} inView>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              {t('services.title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              {t('services.description')}
            </p>
          </BlurFade>
        </div>
      </div>

      {/* Parallax service sections */}
      {SERVICE_ITEMS.map((service) => (
        <TextParallaxContent
          key={service.key}
          imgUrl={service.imgUrl}
          subheading={t('services.title')}
          heading={t(`services.items.${service.key}.title`)}
        >
          <ServiceContent
            serviceKey={service.key}
            path={service.path}
            t={t}
            getLocalizedPath={getLocalizedPath}
          />
        </TextParallaxContent>
      ))}
    </section>
  );
}

function ServiceContent({
  serviceKey,
  path,
  t,
  getLocalizedPath,
}: {
  serviceKey: string;
  path: string;
  t: (key: string) => any;
  getLocalizedPath: (path: string) => string;
}) {
  const description = t(`services.items.${serviceKey}.description`);
  const features = t(`services.items.${serviceKey}.features`) as string[];

  return (
    <div className="mx-auto max-w-5xl py-16 lg:py-24 px-4 bg-neutral-950">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
        {/* Left: Title */}
        <BlurFade delay={0} inView>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {t(`services.items.${serviceKey}.title`)}
          </h3>
        </BlurFade>

        {/* Right: Description + Features + CTA */}
        <div>
          <BlurFade delay={0.1} inView>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              {description}
            </p>
          </BlurFade>

          {Array.isArray(features) && (
            <BlurFade delay={0.2} inView>
              <ul className="space-y-3 mb-10">
                {features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </BlurFade>
          )}

          <BlurFade delay={0.3} inView>
            <Link
              to={getLocalizedPath(path)}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
            >
              {t('common.learnMore')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
