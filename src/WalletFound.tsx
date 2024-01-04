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
    <div className="divide-y divide-gray-700">
      <div className="flex items-center space-x-4 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">Wallet</p>
          <p
            className="text-sm text-gray-500 truncate"
            title={'Address: ' + walletData[1][0].address}
          >
            {walletData[1][0].address}
          </p>
        </div>
        <div
          className="inline-flex items-center text-base font-semibold text-gray-900"
          title={'Balance: \u039E ' + walletData[1][0].balance}
        >
          {'\u039E ' + walletData[1][0].balance}
        </div>
      </div>

      <ul className="max-w-md divide-y divide-gray-200">
        {walletData[2].length > 0 ? (
          walletData[2].map((transaction) => (
            <li key={transaction.hash} className="py-3">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium text-gray-900 truncate"
                    title={'Hash: ' + transaction.hash}
                  >
                    {new Date(transaction.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 truncate" title="Block #">
                    {transaction.blockNumber}
                  </p>
                </div>
                <div
                  className="inline-flex items-center text-base font-semibold text-gray-900"
                  title={'\u039E ' + transaction.amount}
                >
                  {'\u039E ' + parseFloat(transaction.amount).toFixed(5)}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="py-3">
            <p className="text-sm">No transaction found.</p>
          </li>
        )}
      </ul>
    </div>
  );
}
