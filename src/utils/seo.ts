const BASE_URL = 'https://www.akalds.com';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Akal Digital Services Ltd',
  description: 'Administrative assistance and insurance brokerage services in partnership with Zenassur France.',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
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
});

export const pageSEOConfig = {
  home: {
    title: 'Akal Digital Services Ltd — Services professionnels, assistance administrative et assurance',
    description: 'Akal Digital Services Ltd accompagne les particuliers dans leurs démarches administratives et la souscription de produits d\'assurance. Centre d\'appels, génération de leads.',
    canonical: '/',
    structuredData: [generateOrganizationSchema()],
  },
  services: {
    title: 'Nos Services — Assistance administrative et assurance | Akal Digital Services Ltd',
    description: 'Découvrez nos services : assistance administrative, raccordement électricité, assurance (mutuelle, auto, moto), centre de contact et vente de leads.',
    canonical: '/services',
    structuredData: [],
  },
  administrative: {
    title: 'Assistance Administrative — Raccordement, formulaires, suivi | Akal Digital Services Ltd',
    description: 'Prise en charge complète de vos démarches administratives : raccordement électricité Enedis/EDF, formulaires, suivi de dossiers. Accompagnement personnalisé.',
    canonical: '/services/administrative',
    structuredData: [],
  },
  assurance: {
    title: 'Assistance Assurance — Mutuelle, auto, moto, emprunteur | Akal Digital Services Ltd',
    description: 'Souscription d\'assurances en partenariat avec Zenassur France, courtier agréé Orias. Mutuelle santé, assurance auto, moto et emprunteur.',
    canonical: '/services/assurance',
    structuredData: [],
  },
  centreContact: {
    title: 'Centre de Contact — Support téléphonique en France | Akal Digital Services Ltd',
    description: 'Centre d\'appels basé en France avec des conseillers qualifiés. Appels entrants, suivi de dossiers, relances et reporting.',
    canonical: '/services/centre-contact',
    structuredData: [],
  },
  venteLeads: {
    title: 'Vente de Leads — Leads qualifiés énergie, assurance, immobilier | Akal Digital Services Ltd',
    description: 'Leads qualifiés et vérifiés livrés en temps réel. Secteurs : énergie, assurance, immobilier. Volume adaptable à vos besoins.',
    canonical: '/services/vente-leads',
    structuredData: [],
  },
  about: {
    title: 'À Propos — Akal Digital Services Ltd, société britannique',
    description: 'Akal Digital Services Ltd est une société britannique spécialisée dans l\'assistance administrative et le courtage en assurance, en partenariat avec Zenassur France.',
    canonical: '/about',
    structuredData: [generateOrganizationSchema()],
  },
  contact: {
    title: 'Contact — Akal Digital Services Ltd',
    description: 'Contactez Akal Digital Services Ltd pour vos démarches administratives et d\'assurance. Lun-Ven 9h-18h (heure de Paris). Email : contact@akalds.com.',
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
