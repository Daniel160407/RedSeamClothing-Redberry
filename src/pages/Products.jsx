import { useEffect, useState, useCallback } from "react";
import useAxios from "../hooks/UseAxios";
import ProductsList from "../components/lists/ProductsList";
import PageSelector from "../components/uiComponents/PageSelector";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ProductsHeader from "../components/layout/ProductsHeader";
import Button from "../components/uiComponents/Button";
import CloseIcon from "../components/icons/CloseIcon";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [lastPage, setLastPage] = useState(0);
  const [productsFrom, setProductsFrom] = useState(0);
  const [productsTo, setProductsTo] = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [filterFrom, setFilterFrom] = useState(
    searchParams.get("filterfrom") || "",
  );
  const [filterTo, setFilterTo] = useState(searchParams.get("filterto") || "");
  const [showFilters, setShowFilters] = useState(
    searchParams.get("filterfrom") && searchParams.get("filterto")
      ? true
      : false,
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    const params = new URLSearchParams();

    if (sortBy) params.append("sort", sortBy);
    if (filterFrom) params.append("filterfrom", filterFrom);
    if (filterTo) params.append("filterto", filterTo);
    if (page) params.append("page", page);
    if (productId) params.append("id", productId);

    navigate(`/info?${params.toString()}`);
  };

  const handleSortByChange = (sortOption) => {
    setSortBy(sortOption);

    const params = new URLSearchParams(searchParams);
    params.set("sort", sortOption);
    setSearchParams(params);
  };

  const handlePageSelect = (page) => {
    setPage(page);
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await useAxios.get(
        `/products?sort=${sortBy}&filter[price_from]=${filterFrom}&filter[price_to]=${filterTo}&page=${page}`,
      );

      const { data, meta } = response.data;
      setProducts(data);
      setPage(meta.current_page);
      setLastPage(meta.last_page);
      setProductsFrom(meta.from);
      setProductsTo(meta.to);
      setProductsTotal(meta.total);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, [sortBy, filterFrom, filterTo, page]);

  const handleFilterApply = () => {
    const params = new URLSearchParams(searchParams);
    params.set("filterfrom", filterFrom);
    params.set("filterto", filterTo);
    setSearchParams(params);
    setShowFilters(true);
  };

  const handleRemoveFilter = () => {
    setFilterFrom("");
    setFilterTo("");
    const params = new URLSearchParams(searchParams);
    params.delete("filterfrom");
    params.delete("filterto");
    setSearchParams(params);
    setShowFilters(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`mr-20 ml-20 transform transition-all duration-700 ease-out ${
          isPageLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <ProductsHeader
          productsFrom={productsFrom}
          productsTo={productsTo}
          productsTotal={productsTotal}
          filterFrom={filterFrom}
          setFilterFrom={setFilterFrom}
          filterTo={filterTo}
          setFilterTo={setFilterTo}
          onFilterApply={handleFilterApply}
          sortBy={sortBy}
          setSortBy={handleSortByChange}
        />
        {showFilters && (
          <div className="flex w-auto max-w-[170px] transform items-center justify-center gap-[6px] rounded-[50px] border border-[#E1DFE1] px-[16px] py-[8px] transition-all duration-500 ease-out hover:scale-105">
            <p className="text-[14px]">
              Price: {filterFrom}-{filterTo}
            </p>
            <Button
              icon={CloseIcon}
              onClick={handleRemoveFilter}
              style="w-[6.75px] h-[6.75px] cursor-pointer transition-transform duration-200 ease-out hover:scale-125"
            />
          </div>
        )}
        <ProductsList products={products} onProductClick={handleProductClick} />
        <PageSelector
          currentPage={page}
          onPageChange={handlePageSelect}
          totalPages={lastPage}
        />
      </div>
    </>
  );
};

export default Products;
