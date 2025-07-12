import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from '../components/loader';
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}
      
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || "Something went wrong"}
        </Message>
      ) : (
        <>
          {/* Title & Shop Link */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 md:mt-20 px-4">
            <h3 className="text-3xl font-bold text-white mb-4 md:mb-0">
              Special Products
            </h3>
            <Link
              to="/shop"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full transition"
            >
              Shop
            </Link>
          </div>

          {/* Products */}
          <div className="flex justify-center flex-wrap gap-4 mt-6">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
