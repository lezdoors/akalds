import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SEOHead } from '@/components/common/SEOHead';
import { getPageSEO } from '@/utils/seo';
import { useTranslation } from '@/contexts/LanguageContext';
const SUBMIT_ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-akal-contact`;
const SUBMIT_APIKEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceKeys = [
  'marketing',
  'payments',
  'ventures',
  'partnership',
  'press',
  'other',
] as const;

const contactInfoConfig = [
  { key: 'email', labelKey: 'contact.info.email', valueKey: 'contact.info.emailAddress', icon: Mail },
  { key: 'phone', labelKey: 'contact.info.phone', valueKey: 'contact.info.phoneNumber', icon: Phone },
  { key: 'hours', labelKey: 'contact.info.hours', valueKey: 'contact.info.businessHours', icon: Clock },
  { key: 'address', labelKey: 'contact.info.address', valueKey: 'contact.info.fullAddress', icon: MapPin },
] as const;

export default function ContactPage() {
  const { t } = useTranslation();
  const seoConfig = getPageSEO('contact');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch(SUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'apikey': SUBMIT_APIKEY,
          'Authorization': `Bearer ${SUBMIT_APIKEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || null,
          service: data.service,
          message: data.message,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`HTTP ${res.status}: ${detail}`);
      }
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error('Contact form error:', err);
    }
  };

  return (
    <>
      <SEOHead
        title={seoConfig.title}
        description={seoConfig.description}
        canonical={seoConfig.canonical}
        structuredData={seoConfig.structuredData}
      />

      <main className="min-h-screen bg-black text-white">
        {/* Hero */}
        <section className="section-padding pt-32 pb-20">
          <div className="container-custom">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-display mb-6">{t('contact.title')}</h1>
              <p className="text-body-large">
                {t('contact.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Two-column layout */}
        <section className="section-padding bg-neutral-950">
          <div className="container-custom">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Left: Form (3 cols) */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="card-premium p-8 md:p-10">
                  <h2 className="text-title mb-8">{t('contact.form.title')}</h2>

                  {isSuccess ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {t('contact.form.success')}
                      </h3>
                      <p className="text-white/60">
                        {t('contact.form.successDescription')}
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      {/* First + Last name side by side */}
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-white/80">{t('contact.form.firstName')}</Label>
                          <Input
                            id="firstName"
                            placeholder={t('contact.form.placeholder.firstName')}
                            className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 ${errors.firstName ? 'border-destructive' : ''}`}
                            {...register('firstName')}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-white/80">{t('contact.form.lastName')}</Label>
                          <Input
                            id="lastName"
                            placeholder={t('contact.form.placeholder.lastName')}
                            className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 ${errors.lastName ? 'border-destructive' : ''}`}
                            {...register('lastName')}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white/80">{t('contact.form.email')}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('contact.form.placeholder.email')}
                          className={`h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 ${errors.email ? 'border-destructive' : ''}`}
                          {...register('email')}
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white/80">{t('contact.form.phone')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('contact.form.placeholder.phone')}
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                          {...register('phone')}
                        />
                      </div>

                      {/* Service dropdown */}
                      <div className="space-y-2">
                        <Label className="text-white/80">{t('contact.form.service')}</Label>
                        <Select
                          onValueChange={(value) => setValue('service', value, { shouldValidate: true })}
                        >
                          <SelectTrigger className={`h-12 bg-white/5 border-white/10 text-white ${errors.service ? 'border-destructive' : ''}`}>
                            <SelectValue placeholder={t('contact.form.service')} />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-white/10">
                            {serviceKeys.map((key) => (
                              <SelectItem key={key} value={key} className="text-white/80 hover:text-white">
                                {t(`contact.form.serviceOptions.${key}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white/80">{t('contact.form.message')}</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder={t('contact.form.placeholder.message')}
                          className={`resize-none bg-white/5 border-white/10 text-white placeholder:text-white/30 ${errors.message ? 'border-destructive' : ''}`}
                          {...register('message')}
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full h-14 text-lg bg-primary text-white hover:bg-primary/90"
                      >
                        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                      </Button>

                      {/* Privacy */}
                      <p className="text-xs text-white/40 text-center">
                        {t('contact.form.privacy')}
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Right: Contact info (2 cols) */}
              <motion.div
                className="lg:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {contactInfoConfig.map((item, index) => (
                  <motion.div
                    key={item.key}
                    className="card-premium p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold mb-1 text-white">{t(item.labelKey)}</p>
                        <p className="text-white/60 whitespace-pre-line text-sm">
                          {t(item.valueKey)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
