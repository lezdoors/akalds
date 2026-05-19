import { motion } from 'framer-motion';
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
    <motion.span
      className={cn('inline-block bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 0%, ${shineColor} 50%, ${baseColor} 100%)`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['200% 0%', '-200% 0%'],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
