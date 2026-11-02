import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

for (const [edition, path] of [
  ['US', 'src/app/portfolios/[slug]/page.tsx'],
  ['Canadian', 'src/app/ca/portfolios/[slug]/page.tsx'],
] as const) {
  test(`${edition} portfolio pages use daily on-demand ISR`, () => {
    const source = readFileSync(path, 'utf8')
    assert.match(source, /export const dynamic = 'force-static'/)
    assert.match(source, /export const revalidate = 86400/)
    assert.match(source, /export function generateStaticParams\(\) \{\s*return \[\]\s*\}/)
  })
}
