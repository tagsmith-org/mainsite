export const PRICE_NOTE =
  'Starting from. Final price by agreement, after we understand the job. Your project may not match a standard package.'

export interface Offer {
  id: string
  title: string
  owner: string
  stack: string
  price: string
  icon: 'site' | 'system' | 'mobile' | 'backend' | 'automation'
}

export const offers: Offer[] = [
  {
    id: 'simple-sites',
    title: 'Simple sites',
    owner:
      'A landing page or a small company site: clear offer, contact form, works on a phone.',
    stack: 'Usually Astro — fast pages, little to maintain.',
    price: 'from $200+',
    icon: 'site',
  },
  {
    id: 'web-systems',
    title: 'Web systems',
    owner:
      'Accounts, dashboards, roles, and real business logic — more than a brochure.',
    stack:
      'Vue/Nuxt or React/Next, chosen for the project (and for what you already use).',
    price: 'from $2,000+',
    icon: 'system',
  },
  {
    id: 'mobile',
    title: 'Mobile',
    owner:
      'A site that works well on a phone, or a native app on Android and iOS. Those are different jobs.',
    stack:
      'Responsive web with every site. Native apps when you need the stores, push, camera, or offline use.',
    price: 'Web: included. Native: from $5,000+',
    icon: 'mobile',
  },
  {
    id: 'backend',
    title: 'Backend',
    owner:
      'Logins, data, payments, admin panels, APIs — the part visitors never see and the product cannot skip.',
    stack: 'Scoped with the system or the app, not as a mystery add-on.',
    price: 'from $2,000+',
    icon: 'backend',
  },
  {
    id: 'automations',
    title: 'Automations',
    owner:
      'Leads, invoices, and reminders move between the tools you already use.',
    stack: 'n8n under the hood. AI only where it saves hours, not as decoration.',
    price: 'from $400+',
    icon: 'automation',
  },
]

export interface SiteType {
  id: string
  name: string
  description: string
  bestFor: string
  price: string
  demoUrl: string
}

export const siteTypes: SiteType[] = [
  {
    id: 'landing',
    name: 'Landing page',
    description: 'One page, one offer, one clear button to contact or buy.',
    bestFor: 'A service, a launch, an event',
    price: 'from $200+',
    demoUrl: 'https://demo6.websmith-shop.com',
  },
  {
    id: 'corporate',
    name: 'Company site',
    description:
      'A few pages: home, services, about, contact. Enough to look established.',
    bestFor: 'Small businesses and studios',
    price: 'from $600+',
    demoUrl: 'https://demo2.websmith-shop.com',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Your work, in order, with a way to get in touch.',
    bestFor: 'Designers, photographers, freelancers',
    price: 'from $300+',
    demoUrl: 'https://demo5.websmith-shop.com',
  },
  {
    id: 'ecommerce',
    name: 'Small shop',
    description: 'A catalog, checkout, a simple way to update items.',
    bestFor: 'A first online store',
    price: 'from $1,000+',
    demoUrl: 'https://demo3.websmith-shop.com',
  },
  {
    id: 'blog',
    name: 'Blog / content site',
    description:
      'You publish articles; visitors can find and read them. Admin included.',
    bestFor: 'Experts and media-style sites',
    price: 'from $1,000+',
    demoUrl: 'https://demo1.websmith-shop.com',
  },
  {
    id: 'event',
    name: 'Campaign page',
    description: 'A short-lived page for one offer or event.',
    bestFor: 'A promo with a deadline',
    price: 'from $200+',
    demoUrl: 'https://demo4.websmith-shop.com',
  },
  {
    id: 'migration',
    name: 'Move off an old site',
    description: 'Keep your content. Leave the slow, costly CMS behind.',
    bestFor: 'WordPress / Joomla / Drupal that costs more than it earns',
    price: 'from $800+',
    demoUrl: '#',
  },
]

export interface WorkScreenshot {
  src: string
  alt: string
}

export interface WorkItem {
  title: string
  caption: string
  url: string
  kind?: 'demo' | 'live' | 'screens' | 'automation'
  cta?: string
  note?: string
  features?: string[]
  screenshots?: WorkScreenshot[]
  anchor?: string
}

export const workTeasers: WorkItem[] = [
  {
    title: 'Pet Friends',
    caption:
      'A live club for pet owners: public feed, plus a private cabinet for your animals and their virtual world.',
    url: 'https://pb.websmith-shop.com/feed',
    kind: 'live',
    cta: 'Open the public feed',
  },
  {
    title: 'Jobsite cabinet',
    caption:
      'A contractor project manager: live analytics, Gantt on the jobsite, outreach by email and SMS.',
    url: '/work#jobsite',
    kind: 'screens',
    cta: 'See screens',
  },
  {
    title: 'Automations',
    caption:
      'Two examples from many live flows: outreach in waves, and checks on a site or a mailbox.',
    url: '/work#automations',
    kind: 'automation',
    cta: 'See examples',
  },
]

