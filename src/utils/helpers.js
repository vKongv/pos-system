export const calcTotalAmount = transactions =>
  transactions.reduce((total, current) => total + current.amount, 0).toFixed(2);
