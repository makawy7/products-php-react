import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import CreateProduct from "./pages/CreateProduct";
import ListProducts from "./pages/ListProducts";
import { useState } from "react";

function App() {
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [sucessMessge, setSuccessMessage] = useState<string | null>(null);
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ListProducts
                  setSubmitSuccess={setSubmitSuccess}
                  setSuccessMessage={setSuccessMessage}
                  submitSuccess={submitSuccess}
                  sucessMessge={sucessMessge}
                />
              }
            />
            <Route
              path="add-product"
              element={
                <CreateProduct
                  setSubmitSuccess={setSubmitSuccess}
                  setSuccessMessage={setSuccessMessage}
                />
              }
            />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
