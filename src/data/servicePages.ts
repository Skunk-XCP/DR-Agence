export type ServicePageData = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  audience: string;
  problems: { title: string; text: string }[];
  deliverables: string[];
  process: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  related: { href: string; label: string; text: string }[];
};

export const servicePages = {
  customDevelopment: {
    slug: "/developpement-web-sur-mesure",
    title: "Développement web sur mesure et applications web | Freelance",
    description:
      "Développement web sur mesure à Bordeaux et en France : applications web, interfaces métier, fonctionnalités avancées et intégrations API.",
    eyebrow: "Des outils adaptés à votre fonctionnement",
    h1: "Développement web sur mesure et applications web",
    intro:
      "Je conçois des applications web, interfaces interactives et fonctionnalités sur mesure lorsque les possibilités d’un site standard ne suffisent pas. Basé à Bordeaux, je transforme un besoin métier précis en solution web claire, utilisable sur ordinateur comme sur mobile, pour des projets locaux ou menés à distance partout en France.",
    audience:
      "Cette prestation s’adresse aux indépendants, commerces et entreprises qui ont besoin d’un outil adapté à leur organisation : interface de gestion, traitement de données, parcours conditionnel, espace avec plusieurs rôles ou connexion à un service tiers. Le périmètre est défini à partir des utilisateurs, des règles métier, des données et des contraintes de l’existant.",
    problems: [
      {
        title: "Des tâches répétitives à structurer",
        text: "Un parcours web dédié peut guider la saisie, appliquer vos règles métier et rendre le traitement d’une demande plus lisible.",
      },
      {
        title: "Des informations difficiles à exploiter",
        text: "Une interface métier peut rassembler, filtrer et présenter les données utiles selon les besoins des utilisateurs concernés.",
      },
      {
        title: "Des outils qui ne communiquent pas",
        text: "Lorsqu’une API compatible et documentée existe, une intégration peut organiser les échanges de données avec un service tiers.",
      },
    ],
    deliverables: [
      "Cadrage des utilisateurs, objectifs et règles métier",
      "Définition des parcours, écrans et états importants",
      "Architecture adaptée aux données et aux intégrations prévues",
      "Développement d’une interface responsive et accessible",
      "Fonctionnalités front-end et back-end convenues dans le périmètre",
      "Tests des parcours essentiels et accompagnement à la mise en ligne",
    ],
    process: [
      {
        title: "Cadrage fonctionnel",
        text: "Nous décrivons le problème à résoudre, les utilisateurs, les données manipulées et les cas particuliers avant d’estimer le développement.",
      },
      {
        title: "Conception de la solution",
        text: "Je structure les écrans, les flux et l’architecture technique, puis nous validons un périmètre prioritaire et vérifiable.",
      },
      {
        title: "Développement et validation",
        text: "La solution est développée par étapes et les parcours convenus sont testés avant la livraison ou la mise en ligne.",
      },
    ],
    faq: [
      {
        question: "Quelle différence avec un site vitrine ?",
        answer: "Un site vitrine présente principalement une activité et facilite la prise de contact. Une application web ajoute des interactions, des règles métier, des données ou des accès qui nécessitent un cadrage fonctionnel plus approfondi.",
      },
      {
        question: "Pourquoi le tarif n’est-il pas calculé automatiquement ?",
        answer: "Le coût dépend notamment du nombre d’écrans, des rôles utilisateurs, des données, des règles métier et des intégrations. Une estimation fiable exige donc de clarifier ces éléments avant le devis.",
      },
      {
        question: "Peut-on ajouter une fonctionnalité à un site existant ?",
        answer: "Oui lorsque sa technologie, son code et ses accès le permettent. Une analyse de l’existant est nécessaire pour confirmer la faisabilité et éviter une intervention fragile.",
      },
    ],
    related: [
      {
        href: "/creation-site-internet-bordeaux",
        label: "Création web à Bordeaux",
        text: "Créer un site ou une solution web avec un développeur freelance local, également disponible à distance.",
      },
      {
        href: "/refonte-site-internet",
        label: "Refonte de site internet",
        text: "Repenser une base existante devenue limitante avant d’y intégrer de nouveaux parcours.",
      },
      {
        href: "/maintenance-site-internet",
        label: "Maintenance et évolutions",
        text: "Diagnostiquer, corriger ou faire évoluer un projet web existant selon sa faisabilité technique.",
      },
    ],
  },
  creationBordeaux: {
    slug: "/creation-site-internet-bordeaux",
    title: "Création de site internet à Bordeaux | Donatien Rouzeirol",
    description:
      "Création de sites internet professionnels à Bordeaux : site vitrine, landing page ou fonctionnalités sur mesure pour indépendants, commerces et entreprises.",
    eyebrow: "Création web locale et nationale",
    h1: "Création de site internet à Bordeaux",
    intro:
      "Je suis développeur web freelance basé dans la métropole bordelaise. Je conçois des sites clairs, rapides et adaptés à votre activité, que vous soyez indépendant, artisan, restaurateur, commerçant ou responsable d’une petite entreprise. Je travaille aussi à distance avec des clients partout en France.",
    audience:
      "Cette prestation s’adresse aux professionnels qui veulent créer un premier site, remplacer une présence en ligne devenue insuffisante ou lancer une offre avec une page dédiée. Le format est défini selon l’objectif : présenter une activité, générer des demandes de devis, faciliter une prise de contact ou intégrer un besoin métier précis.",
    problems: [
      {
        title: "Présenter clairement votre activité",
        text: "Le contenu et la navigation aident vos visiteurs à comprendre rapidement ce que vous proposez, à qui vous vous adressez et comment vous contacter.",
      },
      {
        title: "Inspirer confiance",
        text: "Une réalisation professionnelle, cohérente avec votre identité, renforce votre crédibilité auprès de prospects qui vous découvrent en ligne.",
      },
      {
        title: "Être visible sur les recherches utiles",
        text: "La structure, les contenus et les fondations techniques sont préparés pour permettre aux moteurs de recherche de comprendre vos services et votre zone d’intervention.",
      },
    ],
    deliverables: [
      "Cadrage de vos objectifs, de vos publics et du parcours de contact",
      "Architecture des pages et hiérarchie des informations",
      "Interface responsive respectant votre identité visuelle",
      "Développement, formulaires et fonctionnalités convenues",
      "Fondations SEO techniques et contenus structurés",
      "Tests avant mise en ligne et accompagnement au lancement",
    ],
    process: [
      { title: "Cadrage", text: "Nous clarifions votre activité, votre objectif commercial, les contenus disponibles et les fonctionnalités réellement nécessaires." },
      { title: "Conception", text: "Je structure les pages et l’interface afin que le message soit lisible sur mobile comme sur ordinateur." },
      { title: "Développement", text: "Je réalise le site, optimise son chargement et vérifie les principaux parcours avant livraison." },
    ],
    faq: [
      { question: "Faut-il être à Bordeaux pour travailler ensemble ?", answer: "Non. La proximité facilite les projets locaux, mais le cadrage et le suivi peuvent être réalisés à distance partout en France." },
      { question: "Quel type de site choisir ?", answer: "Un site vitrine convient pour présenter durablement une activité. Une landing page cible une offre ou une campagne précise. Des fonctionnalités sur mesure peuvent être ajoutées lorsque votre processus métier le demande." },
      { question: "Comment obtenir un devis ?", answer: "Décrivez votre activité, l’objectif du site, les pages ou fonctions envisagées et votre calendrier. Je pourrai ensuite préciser le périmètre et établir un devis adapté." },
    ],
    related: [
      { href: "/developpement-web-sur-mesure", label: "Développement web sur mesure", text: "Applications web, interfaces métier et intégrations pour les besoins qui dépassent un site standard." },
      { href: "/creation-site-vitrine", label: "Création de site vitrine", text: "Une présence professionnelle claire pour présenter votre activité et générer des contacts." },
      { href: "/refonte-site-internet", label: "Refonte de site internet", text: "Moderniser un site existant, son contenu, son ergonomie ou ses performances." },
    ],
  },
  vitrine: {
    slug: "/creation-site-vitrine",
    title: "Création de site vitrine professionnel | Freelance web",
    description:
      "Création de site vitrine professionnel pour indépendants, commerces et entreprises : contenu clair, design responsive, performance et SEO technique.",
    eyebrow: "Une présence en ligne claire et crédible",
    h1: "Création de site vitrine professionnel",
    intro:
      "Un site vitrine doit permettre à un prospect de comprendre votre activité, vos services et la prochaine étape en quelques instants. Je conçois des sites vitrines sur mesure pour les indépendants, commerces, restaurants, artisans et petites entreprises à Bordeaux comme ailleurs en France.",
    audience:
      "Le site vitrine est pertinent lorsque vous souhaitez présenter votre entreprise, détailler vos prestations, répondre aux questions fréquentes et recevoir des demandes qualifiées. Le nombre de pages et les fonctionnalités sont choisis selon vos contenus et vos objectifs, sans ajouter de complexité inutile.",
    problems: [
      { title: "Un message difficile à comprendre", text: "L’arborescence et les textes sont organisés autour des questions de vos futurs clients, avec des appels à l’action visibles." },
      { title: "Une image peu professionnelle", text: "L’interface traduit votre positionnement tout en restant lisible, accessible et cohérente sur tous les écrans." },
      { title: "Un site qui ne génère pas de contacts", text: "Chaque page guide naturellement vers une prise de contact, une demande de devis ou l’action adaptée à votre activité." },
    ],
    deliverables: [
      "Arborescence adaptée à vos prestations",
      "Pages de présentation, services et contact selon le périmètre",
      "Design responsive et intégration de votre identité",
      "Formulaire ou moyens de contact adaptés",
      "Métadonnées, structure HTML et sitemap pour le référencement",
      "Optimisation des images, du chargement et de l’accessibilité",
    ],
    process: [
      { title: "Contenus et objectifs", text: "Nous recensons les informations disponibles, les questions clients et les actions attendues sur le site." },
      { title: "Structure et interface", text: "Je transforme ces éléments en pages lisibles, avec une hiérarchie claire et une expérience adaptée au mobile." },
      { title: "Mise en ligne", text: "Après développement et vérifications, le site est préparé pour l’indexation et son évolution future." },
    ],
    faq: [
      { question: "Combien de pages faut-il pour un site vitrine ?", answer: "Cela dépend du nombre de prestations et de la quantité d’informations utiles. Une structure compacte peut suffire, tandis que des services distincts peuvent mériter des pages dédiées." },
      { question: "Le site sera-t-il adapté aux mobiles ?", answer: "Oui. La mise en page et les interactions sont conçues et vérifiées pour les écrans mobiles, tablettes et ordinateurs." },
      { question: "Puis-je ajouter des fonctionnalités plus tard ?", answer: "Oui, si l’architecture du projet le permet. Les évolutions peuvent être prévues dès le cadrage pour éviter une reconstruction inutile." },
    ],
    related: [
      { href: "/developpement-web-sur-mesure", label: "Développement web sur mesure", text: "Pour une application, une interface ou des règles métier qui dépassent le rôle d’un site vitrine." },
      { href: "/creation-site-internet-bordeaux", label: "Création de site à Bordeaux", text: "Un accompagnement local, également disponible partout en France." },
      { href: "/refonte-site-internet", label: "Refonte de site internet", text: "Pour repartir d’un site existant et améliorer son efficacité." },
    ],
  },
  refonte: {
    slug: "/refonte-site-internet",
    title: "Refonte de site internet | Modernisation et performance",
    description:
      "Refonte de site internet à Bordeaux et partout en France : modernisation, amélioration mobile, performance, SEO technique et parcours de contact.",
    eyebrow: "Faire évoluer un site devenu limitant",
    h1: "Refonte de site internet",
    intro:
      "Votre site existe déjà, mais il ne reflète plus votre activité, manque de clarté ou fonctionne mal sur mobile ? Une refonte permet de revoir l’expérience, le contenu et la base technique sans perdre de vue l’essentiel : aider vos visiteurs à comprendre votre offre et à vous contacter.",
    audience:
      "La refonte convient aux professionnels dont le site est visuellement daté, lent, difficile à administrer, mal structuré pour le référencement ou devenu incohérent avec leurs prestations. Avant de reconstruire, j’examine ce qui peut être conservé, amélioré ou redirigé.",
    problems: [
      { title: "Un site lent ou inconfortable sur mobile", text: "Les gabarits, médias et composants peuvent être revus pour réduire les frictions et améliorer le chargement." },
      { title: "Des contenus devenus obsolètes", text: "Les pages sont réorganisées autour de vos offres actuelles et des informations réellement utiles à vos prospects." },
      { title: "Une visibilité organique fragile", text: "La refonte intègre les URL existantes, les redirections nécessaires, les métadonnées et la structure sémantique afin de limiter les pertes évitables." },
    ],
    deliverables: [
      "Audit du site actuel et inventaire des contenus utiles",
      "Plan de conservation, suppression ou redirection des URL",
      "Nouvelle architecture de l’information et parcours de contact",
      "Modernisation de l’interface dans le respect de votre identité",
      "Amélioration technique, responsive et performance",
      "Préparation SEO et vérifications avant bascule",
    ],
    process: [
      { title: "Diagnostic", text: "J’analyse les pages, les contenus, les points de friction et les contraintes techniques du site existant." },
      { title: "Plan de refonte", text: "Nous validons ce qui reste, ce qui change et la correspondance entre anciennes et nouvelles URL." },
      { title: "Développement et migration", text: "La nouvelle version est testée avant la mise en ligne, avec les redirections et contrôles d’indexation nécessaires." },
    ],
    faq: [
      { question: "Une refonte fait-elle perdre le référencement existant ?", answer: "Toute refonte comporte des risques, mais un inventaire des URL, des redirections cohérentes et la conservation des contenus utiles permettent d’éviter de nombreuses pertes techniques." },
      { question: "Faut-il tout reconstruire ?", answer: "Pas systématiquement. Le diagnostic sert précisément à identifier les contenus, fonctionnalités et éléments visuels qui peuvent être conservés." },
      { question: "Peut-on améliorer seulement les performances ?", answer: "Oui. Si la structure du site reste adaptée, une intervention ciblée peut être préférable à une refonte complète." },
    ],
    related: [
      { href: "/developpement-web-sur-mesure", label: "Développement web sur mesure", text: "Ajouter une application, une interface interactive ou une intégration après analyse de l’existant." },
      { href: "/maintenance-site-internet", label: "Maintenance de site", text: "Pour les correctifs et améliorations progressives sans refonte complète." },
      { href: "/creation-site-internet-bordeaux", label: "Développeur web à Bordeaux", text: "Échanger avec un freelance local pour votre projet." },
    ],
  },
  maintenance: {
    slug: "/maintenance-site-internet",
    title: "Maintenance de site internet | Correctifs et évolutions",
    description:
      "Maintenance de site internet : diagnostic, correctifs, mises à jour, amélioration des performances et évolutions fonctionnelles à Bordeaux et en France.",
    eyebrow: "Garder un site fiable et utile",
    h1: "Maintenance de site internet",
    intro:
      "Un site internet a besoin d’être suivi après sa mise en ligne. J’interviens pour diagnostiquer un problème, corriger un dysfonctionnement, améliorer les performances ou ajouter une évolution clairement définie, à Bordeaux et à distance partout en France.",
    audience:
      "Cette prestation s’adresse aux professionnels qui disposent déjà d’un site et recherchent un développeur pour le maintenir ou le faire évoluer. La première étape consiste à examiner la technologie, l’hébergement et l’état du projet afin de confirmer ce qui peut être pris en charge.",
    problems: [
      { title: "Un bug bloque vos visiteurs", text: "Le problème est reproduit et diagnostiqué avant correction, avec une vérification du parcours concerné." },
      { title: "Le site devient lent ou instable", text: "Les causes mesurables sont recherchées côté interface, ressources, code ou configuration avant de proposer une intervention." },
      { title: "Votre activité évolue", text: "De nouveaux contenus, pages ou fonctionnalités peuvent être ajoutés lorsque la base existante le permet." },
    ],
    deliverables: [
      "Diagnostic initial de la demande et de l’environnement technique",
      "Correctifs ciblés et vérifications associées",
      "Mises à jour compatibles avec la stack existante",
      "Optimisation de performance lorsque les causes sont identifiées",
      "Ajout de contenus ou fonctionnalités selon le périmètre",
      "Compte rendu clair des changements réalisés",
    ],
    process: [
      { title: "Prise de contexte", text: "Vous décrivez le site, le problème ou l’évolution souhaitée et fournissez les accès nécessaires après validation du périmètre." },
      { title: "Diagnostic", text: "J’identifie la cause, les dépendances et les risques avant de confirmer l’intervention." },
      { title: "Correction et contrôle", text: "La modification est réalisée puis vérifiée sur les parcours concernés avant livraison." },
    ],
    faq: [
      { question: "Pouvez-vous maintenir n’importe quel site ?", answer: "La faisabilité dépend de la technologie, de l’état du code et des accès disponibles. Un diagnostic initial permet de confirmer la prise en charge." },
      { question: "Maintenance ponctuelle ou suivi régulier ?", answer: "Les deux sont possibles selon le besoin : correction délimitée, lot d’évolutions ou accompagnement dans la durée." },
      { question: "La maintenance inclut-elle une refonte ?", answer: "Non. Lorsque l’architecture ou l’interface doit être repensée en profondeur, une prestation de refonte est plus adaptée et permet de cadrer correctement la migration." },
    ],
    related: [
      { href: "/developpement-web-sur-mesure", label: "Développement web sur mesure", text: "Cadrer une évolution fonctionnelle, une interface métier ou une intégration plus importante." },
      { href: "/refonte-site-internet", label: "Refonte de site internet", text: "Quand des corrections ponctuelles ne suffisent plus." },
      { href: "/offres", label: "Estimer une évolution", text: "Sélectionnez la mise à jour d’un site existant pour cadrer le besoin." },
    ],
  },
} satisfies Record<string, ServicePageData>;
