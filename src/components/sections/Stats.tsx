import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useTranslation } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

function useCounter(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, inView]);
  return count;
}

const STATS = [
  { value: 5000, suffix: '+', key: 'dossiers' },
  { value: 3000, suffix: '+', key: 'clients' },
  { value: 5, suffix: '+', key: 'experience' },
  { value: 98, suffix: '%', key: 'satisfaction' },
] as const;

export function Stats() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-36 bg-neutral-950 overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STATS.map((stat, index) => (
            <StatItem
              key={stat.key}
              value={stat.value}
              suffix={stat.suffix}
              label={t(`stats.${stat.key}`)}
              inView={isInView}
              delay={index * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
  inView,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  inView: boolean;
  delay: number;
}) {
  const count = useCounter(value, 2000, inView);

  return (
    <BlurFade delay={delay} inView>
      <div className="text-center">
        <div className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 text-white">
          {count.toLocaleString()}
          <span className="text-primary">{suffix}</span>
        </div>
        <div className="text-white/50 text-lg font-medium tracking-wide uppercase">
          {label}
        </div>
      </div>
    </BlurFade>
  );
}
