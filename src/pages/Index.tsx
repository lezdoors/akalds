import { Hero } from '@/components/sections/Hero';
import { Capabilities } from '@/components/sections/Capabilities';
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
        <Capabilities />
        <Approach />
        <CTABand />
      </main>
    </>
  );
};

export default Index;
