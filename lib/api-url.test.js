import test from 'node:test'
import assert from 'node:assert/strict'
import { apiRoot, apiUrl, browserApiRoot } from './api-url.js'

test('Django API root accepts a host URL', () => {
  assert.equal(apiRoot('https://api.example.com/'), 'https://api.example.com/api/v1')
})

test('Django API root does not duplicate an existing version path', () => {
  assert.equal(apiRoot('https://api.example.com/api/v1/'), 'https://api.example.com/api/v1')
  assert.equal(apiUrl('https://api.example.com/api/v1', '/listings?type=service'), 'https://api.example.com/api/v1/listings?type=service')
})

test('browser API supports the same-origin proxy and direct Django URLs', () => {
  assert.equal(browserApiRoot('/api/backend/'), '/api/backend')
  assert.equal(browserApiRoot('https://api.example.com'), 'https://api.example.com/api/v1')
  assert.equal(browserApiRoot('https://api.example.com/api/v1/'), 'https://api.example.com/api/v1')
})
