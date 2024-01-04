import {
  TatumSDK,
  Network,
  Ethereum,
  ResponseDto,
  AddressBalance,
  AddressTransaction,
  Status,
} from '@tatumio/tatum';

export async function getWalletData(
  address: string,
): Promise<[Status, AddressBalance[], AddressTransaction[]]> {
  const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM });
  const balance: ResponseDto<AddressBalance[]> = await tatum.address.getBalance({
    addresses: [address],
  });
  const transactions: ResponseDto<AddressTransaction[]> = await tatum.address.getTransactions({
    address: address,
    transactionTypes: ['native'],
  });

  return [balance.status, balance.data, transactions.data];
}
