import { AddressBalance } from '@tatumio/tatum';

type Props = {
  addressBalance: AddressBalance[];
};

export function WalletFound({ addressBalance }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold">Wallet</h2>
      <p className="py-2 text-sm truncate" title={addressBalance[0].address}>
        Address: {addressBalance[0].address}
      </p>
      <p className="py-2 text-sm">Balance: {addressBalance[0].balance}</p>
      <h3 className="text-l font-bold">Transactions</h3>
      <p>...</p>
    </div>
  );
}
