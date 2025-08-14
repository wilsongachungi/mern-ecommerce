import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApliSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation()
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientid,
            currency: "KSH",
          },
        });
        paypalDispatch({ type: "setloadingStatus", value: "pending" });
      };

      if (order && !order.IsPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, action) {
    return actions.order.capture().then(async function (details) {
        try {
            await payOrder({orderId, details})
            toast.success("Order is paid");

        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    })
  }

  function createOrder(data, actions) {
    return actions.order
    .create({
        purchase_units: [{amount: {value: order.totalPrice}}],
    })
    .then((orderID) => {
        return orderID;
    });
  }

  function onError(err) {
    toast.error(err.message)
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message varriant="danger">{error.data.message}</Message>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5 w-full">
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2 text-pink-500">Image</th>
                    <th className="p-2 text-pink-500">Product</th>
                    <th className="p-2 text-center text-pink-500">Quantity</th>
                    <th className="p-2 text-pink-500">Unit Price</th>
                    <th className="p-2 text-pink-500">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
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

                      <td className="p-2 text-center text-white">{item.qty}</td>
                      <td className="p-2 text-center text-white">
                        Ksh {Number(item.price).toFixed(2)}
                      </td>
                      <td className="p-2 text-center text-white">
                        Ksh {(Number(item.qty) * Number(item.price)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-i/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h3 className="text-xl font-bold mb-2 text-white">Shipping</h3>
          <div className="mb-4 mt-4">
            <strong className="text-pink-500">Order:</strong>{" "}
            <span className="text-white">{order._id}</span>
            <p className="m-b4">
              <strong className="text-pink-500">Name:</strong>{" "}
              <span className="text-white"> {order.user.username}</span>
            </p>
            <p className="m-b4">
              <strong className="text-pink-500">Email:</strong>{" "}
              <span className="text-white"> {order.user.email}</span>
            </p>
            <div className="mb-4">
              <strong className="text-pink-500">Address:</strong>
              {""}
              <span className="text-white">
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {""},{order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.county}
              </span>
              <p className="mb-4">
                <strong className="text-pink-500">Method:</strong>
                {""}
                <span className="text-white">{order.paymentMethod}</span>
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on{order.paidAt}</Message>
              ) : (
                <Message variant="success">Not paid</Message>
              )}
            </div>

              <h3 className="text-xl font-bold mb-2 mt-40px text-white">Order Sammary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-pink-500">Items</span>
                <span className="text-white">Ksh {order.itemsPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-pink-500">Shipping</span>
                <span className="text-white">Ksh {order.shippingPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-pink-500">Tax</span>
                <span className="text-white">Ksh {order.taxPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-pink-500">Total</span>
                <span className="text-white">Ksh {order.totalPrice}</span>
              </div>

              {!order.isPaid && (
                <div>
                    {loadingPay && <loader/>} {isPending ? (<Loader /> ): (<div>
                        <div>
                            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons>
                        </div>
                    </div>)} 

                    
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