export const workItems: WorkItem[] = [
  {
    title: 'Pet Friends',
    caption:
      'A real product, not a brochure: an open community for guests, and a signed-in cabinet where owners add and look after their animals.',
    url: 'https://pb.websmith-shop.com/feed',
    kind: 'live',
    cta: 'Open the public feed',
    note: 'The owner cabinet is behind login. Guests can browse the feed, gallery, and classifieds without an account.',
    features: [
      'Public feed, pet gallery, and classifieds — look around with no login',
      'Owner cabinet: add pets, photos, medical notes, and friends',
      'Two worlds: owners manage the real animals; each pet can have a virtual life next to them',
      'Virtual pet world: a digital personality, memories, and short hellos between animal friends — not a chatbot for humans',
      'English and French',
    ],
  },
  {
    title: 'Jobsite cabinet',
    caption:
      'A signed-in project manager for a medical contractor: jobsites, schedules, clients, and outreach — not a brochure site.',
    url: '/work#jobsite',
    kind: 'screens',
    anchor: 'jobsite',
    note: 'Private cabinet — no public login. Screens from a live system; client details are omitted here.',
    features: [
      'Dashboard with live project analytics',
      'Projects, clients, team, and job lifecycle',
      'Jobsite Gantt: tasks, milestones, and statuses',
      'Outreach waves by email and SMS, with CSV in and campaign stats out',
    ],
    screenshots: [
      {
        src: '/work/jobsite/01-dashboard.jpg',
        alt: 'Jobsite cabinet dashboard with live analytics and task charts',
      },
      {
        src: '/work/jobsite/03-gantt.jpg',
        alt: 'Jobsite Gantt chart with tasks, milestones, and schedule controls',
      },
      {
        src: '/work/jobsite/04-outreach.jpg',
        alt: 'Outreach waves by email and SMS with campaign statistics',
      },
    ],
  },
  {
    title: 'Lead outreach',
    caption:
      'Qualified contacts get a bilingual draft. You review. The next small batch is sent. Opt-out is a page on this site.',
    url: '/work#lead-outreach',
    kind: 'automation',
    anchor: 'lead-outreach',
    note: 'This run is ours. For a client it uses their list and their mailbox — not a public login.',
    features: [
      'Drafts in English or French from what the public site actually shows',
      'Approval before send — not a firehose',
      'Small waves, then a pause for replies',
      'Unsubscribe on this site, checked before every send',
    ],
  },
  {
    title: 'Site and mailbox checks',
    caption:
      'A URL or a domain in, a readable report out: is the site reachable, is mail authenticated.',
    url: '/work#site-checks',
    kind: 'automation',
    anchor: 'site-checks',
    note: 'Live flows. Same kind of check we can wire to your domain.',
    features: [
      'Website: DNS, HTTP and HTTPS, redirects, robots, sitemap, certificate dates',
      'Mailbox: MX, SPF, DKIM, DMARC, BIMI',
      'The same pass we run before talking about a site that is already live',
    ],
  },
  {
    title: 'Content site',
    caption: 'Publishing with an admin, built to be found and read.',
    url: 'https://demo1.websmith-shop.com',
  },
  {
    title: 'Company site',
    caption: 'Home, services, about, contact — enough to look established.',
    url: 'https://demo2.websmith-shop.com',
  },
  {
    title: 'Small shop',
    caption: 'A first storefront with catalog and payment.',
    url: 'https://demo3.websmith-shop.com',
  },
  {
    title: 'Campaign page',
    caption: 'A short-lived page for one event or offer.',
    url: 'https://demo4.websmith-shop.com',
  },
  {
    title: 'Portfolio',
    caption: 'Work on display, with a way to get in touch.',
    url: 'https://demo5.websmith-shop.com',
  },
  {
    title: 'Landing page',
    caption: 'One page, one offer, one button.',
    url: 'https://demo6.websmith-shop.com',
  },
]

export const processSteps = [
  {
    n: '1',
    title: 'You describe the job',
    text: 'What should happen for the customer or for the team. You do not need to name a framework.',
  },
  {
    n: '2',
    title: 'Plan and price',
    text: 'Scope, timeline, and a price we both agree — written down before anything is built.',
  },
  {
    n: '3',
    title: 'Build in the open',
    text: 'You see progress, comment, and we adjust. No silent months.',
  },
  {
    n: '4',
    title: 'Launch and handoff',
    text: 'Live on a domain, with hosting if you want it, or files that are yours.',
  },
]

export const STACK_STRIP =
  'Simple pages: Astro. Complex web: Vue or React. Native apps: Android and iOS. Automations: n8n. We pick the stack after we understand the job — not the other way around.'

export const contactPurposes = [
  { value: 'simple-site', label: 'Simple site or landing page' },
  { value: 'web-system', label: 'Web system / cabinet' },
  { value: 'mobile-app', label: 'Native Android / iOS app' },
  { value: 'backend', label: 'Backend / API' },
  { value: 'automation', label: 'Automation / integrations' },
  { value: 'not-sure', label: 'Not sure — help me choose' },
]
