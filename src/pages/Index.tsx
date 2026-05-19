import { Hero } from '@/components/sections/Hero';
import { PortfolioStrip } from '@/components/sections/PortfolioStrip';
import { Capabilities } from '@/components/sections/Capabilities';
import { VideoBand } from '@/components/sections/VideoBand';
import { Approach } from '@/components/sections/Approach';
import { CTABand } from '@/components/sections/CTABand';
import { SEOHead } from '@/components/common/SEOHead';
import { getPageSEO } from '@/utils/seo';

const Index = () => {
  const seo = getPageSEO('home');

  return (
    <>
      <SEOHead
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        structuredData={seo.structuredData}
      />
      <main>
        <Hero />
        <PortfolioStrip />
        <Capabilities />
        <VideoBand />
        <Approach />
        <CTABand />
      </main>
    </>
  );
};

export default Index;
