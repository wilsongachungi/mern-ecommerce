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
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleSidebar = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeSideBar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLoginMutation();

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
    <div
      style={{ zIndex: 999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[3%] hover:w-[10%] h-[100vh] fixed`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">HOME</span> {""}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">SHOP</span> {""}
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">CART</span> {""}
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[2rem]" size={26} />
          <span className="hidden nav-item-name mt-[2rem]">Favorite</span> {""}
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-8000 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdownOpen ? "transform rotate-180" : ""
              }`}
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
          )}
        </button>

        {dropdownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            }`}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    classsname="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>

      {!userInfo && (
        <ul>
          <li>
            <Link
              to="/login"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineLogin className="mr-2 mt-[2rem]" size={26} />
              <span className="hidden nav-item-name mt-[2rem]">LOGIN</span> {""}
            </Link>
            <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd className="mr-2 mt-[2rem]" size={26} />
              <span className="hidden nav-item-name mt-[2rem]">
                Register
              </span>{" "}
              {""}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
