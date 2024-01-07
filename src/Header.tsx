import { ResponseDto, Status } from '@tatumio/tatum';
import { getExchangeRate } from './api/getWallet';
import ethereumlogo from './logo.svg';
import { Rate } from '@tatumio/tatum/dist/src/service/rate/rates.dto';
import { useEffect, useState } from 'react';

export function Header() {
  const [rateData, setRateData] = useState<ResponseDto<Rate>>();

  useEffect(() => {
    const fetchData = async () => {
      let cancel = false;
      getExchangeRate().then((rateData) => {
        if (!cancel) {
          setRateData(rateData);
        }
      });
      return () => {
        cancel = true;
      };
    };

    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 240000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="flex flex-col items-center text-slate-50 bg-slate-700 h-30 p-5">
      <img src={ethereumlogo} alt="Ethereum logo" className="w-16 h-16" />
      <h1 className="text-xl font-bold">Ethereum Wallet</h1>
      {rateData &&
        rateData.status === Status.SUCCESS &&
        '\u20AC ' + parseFloat(rateData.data.value).toFixed(2)}
    </header>
  );
}
