import test from 'node:test'
import assert from 'node:assert/strict'
import { safeNextPath } from './client-api.js'

test('login redirects stay inside TempleAddress', () => {
  assert.equal(safeNextPath('/book/test-temple?pooja=P1'), '/book/test-temple?pooja=P1')
  assert.equal(safeNextPath('https://evil.example'), '/account')
  assert.equal(safeNextPath('//evil.example'), '/account')
})
