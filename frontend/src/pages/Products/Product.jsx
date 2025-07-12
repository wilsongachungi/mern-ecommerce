import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full sm:w-[18rem] mx-auto p-3 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover rounded"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg text-white truncate max-w-[10rem] sm:max-w-[12rem]">
              {product.name}
            </h2>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium px-2 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              Ksh {product.price}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
