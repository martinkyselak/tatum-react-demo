import ethereumlogo from './ethereum-logo.svg';

export function Header() {
  return (
    <header className="flex flex-col items-center text-slate-50 bg-slate-700 h-40 p-5">
      <img src={ethereumlogo} alt="Ethereum logo" className="w-16 h-16" />
      <h1 className="text-xl font-bold">Ethereum Wallet</h1>
    </header>
  );
}
