import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from '../components/loader';
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import TopBanner from "../components/topBanner";



const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>

        <TopBanner
        
      messages={[
        "🔥 Summer Sale! Get 20% off sitewide.",
        "🚀 New arrivals every week — shop now before they're gone!",
        "💥 Big brands, small prices — grab your deals today!",
        "✨ Upgrade your life without breaking the bank!",
        "📦 Fast delivery, straight to your doorstep!",
        "🛍️ Your cart called — it wants these deals now!",
        "🎁 Special offers just for you — don’t miss out!",
        "💎 Quality products at prices you’ll love!",
        "⚡ Limited-time deals — shop smarter, save bigger!",
      ]}i
      phone="0791193343"
      email="jumuika.co.ke"
      bgColor="bg-pink-700"
      textColor="text-white"
      interval={6000}
    />

    {/* Company Care Paragraph */}
    <div className="bg-gray-100 text-gray-800 py-6 px-8 text-center">
      <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed">
        At{" "}
        <span className="font-bold text-pink-600">
          Shop<span className="text-pink-900">Nasi</span>
        </span>
        , we go beyond selling products. Our mission is to give you a
        stress-free shopping experience with quality items, fast delivery,
        and warm customer service — because we truly care about you.
      </p>
    </div>
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
