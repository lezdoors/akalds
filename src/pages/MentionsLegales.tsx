const MentionsLegales = () => {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-3xl">
        <h1 className="text-headline mb-8">Mentions légales</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2>Éditeur du site</h2>
            <p>
              <strong>Menana LTD</strong><br />
              Société enregistrée au Royaume-Uni<br />
              71-75 Shelton Street, Covent Garden<br />
              Londres, WC2H 9JQ, Royaume-Uni
            </p>
            <p>
              Email : contact@menana.net<br />
              Site web : www.menana.net
            </p>
          </section>

          <section>
            <h2>Hébergement</h2>
            <p>
              Ce site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, États-Unis
            </p>
          </section>

          <section>
            <h2>Propriété intellectuelle</h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est la propriété exclusive de Menana LTD ou de ses partenaires et est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation, même partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2>Responsabilité</h2>
            <p>
              Menana LTD s'efforce d'assurer l'exactitude des informations publiées sur ce site. Toutefois, la société ne saurait être tenue responsable des erreurs, omissions ou résultats obtenus suite à l'utilisation de ces informations.
            </p>
          </section>

          <section>
            <h2>Partenariat</h2>
            <p>
              Les services d'assurance sont proposés en partenariat avec <strong>Zenassur France</strong>, courtier en assurance inscrit à l'Orias. Menana LTD agit en qualité d'intermédiaire et n'est pas directement responsable des produits d'assurance souscrits.
            </p>
          </section>

          <section>
            <h2>Droit applicable</h2>
            <p>
              Les présentes mentions légales sont régies par le droit du Royaume-Uni. Tout litige sera soumis à la compétence des tribunaux compétents de Londres.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
