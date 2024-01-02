import { Status } from '@tatumio/tatum';
import { getWalletData } from './getWallet';

// TODO: mock Tatum library to get real unit tests

test('should return error for non-existing address', async () => {
  const result = await getWalletData('non-existing-address');
  expect(result).toStrictEqual([Status.ERROR, null, null]);
});

test('should return valid response for existing address', async () => {
  const result = await getWalletData('0xb794f5ea0ba39494ce839613fffba74279579268');
  expect(result[0]).toBe(Status.SUCCESS);

  expect(result[1]).toBeDefined();
  expect(result[1][0].balance.length).toBeGreaterThan(0);

  expect(result[2]).toBeDefined();
  expect(result[2].length).toBe(10);
});
