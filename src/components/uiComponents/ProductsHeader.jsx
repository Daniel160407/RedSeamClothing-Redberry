import Filter from "/svg/Filter.svg";
import Arrow from "/svg/Arrow.svg";

const ProductsHeader = ({
  productsFrom,
  productsTo,
  productsTotal,
  filterFrom,
  setFilterFrom,
  filterTo,
  setFilterTo,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex w-full items-center justify-between px-8 py-4">
      <h1 className="text-2xl text-gray-900">Products</h1>

      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <p>Showing {productsFrom}–{productsTo} of {productsTotal} results</p>

        <div className="h-5 w-px bg-gray-300" />

        <button className="flex cursor-pointer items-center space-x-2 text-gray-800 hover:text-gray-900">
          <img src={Filter} alt="Filter" className="h-4 w-4" />
          <span className="text-sm font-medium">Filter</span>
        </button>

        <button className="flex cursor-pointer items-center space-x-1 text-gray-800 hover:text-gray-900">
          <span className="text-sm font-medium">Sort by</span>
          <img src={Arrow} alt="Sort" className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default ProductsHeader;
