import { CheckCircle, Clock, Users } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

const ITEMS = [
  { key: 'transparency', icon: CheckCircle },
  { key: 'speed', icon: Clock },
  { key: 'support', icon: Users },
] as const;

export function WhyChooseUs() {
  const { t } = useTranslation();

  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <BlurFade delay={0} inView>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
              {t('whyChooseUs.title')}
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              {t('whyChooseUs.description')}
            </p>
          </BlurFade>
        </div>

        {/* 3-column layout — glass cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <BlurFade key={item.key} delay={0.1 + index * 0.15} inView>
                <div className="relative text-center p-10 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 hover:bg-white/[0.07] hover:scale-[1.02] transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-8">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">
                    {t(`whyChooseUs.items.${item.key}.title`)}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {t(`whyChooseUs.items.${item.key}.description`)}
                  </p>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
