import { act, render, screen, waitFor } from '@testing-library/react';
import { WalletPage } from './WalletPage';
import userEvent from '@testing-library/user-event';

test('should return nothing for non-existing wallet address', async () => {
  const user = userEvent.setup();

  render(<WalletPage />);

  const searchInput = screen.getByPlaceholderText('Wallet address...');
  await user.type(searchInput, 'non-existing');

  const searchButton = screen.getByText('Search');
  act(() => {
    user.click(searchButton);
  });

  const res = await waitFor(() => screen.findByText(/No wallet with address/i), { timeout: 5000 });
  expect(res).toBeInTheDocument();
});

test('should return wallet data for valid wallet address', async () => {
  const user = userEvent.setup();

  render(<WalletPage />);

  const searchInput = screen.getByPlaceholderText('Wallet address...');
  await user.type(searchInput, '0xb794f5ea0ba39494ce839613fffba74279579268');

  const searchButton = screen.getByText('Search');
  act(() => {
    user.click(searchButton);
  });

  const balance = await waitFor(() => screen.findByText(/Balance/i), { timeout: 5000 });
  expect(balance).toBeInTheDocument();

  const txheadline = await waitFor(() => screen.findByText(/Transactions/i), { timeout: 5000 });
  expect(txheadline).toBeInTheDocument();

  // TODO check the list of transactions, not only a headline
});

// TODO check a wallet with no transactions

// TODO check validation - click search on empty input
