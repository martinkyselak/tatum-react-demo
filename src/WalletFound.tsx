import { AddressBalance, AddressTransaction, Status } from '@tatumio/tatum';

type Props = {
  walletData: [
    status: Status,
    addressBalance: AddressBalance[],
    addressTransactions: AddressTransaction[],
  ];
};

export function WalletFound({ walletData }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold">Wallet</h2>
      <p className="text-sm truncate" title={walletData[1][0].address}>
        Address: {walletData[1][0].address}
      </p>
      <p className="text-sm">Balance: {walletData[1][0].balance}</p>
      {walletData[2].length > 0 && <h3 className="text-l font-bold pt-2">Transactions</h3>}
      <ul className="list-none">
        {walletData[2].length > 0 ? (
          walletData[2].map((transaction) => (
            <li key={transaction.hash} className="pb-2">
              <p className="text-sm truncate">Hash: {transaction.hash}</p>
              <p className="text-sm">Amount: {transaction.amount}</p>
              <p className="text-sm">
                Timestamp: {new Date(transaction.timestamp).toLocaleString()}
              </p>
              <p className="text-sm">Block #: {transaction.blockNumber}</p>
            </li>
          ))
        ) : (
          <li className="pb-2">
            <p className="text-sm">No transaction found.</p>
          </li>
        )}
      </ul>
    </div>
  );
}
