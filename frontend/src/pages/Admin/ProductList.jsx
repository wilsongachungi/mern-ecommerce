import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import asyncHandler from "../../../../Backend/middleware/asyncHandler";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoryQuery();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const productData = new FormData()
        productData.append('image', image)
        productData.append('name', name)
        productData.append('description', description)
        productData.append('price', price)
        productData.append('category', category)
        productData.append('brand', brand)
        productData.append('quantity', quantity)
        productData.append('countInStock', stock)

        const {data} = await createProduct(productData)

        if(data.error) {
            toast.error("Product created failed. Try Again.")
        }else{
            toast.success(`${data.name} is created`)
            navigate("/")
        }

    } catch (error) {
        console.log(error);
        toast.error("Product created failed. Try Again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center">
        <AdminMenu/>
        <div className="w-full max-w-4xl p-6 bg-[#0f0f0f] rounded-lg">
          <h2 className="text-white text-2xl font-semibold mb-6 text-center">
            Create Product
          </h2>

          {imageUrl && (
            <div className="text-center mb-4">
              <img
                src={imageUrl}
                alt="product"
                className="mx-auto max-h-[200px] rounded"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="border text-white px-4 py-10 block w-full text-center rounded-lg cursor-pointer font-bold bg-[#101011]">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="name" className="text-white block mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label htmlFor="price" className="text-white block mb-1">
                Price
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1">
              <label htmlFor="quantity" className="text-white block mb-1">
                Quantity
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label htmlFor="brand" className="text-white block mb-1">
                Brand
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-white block mb-1">Description</label>
            <textarea
              className="w-full p-3 bg-[#101011] rounded-lg text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1">
              <label className="text-white block mb-1">Count In Stock</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <label className="text-white block mb-1">Category</label>
              <select
                className="w-full p-3 border rounded-lg bg-[#101011] text-white"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option className="text-white" key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
