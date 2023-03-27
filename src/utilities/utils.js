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

export const generateRandomString = (options) => {
  const characters =
    '0123456789';

  let result = '';

  for (let i = 0; i < options.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};