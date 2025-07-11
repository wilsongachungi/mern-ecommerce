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
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message>{error?.data?.message || error.message}</Message>
      ) : (
        <Slider
          {...setting}
          className="xl:w-[50rem] lg:w-[50rem] md:-[56rem] small:w-[40rem] sm:block"
        >
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
              <div key={_id}>
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]"
                />
                <div className="flex justify-between w-[20rem]">
                  <div className="one">
                    <h2 className="text-white">{name}</h2>
                    <p className="text-white">Ksh {price}</p> <br /> <br />
                    <p className="w-[25rem] text-white">
                      {description?.substring(0, 170)}
                    </p>
                    \
                  </div>
                  <div className="flex justify-between w-[8rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6 w-[15rem] text-white">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}{" "}
                        <br />
                        </h1>
                         <h1 className="flex items-center mb-6 w-[15rem] text-white">
                        <FaClock className="mr-2 text-white" /> Created:{" "}
                        {moment(createdAt).fromNow()}
                        </h1>
                         <h1 className="flex items-center mb-6 w-[15rem] text-white">
                        <FaStar className="mr-2 text-white" /> Review:{" "}
                        {numReviews} <br />
                      </h1>
                    </div>

                   <div className="two">
                     <h1 className="flex items-center mb-6 w-[8rem] text-white">
                        <FaStar className="mr-2 text-white" /> Ratings:
                        {Math.round(rating)}
                     </h1>
                     <h1 className="flex items-center mb-6 w-[8rem] text-white">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:
                        {quantity}
                     </h1>
                     <h1 className="flex items-center mb-6 w-[8rem] text-white">
                        <FaBox className="mr-2 text-white" /> In Stock: 
                         {countInStock}
                     </h1>
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
