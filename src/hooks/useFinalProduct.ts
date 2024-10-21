export default function useFinalProduct(product_id: string) {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchProduct = async () => {
    try {
      const response = await getProduct({ product_id: product_id });
      setProduct(response);
    } catch (error) {
      console.log("axios error while getting designers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(product, loading);
    fetchProduct();
  }, []);
  return { product, loading } as const;
}
