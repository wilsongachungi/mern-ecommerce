import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Users/Profile.jsx";
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import UserList from "./pages/Admin/UserList.jsx";
import CategoryList from "./pages/Admin/CategoryList.jsx";
import ProductList from './pages/Admin/ProductList.jsx';
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx";
import AllProducts from "./pages/Admin/AllProducts.jsx";
import Shipping from "./pages/Orders/Shipping.jsx";
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetails from "./pages/Products/ProductsDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";

// Create the router
const router = createBrowserRouter(
  createRoutesFromElements(
    
      <Route path='/' element={<App />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route index={true} path='/' element={<Home />} />
        <Route path='/favorite' element={<Favorites />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shop' element={<Shop />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path='userlist' element={<UserList />} />
          <Route path='categorylist' element={<CategoryList />} />
          <Route path='productlist' element={<ProductList />} />
          <Route path='allproductlist' element={<AllProducts />} />
          <Route path='product/update/:_id' element={<ProductUpdate />} />
        </Route>
      </Route>
   
  )
);

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
