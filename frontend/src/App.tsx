import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import CreateProduct from "./pages/CreateProduct";
import ListProducts from "./pages/ListProducts";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<ListProducts />} />
            <Route path="add-product" element={<CreateProduct />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
