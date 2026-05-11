import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  quality?: number;
}

// Generate optimized image sources with WebP support
const generateImageSources = (src: string, width?: number, quality = 85) => {
  const baseUrl = src.includes('unsplash.com') ? src : src;
  const webpUrl = src.includes('unsplash.com') ? `${src}&fm=webp&q=${quality}` : src;
  const fallbackUrl = src.includes('unsplash.com') ? `${src}&q=${quality}` : src;
  
  if (width) {
    return {
      webp: webpUrl + `&w=${width}`,
      fallback: fallbackUrl + `&w=${width}`
    };
  }
  
  return { webp: webpUrl, fallback: fallbackUrl };
};

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  placeholder,
  onLoad,
  onError,
  sizes,
  quality = 85
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(loading === 'eager');
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const { webp, fallback } = generateImageSources(src, width, quality);

  useEffect(() => {
    if (!imgRef.current || loading === 'eager') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [loading]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  return (
    <div 
      ref={imgRef}
      className={cn(
        "relative overflow-hidden bg-muted",
        "will-change-transform",
        className
      )}
      style={{ 
        width, 
        height,
        contain: 'layout style paint',
        contentVisibility: 'auto'
      }}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60"
          style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}

      {/* Optimized image with WebP support */}
      {isInView && (
        <picture>
          <source srcSet={webp} type="image/webp" sizes={sizes} />
          <img
            src={fallback}
            alt={alt}
            className={cn(
              "w-full h-full object-cover",
              "transition-opacity duration-700 ease-out",
              "transform-gpu will-change-opacity",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading={loading}
            decoding="async"
            sizes={sizes}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <span className="text-muted-foreground text-sm font-medium">Image unavailable</span>
        </div>
      )}
    </div>
  );
});