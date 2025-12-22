// Format price in RWF (Rwandan Francs)
// Prices are already in RWF from the backend
export const formatPrice = (price: number): string => {
  return `RWF ${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

