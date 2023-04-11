import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { ProductFields } from "../../types/ProductFields";

export default function Dvd({
  setInputs,
  size,
}: {
  setInputs: Dispatch<SetStateAction<ProductFields>>;
  size: string;
}) {
  const sizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev: ProductFields) => ({
      ...prev,
      size: e.target.value,
    }));
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
      <label htmlFor="size" className="block text-sm font-medium text-gray-700">
        Size (MB)
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          onChange={sizeChange}
          value={size ?? ""}
          id="size"
          className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
        />
        <div className="text-xs text-red-600 hidden">
          Please enter a valid size.
        </div>
      </div>
    </div>
  );
}
