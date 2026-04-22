const test = require('node:test');
const assert = require('node:assert/strict');

const { marketService } = require('../src/services/market.service');
const { tokenService } = require('../src/services/token.service');
const { getMarketSummary } = require('../src/controllers/market.controller');

test('getMarketSummary returns required fields and values', async () => {
  const originalCountTokens = tokenService.countTokens;
  const originalGetMarketData = marketService.getMarketData;

  try {
    tokenService.countTokens = async () => 247;
    marketService.getMarketData = async () => ({
      totalTrades: 5432,
      totalVolume: '12400000',
    });

    const req = {};
    const res = {
      payload: null,
      json(payload) {
        this.payload = payload;
        return payload;
      },
    };
    let capturedError = null;
    const next = (error) => {
      capturedError = error;
    };

    await getMarketSummary(req, res, next);

    assert.equal(capturedError, null);
    assert.deepEqual(Object.keys(res.payload), ['tokensListed', 'totalTrades', 'totalVolume', 'generatedAt']);
    assert.equal(res.payload.tokensListed, 247);
    assert.equal(res.payload.totalTrades, 5432);
    assert.equal(res.payload.totalVolume, '12400000');
    assert.match(res.payload.generatedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  } finally {
    tokenService.countTokens = originalCountTokens;
    marketService.getMarketData = originalGetMarketData;
  }
});

test('getMarketSummary generates a fresh timestamp each request', async () => {
  const originalCountTokens = tokenService.countTokens;
  const originalGetMarketData = marketService.getMarketData;

  try {
    tokenService.countTokens = async () => 247;
    marketService.getMarketData = async () => ({
      totalTrades: 5432,
      totalVolume: '12400000',
    });

    const firstRes = {
      payload: null,
      json(payload) {
        this.payload = payload;
        return payload;
      },
    };
    const secondRes = {
      payload: null,
      json(payload) {
        this.payload = payload;
        return payload;
      },
    };

    await getMarketSummary({}, firstRes, () => {});
    await new Promise(resolve => setTimeout(resolve, 10));
    await getMarketSummary({}, secondRes, () => {});

    assert.notEqual(firstRes.payload.generatedAt, secondRes.payload.generatedAt);
  } finally {
    tokenService.countTokens = originalCountTokens;
    marketService.getMarketData = originalGetMarketData;
  }
});
