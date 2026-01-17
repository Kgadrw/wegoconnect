import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Currency = 'RWF' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number | null;
  loading: boolean;
  convertPrice: (priceInRWF: number) => number;
  formatPrice: (priceInRWF: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATE_API_KEY = '69c21748796dd83798480fc8';
const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/USD`;

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('RWF');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch exchange rate when switching to USD
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'USD' && exchangeRate === null) {
        setLoading(true);
        try {
          const response = await fetch(EXCHANGE_RATE_API_URL);
          const data = await response.json();
          
          if (data.result === 'success' && data.conversion_rates && data.conversion_rates.RWF) {
            // RWF to USD: divide by RWF rate (e.g., if 1 USD = 1300 RWF, then RWF/1300 = USD)
            setExchangeRate(data.conversion_rates.RWF);
          } else {
            console.error('Failed to fetch exchange rate:', data);
            // Fallback: use a default rate if API fails
            setExchangeRate(1300); // Approximate rate
          }
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
          // Fallback: use a default rate if API fails
          setExchangeRate(1300); // Approximate rate
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExchangeRate();
  }, [currency, exchangeRate]);

  // Convert price from RWF to selected currency
  const convertPrice = (priceInRWF: number): number => {
    if (currency === 'RWF') {
      return priceInRWF;
    }
    
    if (exchangeRate === null) {
      // Return RWF price if exchange rate not loaded yet
      return priceInRWF;
    }
    
    // Convert RWF to USD: divide by exchange rate
    return priceInRWF / exchangeRate;
  };

  // Format price with currency symbol
  const formatPrice = (priceInRWF: number): string => {
    const convertedPrice = convertPrice(priceInRWF);
    
    if (currency === 'USD') {
      return `$${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    return `RWF ${priceInRWF.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate,
        loading,
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
