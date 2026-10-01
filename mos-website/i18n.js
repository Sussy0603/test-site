/* =====================================================================
   MOS — French translations.

   HOW THIS WORKS, in one paragraph.

   The English in index.html and site.js is the source. This file is a
   plain lookup table from English to French: the key is the English
   string exactly as it appears on screen (with runs of whitespace
   collapsed to one space), the value is the French. At runtime site.js
   walks the page, and any piece of text whose English it finds in here
   gets swapped. Anything not listed simply stays in English, so a
   missing translation is a visible gap, never a broken page.

   WHAT THAT MEANS WHEN YOU EDIT COPY.

   Change an English sentence in index.html and its French entry stops
   matching — the page quietly falls back to English for that one line.
   So: change the English, then change the key here to match. Open the
   page with ?i18n=check in the address bar and the console prints every
   English string on the page with no translation, and every key in here
   that no longer matches anything. Run it after any copy edit.

   Strings that only exist in code (toasts, email bodies, the command
   palette) are keyed the same way — by their English text — and are
   grouped at the bottom under "FROM site.js".

   {name} and {n} are placeholders. Keep them, and keep them spelled
   the same in the French.

   Entries where the French is identical to the English are left out on
   purpose; the fallback already handles them.

   Register: Canadian French. Prices are in CAD and the audience is
   local, so "courriel" not "e-mail", "billet" not "ticket".
===================================================================== */

