const Confidentialite = () => {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="text-headline mb-8">Politique de confidentialité</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>Collecte des données</h2>
            <p>
              Nous collectons les données personnelles suivantes lorsque vous utilisez notre formulaire de contact : nom, adresse email, numéro de téléphone et message. Ces informations sont fournies volontairement par l'utilisateur.
            </p>
          </section>

          <section>
            <h2>Utilisation des données</h2>
            <p>
              Les données collectées sont utilisées pour :
            </p>
            <ul>
              <li>Répondre à vos demandes et questions</li>
              <li>Fournir les services demandés</li>
              <li>Améliorer notre site et nos services</li>
              <li>Vous contacter dans le cadre de votre demande</li>
            </ul>
          </section>

          <section>
            <h2>Stockage des données</h2>
            <p>
              Vos données sont stockées sur l'infrastructure <strong>Supabase</strong>, conforme aux réglementations européennes en matière de protection des données. Les serveurs sont situés dans l'Union Européenne.
            </p>
          </section>

          <section>
            <h2>Partage avec des tiers</h2>
            <p>
              Vos données peuvent être partagées avec les partenaires suivants, uniquement dans le cadre de la fourniture de nos services :
            </p>
            <ul>
              <li><strong>Stripe</strong> — prestataire de paiement sécurisé, pour le traitement des transactions sur nos marques opérationnelles</li>
              <li><strong>Resend</strong> — prestataire d'envoi d'emails transactionnels</li>
              <li><strong>Vercel</strong> — hébergeur du site</li>
            </ul>
            <p>
              Aucune donnée n'est vendue à des tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h2>Cookies</h2>
            <p>
              Ce site utilise des cookies minimaux nécessaires au bon fonctionnement du site, ainsi que Google Analytics pour analyser le trafic et améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </section>

          <section>
            <h2>Vos droits (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
            </p>
            <ul>
              <li><strong>Droit d'accès</strong> — obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
              <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
              <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
            </ul>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Pour toute demande relative à vos données personnelles, vous pouvez nous contacter à l'adresse suivante : <strong>contact@akalds.com</strong>
            </p>
          </section>

          <section>
            <h2>Mise à jour</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière modification sera indiquée en haut de cette page. Nous vous encourageons à consulter régulièrement cette page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Confidentialite;
