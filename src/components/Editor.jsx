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
  const [selectedOption, setSelectedOption] = useState("");

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
    }
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
                <label class="text-l text-gray-600">
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
                <label class="text-l text-gray-600">Description</label>
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

              <div class="mb-2">
                <label class="text-l text-gray-600">
                  Content <span class="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  class="border-2 border-gray-500 w-full h-56"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an option
              </label>

              <label class="text-l text-gray-600">
                Categories <span class="text-red-500">*</span>
              </label>
              <select
                id="countries"
                class="bg-purple-100 mt-4 mb-4 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option selected>Choose a topic</option>
                <option value="DSA & Algorithms">DSA & Algorithms</option>
                <option value="LLD">LLD</option>
                <option value="HLD">HLD</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Machine Learning">Deep Learning</option>
              </select>

              <label class="text-l mb-4 text-gray-600">
                What are the possible tags ?
              </label>

              <form onSubmit={handleKeydown}>
                <input
                  id="input2"
                  minlength="5"
                  class="mt-1 py-3 mt-4 px-5 w-full border-2 border-purple-300 rounded-2xl outline-none placeholder:text-gray-100 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-500 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-400"
                  type="text"
                  placeholder="Type something"
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={handleKeydown}
                />
              </form>

              <div class="px-2 pt-2 pb-11 mb-3 mt-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-200">
                {tags.length > 0 &&
                  tags.map((tagitr, index) => (
                    <span class="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100">
                      {tagitr.tag}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-3 hover:text-gray-300"
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
