import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setcomment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem] ">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] text-white"
              />
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold text-white">
                {product.name}
              </h2>
              <p className="my-2 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>
              <p className="text-5xl my-4 font-extrabold text-white">
                Ksh{product.price}
              </p>

              <div className="flex items-center justify-between w-[320px]">
                <div className="one">
                  <h3 className="flex items-center mb-6 text-white">
                    <FaStore className="mr-2 text-white" /> Brand:{""}{" "}
                    {product.brand}
                  </h3>
                  <h3 className="flex items-center mb-6 text-white">
                    <FaClock className="mr-2 text-white" /> Added:{""}{" "}
                    {moment(product.createAt).fromNow()}
                  </h3>
                  <h3 className="flex items-center mb-6 text-white">
                    <FaStar className="mr-2 text-white" /> Reviews:{""}{" "}
                    {product.numReviews}
                  </h3>
                </div>

                <div className="two">
                  <h3 className="flex items-center mb-6 text-white">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h3>
                  <h3 className="flex items-center  text-white mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h3>
                  <h3 className="flex items-center  text-white mb-6">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.CountInStock}
                  </h3>
                </div>
              </div>

              <div className="flex justify-between flex-wrap text-white">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.CountInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                        {[...Array(product.CountInStock.keys)]}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
