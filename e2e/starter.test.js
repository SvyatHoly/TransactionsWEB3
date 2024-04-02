describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should correctly find transaction', async () => {
    await element(by.text('Search')).tap();
    await element(by.id('input')).typeText(
      '0xe16a2e1019d40a8a2e3076c4d8e28f44b39bdd14f33e70a4401a71594e07f29e',
    );
    await element(by.id('searchButton')).tap();
    await waitFor(element(by.id('blockHashValue')))
      .toHaveText(
        '0x9f1db30ed9aae351c5ac2ebb1a549a428cfc3474ff061d466f4ceec4608ceffb',
      )
      .withTimeout(2000);
  });
});
