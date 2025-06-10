export const getCart = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
};
