export const formatAmount = (amount) => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  if (isNaN(amount)) {
    return '0.00';
  }

  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  };

  return new Intl.NumberFormat('en-US', options).format(amount);
};
