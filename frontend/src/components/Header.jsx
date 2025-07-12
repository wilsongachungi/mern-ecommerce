import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <h1 className="text-red-500 text-center mt-4">Error loading featured products</h1>;

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start gap-8 px-4 mt-10">
      {/* Left: Product Grid */}
      <div className="w-full lg:w-1/2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Right: Product Carousel */}
      <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
        <ProductCarousel />
      </div>
    </div>
  );
};

export default Header;
