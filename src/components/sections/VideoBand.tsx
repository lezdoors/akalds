import { useEffect, useRef } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { BlurFade } from '@/components/ui/blur-fade';

export function VideoBand() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Below the fold: don't fetch the video until the section approaches the
  // viewport, then start playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="border-t border-stone-200 bg-[#f5f4ed] py-20 lg:py-28 text-stone-900">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 lg:items-end mb-10">
          <div className="lg:col-span-7">
            <BlurFade delay={0} inView>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                {t('videoBand.eyebrow')}
              </p>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <h2 className="text-headline">{t('videoBand.title')}</h2>
            </BlurFade>
          </div>
          <div className="lg:col-span-5">
            <BlurFade delay={0.2} inView>
              <p className="text-stone-600 leading-relaxed lg:text-right">
                {t('videoBand.description')}
              </p>
            </BlurFade>
          </div>
        </div>

        <BlurFade delay={0.25} inView>
          <video
            ref={videoRef}
            className="block w-full h-auto"
            src="/media/akal-loop.mp4"
            poster="/media/akal-loop-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          />
        </BlurFade>
      </div>
    </section>
  );
}
