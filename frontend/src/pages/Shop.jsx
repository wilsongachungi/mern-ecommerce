import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/loader";
import { useFetchCategoryQuery } from "../redux/api/categoryApiSlice";
import ProductCard from "./Products/ProductCard";
import TopBanner from "../components/topBanner";
import shopnasiLogo from "../assets/shopnasilogo.png"

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoryQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data?.filter(
          (product) =>
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
        );
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <div className="md:hidden flex justify-end px-4 pt-4">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {mobileFilterOpen ? "Close Filters" : "Open Filters"}
        </button>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Desktop Sidebar */}
          <div className="hidden md:block bg-[#151515]">
            <div className="p-5 w-[15rem]">
              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
                Filter by Category
              </h2>
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-2 text-sm text-white"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white mt-4">
                Filter by Brand
              </h2>
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600"
                  />
                  <label className="ml-2 text-sm text-white">{brand}</label>
                </div>
              ))}

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white mt-4">
                Filter by Price
              </h2>
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <button
                className="w-full border text-white py-2 bg-pink-600"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="block md:hidden bg-[#151515] p-4 rounded-lg">
              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white">
                Filter by Category
              </h2>
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`mobile-category-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`mobile-category-${c._id}`}
                      className="ml-2 text-sm text-white"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white mt-4">
                Filter by Brand
              </h2>
              {uniqueBrands?.map((brand) => (
                <div key={brand} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600"
                  />
                  <label className="ml-2 text-sm text-white">{brand}</label>
                </div>
              ))}

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 text-white mt-4">
                Filter by Price
              </h2>
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border rounded mb-4"
              />
              <button
                className="w-full border text-white py-2 bg-pink-600"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          )}
          
          {/* Products List */}
          <div className="p-3 w-full">
            {/* Top Banner */}
          <TopBanner
            messages={[
              "🔥 Summer Sale! Get 20% off sitewide.",
              "🚀 New arrivals every week — shop now before they're gone!",
              "💥 Big brands, small prices — grab your deals today!",
              "✨ Upgrade your life without breaking the bank!",
              "📦 Fast delivery, straight to your doorstep!",
              "🛍️ Your cart called — it wants these deals now!",
              "🎁 Special offers just for you — don’t miss out!",
              "💎 Quality products at prices you’ll love!",
              "⚡ Limited-time deals — shop smarter, save bigger!",
            ]}
            logo={shopnasiLogo}
            phone="0791193343"
            email="jumuika.co.ke"
            bgColor="bg-pink-700"
            textColor="text-white"
            interval={6000}
          />

          {/* Company care paragraph */}
          <div className="bg-gray-100 text-gray-800 py-6 px-8 text-center">
            <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              At{" "}
              <span className="font-bold text-pink-600">
                Shop<span class="text-pink-900">Nasi</span>
              </span>
              , we go beyond selling products. Our mission is to give you a
              stress-free shopping experience with quality items, fast delivery,
              and warm customer service — because we truly care about you.
            </p>
          </div>

            <h2 className="h4 text-center mb-4 text-white">
              {products?.length} Products
            </h2>
            <div className="flex flex-wrap justify-center">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
