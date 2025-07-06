import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

 const Header = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();
    
    if(isLoading) {
        return <Loader/>
    }

    if(error) {
        return <H1>ERROR</H1>
    }
        return <>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 px-4">
  {/* Left: Product Grid */}
  <div className="w-full lg:w-1/2">
    <div className="grid grid-cols-2 gap-4 text-white">
      {data.map((product) => (
        <div key={product._id}>
          <SmallProduct product={product} />
        </div>
      ))}
    </div>
  </div>

  {/* Right: Product Carousel */}
  <div className="w-full lg:w-1/2">
    <ProductCarousel />
  </div>
</div>

        </>
   
}

export default Header;