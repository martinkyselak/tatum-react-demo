import { render, screen } from '@testing-library/react';
import App from './App';

test('should render Ethereum Wallet headline', () => {
  render(<App />);
  const headerElement = screen.getByText(/Ethereum Wallet/i);
  expect(headerElement).toBeInTheDocument();
});
