import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthContext";
import API_BASE_URL from "../config";

const Editor = () => {
  const { state } = useContext(AuthContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      let response = "";

      if (id) {
        console.log("inside updating post");

        let payload = {
          title: title,
          description: description,
          content: content,
        };

        const response_update = await axios.put(
          `${API_BASE_URL}/blogs/${id}`,
          payload
        );

        toast.success("post updated successfully");

        console.log(response_update);
      } else {
        console.log("inside creating new post");
        const response_create = await axios.post(`${API_BASE_URL}/blogs`, {
          title: title,
          description: description,
          content: content,
          author_id: state.user.id,
        });

        console.log(response_create);

        toast.success("post created successfully");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsSubmit(true);
  };

  useEffect(() => {
    const fetchpost = async () => {
      const post = await axios.get(`${API_BASE_URL}/blogs/${id}`);

      setPost(post.data);

      setTitle(post.data.title);
      setDescription(post.data.description);
      setContent(post.data.content);
      setImageURL(post.data.image);

      console.log(title, description, content);
    };

    if (id) fetchpost();
  }, [id]);

  if (isSubmit) {
    navigate("/");
  }

  return (
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white border-b border-gray-200">
            <form method="POST" action="action.php">
              <div class="mb-4 gap-6">
                <label class="text-xl text-gray-600">
                  Title <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  class="border-2 border-gray-300 p-2 w-full"
                  name="title"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div class="mb-4">
                <label class="text-xl text-gray-600">Description</label>
                <input
                  type="text"
                  class="border-2 border-gray-300 p-2 w-full"
                  name="description"
                  id="description"
                  placeholder="(Optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div class="mb-8">
                <label class="text-xl text-gray-600">
                  Content <span class="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  class="border-2 border-gray-500 w-full h-56"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <div class="flex p-1">
                <select
                  class="border-2 border-gray-300 border-r p-2"
                  name="action"
                >
                  <option>Save and Publish</option>
                  <option>Save Draft</option>
                </select>
                <button
                  role="submit"
                  class="p-3 bg-blue-500 text-white hover:bg-blue-400"
                  required
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
