import Property from "./Property";
import { ProductType } from "../types/ProductType";
import { ChangeEvent } from "react";

function SingleProduct({
  id,
  type,
  sku,
  name,
  price,
  weight_kg,
  size_mb,
  height,
  width,
  length,
  handleCheck,
}: ProductType & {
  handleCheck: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-white shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-300 rounded-xl p-2 mt-2">
      <div className="p-2">
        <input
          onChange={handleCheck}
          type="checkbox"
          value={id}
          className="delete-checkbox"
        />
      </div>
      <div>
        <ul className="list-none mt-1 mb-4 text-center font-bold">
          <li>{name}</li>
          <li>{sku}</li>
          <li>{price} $</li>
          {weight_kg && <Property name="Weight" value={weight_kg} unit="KG" />}
          {size_mb && <Property name="Size" value={size_mb} unit="MB" />}
          {height && width && width && (
            <Property
              name="Dimensions"
              value={`${height}x${width}x${length}`}
              unit=""
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default SingleProduct;
