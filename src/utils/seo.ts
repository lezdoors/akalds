const BASE_URL = 'https://www.akalds.com';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Akal Digital Services Ltd',
  description:
    'Akal Digital Services Ltd is a UK private limited company operating a small portfolio of digital brands across marketing, payments operations, and consumer goods.',
  url: BASE_URL,
  logo: `${BASE_URL}/brand/akal-logo-text.png`,
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'Companies House',
    value: '17229387',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@akalds.com',
    contactType: 'Customer Service',
    availableLanguage: ['French', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '71-75 Shelton Street, Covent Garden',
    addressLocality: 'London',
    postalCode: 'WC2H 9JQ',
    addressCountry: 'GB',
  },
  sameAs: [
    'https://find-and-update.company-information.service.gov.uk/company/17229387',
  ],
});

export const pageSEOConfig = {
  home: {
    title: 'Akal Digital Services Ltd — A UK digital holding',
    description:
      'A London-based holding company operating brands across marketing, payments, and consumer ventures.',
    canonical: '/',
    structuredData: [generateOrganizationSchema()],
  },
  marketing: {
    title: 'Marketing — Akal Digital Services Ltd',
    description:
      'Performance-led acquisition, conversion engineering, and analytics — operated across the Akal portfolio.',
    canonical: '/marketing',
    structuredData: [],
  },
  payments: {
    title: 'Payments — Akal Digital Services Ltd',
    description:
      'Internal payments infrastructure across our portfolio brands — dedicated merchant accounts, dispute hygiene, treasury and reconciliation.',
    canonical: '/payments',
    structuredData: [],
  },
  ventures: {
    title: 'Ventures — Akal Digital Services Ltd',
    description:
      'A focused portfolio of consumer and B2B brands operated under Akal Digital Services Ltd.',
    canonical: '/ventures',
    structuredData: [],
  },
  about: {
    title: 'About — Akal Digital Services Ltd',
    description:
      'Akal Digital Services Ltd is a private limited company registered in England & Wales, operating a small portfolio of digital brands.',
    canonical: '/about',
    structuredData: [generateOrganizationSchema()],
  },
  contact: {
    title: 'Contact — Akal Digital Services Ltd',
    description:
      'Press, partnerships, and operating opportunities. Email contact@akalds.com.',
    canonical: '/contact',
    structuredData: [],
  },
};

export const getPageSEO = (page: keyof typeof pageSEOConfig) => {
  const config = pageSEOConfig[page];
  return {
    ...config,
    canonical: `${BASE_URL}${config.canonical}`,
  };
};
