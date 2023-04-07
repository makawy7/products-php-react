function Furniture() {
  return (
    <>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="height"
          className="block text-sm font-medium text-gray-700"
        >
          Height (CM)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            id="height"
            className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
          />
          <div className="text-xs text-red-600 hidden">
            Please enter a valid height.
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="width"
          className="block text-sm font-medium text-gray-700"
        >
          Width (CM)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            id="width"
            className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
          />
          <div className="text-xs text-red-600 hidden">
            Please enter a valid width.
          </div>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="length"
          className="block text-sm font-medium text-gray-700"
        >
          Length (CM)
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            id="length"
            className="shadow-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md h-7"
          />
          <div className="text-xs text-red-600 hidden">
            Please enter a valid length.
          </div>
        </div>
      </div>
    </>
  );
}

export default Furniture;
