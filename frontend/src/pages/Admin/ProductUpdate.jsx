import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useGetNewProductsQuery, useGetProductbyIdQuery, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoryQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
    const params = useParams()

    const {data: productData} = useGetProductbyIdQuery(params._id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.stock || "")

    const navigate = useNavigate()

    const {data: categories  = []} = useFetchCategoryQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if(productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category)
            setBrand(productData.brand)
            setQuantity(productData.quantity)
        }
    },[productData])

   


        const handleSubmit = async (e) => {
    e.preventDefault()

       try {
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('brand', brand)
        formData.append('quantity', quantity)
        formData.append('countInStock', stock)

        const {data} = await updateProduct({productId: params._id, formData})

        if(data.error) {
            toast.error(data.error)
        }else{
            toast.success("Product Successfully Updated")
            navigate("/admin/allproductlist")
        }

    } catch (error) {
        console.error(error);
        toast.error("Product Update failed. Try Again.")
    }
        
    };

     const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
      try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Item added successfully");
    }
  };

   const handleDelete = async () => {
      try {
        let answer = window.confirm("Are you sure you want to delete this product?")
        if(!answer) return;

        
          const {data} = await deleteProduct(params._id)
          toast.success(`${data.name} is deleted`)
          navigate('/admin/allproductlist')
        
      } catch (error) {
        console.log(error)
        toast.error("Delete failed. try again")
      }
    }

    return  <div className="container mx-auto px-4 py-8">
    <div className="flex justify-center">
      <AdminMenu/>
      <div className="w-full max-w-4xl p-6 bg-[#0f0f0f] rounded-lg">
        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create Product
        </h2>

        {image && (
          <div className="text-center mb-4">
            <img
              src={image}
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
        <div>
        <button onClick={handleSubmit}  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6">Update</button>
        <button onClick={handleDelete} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600">Delete</button>
        </div>
        
      </div>
    </div>
  </div>
}

export default ProductUpdate;