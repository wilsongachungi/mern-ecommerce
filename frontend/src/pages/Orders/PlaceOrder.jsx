import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import ProgressSteps from "../../components/ProgressSteps";
import Loader from "../../components/loader";
import { useCreateCategoryMutation } from "../../redux/api/categoryApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/api/orderApliSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <ProgressSteps step1 step2 step3 />

      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your Cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text left text-white align-top">
                    Image
                  </td>
                  <td className="px-1 py-2 text left text-white ">Product</td>
                  <td className="px-1 py-2 text left text-white ">Quantity</td>
                  <td className="px-1 py-2 text left text-white ">Price</td>
                  <td className="px-1 py-2 text left text-white ">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2 text-white">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 text-white">{item.qty}</td>
                    <td className="p-2 text-white">{item.price.toFixed(2)}</td>
                    <td className="p-2 text-white">
                      Ksh {(item.qty * Number(item.price)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h4 className="text-2xl font-semibold mb-5 text-pink-500">
            Order Sumary
          </h4>
          <div className="flex justify-between flex-wrap p-8 bg-[#181818]">
            <ul className="text-lg">
              <li className="text-white">
                <span className="font-semibold mb-4">Items: {""}</span>
                Ksh. {cart.itemsPrice}
              </li>
              <li className="text-white">
                <span className="font-semibold mb-4">Shipping:</span>
                Ksh. {cart.shippingPrice}
              </li>
              <li className="text-white">
                <span className="font-semibold mb-4">Tax:</span>
                Ksh. {cart.taxPrice}
              </li>
              <li className="text-white">
                <span className="font-semibold mb-4">Total:</span>
                Ksh. {cart.totalPrice}
              </li>
            </ul>
            {error && <Message variant="danger">{error.data.message}</Message>}

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-pink-500">
                Shipping
              </h2>

              <p className="text-white">
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-pink-500">
                Payment Method
              </h3>
              <strong className="text-pink-500">Method:</strong>{" "}
              <span className="text-white">{cart.paymentMethod}</span>
            </div>
          </div>
          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
