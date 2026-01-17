// Format price in RWF (Rwandan Francs)
// Prices are already in RWF from the backend
// This is the legacy formatPrice function - use useCurrency hook for currency conversion
export const formatPrice = (price: number): string => {
  return `RWF ${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

