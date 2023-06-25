import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthContext";
import API_BASE_URL from "../config";
import Modal from './Modal'

const Editor = () => {

  const [showModal, setShowModal] = useState(false);
  const { state } = useContext(AuthContext);

  const { id } = useParams();

  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const [categories, setCategories] = useState([])

  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");


  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.target.value.trim();
      if (newTag !== "") {
        setTags((prevTags) => [...prevTags, { id: tags.length, tag: newTag }]);
        event.target.value = ""; // Clear the input field
      }

    }
  };

  const submitHandler = async (e) => {
    if (e.key !== "Enter") {
      e.preventDefault();

      

      try {
        let response = "";

        if (id) {
          console.log("inside updating post");

          let payload = {
            title: title,
            description: description,
            content: content,
            category: selectedOption,
            tags : tags.map((tagObj) => tagObj.tag).join(',')
          };

          console.log(payload)

          const response_update = await axios.put(
            `${API_BASE_URL}/blogs/${id}`,
            payload
          );

          toast.success("post updated successfully");

          console.log(response_update);
        } else {
          console.log("inside creating new post");
          const payload = {
            title: title,
            description: description,
            content: content,
            author_id: state.user.id,
            category: selectedOption,
            tags : tags.map((tagObj) => tagObj.tag).join(",")
          }
          console.log(payload)
          const response_create = await axios.post(`${API_BASE_URL}/blogs`, payload);

          console.log(response_create);

          toast.success("post created successfully");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }

      setIsSubmit(true);
    }
  };

  useEffect(()=>{

    const fetchoptions = async ()=>{
      const response = await axios.get(`${API_BASE_URL}/categories`)
      setCategories(response.data)
    }

    fetchoptions()

  }, [])

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



  const handleCategorySelect = (e) => {
    const value = e.target.value;
    if (value === 'addCategory') {
      setShowModal(true);
    } else {
      setSelectedOption(value);
    }
  };

  const handleAddCategory =  async(categoryName) => {
    // Perform your logic to add the new category to the backend or state
    setSelectedOption(categoryName);
    setShowModal(false);

    const response = await axios.get(`${API_BASE_URL}/categories`)

    setCategories(response.data)
  };

  if (isSubmit) {
    navigate("/");
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form method="POST" action="action.php">
              <div className="mb-4 gap-6">
                <label className="text-l text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="title"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="text-l text-gray-600">Description</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="description"
                  id="description"
                  placeholder="(Optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="text-l text-gray-600">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  className="border-2 border-gray-500 w-full h-56"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <label
                for="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>

              <label className="text-l text-gray-600">
                Categories <span className="text-red-500">*</span>
              </label>
              <select
                id="countries"
                className="bg-purple-100 mt-4 mb-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedOption}
                onChange={handleCategorySelect}
              >
                <option selected>Choose a topic</option>
                {categories.map((item)=>(
                    <option value={item.id}>{item.name}</option>
                ))}

                <option value="addCategory">add new category</option>

             
                
                
              </select>

              {showModal && (
                <Modal onClose={() => setShowModal(false)} onSubmit={handleAddCategory} />
                )}

              <label className="text-l mb-4 text-gray-900">
                What are the possible tags ?
              </label>

              <form onSubmit={handleKeydown}>
                <input
                  id="input2"
                  minLength="5"
                  className="mt-1 py-3 mt-4 px-5 w-full border-2 border-purple-300 rounded-2xl outline-none placeholder:text-gray-900 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-400"
                  type="text"
                  placeholder="Type something"
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleKeydown}
                />
              </form>

              <div className="px-2 pt-2 pb-11 mb-3 mt-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-200">
                {tags.length > 0 &&
                  tags.map((tagitr, index) => (
                    <span className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                      {tagitr.tag}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-3 hover:text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        onClick={(e) =>
                          setTags((prevTags) =>
                            prevTags.filter((tag) => tag.id !== tagitr.id)
                          )
                        }
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  ))}
              </div>

              <div className="flex p-1">
                <select
                  className="border-2 border-gray-300 border-r p-2"
                  name="action"
                >
                  <option>Save and Publish</option>
                  <option>Save Draft</option>
                </select>
                <button
                  role="submit"
                  className="p-3 bg-blue-500 text-white hover:bg-blue-400"
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
