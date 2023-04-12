import { useCallback, useState } from "react";
import { ProductType } from "../types/ProductType";

function useFetch(url: string) {
  const [data, setData] = useState<Array<ProductType>>([]);
  const [loading, setLoading] = useState(true);
  const [noProductsError, setNoProductsError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json?.error) {
      setLoading(false);
      setNoProductsError(true);
      setData([]);
    } else {
      setData(json);
      setLoading(false);
      setNoProductsError(false);
    }
  }, [url]);

  return { data, loading, noProductsError, fetchData };
}

export default useFetch;
