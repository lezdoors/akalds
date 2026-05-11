import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ProcessStep {
  step: string;
  description: string;
}

interface ServiceProcessProps {
  steps: ProcessStep[];
  title?: string;
}

export function ServiceProcess({ steps, title }: ServiceProcessProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-custom">
        {title && <h2 className="text-headline text-center mb-16">{title}</h2>}
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex gap-6 mb-12 last:mb-0"
            >
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px h-full bg-white/10 mt-2" />
                )}
              </div>
              {/* Content */}
              <div className="pb-8">
                <h3 className="text-lg font-semibold mb-2 text-white">{step.step}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
