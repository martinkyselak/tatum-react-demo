import { useEffect, useState } from 'react';
import { SearchCriteria } from './api/types';
import { SearchWalletForm } from './SearchWalletForm';
import { getWallet } from './api/getWallet';
import { WalletFound } from './WalletFound';
import { AddressBalance } from '@tatumio/tatum';

export function WalletPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [addressBalance, setWalletData] = useState<AddressBalance[]>();
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>();

  useEffect(() => {
    let cancel = false;
    // '0xb794f5ea0ba39494ce839613fffba74279579268'
    if (searchCriteria) {
      getWallet(searchCriteria.address).then((data) => {
        if (!cancel) {
          setWalletData(data);
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
      {searchCriteria && !addressBalance && (
        <p className="py-2 text-sm truncate">
          No wallet with address <em>{searchCriteria.address}</em> found.
        </p>
      )}
      {addressBalance && <WalletFound addressBalance={addressBalance} />}
    </main>
  );
}
