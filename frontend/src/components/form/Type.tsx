import { Dispatch, ChangeEvent, SetStateAction } from "react";

export default function Type({
  type,
  setType,
}: {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}) {
  const typeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
        Type:
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <select
          onChange={typeChange}
          defaultValue={type}
          id="type"
          className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
        >
          <option value=""></option>
          <option value="dvd">DVD</option>
          <option value="furniture">Furniture</option>
          <option value="book">Book</option>
        </select>
      </div>
    </div>
  );
}

