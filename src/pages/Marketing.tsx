import { CapabilityPage } from '@/components/sections/CapabilityPage';
import { SEOHead } from '@/components/common/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Marketing() {
  const { t } = useTranslation();
  return (
    <>
      <SEOHead
        title={`${t('marketingPage.title')} | Akal Digital Services`}
        description={t('marketingPage.intro')}
        canonical="https://www.akalds.com/marketing"
      />
      <CapabilityPage localeKey="marketingPage" />
    </>
  );
}
