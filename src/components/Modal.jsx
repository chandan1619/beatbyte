import React, {useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API_BASE_URL from "../config";

const Modal = ({ onClose, onSubmit }) => {
    const [categoryName, setCategoryName] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (categoryName.trim() !== "") {
          try {
            const response = await axios.post(`${API_BASE_URL}/category`, {
              name: categoryName,
            });
            toast.success(response.data.message);
            onSubmit(categoryName); // Call the onSubmit function passed from the parent component
          } catch (error) {
            if (error.response && error.response.status === 401) {
              toast.error(error.response.data.detail);
            } else {
              toast.error("Something went wrong");
            }
          }
        } else {
          toast.error("Category name cannot be empty");
        }
    }


  
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 bg-teal-400 z-100">
          <h2 className="text-lg font-bold mb-4">Add New Category</h2>
         
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="text-gray-500 mr-2 hover:text-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Add Category
              </button>
            </div>
        
        </div>
      </div>
    );
  };
  
  export default Modal