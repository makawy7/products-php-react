function SingleProduct() {
  return (
    <div className="bg-white shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border border-gray-300 rounded-xl p-2 mt-2">
      <div className="p-2">
        <input type="checkbox" className="delete-checkbox" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-center">Product Name</h3>
        <ul className="list-none mt-1 mb-4 text-center">
          <li>SKU</li>
          <li>Type Name</li>
          <li>Price $</li>
          <li>
            <b className="font-bold">Property Name</b>: Property Value Unit
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SingleProduct;
