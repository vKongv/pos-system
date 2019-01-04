export const calcTotalAmount = transactions =>
  transactions
    .reduce((total, current) => {
      return total + current.amount;
    }, 0)
    .toFixed(2);

export const calcTotalAmountWithTax = transactions =>
  transactions
    .reduce((total, current) => {
      return total + current.amount + (current.tax > 0 ? current.tax : 0);
    }, 0)
    .toFixed(2);

export const calcTotalTax = transactions =>
  transactions
    .reduce((total, current) => {
      return total + (current.tax > 0 ? current.tax : 0);
    }, 0)
    .toFixed(2);
