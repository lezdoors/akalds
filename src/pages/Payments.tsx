import { CapabilityPage } from '@/components/sections/CapabilityPage';
import { SEOHead } from '@/components/common/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Payments() {
  const { t } = useTranslation();
  return (
    <>
      <SEOHead
        title={`${t('paymentsPage.title')} | Akal Digital Services`}
        description={t('paymentsPage.intro')}
      />
      <CapabilityPage localeKey="paymentsPage" />
    </>
  );
}
