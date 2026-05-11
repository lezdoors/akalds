import { Mail, Clock, MapPin, Shield, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, getLocalizedPath } = useLanguage();

  const serviceLinks = [
    { label: t('nav.administrative'), path: 'services/administrative' },
    { label: t('nav.assurance'), path: 'services/assurance' },
    { label: t('nav.centreContact'), path: 'services/centre-contact' },
    { label: t('nav.venteLeads'), path: 'vente-de-leads' },
  ];

  const companyLinks = [
    { label: t('nav.about'), path: 'about' },
    { label: t('nav.contact'), path: 'contact' },
  ];

  const legalLinks = [
    { label: t('footer.legal.mentions'), path: 'mentions-legales' },
    { label: t('footer.legal.privacy'), path: 'confidentialite' },
    { label: t('footer.legal.data'), path: 'rgpd' },
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container-custom py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 - Company */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="mb-4">
              <span className="text-2xl font-black tracking-tight text-white">
                MENANA
              </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {t('footer.description')}
            </p>

            {/* Address */}
            <div className="flex items-start gap-2.5 text-white/40 text-sm mb-5">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span>71-75 Shelton Street, Covent Garden, Londres, WC2H 9JQ</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Shield className="w-3.5 h-3.5 text-primary" />
                Conforme RGPD
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <CreditCard className="w-3.5 h-3.5 text-primary" />
                Paiements Stripe
              </span>
            </div>
          </div>

          {/* Column 2 - Nos Services */}
          <div>
            <h4 className="font-semibold text-white mb-5">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-white/50 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Entreprise */}
          <div>
            <h4 className="font-semibold text-white mb-5">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-white/50 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Informations legales */}
          <div>
            <h4 className="font-semibold text-white mb-5">{t('footer.legal.title')}</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-white/50 hover:text-white transition-colors duration-200 text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Info Row */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-white/40">
            <a
              href="mailto:contact@menana.net"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-primary" />
              contact@menana.net
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Lun-Ven 9h-18h heure de Paris
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-4 md:py-5">
          <p className="text-center text-white/30 text-xs md:text-sm">
            {t('footer.legal.copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
