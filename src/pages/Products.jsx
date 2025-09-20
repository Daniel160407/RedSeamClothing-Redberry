import { useEffect, useState } from "react";
import AuthorizationNavbar from "../components/navigation/AuthorizationNavbar";
import ProductsHeader from "../components/uiComponents/ProductsHeader";
import useAxios from "../hooks/UseAxios";
import ProductsList from "../components/lists/ProductsList";
import PageSelector from "../components/uiComponents/PageSelector";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [productsFrom, setProductsFrom] = useState(0);
  const [productsTo, setProductsTo] = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/info?id=${productId}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await useAxios.get(`/products?page=${page}`);
      const { data, meta } = response.data;
      setProducts(data);
      setPage(meta.current_page);
      setLastPage(meta.last_page);
      setProductsFrom(meta.from);
      setProductsTo(meta.to);
      setProductsTotal(meta.total);
    };

    fetchProducts();
  }, [page]);

  return (
    <>
      <AuthorizationNavbar />
      <div className="mr-20 ml-20">
        <ProductsHeader
          productsFrom={productsFrom}
          productsTo={productsTo}
          productsTotal={productsTotal}
          filterFrom={filterFrom}
          setFilterFrom={setFilterFrom}
          filterTo={filterTo}
          setFilterTo={setFilterTo}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <ProductsList products={products} onProductClick={handleProductClick} />
        <PageSelector page={page} setPage={setPage} totalPages={lastPage} />
      </div>
    </>
  );
};

export default Products;
