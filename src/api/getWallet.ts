import { TatumSDK, Network, Ethereum, ResponseDto, AddressBalance } from '@tatumio/tatum';

export async function getWallet(address: string): Promise<AddressBalance[]> {
  const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM });
  const balance: ResponseDto<AddressBalance[]> = await tatum.address.getBalance({
    addresses: [address],
  });

  return balance.data;
}
