export type ProductType = {
  id: number;
  type: string;
  sku: string;
  name: string;
  price: number;
  weight_kg?: number;
  size_mb?: number;
  height?: number;
  width?: number;
  length?: number;
};
