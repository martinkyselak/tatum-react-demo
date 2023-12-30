import { useEffect, useState } from 'react';
import { SearchCriteria } from './api/types';
import { SearchWalletForm } from './SearchWalletForm';
import { getWalletData } from './api/getWallet';
import { WalletFound } from './WalletFound';
import { AddressBalance, AddressTransaction, Status } from '@tatumio/tatum';

export function WalletPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [walletData, setWalletData] = useState<[Status, AddressBalance[], AddressTransaction[]]>([
    Status.ERROR,
    [],
    [],
  ]);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>();

  useEffect(() => {
    let cancel = false;
    // '0xb794f5ea0ba39494ce839613fffba74279579268'
    if (searchCriteria) {
      getWalletData(searchCriteria.address).then((walletData) => {
        if (!cancel) {
          setWalletData(walletData);
          setIsLoading(false);
        }
      });
    }
    return () => {
      cancel = true;
    };
  }, [searchCriteria]);

  function handleSearch(search: SearchCriteria) {
    setIsLoading(true);
    setSearchCriteria(search);
  }

  if (isLoading) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }
  return (
    <main className="max-w-xs ml-auto mr-auto">
      <SearchWalletForm onSearch={handleSearch} />
      {searchCriteria && walletData[0] !== Status.SUCCESS && (
        <p className="py-2 text-sm truncate">
          No wallet with address <em>{searchCriteria.address}</em> found.
        </p>
      )}
      {walletData[0] === Status.SUCCESS && <WalletFound walletData={walletData} />}
    </main>
  );
}
