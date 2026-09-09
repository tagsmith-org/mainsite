import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import puppeteer from 'puppeteer'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const ROUTES = [
  '/',
  '/services',
  '/work',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/cookies',
  '/unsubscribe',
  '/404',
]

function htmlPath(route) {
  if (route === '/') {
    return join(dist, 'index.html')
  }
  if (route === '/404') {
    return join(dist, '404.html')
  }
  return join(dist, route.replace(/^\//, ''), 'index.html')
}

function assertPage(route, html) {
  const checks = {
    '/': 'Sites, systems, and apps that do the work.',
    '/services': 'What we can build',
    '/work': 'Jobsite cabinet',
    '/contact': 'Tell me what you need',
    '/privacy-policy': 'Privacy',
    '/terms': 'Terms',
    '/cookies': 'Cookie',
    '/unsubscribe': 'Unsubscribe',
    '/404': 'Page not found',
  }
  const needle = checks[route]
  if (needle && !html.includes(needle)) {
    throw new Error(`Prerender of ${route} is missing expected text: ${needle}`)
  }
}

const server = await preview({
  root,
  preview: {
    port: 4179,
    host: '127.0.0.1',
    open: false,
  },
})

const origin = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

try {
  for (const route of ROUTES) {
    const page = await browser.newPage()
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true
    })
    await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForFunction(
      () => document.documentElement.dataset.prerenderReady === '1' || Boolean(document.querySelector('h1')?.textContent?.trim()),
      { timeout: 20000 },
    )
    const html = await page.content()
    assertPage(route, html)
    const dest = htmlPath(route)
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, html)
    console.log(`prerendered ${route} -> ${dest}`)
    await page.close()
  }
} finally {
  await browser.close()
  await server.close()
}
