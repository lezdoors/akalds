const RGPD = () => {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="text-headline mb-8">Protection des données (RGPD)</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>Responsable du traitement</h2>
            <p>
              <strong>Akal Digital Services Ltd</strong><br />
              71-75 Shelton Street, Covent Garden<br />
              Londres, WC2H 9JQ, Royaume-Uni<br />
              Email : contact@akalds.com
            </p>
          </section>

          <section>
            <h2>Base légale du traitement</h2>
            <p>
              Le traitement de vos données personnelles repose sur les bases légales suivantes :
            </p>
            <ul>
              <li><strong>Consentement</strong> — lorsque vous remplissez notre formulaire de contact, vous consentez au traitement de vos données</li>
              <li><strong>Intérêt légitime</strong> — pour la fourniture de nos services et l'amélioration de notre offre</li>
              <li><strong>Exécution d'un contrat</strong> — dans le cadre des services d'assurance et d'administration proposés</li>
            </ul>
          </section>

          <section>
            <h2>Données collectées</h2>
            <p>
              Les données personnelles collectées sont :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Type de service souhaité</li>
              <li>Contenu du message</li>
            </ul>
          </section>

          <section>
            <h2>Durée de conservation</h2>
            <p>
              Les données collectées via le formulaire de contact sont conservées pendant une durée maximale de <strong>3 ans</strong> à compter de la dernière interaction. Passé ce délai, les données sont supprimées de nos systèmes.
            </p>
          </section>

          <section>
            <h2>Vos droits</h2>
            <p>
              En vertu du RGPD, vous disposez des droits suivants sur vos données personnelles :
            </p>
            <ul>
              <li><strong>Droit d'accès</strong> — obtenir la confirmation que vos données sont traitées et en recevoir une copie</li>
              <li><strong>Droit de rectification</strong> — faire corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
              <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données pour des motifs légitimes</li>
              <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible par machine</li>
              <li><strong>Droit à la limitation</strong> — demander la limitation du traitement dans certaines conditions</li>
            </ul>
          </section>

          <section>
            <h2>Exercer vos droits</h2>
            <p>
              Pour exercer l'un de ces droits, envoyez votre demande par email à <strong>contact@akalds.com</strong> en précisant votre identité et le droit que vous souhaitez exercer. Nous nous engageons à répondre dans un délai de 30 jours.
            </p>
          </section>

          <section>
            <h2>Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données ne respecte pas la réglementation en vigueur, vous avez le droit d'introduire une réclamation auprès d'une autorité de contrôle :
            </p>
            <ul>
              <li><strong>ICO</strong> (Information Commissioner's Office) — pour le Royaume-Uni : <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
              <li><strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) — pour la France : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RGPD;
