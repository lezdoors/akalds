import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
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
        <Services />
        <Stats />
        <WhyChooseUs />
        <CTABand />
      </main>
    </>
  );
};

export default Index;
