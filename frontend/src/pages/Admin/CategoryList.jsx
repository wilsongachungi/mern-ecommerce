import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoryQuery,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

const CategoryList = () => {
  const { data: categories } = useFetchCategoryQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");
    try {
      const result = await createCategory({ name }).unwrap();
      toast.success(`${result.name} is created.`);
      setName("");
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatingName) return toast.error("Category name is required");
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      toast.success(`${result.name} is deleted`);
      setSelectedCategory(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again");
    }
  };

  return (
    <div className="flex">
      <AdminMenu />
      <div className="flex flex-col items-center justify-center w-full px-4 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Categories</h2>

        <div className="w-full max-w-md bg-white p-4 rounded shadow mb-8">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>

        <div className="w-full max-w-4xl">
          <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Available Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories?.map((category) => (
              <button
                key={category._id}
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded hover:bg-pink-500 hover:text-white transition"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