window.MOS_I18N = {

/* The tab title and the search-engine description. */
'MOS — Websites, Hosting, IT Support & Repairs':
  'MOS — Sites Web, hébergement, soutien et réparations informatiques',
'MOS builds websites and web platforms, hosts and looks after them, and handles the rest of your IT — support, repairs, monitoring and clear invoicing from one team.':
  'MOS conçoit des sites et des plateformes Web, les héberge et en prend soin, et s’occupe du reste de votre informatique — soutien, réparations, surveillance et facturation claire, par une seule équipe.',

/* ---------- Nav ---------- */
'Work':'Réalisations',
'Process':'Démarche',
'Security':'Sécurité',
'Pricing':'Tarifs',
'Support':'Soutien',
'Get started':'Commencer',
'Start a project':'Démarrer un projet',
/* The nav button's phone-width label; see the note beside it in the
   markup. The hero keeps the full phrase. */
'Start':'Démarrer',
'MOS home':'Accueil MOS',
'Search this page':'Rechercher dans la page',
'Open menu':'Ouvrir le menu',
'Toggle light or dark theme':'Basculer entre le thème clair et sombre',
'Toggle theme':'Changer de thème',

/* ---------- Hero ---------- */
'Websites · Hosting · IT support · Repairs':'Sites Web · Hébergement · Soutien informatique · Réparations',
'We build it, host it, and':'Nous le construisons, nous l’hébergeons et nous',
'keep the whole lot running':'gardons le tout en marche',
'Most agencies hand over a folder of files and disappear. We design and build your website or web platform, host it, watch it, patch it — and handle the rest of your IT while we\'re at it, down to the machine on the desk. One team, one invoice, nobody pointing at anybody else.':
  'La plupart des agences vous remettent un dossier de fichiers puis disparaissent. Nous concevons et construisons votre site ou votre plateforme Web, nous l’hébergeons, le surveillons, le mettons à jour — et nous nous occupons du reste de votre informatique au passage, jusqu’à l’ordinateur sur le bureau. Une équipe, une facture, personne qui montre l’autre du doigt.',
'See pricing':'Voir les tarifs',
'Currently taking on new builds and support contracts — typical first reply within one business day.':
  'Nous prenons actuellement de nouveaux projets et contrats de soutien — première réponse en un jour ouvrable en général.',

/* ---------- Hero console demo ---------- */
'Demo of the client console — sample data, not live status':
  'Démo de la console client — données d’exemple, pas un état réel',
'Console sections':'Sections de la console',
'Response time':'Temps de réponse',
'Ticket #4471 · resolved':'Billet nº 4471 · résolu',
'client console':'console client',
'Demo':'Démo',
'Uptime':'Disponibilité',
'Open':'Ouverts',
'Overdue':'En retard',
'Invoices':'Factures',

/* ---------- Trust strip ---------- */
'Every plan includes':'Chaque forfait comprend',
'TLS & daily backups':'TLS et sauvegardes quotidiennes',
'Uptime monitoring':'Surveillance de la disponibilité',
'Real human support':'Du soutien par de vraies personnes',
'Your own client portal':'Votre propre portail client',

/* ---------- Services ---------- */
'What we do':'Ce que nous faisons',
'Five services, one place':'Cinq services, un seul endroit',
'The web work is where most people start. The support and repair side is why they stop keeping three suppliers\' numbers in a drawer. Take one piece or the whole lot — it\'s the same team either way.':
  'Le travail Web est le point de départ de la plupart des gens. Le soutien et la réparation, c’est ce qui leur fait cesser de garder les numéros de trois fournisseurs dans un tiroir. Prenez une pièce ou le tout — c’est la même équipe dans les deux cas.',
'Details':'Détails',
'Typical build':'Durée type',
'From':'À partir de',
'Starts at':'À partir de',
'Notice period':'Préavis',
'30 days':'30 jours',
'Per user':'Par utilisateur',
'Or per device':'Ou par appareil',
'Diagnosis':'Diagnostic',
'Free':'Gratuit',
'Typical turnaround':'Délai type',
'2–4 weeks':'2 à 4 semaines',
'6–12 weeks':'6 à 12 semaines',
'2–5 days':'2 à 5 jours',
/* Canadian French puts the dollar sign after the figure, with a
   non-breaking space before it so a line never breaks between the two.
   The plan prices are written by money() in site.js instead — the billing
   toggle rewrites them, so they can't be fixed strings. These are the
   ones that sit still. */
'$29/month':'29 $/mois',
'$45/month':'45 $/mois',
'$2,400':'2 400 $',
'$8,500':'8 500 $',
'$75':'75 $',
'$65':'65 $',
'$55':'55 $',

'Website design & build':'Conception et création de sites Web',
'Brochure sites, booking flows, content-managed marketing sites. Designed around what your customers actually came to do, not what looked good in a template.':
  'Sites vitrines, parcours de réservation, sites marketing gérés par contenu. Conçus autour de ce que vos clients sont réellement venus faire, pas de ce qui paraissait bien dans un gabarit.',
'Responsive down to small phones':'Adaptatif jusqu’aux petits téléphones',
'Accessibility built in, not bolted on':'Accessibilité intégrée, pas ajoutée après coup',
'You own the code and the domain':'Le code et le domaine vous appartiennent',
'Sitemap and copy deck agreed up front, then design and build on a staging link you can share. Includes analytics, a sitemap, structured data, redirects from any old URLs, and a walkthrough of how to edit your own content.':
  'Plan du site et textes convenus dès le départ, puis conception et développement sur un lien de préproduction que vous pouvez partager. Comprend les statistiques, un plan de site, les données structurées, les redirections depuis les anciennes adresses et une démonstration pour modifier votre contenu vous-même.',

'Web platform builds':'Création de plateformes Web',
'When a website isn\'t enough: customer logins, dashboards, booking and scheduling, internal tools, client portals. Built to be handed over and maintained, not to impress at a demo and rot after.':
  'Quand un site ne suffit plus : comptes clients, tableaux de bord, réservation et horaires, outils internes, portails clients. Construits pour être remis et entretenus, pas pour impressionner en démo et pourrir ensuite.',
'Accounts, roles and permissions':'Comptes, rôles et permissions',
'Integrations with tools you already pay for':'Intégrations avec les outils que vous payez déjà',
'Documented handover':'Remise documentée',
'Scoped in phases so something usable ships early rather than everything landing at the end. Data model and permissions written down before build, a staging environment throughout, and an admin account for you from day one.':
  'Découpé en phases pour que quelque chose d’utilisable sorte tôt plutôt que tout arriver à la fin. Modèle de données et permissions écrits avant le développement, un environnement de préproduction du début à la fin, et un compte administrateur pour vous dès le premier jour.',

'Managed hosting & care':'Hébergement géré et entretien',
'We host what we build. Uptime watched, backups taken, certificates renewed, updates applied — and a named person to talk to when you need something changed.':
  'Nous hébergeons ce que nous construisons. Disponibilité surveillée, sauvegardes prises, certificats renouvelés, mises à jour appliquées — et une personne attitrée à qui parler quand vous voulez changer quelque chose.',
'Incidents logged and resolved openly':'Incidents consignés et résolus ouvertement',
'Support tickets with live chat':'Billets de soutien avec clavardage en direct',
'Predictable monthly invoicing':'Facturation mensuelle prévisible',
'Uptime checked every minute from more than one location, daily off-site backups kept for 30 days and restore-tested quarterly, certificates renewed automatically, and dependency patches applied on a monthly cycle — sooner for anything security-critical.':
  'Disponibilité vérifiée chaque minute depuis plus d’un emplacement, sauvegardes quotidiennes hors site conservées 30 jours et testées par restauration chaque trimestre, certificats renouvelés automatiquement, et correctifs de dépendances appliqués sur un cycle mensuel — plus vite pour tout ce qui touche la sécurité.',

'IT support':'Soutien informatique',
'The everyday stuff: accounts that won\'t log in, a printer nobody can reach, email going to spam, a new starter who needs setting up on Monday. Remote first, on site when remote won\'t cut it.':
  'Le quotidien : des comptes qui refusent de se connecter, une imprimante que personne n’atteint, des courriels qui tombent dans les indésirables, une nouvelle recrue à installer pour lundi. À distance d’abord, sur place quand le distant ne suffit pas.',
'Every request gets a ticket number':'Chaque demande reçoit un numéro de billet',
'Accounts, email and device setup':'Configuration des comptes, des courriels et des appareils',
'Same people who built your site':'Les mêmes personnes qui ont bâti votre site',
'Support runs through the same ticketing system as everything else, so a question about a website and a question about a laptop land in one queue with one history. Live chat on any open ticket. On-site visits are quoted by distance, not by an hourly rate that starts when the van leaves.':
  'Le soutien passe par le même système de billets que tout le reste : une question sur un site Web et une question sur un portable arrivent dans la même file, avec le même historique. Clavardage en direct sur tout billet ouvert. Les visites sur place sont chiffrées selon la distance, pas selon un taux horaire qui démarre quand la camionnette quitte le garage.',

'IT repairs':'Réparations informatiques',
'Hardware that\'s still worth saving. Screens, batteries, drives, boards, the machine that\'s been making that noise since March. Diagnosed first, quoted second, and told honestly when it isn\'t worth the money.':
  'Le matériel qui vaut encore la peine d’être sauvé. Écrans, batteries, disques, cartes, la machine qui fait ce bruit-là depuis mars. Diagnostic d’abord, soumission ensuite, et on vous dit franchement quand ça n’en vaut pas le coût.',
'Free diagnosis before any work starts':'Diagnostic gratuit avant tout travail',
'Data recovery and safe migration':'Récupération de données et migration sécuritaire',
'No fix, no fee':'Pas de réparation, pas de frais',
'You get a written quote after diagnosis and nothing proceeds until you say yes. If a repair costs more than the machine is worth we\'ll say so and price the alternative instead. Data comes off the old drive and onto the new one before anything is wiped — and nothing is wiped without you confirming it.':
  'Vous recevez une soumission écrite après le diagnostic et rien ne bouge avant votre accord. Si une réparation coûte plus cher que la valeur de la machine, nous le disons et chiffrons plutôt le remplacement. Les données passent de l’ancien disque au nouveau avant que quoi que ce soit ne soit effacé — et rien n’est effacé sans votre confirmation.',

/* ---------- Work ---------- */
'Selected work':'Réalisations choisies',
'What a finished job looks like':'À quoi ressemble un mandat terminé',
'Sample projects, written up the way we write up real ones: what the problem was, what we built, and what changed afterwards. Pick one to read the detail.':
  'Des projets d’exemple, rédigés comme nous rédigeons les vrais : quel était le problème, ce que nous avons construit, et ce qui a changé ensuite. Choisissez-en un pour lire le détail.',
'Filter work by type':'Filtrer les réalisations par type',

/* ---------- Process ---------- */
'How it goes':'Comment ça se passe',
'Four steps, no mystery':'Quatre étapes, aucun mystère',
'You\'ll always know which step you\'re on, what we\'re waiting on, and what it costs. Pick a step to see exactly what happens in it.':
  'Vous saurez toujours à quelle étape vous êtes, ce que nous attendons et ce que ça coûte. Choisissez une étape pour voir exactement ce qui s’y passe.',
'Project stages':'Étapes du projet',
'Discovery':'Découverte',
'A call and a short written brief. What the site has to do, who it\'s for, what "done" means. Fixed quote before anyone writes code.':
  'Un appel et un court mandat écrit. Ce que le site doit faire, à qui il s’adresse, ce que « terminé » veut dire. Prix fixe avant que quiconque écrive du code.',
'Design & build':'Conception et développement',
'You see it early and often on a staging link, not once at the end. Feedback in writing, changes tracked, nothing lost in a thread.':
  'Vous le voyez tôt et souvent sur un lien de préproduction, pas une seule fois à la fin. Commentaires par écrit, changements suivis, rien de perdu dans un fil de discussion.',
/* "Launch" is also a plan name, which must stay as it is — so this one
   step carries a data-i18n key of its own to tell the two apart. */
'process.launch':'Mise en ligne',
'Domain, certificates, redirects, analytics and backups configured before go-live. We do the switchover, you don\'t chase a registrar.':
  'Domaine, certificats, redirections, statistiques et sauvegardes configurés avant la mise en ligne. Nous faisons la bascule, vous ne courez pas après un registraire.',
'Operate':'Exploitation',
'Monitoring on, support access handed over, and a monthly plan that covers updates, fixes and small changes.':
  'Surveillance activée, accès au soutien remis, et un forfait mensuel qui couvre les mises à jour, les correctifs et les petits changements.',

/* ---------- Included ---------- */
'What\'s included':'Ce qui est inclus',
'The operations side, handled':'Le côté opérationnel, pris en charge',
'The part most quotes leave out. Every hosted client gets these as standard — they\'re how we run the business, not an upsell.':
  'La partie que la plupart des soumissions oublient. Chaque client hébergé y a droit d’office — c’est notre façon de fonctionner, pas un supplément.',
'Uptime & status':'Disponibilité et état',
'Every site carries a live status. If it moves off "Up", an incident opens automatically and you can see it.':
  'Chaque site affiche un état en direct. S’il quitte « En ligne », un incident s’ouvre automatiquement et vous le voyez.',
'Ticketed support':'Soutien par billets',
'Requests get a number and a status, so nothing lives or dies in one person\'s inbox.':
  'Les demandes reçoivent un numéro et un état : rien ne vit ni ne meurt dans la boîte de réception d’une seule personne.',
'Live chat':'Clavardage en direct',
'Any ticket can become a live conversation when back-and-forth by email is the slow way round.':
  'Tout billet peut devenir une conversation en direct quand les allers-retours par courriel sont le chemin lent.',
'Client portal':'Portail client',
'Your own login showing your sites, your invoices and your incident history — and nothing else.':
  'Votre propre accès, qui montre vos sites, vos factures et votre historique d’incidents — et rien d’autre.',
'Clear invoicing':'Facturation claire',
'Recurring monthly invoices per site. You can see what\'s paid and what isn\'t without asking.':
  'Factures mensuelles récurrentes par site. Vous voyez ce qui est payé et ce qui ne l’est pas sans avoir à demander.',
'Patching & backups':'Correctifs et sauvegardes',
'Certificates renewed, dependencies updated, daily backups kept and periodically restore-tested.':
  'Certificats renouvelés, dépendances mises à jour, sauvegardes quotidiennes conservées et testées par restauration périodiquement.',
'Told, not surprised':'Informé, pas surpris',
'Incidents, invoices and ticket replies reach you by email, SMS, push or in the portal — whichever you switch on, and only those.':
  'Les incidents, les factures et les réponses aux billets vous parviennent par courriel, texto, notification ou dans le portail — ceux que vous activez, et seulement ceux-là.',
'Roles from day one':'Des rôles dès le premier jour',
'Staff, moderators, admins and you — separate accounts with separate permissions, so nobody shares a login.':
  'Personnel, modérateurs, administrateurs et vous — des comptes distincts avec des permissions distinctes, pour que personne ne partage un accès.',

/* ---------- Security ---------- */
'Boring on purpose':'Ennuyeux, volontairement',
'Security work is only interesting when it goes wrong. These are the defaults on every site and platform we run — not a premium tier, not a line item.':
  'La sécurité n’est intéressante que lorsqu’elle échoue. Voici les réglages par défaut de chaque site et plateforme que nous exploitons — pas une gamme supérieure, pas une ligne de facture.',
'In transit':'En transit',
'On accounts':'Sur les comptes',
'Hashed':'Hachés',
'Passwords':'Mots de passe',
'Logged':'Journalisé',
'Hover to hold':'Survolez pour arrêter',
'Encrypted in transit':'Chiffré en transit',
'HTTPS everywhere, TLS on every connection, certificates renewed automatically before they lapse. No plain-text logins, ever.':
  'HTTPS partout, TLS sur chaque connexion, certificats renouvelés automatiquement avant leur expiration. Jamais d’authentification en clair.',
'Passwords we can\'t read':'Des mots de passe que nous ne pouvons pas lire',
'Stored as one-way hashes, never as text. Nobody here can look up your password, which is also why we can only reset it, not tell you it.':
  'Stockés sous forme d’empreintes à sens unique, jamais en texte. Personne ici ne peut consulter votre mot de passe — c’est aussi pourquoi nous pouvons seulement le réinitialiser, pas vous le dire.',
'Two-factor authentication':'Authentification à deux facteurs',
'App-based codes on every staff and admin account, and available to you. Email verification and password reset come as standard.':
  'Codes par application sur chaque compte du personnel et d’administration, et offerts à vous aussi. Vérification du courriel et réinitialisation du mot de passe incluses d’office.',
'Audit logs':'Journaux d’audit',
'Who changed what, and when. Privileged actions are recorded, so an awkward question six months later has an answer.':
  'Qui a changé quoi, et quand. Les actions privilégiées sont enregistrées : une question embêtante six mois plus tard a une réponse.',
'Encrypted backups':'Sauvegardes chiffrées',
'Taken daily, held off-site, encrypted at rest and restore-tested on a schedule — because an untested backup isn\'t a backup.':
  'Prises chaque jour, conservées hors site, chiffrées au repos et testées par restauration selon un calendrier — parce qu’une sauvegarde non testée n’est pas une sauvegarde.',
'Watched constantly':'Surveillé en permanence',
'Crashes, slow requests and server errors raise an alert on our side. Usually we\'re already looking at it when you call.':
  'Les plantages, les requêtes lentes et les erreurs serveur déclenchent une alerte chez nous. En général, nous sommes déjà dessus quand vous appelez.',
'On compliance:':'Côté conformité :',
'we build to GDPR as the baseline — UK and EU data centres unless you need somewhere specific, a data-processing agreement on request, and deletion that actually deletes. Card details never touch our servers; payments run through a PCI-DSS compliant provider. Anything with stricter rules attached, tell us at discovery and we\'ll scope to it rather than discover it late.':
  'nous bâtissons selon le RGPD comme référence — centres de données au Royaume-Uni et dans l’Union européenne à moins que vous ayez besoin d’un emplacement précis, entente de traitement des données sur demande, et une suppression qui supprime pour de vrai. Les numéros de carte ne touchent jamais nos serveurs : les paiements passent par un fournisseur conforme à la norme PCI-DSS. S’il y a des règles plus strictes, dites-le-nous à la découverte et nous en tiendrons compte dans la portée plutôt que de le découvrir trop tard.',
'And one thing we don\'t ship:':'Et une chose que nous ne livrons pas :',
'default passwords. Every system we hand over requires a real admin account to be created at setup, with a password you choose.':
  'des mots de passe par défaut. Chaque système que nous remettons exige la création d’un vrai compte administrateur à l’installation, avec un mot de passe que vous choisissez.',

/* ---------- Pricing ---------- */
'Hosting plans':'Forfaits d’hébergement',
'Build work is quoted per project after discovery. Hosting and care is a flat monthly plan so there are no surprise bills.':
  'Le développement est chiffré par projet après la découverte. L’hébergement et l’entretien sont un forfait mensuel fixe, pour qu’il n’y ait aucune facture surprise.',
'Billing period':'Période de facturation',
'Monthly':'Mensuel',
'Annual':'Annuel',
'/month':'/mois',
'A brochure site that needs to stay up and stay current.':'Un site vitrine qui doit rester en ligne et rester à jour.',
'1 website':'1 site Web',
'TLS, daily backups, patching':'TLS, sauvegardes quotidiennes, correctifs',
'Email support, 2 business days':'Soutien par courriel, 2 jours ouvrables',
'Content changes included':'Modifications de contenu incluses',
'Choose Launch':'Choisir Launch',
'Most chosen':'Le plus choisi',
'A working site you actually change month to month.':'Un site vivant que vous modifiez réellement d’un mois à l’autre.',
'Up to 3 websites':'Jusqu’à 3 sites Web',
'Everything in Launch':'Tout ce que comprend Launch',
'1 hour of content changes / month':'1 heure de modifications de contenu / mois',
'Ticketed support + live chat':'Soutien par billets + clavardage en direct',
'Client portal access':'Accès au portail client',
'Choose Growth':'Choisir Growth',
'A platform with logins and moving parts, treated as production.':'Une plateforme avec des comptes et des pièces mobiles, traitée comme de la production.',
'Unlimited sites & staging':'Sites et préproduction illimités',
'Everything in Growth':'Tout ce que comprend Growth',
'4 hours of dev time / month':'4 heures de développement / mois',
'Priority response, same business day':'Réponse prioritaire, le jour ouvrable même',
'Named account contact':'Personne-ressource attitrée',
'Choose Managed':'Choisir Managed',
'Multiple sites, staff devices and a compliance team asking questions.':'Plusieurs sites, les appareils du personnel et une équipe de conformité qui pose des questions.',
'Let\'s talk':'Parlons-en',
'Everything in Managed':'Tout ce que comprend Managed',
'IT support across your whole team':'Soutien informatique pour toute votre équipe',
'Written SLA and response targets':'Entente de service écrite et cibles de réponse',
'Data-processing agreement':'Entente de traitement des données',
'Priced per site and per seat':'Tarifé par site et par poste',
'Talk to us':'Parlez-nous',

/* Comparison table */
'Compare every line, side by side':'Comparer chaque ligne, côte à côte',
'Feature':'Caractéristique',
'Websites included':'Sites Web inclus',
'Unlimited':'Illimité',
'Staging environment':'Environnement de préproduction',
'TLS certificates':'Certificats TLS',
'Backup retention':'Conservation des sauvegardes',
'7 days':'7 jours',
'90 days':'90 jours',
'Agreed':'Convenu',
'Restore testing':'Tests de restauration',
'Yearly':'Annuel',
'Quarterly':'Trimestriel',
'Uptime check interval':'Fréquence des vérifications',
'30 sec':'30 s',
'Dependency patching':'Correctifs de dépendances',
'Monthly + urgent':'Mensuel + urgences',
'Support channel':'Canal de soutien',
'Email':'Courriel',
'Tickets + chat':'Billets + clavardage',
'Tickets, chat, phone':'Billets, clavardage, téléphone',
'First response target':'Cible de première réponse',
'2 business days':'2 jours ouvrables',
'1 business day':'1 jour ouvrable',
'Same business day':'Le jour ouvrable même',
'Per SLA':'Selon l’entente',
'1 hr / month':'1 h / mois',
'4 hrs / month':'4 h / mois',
'IT support for staff':'Soutien informatique du personnel',
'Add-on':'En option',
'Enforced':'Obligatoire',
'Audit log retention':'Conservation du journal d’audit',
'12 months':'12 mois',
'Monthly written report':'Rapport mensuel écrit',
'On request':'Sur demande',
'Extra work, hourly':'Travail supplémentaire, à l’heure',
'All prices exclude applicable taxes and are billed in CAD. Build projects and repairs are quoted separately as one-off work — no plan locks you in, cancel with 30 days\' notice.':
  'Tous les prix excluent les taxes applicables et sont facturés en dollars canadiens. Les projets de développement et les réparations sont chiffrés séparément comme travaux ponctuels — aucun forfait ne vous enferme, annulation avec un préavis de 30 jours.',

/* ---------- FAQ ---------- */
'The things people ask first':'Ce qu’on nous demande en premier',
'Twenty-one answers, searchable. If yours isn\'t here, ask it in the form below and we\'ll add it.':
  'Vingt et une réponses, avec recherche. Si la vôtre n’y est pas, posez-la dans le formulaire ci-dessous et nous l’ajouterons.',
'Search the questions… (press /)':'Rechercher dans les questions… (touche /)',
'Search frequently asked questions':'Rechercher dans la foire aux questions',
'Expand all':'Tout déplier',

'Do I own the site, or am I renting it from you?':'Le site m’appartient-il, ou est-ce que je vous le loue ?',
'You own it. The domain stays in your name, and you get the source code. A hosting plan is for running and maintaining it — leaving means moving the site, not losing it.':
  'Il vous appartient. Le domaine reste à votre nom et vous recevez le code source. Un forfait d’hébergement sert à l’exploiter et à l’entretenir — partir veut dire déménager le site, pas le perdre.',
'How long does a build take?':'Combien de temps prend un projet ?',
'A straightforward brochure site is usually 2–4 weeks from signed brief. Platform work with logins and integrations is quoted with a schedule after discovery, because guessing that number helps nobody.':
  'Un site vitrine simple prend habituellement de 2 à 4 semaines à partir du mandat signé. Une plateforme avec comptes et intégrations est chiffrée avec un échéancier après la découverte, parce que deviner ce chiffre n’aide personne.',
'What happens when something breaks at 9pm?':'Que se passe-t-il si quelque chose brise à 21 h ?',
'Monitoring flags it and an incident opens against your site. On Launch and Growth we act next business day; on Managed, priority issues get a same-day response. Either way you can see the incident rather than wondering.':
  'La surveillance le détecte et un incident s’ouvre sur votre site. Sur Launch et Growth, nous intervenons le jour ouvrable suivant ; sur Managed, les cas prioritaires reçoivent une réponse le jour même. Dans les deux cas, vous voyez l’incident au lieu de vous demander.',
'Can you take over a site somebody else built?':'Pouvez-vous reprendre un site bâti par quelqu’un d’autre ?',
'Often yes. We\'ll audit it first and tell you honestly whether it\'s worth adopting as-is or whether you\'d spend less rebuilding it than maintaining it.':
  'Souvent, oui. Nous l’auditons d’abord et nous vous dirons franchement s’il vaut la peine d’être repris tel quel, ou si le refaire vous coûterait moins cher que l’entretenir.',
'Do you do SEO and content?':'Faites-vous du référencement et du contenu ?',
'We build sites to be technically sound — structure, speed, accessibility, metadata. Ongoing content writing and campaign work isn\'t our trade, and we\'ll say so rather than bill for it badly.':
  'Nous bâtissons des sites techniquement solides — structure, vitesse, accessibilité, métadonnées. La rédaction de contenu en continu et la gestion de campagnes ne sont pas notre métier, et nous le dirons plutôt que de mal vous les facturer.',
'What if I only want the build, not the hosting?':'Et si je veux seulement le développement, pas l’hébergement ?',
'That\'s fine. We\'ll hand over the code and a deployment guide. Most people stay on a plan because it\'s the same team, but it isn\'t a condition.':
  'Aucun problème. Nous remettons le code et un guide de déploiement. La plupart des gens restent sur un forfait parce que c’est la même équipe, mais ce n’est pas une condition.',
'How do you handle payment — deposit, stages, on completion?':'Comment fonctionne le paiement — dépôt, étapes, à la livraison ?',
'Build work is a third to start, a third at design sign-off and a third on launch. Hosting is billed monthly in advance from the day the site goes live, not from the day you signed. Invoices are 14 days.':
  'Le développement se paie en trois tiers : au démarrage, à l’approbation du design et à la mise en ligne. L’hébergement est facturé mensuellement d’avance à partir du jour de la mise en ligne, pas du jour de la signature. Les factures sont payables en 14 jours.',
'Where is the site actually hosted, and who can see my data?':'Où le site est-il réellement hébergé, et qui peut voir mes données ?',
'UK and EU data centres unless you need somewhere specific. Access is limited to the people working on your account, backups are encrypted at rest, and we\'ll sign a data-processing agreement if your compliance team needs one.':
  'Des centres de données au Royaume-Uni et dans l’Union européenne, à moins que vous ayez besoin d’un emplacement précis. L’accès est limité aux personnes qui travaillent sur votre compte, les sauvegardes sont chiffrées au repos, et nous signerons une entente de traitement des données si votre équipe de conformité en a besoin.',
'Is accessibility included or is it extra?':'L’accessibilité est-elle incluse ou en supplément ?',
'Included. We build to WCAG 2.2 AA as a baseline — keyboard operation, contrast, focus states, real labels — because retrofitting it costs far more than doing it the first time. A formal audit by a third party is extra, and we\'ll arrange one if you want it.':
  'Incluse. Nous bâtissons selon la norme WCAG 2.2 AA comme référence — utilisation au clavier, contraste, états de focus, vraies étiquettes — parce que l’ajouter après coup coûte bien plus cher que le faire du premier coup. Un audit formel par un tiers est en supplément, et nous l’organiserons si vous le souhaitez.',
'What happens if I outgrow my plan?':'Que se passe-t-il si mon forfait devient trop petit ?',
'You move up whenever you like and we pro-rate the difference. Moving down works the same way at the end of a billing month. Nobody gets billed for a plan they stopped needing six months ago — if we notice that, we\'ll tell you.':
  'Vous montez de forfait quand vous voulez et nous calculons la différence au prorata. Descendre fonctionne de la même façon, à la fin d’un mois de facturation. Personne ne se fait facturer un forfait dont il n’a plus besoin depuis six mois — si nous le remarquons, nous vous le dirons.',
'Can we do the content ourselves?':'Pouvons-nous faire le contenu nous-mêmes ?',
'Yes, and most clients do. Content-managed sections come with an editor and a short handover session. If writing it is the thing blocking launch, say so early and we\'ll build around placeholder content rather than wait.':
  'Oui, et la plupart des clients le font. Les sections gérées par contenu viennent avec un éditeur et une courte séance de transfert. Si la rédaction est ce qui bloque la mise en ligne, dites-le tôt et nous bâtirons autour de contenu provisoire plutôt que d’attendre.',
'What don\'t you do?':'Que ne faites-vous pas ?',
'Native mobile apps, ad campaign management, and ongoing copywriting. We\'ll recommend someone rather than take the work and do it half-well.':
  'Les applications mobiles natives, la gestion de campagnes publicitaires et la rédaction publicitaire en continu. Nous vous recommanderons quelqu’un plutôt que de prendre le mandat et de le faire à moitié.',
'How do I get my site back if we part ways?':'Comment récupérer mon site si nos chemins se séparent ?',
'Ask, and you get the code, the database, the assets and the DNS details — within five working days, at no charge, whatever the reason for leaving. There\'s no hostage clause in the contract because there shouldn\'t be one.':
  'Vous demandez, et vous recevez le code, la base de données, les fichiers et les informations DNS — en cinq jours ouvrables, sans frais, quelle que soit la raison du départ. Il n’y a aucune clause de rétention dans le contrat, parce qu’il ne devrait pas y en avoir.',
'Do you work with fixed budgets?':'Travaillez-vous avec des budgets fixes ?',
'Often the most useful way to start. Tell us the number and we\'ll tell you honestly what fits inside it, what doesn\'t, and whether it\'s worth doing at all at that level.':
  'C’est souvent la façon la plus utile de commencer. Donnez-nous le chiffre et nous vous dirons franchement ce qui entre dedans, ce qui n’y entre pas, et si ça vaut la peine d’être fait à ce niveau-là.',
'Can you work with our existing designer or brand guidelines?':'Pouvez-vous travailler avec notre designer ou nos normes graphiques ?',
'Yes, and it usually saves money. Send us the brand guide and we\'ll build to it. If you have a designer producing screens, we\'ll agree a handover format with them up front so nothing gets redrawn twice.':
  'Oui, et ça fait généralement économiser. Envoyez-nous le guide de marque et nous bâtirons selon celui-ci. Si un designer produit des maquettes, nous conviendrons d’un format de transfert avec lui dès le départ pour que rien ne soit redessiné deux fois.',
'What do you need from me to keep things moving?':'De quoi avez-vous besoin de moi pour que ça avance ?',
'Someone who can make decisions, feedback within a few days of each staging round, and content when we ask for it. Projects slip on waiting, almost never on building.':
  'Quelqu’un qui peut décider, des commentaires dans les jours suivant chaque ronde de préproduction, et du contenu quand nous le demandons. Les projets prennent du retard en attendant, presque jamais en construisant.',
'Do I have to be a web client to get IT support?':'Dois-je être client Web pour avoir du soutien informatique ?',
'No. Support and repairs stand on their own — plenty of people come to us with a room full of machines and no website at all. It\'s cheaper bundled, because it\'s one relationship instead of two, but nothing is conditional on anything else.':
  'Non. Le soutien et les réparations tiennent debout tout seuls — bien des gens viennent nous voir avec une salle pleine de machines et aucun site Web. C’est moins cher groupé, parce que c’est une relation au lieu de deux, mais rien n’est conditionnel à rien.',
'How long does a repair take, and what if it can\'t be fixed?':'Combien de temps prend une réparation, et si c’est irréparable ?',
'Two to five working days for most things, longer if a part has to come from far away — we\'ll tell you which before you leave it with us. Diagnosis is free, you get a written quote before any work starts, and if we can\'t fix it you don\'t pay. If the repair costs more than the machine is worth, we\'ll say that instead of quietly doing it.':
  'De deux à cinq jours ouvrables pour la plupart des cas, plus longtemps si une pièce doit venir de loin — nous vous dirons lequel des deux avant que vous nous laissiez l’appareil. Le diagnostic est gratuit, vous recevez une soumission écrite avant tout travail, et si nous ne pouvons pas la réparer, vous ne payez pas. Si la réparation coûte plus cher que la valeur de la machine, nous le dirons au lieu de la faire en silence.',
'Can you recover data off a drive that\'s failed?':'Pouvez-vous récupérer les données d’un disque défaillant ?',
'Often, and it\'s the first thing we try before anything else is touched. Nothing gets wiped or reinstalled until you\'ve confirmed the data is safely off and you\'ve seen it. Physically damaged platters need a specialist lab — we\'ll refer you rather than make it worse having a go.':
  'Souvent, et c’est la première chose que nous tentons avant de toucher à quoi que ce soit d’autre. Rien n’est effacé ni réinstallé tant que vous n’avez pas confirmé que les données sont bien sorties et que vous les avez vues. Des plateaux physiquement endommagés exigent un laboratoire spécialisé — nous vous y dirigerons plutôt que d’empirer les choses en essayant.',
'Do you support our staff directly, or do we have to relay everything?':'Soutenez-vous notre personnel directement, ou devons-nous tout relayer ?',
'Directly. Your team raise their own tickets and talk to us themselves, which is faster for everyone and stops one person becoming the office help desk. You still see everything on your account, so nothing happens off the record.':
  'Directement. Votre équipe ouvre ses propres billets et nous parle elle-même : c’est plus rapide pour tout le monde et ça évite qu’une personne devienne le service d’assistance du bureau. Vous voyez quand même tout dans votre compte, donc rien ne se passe hors dossier.',
'Do you have access to our data, and can you delete it if we ask?':'Avez-vous accès à nos données, et pouvez-vous les supprimer si nous le demandons ?',
'We have the access needed to run and support your systems, limited to the people actually working on your account and recorded in an audit log. If you ask us to delete something, it\'s deleted — including from backups as they age out, and we\'ll tell you when that\'s complete rather than leaving you to assume.':
  'Nous avons l’accès nécessaire pour exploiter et soutenir vos systèmes, limité aux personnes qui travaillent réellement sur votre compte et consigné dans un journal d’audit. Si vous nous demandez de supprimer quelque chose, c’est supprimé — y compris des sauvegardes à mesure qu’elles expirent, et nous vous dirons quand ce sera terminé plutôt que de vous laisser le supposer.',

/* ---------- Support tickets ---------- */
'Already with us':'Déjà client',
'Something broken? Raise a ticket':'Quelque chose est brisé ? Ouvrez un billet',
'One queue, no tiers of humans to climb through. Tell us what\'s wrong and how badly it\'s hurting, and it lands on the same board the people who built your site work from.':
  'Une seule file, aucun palier d’humains à franchir. Dites-nous ce qui ne va pas et à quel point ça fait mal, et ça arrive sur le même tableau que celui des personnes qui ont bâti votre site.',
'Ticket ready to send.':'Billet prêt à envoyer.',
'One line: what\'s wrong?':'En une ligne : qu’est-ce qui ne va pas ?',
'Give it a short title so we can both find it again.':'Donnez-lui un titre court pour qu’on puisse le retrouver tous les deux.',
'Checkout page returns a 500 error':'La page de paiement renvoie une erreur 500',
'Your name':'Votre nom',
'We need something to call you.':'Il nous faut un nom pour vous appeler.',
'That doesn\'t look like an email address.':'Ça ne ressemble pas à une adresse courriel.',
'Site or system':'Site ou système',
'(optional)':'(facultatif)',
'example.com, or the office printer':'exemple.com, ou l’imprimante du bureau',
'What kind of problem?':'Quel genre de problème ?',
'Site or app is down':'Le site ou l’application est hors service',
'Broken, but still up':'Brisé, mais encore en ligne',
'Email, domain or DNS':'Courriel, domaine ou DNS',
'Hosting, backups or certificates':'Hébergement, sauvegardes ou certificats',
'A change to an existing site':'Une modification à un site existant',
'Device, hardware or network repair':'Réparation d’appareil, de matériel ou de réseau',
'Account, billing or invoice':'Compte, facturation ou facture',
'Something else':'Autre chose',
'How badly is it hurting?':'À quel point ça fait mal ?',
'What\'s happening?':'Que se passe-t-il ?',
'What you did, what you expected, what happened instead. Exact error text, the page it happens on, and when it started all cut a round-trip out.':
  'Ce que vous avez fait, ce que vous attendiez, ce qui est arrivé à la place. Le texte exact de l’erreur, la page où ça se produit et le moment où ça a commencé nous évitent chacun un aller-retour.',
'Leave this empty':'Laissez ce champ vide',
'Raise the ticket':'Ouvrir le billet',
'No backend is wired up to this form yet — submitting opens your email client with the ticket filled in, and we open it on our side. The ticket number comes back in the reply.':
  'Aucun serveur n’est encore branché à ce formulaire — l’envoi ouvre votre logiciel de courriel avec le billet déjà rempli, et nous l’ouvrons de notre côté. Le numéro de billet revient dans la réponse.',
'What we aim for':'Ce que nous visons',
'Time to a first human reply during support hours, not time to a fix — we\'d rather tell you what we\'ve found in an hour than go quiet for a day. Managed plans include out-of-hours cover for Critical.':
  'Délai avant une première réponse humaine pendant les heures de soutien, pas délai avant la correction — nous préférons vous dire ce que nous avons trouvé en une heure que de disparaître pour une journée. Les forfaits Managed couvrent les urgences critiques hors des heures normales.',
'Where your ticket goes':'Où va votre billet',
'Unread':'Non lu',
'It\'s on the board. Nobody has opened it yet.':'Il est sur le tableau. Personne ne l’a encore ouvert.',
'Received':'Reçu',
'Read, understood and assigned to a person by name.':'Lu, compris et assigné à une personne, nommément.',
'Being worked on':'En traitement',
'Someone is actually on it, and you can see who.':'Quelqu’un s’en occupe pour de vrai, et vous voyez qui.',
'Finished':'Terminé',
'Fixed and written up. Yours to check before it closes.':'Réglé et documenté. À vous de vérifier avant la fermeture.',
'Closed':'Fermé',
'Agreed done. The history stays attached to your site.':'Convenu terminé. L’historique reste attaché à votre site.',

/* ---------- Contact ---------- */
'Tell us what you need':'Dites-nous ce dont vous avez besoin',
'A few lines is enough to start. We\'ll reply with either a straight answer or the two questions we\'d need answered to quote it.':
  'Quelques lignes suffisent pour commencer. Nous répondrons soit par une réponse directe, soit par les deux questions dont nous aurions besoin pour chiffrer le tout.',
'Thanks — your enquiry is ready to send.':'Merci — votre demande est prête à envoyer.',
'What do you need?':'De quoi avez-vous besoin ?',
'A new website':'Un nouveau site Web',
'An online store':'Une boutique en ligne',
'A web platform / customer logins':'Une plateforme Web / des comptes clients',
'Rebuild or takeover of an existing site':'Refonte ou reprise d’un site existant',
'Hosting & care for an existing site':'Hébergement et entretien d’un site existant',
'IT support for our team':'Du soutien informatique pour notre équipe',
'A repair or hardware problem':'Une réparation ou un problème de matériel',
'Not sure yet':'Je ne sais pas encore',
'Budget range':'Fourchette de budget',
'Rather not say yet':'Je préfère ne pas le dire pour l’instant',
'Under $2,500':'Moins de 2 500 $',
'$2,500 – $5,000':'2 500 $ – 5 000 $',
'$5,000 – $10,000':'5 000 $ – 10 000 $',
'$10,000 – $25,000':'10 000 $ – 25 000 $',
'$25,000+':'25 000 $ et plus',
'Anything useful to know':'Tout ce qui pourrait être utile',
'Rough timescale, budget range, links to anything you like…':'Échéancier approximatif, fourchette de budget, liens vers ce que vous voulez…',
'Send enquiry':'Envoyer la demande',
'No backend is wired up to this form yet — submitting opens your email client with the details filled in. Swap in a real endpoint when you\'re ready.':
  'Aucun serveur n’est encore branché à ce formulaire — l’envoi ouvre votre logiciel de courriel avec les détails déjà remplis. Branchez une vraie adresse de traitement quand vous serez prêt.',
'Typical reply time':'Délai de réponse habituel',
'One business day. If we\'re too booked to take the work, we\'ll say that quickly rather than go quiet.':
  'Un jour ouvrable. Si nous sommes trop occupés pour prendre le mandat, nous le dirons rapidement plutôt que de nous taire.',
'What we\'ll send back':'Ce que nous vous renverrons',
'A fixed quote and a written scope — what\'s in, what\'s out, and what it costs to change your mind later.':
  'Une soumission à prix fixe et une portée écrite — ce qui est inclus, ce qui ne l’est pas, et ce que coûte un changement d’idée plus tard.',
'Who you\'ll deal with':'Avec qui vous traiterez',
'The people doing the work. No account layer relaying messages to a team you never meet.':
  'Les personnes qui font le travail. Aucune couche de gestion de comptes qui relaie vos messages à une équipe que vous ne rencontrez jamais.',

/* ---------- Footer ---------- */
'We build websites and web platforms, host and look after them, and handle the rest of your IT.':
  'Nous concevons des sites et des plateformes Web, nous les hébergeons et en prenons soin, et nous nous occupons du reste de votre informatique.',
'Managed hosting':'Hébergement géré',
'Company':'Entreprise',
'How we work':'Notre façon de travailler',
'Raise a ticket':'Ouvrir un billet',
'Explore':'Explorer',
'MOS. All rights reserved.':'MOS. Tous droits réservés.',

/* ---------- Case-study reader + command palette ---------- */
'Close':'Fermer',
'Jump to a section, service, plan or question…':'Aller à une section, un service, un forfait ou une question…',
'Results':'Résultats',
'move':'naviguer',
'go':'aller',
'step sections':'changer de section',
'search the FAQ':'chercher dans la FAQ',
'Back to top':'Retour en haut',

/* =====================================================================
   FROM site.js
   Everything below is text that lives in code rather than in the markup:
   the sample console data, the case studies, the process detail, the
   ticket priorities, and the handful of messages the page writes as you
   use it. Keyed by their English exactly the same way.
===================================================================== */

/* ---------- Hero console: sample rows ---------- */
'Up':'En ligne',
'Staging':'Préprod',
'deploying':'déploiement',
'Plan':'Forfait',
'Last deploy':'Dernier déploiement',
'Open tickets':'Billets ouverts',
'Client since':'Client depuis',
'4 days ago':'il y a 4 jours',
'yesterday':'hier',
'in progress':'en cours',
'3 weeks ago':'il y a 3 semaines',
'Mar 2024':'mars 2024',
'Nov 2023':'nov. 2023',
'Jun 2025':'juin 2025',
'Feb 2025':'févr. 2025',
'Booking form submissions up 34% since launch.':'Envois du formulaire de réservation en hausse de 34 % depuis la mise en ligne.',
'Brief provider blip on 12 Jul — 7 minutes, resolved.':'Brève panne du fournisseur le 12 juillet — 7 minutes, résolue.',
'New appointments module on staging, awaiting sign-off.':'Nouveau module de rendez-vous en préproduction, en attente d’approbation.',
'No incidents since go-live.':'Aucun incident depuis la mise en ligne.',
'12 Jul':'12 juil.',
'02 Jul':'2 juil.',
'28 Jun':'28 juin',
'21 Jun':'21 juin',
'01 Aug':'1 août',
'01 Jul':'1 juil.',
'14 Jun':'14 juin',
'harbourside-lets.co.uk unreachable':'harbourside-lets.co.uk inaccessible',
'Certificate renewed automatically':'Certificat renouvelé automatiquement',
'Slow response on contact form':'Réponse lente du formulaire de contact',
'Dependency patch window':'Fenêtre de correctifs de dépendances',
'Provider network fault · resolved in 7 min · no data loss':'Panne réseau du fournisseur · résolue en 7 min · aucune perte de données',
'northgate-dental.com · 90-day cycle · no action needed':'northgate-dental.com · cycle de 90 jours · aucune action requise',
'meadow-vets.com · mail relay throttling · relay swapped':'meadow-vets.com · limitation du relais de courriel · relais remplacé',
'All sites · 14 packages · staging verified first':'Tous les sites · 14 paquets · vérifiés d’abord en préproduction',
'Done':'Fait',
'Hosting & care — August':'Hébergement et entretien — août',
'Content changes — July':'Modifications de contenu — juillet',
'Hosting & care — July':'Hébergement et entretien — juillet',
'Build — appointments module':'Développement — module de rendez-vous',
'2.5 hrs over allowance · $162.50':'2,5 h au-delà de l’allocation · 162,50 $',
'Stage 2 of 3 · meadow-vets.com':'Étape 2 sur 3 · meadow-vets.com',
'Paid':'Payée',
'Due 15th':'Due le 15',

/* ---------- Work gallery ---------- */
'Everything':'Tout',
'Websites':'Sites Web',
'Platforms':'Plateformes',
'IT & repairs':'TI et réparations',
'Games & apps':'Jeux et applis',
'Sample':'Exemple',
'Read the write-up':'Lire le compte rendu',
'Nothing in that category yet.':'Rien dans cette catégorie pour l’instant.',
'The problem':'Le problème',
'What we did':'Ce que nous avons fait',
'Built with':'Construit avec',
'Start something similar':'Lancer un projet semblable',

/* Case studies. Company names stay as they are; the two descriptive
   names (the ops console, the arcade) are translated. */
'Website + booking':'Site Web + réservation',
'A practice losing bookings to a phone line nobody answered at lunchtime.':
  'Une clinique qui perdait des rendez-vous à cause d’une ligne téléphonique sans réponse sur l’heure du dîner.',
'Appointments could only be made by phone, and the phone was staffed by the same two people running reception. Roughly a third of calls went unanswered at peak times, and the old site was unreadable on a phone.':
  'Les rendez-vous ne se prenaient que par téléphone, et le téléphone était tenu par les deux mêmes personnes qui géraient la réception. Environ un appel sur trois restait sans réponse aux heures de pointe, et l’ancien site était illisible sur un téléphone.',
'Rebuilt the site mobile-first, with treatment pages written around what patients search for':
  'Refonte du site en priorité mobile, avec des pages de traitements rédigées autour de ce que les patients cherchent',
'Added a booking flow that writes straight into the existing practice diary':
  'Ajout d’un parcours de réservation qui écrit directement dans l’agenda existant de la clinique',
'Set up automated reminders to cut no-shows':'Mise en place de rappels automatiques pour réduire les absences',
'Migrated 40+ pages of legacy content, with redirects from every old URL':
  'Migration de plus de 40 pages de contenu existant, avec redirection de chaque ancienne adresse',
'Build time':'Durée du projet',
'4 weeks':'4 semaines',
'Bookings online':'Réservations en ligne',
'61%':'61 %',
'Vanilla JS':'JS natif',

'Platform · logins':'Plateforme · comptes',
'Holiday-let management run out of three spreadsheets and a shared inbox.':
  'Une gestion de locations de vacances tenue avec trois feuilles de calcul et une boîte de réception partagée.',
'Owners had no way to see their own bookings without emailing the office, and the office rekeyed every booking into a spreadsheet by hand. Double-bookings happened about once a month.':
  'Les propriétaires ne pouvaient pas voir leurs propres réservations sans écrire au bureau, et le bureau ressaisissait chaque réservation à la main dans une feuille de calcul. Les doubles réservations arrivaient environ une fois par mois.',
'Built an owner portal with per-property access and a live calendar':
  'Création d’un portail propriétaire avec accès par propriété et calendrier en direct',
'Replaced the spreadsheets with a single database and an audit trail':
  'Remplacement des feuilles de calcul par une seule base de données et une piste d’audit',
'Added role-based staff accounts so nobody shares a login any more':
  'Ajout de comptes du personnel par rôle pour que plus personne ne partage un accès',
'Wired up automated statements, generated monthly instead of assembled by hand':
  'Branchement des relevés automatisés, générés chaque mois au lieu d’être assemblés à la main',
'9 weeks':'9 semaines',
'Admin hours saved':'Heures admin économisées',
'~12/wk':'~12/sem.',
'Chart rendering':'Rendu de graphiques',
'Role-based auth':'Authentification par rôles',

'Website · rebuild':'Site Web · refonte',
'An inherited site nobody could edit, on a platform nobody supported.':
  'Un site hérité que personne ne pouvait modifier, sur une plateforme que personne ne soutenait.',
'The original builder had gone quiet, the CMS licence had lapsed, and a simple opening-hours change needed a developer. Page speed scores were in the twenties on mobile.':
  'Le constructeur d’origine ne répondait plus, la licence du CMS avait expiré, et un simple changement d’heures d’ouverture exigeait un développeur. Les scores de vitesse tournaient autour de 20 sur mobile.',
'Audited the existing build and advised rebuilding rather than adopting it':
  'Audit du site existant et recommandation de le refaire plutôt que de le reprendre',
'Rebuilt with content the practice manager can edit directly':
  'Refonte avec du contenu que la gestionnaire de la clinique peut modifier elle-même',
'Cut page weight by about 80% by dropping four unused frameworks':
  'Réduction du poids des pages d’environ 80 % en retirant quatre cadriciels inutilisés',
'Kept the URL structure identical so nothing lost its search position':
  'Conservation d’une structure d’adresses identique pour que rien ne perde son rang dans les moteurs',
'3 weeks':'3 semaines',
'Mobile speed':'Vitesse mobile',
'Static build':'Génération statique',
'Markdown content':'Contenu Markdown',
'Image pipeline':'Chaîne de traitement d’images',

'Website · brochure':'Site Web · vitrine',
'A portfolio that had to load fast on a building site, on bad signal.':
  'Un portfolio qui devait se charger vite sur un chantier, avec un mauvais signal.',
'A construction design studio whose clients browse from site offices and phones with one bar. The previous site was a heavy image gallery that frequently just never finished loading.':
  'Un studio de conception en construction dont les clients naviguent depuis des roulottes de chantier et des téléphones à une barre. L’ancien site était une lourde galerie d’images qui, souvent, ne finissait tout simplement jamais de charger.',
'Designed around progressive image loading, with usable content before any photo arrives':
  'Conception autour du chargement progressif des images, avec du contenu utilisable avant l’arrivée de la moindre photo',
'Built a case-study format the studio can fill in themselves':
  'Création d’un gabarit d’étude de cas que le studio peut remplir lui-même',
'Kept the whole first view under 60KB':'Premier affichage complet maintenu sous 60 Ko',
'Added structured data so projects surface properly in search':
  'Ajout de données structurées pour que les projets ressortent correctement dans les recherches',
'2 weeks':'2 semaines',
'First view':'Premier affichage',
'58KB':'58 Ko',
'Responsive images':'Images adaptatives',
'Structured data':'Données structurées',

'Platform · internal tools':'Plateforme · outils internes',
'Internal Ops Console':'Console des opérations internes',
'The system we run the business on — our own dogfood.':'Le système avec lequel nous menons l’entreprise — notre propre médecine.',
'Running client sites out of a notes file and a calendar stopped scaling somewhere around the tenth site. Nothing had a status, and invoices were remembered rather than tracked.':
  'Gérer des sites clients avec un fichier de notes et un calendrier a cessé de tenir la route vers le dixième site. Rien n’avait d’état, et les factures se retenaient de mémoire au lieu d’être suivies.',
'Built a single console covering sites, tickets, incidents, invoices and appointments':
  'Création d’une console unique couvrant les sites, les billets, les incidents, les factures et les rendez-vous',
'Added role-based access so support staff see tickets but not the accounts':
  'Ajout d’un accès par rôle pour que le personnel de soutien voie les billets, mais pas la comptabilité',
'Gave every client a portal view of their own sites and nothing else':
  'Attribution à chaque client d’une vue de portail sur ses propres sites, et rien d’autre',
'Wired live chat onto tickets so a thread can become a conversation':
  'Branchement du clavardage en direct sur les billets pour qu’un fil devienne une conversation',
'In use since':'En service depuis',
'Users':'Utilisateurs',
'Staff + clients':'Personnel + clients',
'Role-based access':'Accès par rôles',

'IT support · 22 staff':'Soutien informatique · 22 employés',
'Twenty-two people, no IT person, and a different supplier for every problem.':
  'Vingt-deux personnes, aucun informaticien, et un fournisseur différent pour chaque problème.',
'Laptops were bought ad hoc, nobody knew which machines were still under warranty, and a failed drive in the survey team cost four days of work because the backup had quietly stopped running in March. Three separate suppliers each blamed one of the others.':
  'Les portables étaient achetés au cas par cas, personne ne savait quelles machines étaient encore sous garantie, et un disque défaillant dans l’équipe d’arpentage a coûté quatre jours de travail parce que la sauvegarde avait discrètement cessé de tourner en mars. Trois fournisseurs distincts se renvoyaient la faute.',
'Inventoried every machine, its age, its warranty and what was actually on it':
  'Inventaire de chaque machine : son âge, sa garantie et ce qui s’y trouvait réellement',
'Put staff on their own ticket accounts instead of texting whoever answered':
  'Attribution à chaque employé de son propre compte de billets, au lieu d’écrire à qui répondait',
'Replaced the silent backup with a monitored one that alerts when it misses':
  'Remplacement de la sauvegarde silencieuse par une sauvegarde surveillée qui alerte quand elle échoue',
'Standardised new-starter setup so a laptop is ready on day one, not day four':
  'Normalisation de l’installation des nouvelles recrues : un portable prêt le premier jour, pas le quatrième',
'Staff supported':'Employés soutenus',
'Suppliers':'Fournisseurs',
'Asset register':'Registre des actifs',
'Ticketing':'Billetterie',
'Monitored backups':'Sauvegardes surveillées',
'Remote support':'Soutien à distance',

'Games · browser':'Jeux · navigateur',
'Browser Game Arcade':'Arcade de jeux navigateur',
'A dozen small browser games, built to prove interaction work.':
  'Une douzaine de petits jeux navigateur, bâtis pour démontrer le travail d’interaction.',
'Prospective clients kept asking whether we could do anything more interactive than a website. Describing it never landed as well as letting people play something.':
  'Les clients potentiels demandaient sans cesse si nous pouvions faire quelque chose de plus interactif qu’un site Web. Le décrire n’a jamais aussi bien fonctionné que de laisser les gens y jouer.',
'Built a public arcade that needs no account and works on a phone':
  'Création d’une arcade publique qui n’exige aucun compte et fonctionne sur un téléphone',
'Each game is self-contained — no framework, no build step, no tracking':
  'Chaque jeu est autonome — aucun cadriciel, aucune étape de compilation, aucun pistage',
'Added save state, achievements and difficulty progression':
  'Ajout de la sauvegarde, des réussites et d’une progression de difficulté',
'Runs offline once loaded':'Fonctionne hors ligne une fois chargé',
'Games':'Jeux',
'Dependencies':'Dépendances',
'Account needed':'Compte requis',
'No':'Non',
'Local storage':'Stockage local',

/* ---------- Process detail ---------- */
'In this stage':'À cette étape',
'Typically':'Habituellement',
'What we need from you':'Ce dont nous avons besoin de vous',
'What you get':'Ce que vous recevez',
'A call, then a short written brief. The goal is that nobody starts building until both sides can describe the finished thing in the same words.':
  'Un appel, puis un court mandat écrit. Le but : que personne ne commence à construire avant que les deux parties puissent décrire le résultat dans les mêmes mots.',
'An hour for a call':'Une heure pour un appel',
'Examples of sites you like and why':'Des exemples de sites que vous aimez, et pourquoi',
'Who signs things off':'Qui approuve',
'Written brief and scope':'Un mandat et une portée écrits',
'Fixed quote, itemised':'Une soumission à prix fixe, détaillée',
'Rough schedule with dates':'Un échéancier approximatif avec des dates',
'3–5 days':'3 à 5 jours',
'Design and build happen on a staging link you can open any time. You see it going up, rather than getting one big reveal at the end.':
  'La conception et le développement se font sur un lien de préproduction que vous pouvez ouvrir en tout temps. Vous le voyez se construire, au lieu d’avoir un grand dévoilement à la fin.',
'Feedback within a few days of each round':'Des commentaires dans les jours suivant chaque ronde',
'Content and images, or a decision to use placeholders':'Le contenu et les images, ou la décision d’utiliser du provisoire',
'Answers on anything ambiguous':'Des réponses sur tout ce qui est ambigu',
'Staging link from week one':'Un lien de préproduction dès la première semaine',
'Two full rounds of design feedback':'Deux rondes complètes de commentaires sur le design',
'Every change tracked in writing':'Chaque changement suivi par écrit',
'2–10 weeks':'2 à 10 semaines',
'Launch is a checklist, not a leap. Everything that can be verified before the switchover is verified before the switchover.':
  'La mise en ligne est une liste de vérification, pas un saut dans le vide. Tout ce qui peut être vérifié avant la bascule l’est avant la bascule.',
'Domain access, or permission to request it':'L’accès au domaine, ou la permission de le demander',
'A go-live date that suits you':'Une date de mise en ligne qui vous convient',
'Final content sign-off':'L’approbation finale du contenu',
'DNS, SSL and redirects configured':'DNS, SSL et redirections configurés',
'Analytics and backups live before go-live':'Statistiques et sauvegardes actives avant la mise en ligne',
'Rollback plan, tested':'Un plan de retour arrière, testé',
'1–3 days':'1 à 3 jours',
'After launch it becomes an ongoing plan: monitored, patched, backed up, and someone to ask when you want something changed.':
  'Après la mise en ligne, ça devient un forfait continu : surveillé, corrigé, sauvegardé, avec quelqu’un à qui demander quand vous voulez changer quelque chose.',
'Tell us when something looks wrong':'Nous dire quand quelque chose cloche',
'Requests by email or chat':'Des demandes par courriel ou clavardage',
'A named person to talk to':'Une personne attitrée à qui parler',
'Monitoring, patching and backups':'Surveillance, correctifs et sauvegardes',
'Included change hours each month':'Des heures de modifications incluses chaque mois',
'Ongoing':'En continu',

/* ---------- Ticket priorities ---------- */
'Low':'Faible',
'Can wait':'Peut attendre',
'Medium':'Moyenne',
'Slowing us down':'Nous ralentit',
'High':'Élevée',
'Badly broken':'Gravement brisé',
'Critical':'Critique',
'Down or unusable':'Hors service ou inutilisable',
'4 business hours':'4 heures ouvrables',
'1 hour':'1 heure',
'Target first reply:':'Cible de première réponse :',

/* ---------- Things the page says as you use it ---------- */
'Switch to light theme':'Passer au thème clair',
'Switch to dark theme':'Passer au thème sombre',
'Less':'Moins',
'Collapse all':'Tout replier',
'/month, billed yearly':'/mois, facturé annuellement',
'No questions match “{q}” — ask it in the form below.':'Aucune question ne correspond à « {q} » — posez-la dans le formulaire ci-dessous.',
'{n} of {total} questions match.':'{n} des {total} questions correspondent.',
'Check the highlighted fields':'Vérifiez les champs surlignés',
'Your email client should have opened — if it didn’t, use the copy button below.':
  'Votre logiciel de courriel devrait s’être ouvert — sinon, utilisez le bouton de copie ci-dessous.',
'Copy the message instead':'Copier le message à la place',
'Copy failed — select the text manually':'Échec de la copie — sélectionnez le texte manuellement',
'Enquiry copied':'Demande copiée',
'Ticket copied':'Billet copié',

/* The two emails the forms hand off to a mail client. */
'Enquiry — {type}':'Demande — {type}',
'Name':'Nom',
'Need':'Besoin',
'Title':'Titre',
'Priority':'Priorité',
'Category':'Catégorie',
'Site / system':'Site / système',
'Raised by':'Soumis par',
'Source: Main Page':'Source : page principale',
'(no further detail given)':'(aucun détail supplémentaire fourni)',

/* ---------- Command palette ---------- */
'Top':'Haut',
'Included':'Inclus',
'Plans':'Forfaits',
'Case studies':'Études de cas',
'{name} plan':'forfait {name}',
'Straight to the enquiry form':'Directement au formulaire de demande',
'Raise a support ticket':'Ouvrir un billet de soutien',
'Something is broken':'Quelque chose est brisé',
'Switch theme':'Changer de thème',
'Light and dark':'Clair et sombre',
'Switch language':'Changer de langue',
'English and French':'Anglais et français',
'Back to the top':'Retour en haut',
'{n} match':'{n} résultat',
'{n} matches':'{n} résultats',
'Nothing on this page matches “{q}”.':'Rien sur cette page ne correspond à « {q} ».',
'The enquiry form takes the questions the page doesn\'t answer.':
  'Le formulaire de demande accueille les questions auxquelles la page ne répond pas.',
'Search this page ({key})':'Rechercher dans la page ({key})'

};

/* =====================================================================
   The language button.

   It is the one control on the page whose label is not a translation of
   itself: in English it has to read "FR", because the label names where
   the button takes you, not where you are. A button reading "EN" on an
   English page reads as a status light, and people click it expecting
   nothing to happen. So it gets its own little table instead of going
   through the dictionary above.
===================================================================== */
window.MOS_LANG_BTN = {
  en: { label:'FR', title:'Français', aria:'Read this page in French' },
  fr: { label:'EN', title:'English',  aria:'Lire cette page en anglais' }
};
