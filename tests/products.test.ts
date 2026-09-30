import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { products } from '../src/data/products';
import { productCategories } from '../src/components/products/categories';

test('catalogue keeps the flagship owned and client products separate', () => {
  const flagship = products.filter((product) => product.featured);
  assert.equal(flagship.length, 1);
  assert.equal(flagship[0].id, 'ai-radar');
  assert.equal(flagship[0].type, 'intellixar');
  assert.equal(flagship[0].href, '/ai-radar');
  assert.deepEqual(products.filter((product) => product.type === 'client').map((product) => product.id), ['kilimo-power']);
  assert.deepEqual(products.filter((product) => product.type === 'intellixar').map((product) => product.id), ['ai-radar']);
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  for (const product of products) {
    assert.ok(productCategories[product.type]);
    if (product.image) assert.ok(fs.existsSync(`public${product.image}`));
    if (product.href) assert.match(product.href, /^(https:\/\/|\/)/);
  }
});

test('existing external product destinations are preserved', () => {
  const expected = {
    'kilimo-power': 'https://kilimopower.co.ke',
  };
  for (const [id, href] of Object.entries(expected)) {
    assert.equal(products.find((product) => product.id === id)?.href, href);
  }
});
