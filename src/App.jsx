import { useMemo, useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Check, ChevronRight, CircleDot, Clock3, FileText,
  Layers3, Mail, MapPin, Maximize2, Menu, Palette, PenTool, Phone, Plus,
  Printer, ScanLine, Send, Sparkles, X,
} from 'lucide-react'

const services = [
  {
    number: '01', title: 'Reprographie\n& copie', tag: 'L’essentiel, parfaitement exécuté',
    icon: ScanLine, color: 'cream',
    description: 'Des tirages nets, rapides et calibrés : dossiers, mémoires, thèses, plans et documents du quotidien.',
    options: ['Noir & blanc haute définition', 'Couleur professionnelle', 'Impression mail & USB'],
  },
  {
    number: '02', title: 'Grand\nformat', tag: 'Vos idées prennent de la place',
    icon: Maximize2, color: 'gold',
    description: 'Affiches, bâches, roll-ups, vitrophanies et plans : donnez de l’échelle à votre communication.',
    options: ['Affiches & posters', 'Bâches & roll-ups', 'Signalétique vitrine'],
  },
  {
    number: '03', title: 'Imprimerie\n& carterie', tag: 'L’objet imprimé qui reste',
    icon: Printer, color: 'navy',
    description: 'Cartes, brochures, flyers et faire-parts avec le niveau de finition qui transforme une impression en objet.',
    options: ['Cartes de visite', 'Dépliants & brochures', 'Faire-parts & invitations'],
  },
  {
    number: '04', title: 'Façonnage\n& finitions', tag: 'Le détail fait la différence',
    icon: Layers3, color: 'crimson',
    description: 'Reliure, plastification, découpe et finitions de précision pour des documents qui se manipulent avec plaisir.',
    options: ['Reliure spirale & thermique', 'Plastification', 'Découpe sur-mesure'],
  },
  {
    number: '05', title: 'Objets &\nsignalétique', tag: 'Votre marque hors du papier',
    icon: Sparkles, color: 'paper',
    description: 'Textile, plaques, goodies et lettrages : des supports singuliers pour donner une présence à votre marque.',
    options: ['Impression textile', 'Gravure laser', 'Lettrage & adhésifs'],
  },
  {
    number: '06', title: 'Studio\ngraphique', tag: 'La bonne idée, bien mise en forme',
    icon: PenTool, color: 'ink',
    description: 'De la mise en page à la création de votre identité, le studio accompagne vos idées jusqu’au bon à tirer.',
    options: ['Mise en page', 'Création graphique', 'Vectorisation de fichiers'],
  },
]

const papers = [
  { id: 'uncoated', name: 'Naturel 80g', subtitle: 'Le quotidien, sans compromis', shade: '#f6f0e6' },
  { id: 'silk', name: 'Satiné 135g', subtitle: 'Une couleur très juste', shade: '#e9dfca' },
  { id: 'soft', name: 'Soft touch 350g', subtitle: 'Le toucher velours', shade: '#292d40' },
  { id: 'recycled', name: 'Recyclé 250g', subtitle: 'La belle alternative', shade: '#b9b09b' },
]

const finishes = [
  { id: 'none', name: 'Nu', hint: 'minimal' },
  { id: 'foil', name: 'Dorure or', hint: 'métallique' },
  { id: 'varnish', name: 'Vernis sélectif', hint: 'brillant' },
]

function Mark() {
  return <a className="brand" href="#top" aria-label="PrintCraft Studio, accueil">
    <span className="brand-mark"><i></i><b>PC</b></span>
    <span className="brand-name">PRINTCRAFT</span>
  </a>
}

function PaperStack() {
  return <div className="paper-stage" aria-hidden="true">
    <div className="paper-orbit orbit-one"></div>
    <div className="paper-orbit orbit-two"></div>
    <div className="paper-shadow"></div>
    <div className="sheet sheet-back"><span></span><span></span></div>
    <div className="sheet sheet-middle"><small>PC</small><i></i><i></i><i></i></div>
    <div className="sheet sheet-front">
      <div className="foil-word">MAKE<br/>IT<br/><em>REAL</em></div>
      <div className="sheet-meta"><span>STUDIO PC / 01</span><span>ÉDITION 01</span></div>
    </div>
    <span className="floating-note note-one">PAPIER<br/>VIVANT</span>
    <span className="floating-note note-two">ENCRE<br/>+ GESTE</span>
  </div>
}

