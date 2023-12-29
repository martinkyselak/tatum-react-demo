import { useState } from 'react';
import { SearchCriteria } from './api/types';
import { SearchWalletForm } from './SearchWalletForm';

export function WalletPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();

  function handleSearch(search: SearchCriteria) {
    setSearchCriteria(search);
  }

  return (
    <main className="max-w-xs ml-auto mr-auto">
      <SearchWalletForm onSearch={handleSearch} />
      <div>Wallet balance and last ten transactions will be here.</div>
    </main>
  );
}
