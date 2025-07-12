import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        <div className="text-white text-center">
          Your Cart is empty.{" "}
          <Link to="/shop" className="text-pink-500 underline">
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Shopping Cart
            </h3>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-900 p-4 rounded-lg shadow mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4">
                    <Link
                      to={`/product/${item._id}`}
                      className="text-pink-500 font-semibold"
                    >
                      {item.name}
                    </Link>
                    <p className="text-white font-medium mt-1">
                      Ksh. {item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end mt-4 sm:mt-0 gap-4">
                  <select
                    className="w-[4.5rem] p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    className="text-red-500"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-900 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-white mb-4">
                Items (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
              </h2>
              <div className="text-2xl font-bold text-pink-500 mb-4">
                Ksh.{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </div>
              <button
                className="bg-pink-500 text-white py-2 px-6 rounded-full w-full hover:bg-pink-600 transition"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
