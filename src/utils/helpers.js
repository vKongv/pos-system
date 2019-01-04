export const calcTotalAmount = transactions =>
  transactions
    .reduce((total, current) => total + current.grandTotal, 0)
    .toFixed(2);

export const calculateGST = transactions =>
  transactions
    .reduce((total, current) => total + current.taxCharge, 0)
    .toFixed(2);
