import { cn } from '@/lib/utils';

type ShinyTextProps = {
  children: React.ReactNode;
  baseColor?: string;
  shineColor?: string;
  speed?: number;
  spread?: number;
  className?: string;
};

export function ShinyText({
  children,
  baseColor = '#64CEFB',
  shineColor = '#ffffff',
  speed = 3,
  spread = 100,
  className,
}: ShinyTextProps) {
  return (
    <span
      className={cn('shiny-text-animated inline-block', className)}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 0%, ${shineColor} 50%, ${baseColor} 100%)`,
        ['--shiny-speed' as string]: `${speed}s`,
      }}
    >
      {children}
    </span>
  );
}
