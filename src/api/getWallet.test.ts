import { Address, AddressBalance, AddressTransaction, ResponseDto, Status } from '@tatumio/tatum';
import { getWalletData } from './getWallet';

afterEach(() => {
  jest.clearAllMocks();
});

const WalletAddressWithTransactions = '0xb794f5ea0ba39494ce839613fffba74279579268';

const createTransaction = () => {
  return {
    chain: '',
    blockNumber: 1,
    hash: '1',
    transactionType: 'incoming' as const,
    amount: '1',
    timestamp: 1,
    address: WalletAddressWithTransactions,
  };
};

test('should return valid response for existing address', async () => {
  const mockedBalanceResponse: ResponseDto<AddressBalance[]> = {
    data: [
      {
        address: WalletAddressWithTransactions,
        balance: '1',
        type: 'native',
      },
    ],
    status: Status.SUCCESS,
  };

  const mockedTransactionsResponse: ResponseDto<AddressTransaction[]> = {
    data: new Array<AddressTransaction>(10).fill(createTransaction()).map(createTransaction),
    status: Status.SUCCESS,
  };

  jest
    .spyOn(Address.prototype, 'getBalance')
    .mockReturnValueOnce(Promise.resolve(mockedBalanceResponse));
  jest
    .spyOn(Address.prototype, 'getTransactions')
    .mockReturnValueOnce(Promise.resolve(mockedTransactionsResponse));

  const result = await getWalletData(WalletAddressWithTransactions);
  expect(result[0]).toBe(Status.SUCCESS);

  expect(result[1]).toBeDefined();
  expect(result[1][0].balance.length).toBeGreaterThan(0);

  expect(result[2]).toBeDefined();
  expect(result[2].length).toBe(10);
});

test('should return error for non-existing address', async () => {
  const mockedBalanceResponse: ResponseDto<AddressBalance[]> = {
    data: null!,
    status: Status.ERROR,
  };

  const mockedTransactionsResponse: ResponseDto<AddressTransaction[]> = {
    data: null!,
    status: Status.ERROR,
  };

  jest
    .spyOn(Address.prototype, 'getBalance')
    .mockReturnValueOnce(Promise.resolve(mockedBalanceResponse));
  jest
    .spyOn(Address.prototype, 'getTransactions')
    .mockReturnValueOnce(Promise.resolve(mockedTransactionsResponse));

  const result = await getWalletData('non-existing-address');
  expect(result).toStrictEqual([Status.ERROR, null, null]);
});
