import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  items: FAQItem[];
  title?: string;
}

export function ServiceFAQ({ items, title }: ServiceFAQProps) {
  return (
    <section className="section-padding bg-neutral-950">
      <div className="container-custom max-w-3xl">
        {title && <h2 className="text-headline text-center mb-12">{title}</h2>}
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-white/5 backdrop-blur rounded-xl border border-white/10 px-6"
            >
              <AccordionTrigger className="text-left font-semibold py-5 text-white">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
