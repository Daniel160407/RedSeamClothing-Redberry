import ProductInfo from "./pages/ProductInfo";
import Products from "./pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/info" element={<ProductInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
