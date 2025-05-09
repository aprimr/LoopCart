const calcDiscountedPrice = (price, discount) => {
  if (!discount || discount <= 0) return price;
  const discountedAmount = (price * discount) / 100;
  return +(price - discountedAmount).toFixed(2);
};

export default calcDiscountedPrice;
