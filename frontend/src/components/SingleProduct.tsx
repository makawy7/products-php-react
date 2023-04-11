import Property from "./Property";
import { ProductType } from "../types/ProductType";

function SingleProduct({
  type,
  sku,
  name,
  price,
  weight_kg,
  size_mb,
  height,
  width,
  length,
}: ProductType) {
  return (
    <div className="bg-white shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-300 rounded-xl p-2 mt-2">
      <div className="p-2">
        <input type="checkbox" className="delete-checkbox" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-center">{name}</h3>
        <ul className="list-none mt-1 mb-4 text-center">
          <li>SKU: {sku}</li>
          <li>Type: {type}</li>
          <li>Price ${price}</li>
          {weight_kg && <Property name="Weight" value={weight_kg} unit="kg" />}
          {size_mb && <Property name="Size" value={size_mb} unit="MB" />}
          {height && <Property name="Height" value={height} unit="cm" />}
          {width && <Property name="Width" value={width} unit="cm" />}
          {length && <Property name="Length" value={length} unit="cm" />}
        </ul>
      </div>
    </div>
  );
}

export default SingleProduct;
