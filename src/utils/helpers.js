export const calcTotalAmount = transactions =>
  transactions
    .reduce((total, current) => total + Number(current.total), 0)
    .toFixed(2);

export const calcGSTAmount = transactions =>
  transactions
    .reduce((total, current) => total + Number(current.totalgst), 0)
    .toFixed(2);

export const calcTotal = transactions =>
  transactions
    .reduce((total, current) => total + Number(current.amount), 0)
    .toFixed(2);
