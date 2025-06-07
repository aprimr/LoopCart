const calcDiscountedPrice = (price, discount) => {
  if (!discount || discount === 0) return price;
  const discountedAmount = (price * discount) / 100;
  return (price - discountedAmount).toFixed(0);
};

export default calcDiscountedPrice;
