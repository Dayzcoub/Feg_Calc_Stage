import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';

const appVersionSource = readFileSync(new URL('../src/modules/AppVersion.js', import.meta.url), 'utf8');
const expectedVersion = appVersionSource.match(/var VERSION = '([^']+)'/)?.[1] || '3.1.101';
const expectedTitle = `FEG Stage PRO ${expectedVersion}`;

const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 740 },
  { name: 'mobile-390', width: 390, height: 780 },
  { name: 'tablet-768', width: 768, height: 900 },
  { name: 'tablet-900', width: 900, height: 900 },
  { name: 'desktop-1024', width: 1024, height: 768 },
  { name: 'desktop-1179', width: 1179, height: 900 },
  { name: 'desktop-1180', width: 1180, height: 900 },
  { name: 'desktop-1366', width: 1366, height: 900 }
];

const CONSTRUCTORS = ['stage', 'truss', 'led'];

async function expectNoPageOverflow(page) {
  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    return {
      viewport: window.innerWidth,
      docScrollWidth: doc.scrollWidth,
      bodyScrollWidth: body.scrollWidth,
      docClientWidth: doc.clientWidth,
      bodyClientWidth: body.clientWidth
    };
  });

  expect(metrics.docScrollWidth, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.docClientWidth + 2);
  expect(metrics.bodyScrollWidth, JSON.stringify(metrics)).toBeLessThanOrEqual(metrics.bodyClientWidth + 2);
}

async function expectWideWorkspace(page, kind, viewportWidth) {
  if (viewportWidth < 1180) return;
  const selector = kind === 'truss'
    ? '[data-truss-field-wrap]'
    : kind === 'led'
      ? '[data-led-grid-wrap]'
      : '[data-stage-canvas-wrap]';
  const metrics = await page.locator(selector).evaluate(el => {
    const rect = el.getBoundingClientRect();
    const boxes = [];
    let node = el;
    while (node && node.nodeType === Node.ELEMENT_NODE && boxes.length < 6) {
      const r = node.getBoundingClientRect();
      boxes.push({
        tag: node.tagName.toLowerCase(),
        cls: String(node.className || '').slice(0, 80),
        width: Math.round(r.width),
        left: Math.round(r.left),
        right: Math.round(r.right),
        display: getComputedStyle(node).display,
        grid: getComputedStyle(node).gridTemplateColumns
      });
      node = node.parentElement;
    }
    return {
      width: Math.round(rect.width),
      right: Math.round(rect.right),
      viewport: window.innerWidth,
      boxes
    };
  });
  expect(metrics.width, `${kind} workspace too narrow: ${JSON.stringify(metrics)}`).toBeGreaterThanOrEqual(kind === 'stage' ? 520 : 620);
  expect(metrics.right, `${kind} workspace leaks outside viewport: ${JSON.stringify(metrics)}`).toBeLessThanOrEqual(metrics.viewport + 2);
}

test.describe('standalone smoke', () => {
  test('runner requires an explicit player name before start', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 900 });
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => document.body.classList.contains('quick-standalone-ready'));
    await page.evaluate(() => {
      window.localStorage.setItem('fegStagePro.runnerPlayerName.v1', 'Техник');
    });
    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => document.body.classList.contains('quick-standalone-ready'));

    await page.locator('.feg-hero-card').click();
    const nameInput = page.locator('[data-feg-runner-name]');
    const startPanel = page.locator('[data-feg-runner-start-panel]');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveValue('');

    await page.locator('[data-feg-runner-start]').click();
    await expect(startPanel).toBeVisible();
    await expect(nameInput).toBeFocused();

    await nameInput.fill('Алексей');
    await page.locator('[data-feg-runner-start]').click();
    await expect(startPanel).toBeHidden();
  });

  for (const viewport of VIEWPORTS) {
    test(`loads without runtime errors at ${viewport.name}`, async ({ page }) => {
      const consoleErrors = [];
      const pageErrors = [];
      const failedLocalRequests = [];

      page.on('console', message => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', error => pageErrors.push(error.message));
      page.on('requestfailed', request => {
        const url = request.url();
        if (url.startsWith('http://127.0.0.1:4173/')) {
          failedLocalRequests.push(`${url} ${request.failure()?.errorText || ''}`.trim());
        }
      });

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/index.html', { waitUntil: 'load' });
      await page.waitForFunction(() => document.body.classList.contains('quick-standalone-ready'));

      await expect(page).toHaveTitle(expectedTitle);
      await expect(page.locator('#quickStandaloneMount')).toBeVisible();
      await expect(page.locator('.feg-dashboard')).toBeVisible();

      const runtime = await page.evaluate(() => ({
        version: window.FEGModules?.AppVersion?.version,
        hasJsPdf: Boolean(window.jspdf?.jsPDF),
        hasHtml2Canvas: Boolean(window.html2canvas)
      }));

      expect(runtime).toEqual({
        version: expectedVersion,
        hasJsPdf: true,
        hasHtml2Canvas: true
      });
      expect(pageErrors).toEqual([]);
      expect(consoleErrors).toEqual([]);
      expect(failedLocalRequests).toEqual([]);
      await expectNoPageOverflow(page);
    });

    for (const kind of CONSTRUCTORS) {
      test(`${kind} layout stays inside page at ${viewport.name}`, async ({ page }) => {
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', message => {
          if (message.type() === 'error') consoleErrors.push(message.text());
        });
        page.on('pageerror', error => pageErrors.push(error.message));

        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/index.html', { waitUntil: 'load' });
        await page.waitForFunction(() => document.body.classList.contains('quick-standalone-ready'));
        await page.locator(`[data-v4-quick="${kind}"]`).click();
        await page.waitForTimeout(250);

        await expectWideWorkspace(page, kind, viewport.width);
        await expectNoPageOverflow(page);
        await expect(page.locator('#quickStandaloneMount')).toBeVisible();
        expect(pageErrors).toEqual([]);
        expect(consoleErrors).toEqual([]);
      });
    }
  }
});
