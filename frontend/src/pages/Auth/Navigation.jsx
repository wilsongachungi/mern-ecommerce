import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoriteCount from "../Products/FavoriteCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <>
    {/* Hamburger Button */}
    <button
      onClick={toggleSidebar}
      className="xl:hidden fixed top-4 left-4 z-[1001] text-white bg-black p-2 rounded"
    >
      ☰
    </button>

    {/* Overlay for mobile */}
    {showSidebar && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-[999] xl:hidden"
        onClick={closeSidebar}
      ></div>
    )}

    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 z-[1000] h-screen bg-black text-white flex-col justify-between p-4 transition-all duration-300 ${
        showSidebar ? "flex w-[70%] sm:w-[50%] md:w-[30%]" : "hidden"
      } xl:flex xl:w-[3%] hover:xl:w-[10%]`}
    >
      {/* Top Links */}
      <div className="flex flex-col justify-center space-y-4">
        <Link to="/" className="flex items-center hover:translate-x-2">
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">HOME</span>
        </Link>
        <Link to="/shop" className="flex items-center hover:translate-x-2">
          <AiOutlineShopping className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">SHOP</span>
        </Link>
        <Link to="/cart" className="flex items-center hover:translate-x-2 relative">
          <AiOutlineShoppingCart className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">CART</span>
          {cartItems.length > 0 && (
            <span className="absolute top-5px left-4 px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
              {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
            </span>
          )}
        </Link>
     <Link
  to="/favorite"
  className="flex items-center relative hover:translate-x-2"
>
  <FaHeart className="mr-2 mt-[2rem]" size={26} />
  <span className="hidden nav-item-name mt-[1rem]">Favorite</span>

  {/* Favorite count badge */}
  <div className="absolute top-[0.5rem] left-1">
    <FavoriteCount />
  </div>
</Link>

      </div>

      {/* Bottom - Auth/Profile */}
      <div className="relative mt-auto">
        {userInfo ? (
          <>
            <button
              onClick={toggleDropdown}
              className="flex items-center focus:outline-none"
            >
              <span className="text-white">{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>

            {dropdownOpen && (
              <ul className="absolute left-0 bottom-12 bg-white text-gray-700 w-max p-2 rounded shadow-lg space-y-1">
                {userInfo.isAdmin && (
                  <>
                    <li><Link to="/admin/dashboard" className="block px-4 py-1 hover:bg-gray-100">Dashboard</Link></li>
                    <li><Link to="/admin/productlist" className="block px-4 py-1 hover:bg-gray-100">Products</Link></li>
                    <li><Link to="/admin/categorylist" className="block px-4 py-1 hover:bg-gray-100">Category</Link></li>
                    <li><Link to="/admin/orderlist" className="block px-4 py-1 hover:bg-gray-100">Orders</Link></li>
                    <li><Link to="/admin/userlist" className="block px-4 py-1 hover:bg-gray-100">Users</Link></li>
                  </>
                )}
                <li><Link to="/profile" className="block px-4 py-1 hover:bg-gray-100">Profile</Link></li>
                <li><Link to="/logout" onClick={logoutHandler} className="block px-4 py-1 hover:bg-gray-100">Logout</Link></li>
              </ul>
            )}
          </>
        ) : (
          <ul>
            <li>
              <Link to="/login" className="flex items-center hover:translate-x-2">
                <AiOutlineLogin className="mr-2 mt-[2rem]" size={26} />
                <span className="hidden nav-item-name mt-[2rem]">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center hover:translate-x-2">
                <AiOutlineUserAdd className="mr-2 mt-[2rem]" size={26} />
                <span className="hidden nav-item-name mt-[2rem]">Register</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  </>
);

};

export default Navigation;