function ServiceIcon({ service }) {
  const Icon = service.icon
  return <span className="service-icon"><Icon size={25} strokeWidth={1.5} /></span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [paper, setPaper] = useState(papers[0])
  const [finish, setFinish] = useState(finishes[1])
  const [quoteStep, setQuoteStep] = useState(0)
  const [form, setForm] = useState({ service: '', readiness: '', quantity: '', name: '', email: '' })
  const selectedService = useMemo(() => services.find((s) => s.title.replace('\n', ' ') === form.service), [form.service])

  const updateMouse = (event) => {
    const root = document.documentElement
    root.style.setProperty('--cursor-x', `${event.clientX}px`)
    root.style.setProperty('--cursor-y', `${event.clientY}px`)
    const hero = event.currentTarget.closest('.hero')
    if (hero) {
      const bounds = hero.getBoundingClientRect()
      hero.style.setProperty('--mx', `${(event.clientX - bounds.left) / bounds.width - .5}`)
      hero.style.setProperty('--my', `${(event.clientY - bounds.top) / bounds.height - .5}`)
    }
  }

  const goToQuote = () => document.querySelector('#devis')?.scrollIntoView({ behavior: 'smooth' })
  const openService = (service) => setActiveService(service)
  const setField = (key, value) => setForm((old) => ({ ...old, [key]: value }))

  return <div id="top" onMouseMove={updateMouse}>
    <div className="grain"></div>
    <div className="cursor-dot" aria-hidden="true"></div>

    <header className="topbar">
      <div className="topbar-inner">
        <Mark />
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navigation principale">
          <a href="#savoir-faire" onClick={() => setMenuOpen(false)}>L’atelier</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#matiere" onClick={() => setMenuOpen(false)}>Matières</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="header-actions">
          <a className="phone-link" href="tel:+33102030405"><Phone size={14} /> 01 02 03 04 05</a>
          <button className="header-cta" onClick={goToQuote}>Devis express <ArrowUpRight size={16} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" onMouseMove={updateMouse}>
        <div className="hero-lines"></div>
        <div className="hero-content">
          <div className="eyebrow"><span></span> Atelier d’impression — Studio créatif / FR</div>
          <h1><span>IMPRIMER</span><strong>L’<i>EX</i>CEL<br/>LENCE.</strong></h1>
          <p className="hero-copy">Des idées qui prennent corps. Des supports qui se remarquent. PrintCraft Studio donne de la matière à ce que vous avez à dire.</p>
          <div className="hero-actions">
            <button className="button button-gold" onClick={goToQuote}>Lancer un projet <ArrowRight size={18} /></button>
            <a className="text-link light" href="#services">Explorer l’atelier <span>↘</span></a>
          </div>
        </div>
        <PaperStack />
        <div className="hero-bottom">
          <div className="experience"><b>100%</b><span>d’attention<br/>au détail</span></div>
          <div className="scroll-cue"><span>Défiler pour explorer</span><i></i></div>
          <div className="hero-stamp">PC<br/><em>studio</em><small>print<br/>press</small></div>
        </div>
      </section>

      <section className="marquee" aria-label="Domaines d'expertise">
        <div className="marquee-track">
          <span>IMPRIMER</span><i>✳</i><span>FAÇONNER</span><i>✳</i><span>RÉVÉLER</span><i>✳</i><span>IMPRIMER</span><i>✳</i><span>FAÇONNER</span><i>✳</i><span>RÉVÉLER</span><i>✳</i>
        </div>
      </section>

      <section className="manifesto section" id="savoir-faire">
        <div className="section-index"><span>01</span><i></i><small>L’atelier</small></div>
        <div className="manifesto-copy">
          <p className="kicker">LE GESTE JUSTE, LA BONNE NUANCE.</p>
          <h2>De la première<br/><em>intention</em> au bel objet.</h2>
          <p className="lede">Ici, le papier n’est jamais un simple support. C’est une matière que l’on choisit, que l’on plie, que l’on marque. Dans notre atelier conceptuel, précision technique, regard graphique et plaisir du travail bien fait se rencontrent.</p>
          <a href="#contact" className="text-link">Notre histoire <ArrowUpRight size={16} /></a>
        </div>
        <div className="manifesto-art">
          <div className="ink-sun"></div>
          <div className="manifesto-card">
            <span>LOCAL<br/>/ PRECIS<br/>/ VIVANT</span>
            <small>ATELIER 36</small>
          </div>
          <div className="roundel">façonner<br/><b>vos<br/>idées</b></div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading">
          <div className="section-index on-paper"><span>02</span><i></i><small>Ce que l’on fait</small></div>
          <div><p className="kicker crimson">TOUTES LES FAÇONS DE FAIRE BONNE IMPRESSION.</p><h2>Un atelier,<br/><em>mille possibilités.</em></h2></div>
          <p className="section-intro">Chaque projet est différent. Voici les grandes familles de savoir-faire qui se croisent à l’atelier.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => <button className={`service-card service-${service.color}`} key={service.number} onClick={() => openService(service)}>
            <span className="service-number">{service.number}</span><ServiceIcon service={service} />
            <span className="service-title">{service.title.split('\n').map((line) => <span key={line}>{line}</span>)}</span>
            <span className="service-tag">{service.tag}</span><span className="service-more">Découvrir <ArrowUpRight size={17} /></span>
          </button>)}
        </div>
      </section>

      <section className="materials section" id="matiere">
        <div className="materials-intro">
          <div className="section-index light-index"><span>03</span><i></i><small>La matière</small></div>
          <p className="kicker gold">CONFIGURATEUR SENSORIEL</p>
          <h2>Le support,<br/>c’est déjà <em>le message.</em></h2>
          <p>Jouez avec la fibre, le grammage et le reflet. Un aperçu pour imaginer ce que vos mains ressentiront bientôt.</p>
        </div>
        <div className="material-tool">
          <div className="preview-zone">
            <div className={`paper-preview ${finish.id}`} style={{ '--paper': paper.shade }}>
              <div className="preview-foil">A4</div><div className="preview-copy">L’IMPRESSION<br/>QUI RESTE.</div><div className="preview-rule"></div>
              <small>STUDIO CRÉATIF · FR</small>
            </div>
            <span className="preview-label">Aperçu matière</span>
          </div>
          <div className="material-options">
            <div className="option-block"><span className="option-label">01 — Votre papier</span>
              <div className="choice-list">{papers.map((item) => <button className={paper.id === item.id ? 'choice active' : 'choice'} key={item.id} onClick={() => setPaper(item)}><i style={{ background: item.shade }}></i><span>{item.name}<small>{item.subtitle}</small></span><Check size={16} /></button>)}</div>
            </div>
            <div className="option-block"><span className="option-label">02 — Votre finition</span>
              <div className="finish-row">{finishes.map((item) => <button className={finish.id === item.id ? 'finish-button active' : 'finish-button'} key={item.id} onClick={() => setFinish(item)}><span>{item.name}</span><small>{item.hint}</small></button>)}</div>
            </div>
            <button className="text-link light consult-link" onClick={goToQuote}>Parlons de votre projet <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="quote-section section" id="devis">
        <div className="quote-aside"><p className="kicker crimson">DEVIS EN QUELQUES GESTES.</p><h2>Votre projet<br/>commence <em>ici.</em></h2><p>Une question, un fichier ou seulement une idée : notre équipe fictive vous répond avec une proposition adaptée.</p><div className="quote-contact"><Phone size={18}/><a href="tel:+33102030405">01 02 03 04 05</a></div></div>
        <div className="quote-wizard">
          <div className="steps"><span className={quoteStep >= 0 ? 'active' : ''}>01</span><i className={quoteStep >= 1 ? 'done' : ''}></i><span className={quoteStep >= 1 ? 'active' : ''}>02</span><i className={quoteStep >= 2 ? 'done' : ''}></i><span className={quoteStep >= 2 ? 'active' : ''}>03</span></div>
          {quoteStep === 0 && <div className="wizard-panel"><span className="option-label">Quel est votre besoin ?</span><h3>Choisissons le terrain.</h3><div className="wizard-options">{services.slice(0, 5).map((service) => <button className={form.service === service.title.replace('\n', ' ') ? 'active' : ''} onClick={() => setField('service', service.title.replace('\n', ' '))} key={service.number}><ServiceIcon service={service}/>{service.title.replace('\n', ' ')}</button>)}</div><button className="button button-navy next" disabled={!form.service} onClick={() => setQuoteStep(1)}>Continuer <ArrowRight size={17}/></button></div>}
          {quoteStep === 1 && <div className="wizard-panel"><span className="option-label">Votre projet est-il prêt ?</span><h3>On s’adapte à votre point de départ.</h3><div className="readiness-options"><button className={form.readiness === 'ready' ? 'selected' : ''} onClick={() => setField('readiness', 'ready')}><FileText/><span>Mon fichier est prêt<small>Je souhaite une impression.</small></span><ChevronRight/></button><button className={form.readiness === 'creation' ? 'selected' : ''} onClick={() => setField('readiness', 'creation')}><Palette/><span>J’ai besoin d’être accompagné·e<small>Création ou ajustement graphique.</small></span><ChevronRight/></button></div><div className="wizard-nav"><button onClick={() => setQuoteStep(0)}>← Retour</button><button className="button button-navy" disabled={!form.readiness} onClick={() => setQuoteStep(2)}>Continuer <ArrowRight size={17}/></button></div></div>}
          {quoteStep === 2 && <div className="wizard-panel"><span className="option-label">Quelques coordonnées</span><h3>On vous répond très vite.</h3><div className="contact-fields"><label>Nom <input value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="Votre nom" /></label><label>Email <input value={form.email} type="email" onChange={(e) => setField('email', e.target.value)} placeholder="vous@exemple.fr" /></label><label>Quantité estimée <input value={form.quantity} onChange={(e) => setField('quantity', e.target.value)} placeholder="Ex. 250 exemplaires" /></label></div><div className="wizard-nav"><button onClick={() => setQuoteStep(1)}>← Retour</button><button className="button button-gold" disabled={!form.name || !form.email} onClick={() => alert(`Merci ${form.name} ! Votre demande pour « ${selectedService?.title.replace('\n', ' ') || form.service} » est prête à être envoyée à PrintCraft Studio.`)}>Envoyer ma demande <Send size={16}/></button></div></div>}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div className="contact-content"><p className="kicker gold">PASSEZ NOUS VOIR.</p><h2>On imprime mieux<br/>quand on se parle.</h2><a href="mailto:contact@exemple.com" className="mail-link">contact@exemple.com <ArrowUpRight /></a></div>
        <div className="contact-info"><div><MapPin/><p>123 Rue de l’Imprimerie<br/><b>75000 Paris</b></p></div><div><Clock3/><p>Du lundi au samedi<br/><b>Horaires de démonstration</b></p></div><a className="map-tile" href="https://www.google.com/maps/search/?api=1&query=123+Rue+de+l%27Imprimerie+75000+Paris" target="_blank" rel="noreferrer"><CircleDot/><span>Voir la carte</span><ArrowUpRight size={16}/></a></div>
      </section>
    </main>

    <footer><Mark /><p>Impressions, créations et belles idées, pour l’inspiration.</p><p className="footer-disclaimer">Projet de démonstration conceptuel réalisé pour un portfolio. Ce site n'est affilié à aucune entreprise réelle.</p><span>© {new Date().getFullYear()} PrintCraft Studio</span><a href="#top">Retour en haut ↑</a></footer>

    {activeService && <div className="drawer-backdrop" onMouseDown={() => setActiveService(null)}><aside className="service-drawer" onMouseDown={(e) => e.stopPropagation()} aria-modal="true" role="dialog"><button className="drawer-close" onClick={() => setActiveService(null)} aria-label="Fermer"><X /></button><span className="drawer-number">{activeService.number} / 06</span><ServiceIcon service={activeService}/><h2>{activeService.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2><p>{activeService.description}</p><div className="drawer-list"><span>À L’ATELIER</span>{activeService.options.map((option) => <div key={option}><Check size={15}/>{option}</div>)}</div><button className="button button-gold" onClick={() => { setActiveService(null); goToQuote() }}>Demander un devis <ArrowRight size={16}/></button><div className="drawer-bottom">PRINTCRAFT STUDIO — PORTFOLIO<br/><em>Des idées bien imprimées.</em></div></aside></div>}
  </div>
}

export default App
