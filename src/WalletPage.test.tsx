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
}, 10000);

test('should return wallet data for valid wallet address', async () => {
  const user = userEvent.setup();

  render(<WalletPage />);

  const searchInput = screen.getByPlaceholderText('Wallet address...');
  await user.type(searchInput, '0xb794f5ea0ba39494ce839613fffba74279579268');

  const searchButton = screen.getByText('Search');
  act(() => {
    user.click(searchButton);
  });

  const balance = await waitFor(() => screen.findByTitle(/Balance/i), { timeout: 5000 });
  expect(balance).toBeInTheDocument();

  const blocks = screen.getAllByTitle(/Block #/i);
  expect(blocks.length).toBe(10);
}, 10000);

test('should return wallet data with no transaction for valid empty wallet', async () => {
  const user = userEvent.setup();

  render(<WalletPage />);

  const searchInput = screen.getByPlaceholderText('Wallet address...');
  await user.type(searchInput, '0xBfA38c2538Fc6660D130Ac1cBB2f33D30A4d8eEB');

  const searchButton = screen.getByText('Search');
  act(() => {
    user.click(searchButton);
  });

  const balance = await waitFor(() => screen.findByTitle(/Balance/i), { timeout: 5000 });
  expect(balance).toBeInTheDocument();

  const blocks = screen.queryByTitle(/Block #/i);
  expect(blocks).not.toBeInTheDocument();

  const noTransaction = screen.getByText(/No transaction found/i);
  expect(noTransaction).toBeInTheDocument();
}, 10000);

test('should display error message when empty string is searched for', async () => {
  const user = userEvent.setup();

  render(<WalletPage />);

  const searchButton = screen.getByText('Search');
  act(() => {
    user.click(searchButton);
  });

  const errorMessage = await waitFor(() => screen.findByText(/You must enter a wallet address/i));
  expect(errorMessage).toBeInTheDocument();
});
