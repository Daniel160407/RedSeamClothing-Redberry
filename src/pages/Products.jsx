import { useEffect, useState } from "react";
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
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [lastPage, setLastPage] = useState(0);
  const [productsFrom, setProductsFrom] = useState(0);
  const [productsTo, setProductsTo] = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [filterFrom, setFilterFrom] = useState(
    searchParams.get("filterfrom") ?? "",
  );
  const [filterTo, setFilterTo] = useState(searchParams.get("filterto") ?? "");
  const [showFilters, setShowFilters] = useState(
    filterFrom && filterTo ? true : false,
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") ?? "");

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/info?sort=${sortBy}&page=${page}&id=${productId}`);
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

  const fetchProducts = async () => {
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
  };

  const handleFilterApply = () => {
    const params = new URLSearchParams(searchParams);
    params.set("filterfrom", filterFrom);
    params.set("filterto", filterTo);
    setSearchParams(params);
    setShowFilters(true);
    fetchProducts();
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
    if (showFilters) return;

    fetchProducts();
  }, [sortBy, page, showFilters]);

  return (
    <>
      <Navbar />
      <div className="mr-20 ml-20">
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
          <div className="flex w-auto max-w-[170px] items-center justify-center gap-[6px] rounded-[50px] border border-[#E1DFE1] px-[16px] py-[8px]">
            <p className="text-[14px]">
              Price: {filterFrom}-{filterTo}
            </p>
            <Button
              icon={CloseIcon}
              onClick={handleRemoveFilter}
              style="w-[6.75px] h-[6.75px] cursor-pointer"
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
