import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
   e.preventDefault()

   dispatch(saveShippingAddress({address, city, postalCode, country}))
   dispatch(savePaymentMethod(paymentMethod))
   navigate('/placeorder')
  }

  //Payment
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 step3/>
      <div className="mt-[10rem]  flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem] ">
          <h3 className="text-2xl font-semibold mb-4 text-white">Shipping</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-white mb-2">
              Address
            </label>
            <input
              type="text"
              className="w-full flex p-2 border rounded"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor="" className="block text-white mb-2">
              City
            </label>
            <input
              type="text"
              className="w-full flex p-2 border rounded"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <label htmlFor="" className="block text-white mb-2">
              Postal Code
            </label>
            <input
              type="text"
              className="w-full flex p-2 border rounded"
              placeholder="Enter Postal Code"
              value={postalCode}
              
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <div className="mb-4">
              <label htmlFor="" className="block text-gray-400 mb-2">
                Select Method
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-pink-500"
                    name="paymentMethod"
                    value="payPal"
                    checked={paymentMethod === "PayPal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="ml-2 text-white">PayPal or credit Card</span>
                </label>
              </div>
            </div>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full" type="submit">
               Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
