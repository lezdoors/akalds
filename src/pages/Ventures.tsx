import { CapabilityPage } from '@/components/sections/CapabilityPage';
import { SEOHead } from '@/components/common/SEOHead';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Ventures() {
  const { t } = useTranslation();
  return (
    <>
      <SEOHead
        title={`${t('venturesPage.title')} | Akal Digital Services`}
        description={t('venturesPage.intro')}
      />
      <CapabilityPage localeKey="venturesPage" />
    </>
  );
}
