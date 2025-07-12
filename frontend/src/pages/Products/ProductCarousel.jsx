import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-6">
      {isLoading ? null : error ? (
        <Message>{error?.data?.message || error.message}</Message>
      ) : (
        <Slider {...setting} className="w-full max-w-[56rem] mx-auto">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4">
                {/* Image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[20rem] md:h-[30rem] object-cover rounded-lg"
                />

                {/* Info Container */}
                <div className="mt-4 flex flex-col md:flex-row justify-between text-white gap-6">
                  {/* Left Section */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-pink-400 font-bold">Ksh {price}</p>
                    <p className="mt-2 text-sm text-gray-200">
                      {description?.substring(0, 170)}
                    </p>
                  </div>

                  {/* Middle Info Block */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center text-sm">
                      <FaStore className="mr-2" /> Brand: {brand}
                    </div>
                    <div className="flex items-center text-sm">
                      <FaClock className="mr-2" />
                      Created: {moment(createdAt).fromNow()}
                    </div>
                    <div className="flex items-center text-sm">
                      <FaStar className="mr-2" />
                      Reviews: {numReviews}
                    </div>
                  </div>

                  {/* Right Info Block */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center text-sm">
                      <FaStar className="mr-2" />
                      Rating: {Math.round(rating)}
                    </div>
                    <div className="flex items-center text-sm">
                      <FaShoppingCart className="mr-2" />
                      Quantity: {quantity}
                    </div>
                    <div className="flex items-center text-sm">
                      <FaBox className="mr-2" />
                      In Stock: {countInStock}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
