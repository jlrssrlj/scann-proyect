export const getProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
};
