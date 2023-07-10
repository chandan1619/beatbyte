import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../AuthContext";
import API_BASE_URL from "../config";
import clap from "../images/clapping.png";
import ReactMarkdown from "react-markdown";
import Card from "./Card";
import { Audio } from "react-loader-spinner";

const SinglePage = () => {
  const [like, setLike] = useState(0);

  const [loading, setLoading] = useState(false);

  const [similarpost, setSimilarpost] = useState([]);

  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

  const [commentcount, setCommentCount] = useState(0);

  const { state } = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState(false);

  const { id } = useParams();

  const [post, setPost] = useState("");

  const navigate = useNavigate();

  let timeoutRef = useRef(null);

  useEffect(() => {
    if (like > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        await saveLike();
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [like])

  const saveLike = async () => {
    // Your API call logic to save the like count

    const res = await axios.post(`${API_BASE_URL}/blogs/${id}/like?increment_by=${like}`);

    console.log(res.data)
    post.likes += like

    setLike(0)

    console.log(res)


  };

  useEffect(() => {
    const fetchpost = async () => {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/blogs/${id}`);

      const similar_posts = await axios.get(
        `${API_BASE_URL}/matchingpost/${id}`
      );

      setSimilarpost(similar_posts.data);

      setPost(res.data);
      setLoading(false);

      console.log(res.data);
    };

    fetchpost();
  }, [id]);

  const commentHandler = async (event) => {
    event.preventDefault();

    // Handle the comment submission
    console.log("Post ID:", post.id, state);

    if (state.user == null) {
      toast.error("please login to comment");
      return;
    }
    // Rest of your logic...

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/post/${id}/comment`, {
        content: comment,
        user_id: state.user.id,
        blog_id: post.id,
      });

      setLoading(false);

      toast.success("your comment has been published");
      console.log(response.data);
      window.location.reload();
      window.scrollTo(0, 0);
    } catch (exe) {
      console.log(exe);
    }
  };

  useEffect(() => {
    const fetch_comments = async () => {
      const response = await axios.get(`${API_BASE_URL}/post/${id}/comment`);

      setComments(response.data);

      setCommentCount(response.data.length);

      

      console.log(`comments is ${response.data}`);
    };

    fetch_comments();
  }, []);

  const deleteHandler = async () => {
    const post = await axios.delete(`${API_BASE_URL}/blogs/${id}`);

    setIsDeleted(true);

    toast.error("Post deleted successfully");
  };

  if (isDeleted) {
    navigate("/");
  }

  const Image = ({ src, alt }) => (
    <div className="flex justify-center">
      <img
        src={src}
        alt={alt}
        style={{ maxWidth: "100%", marginBottom: "1rem" }}
      />
    </div>
  );
  const components = {
    img: Image,
  };

  

  return (
    <div class="mt-6 bg-gray-50">
      <div class="py-6 mx-auto text-sm md:px-10 md:text-md">
        <div class="max-w-6xl  bg-gray-50 md:px-10">
          <div class="flex flex-col items-start gap-1 justify-start mt-4 mb-4 ml-2 md:flex-row">
            {post.tags &&
              post.tags.map((tag) => (
                <a
                  href="#"
                  class="px-2 py-1 font-bold bg-blue-400 text-white rounded-lg hover:bg-gray-500 mr-4"
                >
                  {tag}
                </a>
              ))}
          </div>
          <div class="mt-2 p-2">
            <a
              href="#"
              class="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black-500  hover:underline"
            >
              {post.title}
            </a>

            {/* <div class="flex justify-start items-center mt-2">
              <p class="text-sm text-green-500 font-bold bg-gray-100 rounded-full py-2 px-2 hover:text-red-500">
                3000
              </p>
              <p class="text-sm text-gray-400 font-bold ml-5">2 min read</p>
            </div> */}

            <div class="font-light text-gray-600 flex items-center justify-between">
              <a href="#" class="self-start flex items-center mt-6 mb-6">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                  alt="avatar"
                  class="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                />
                <div>
                  <p className="">
                    {post.name && (
                      <h1 class="font-bold text-gray-700 hover:underline">
                        {post.name[0].toUpperCase() + post.name.substring(1)}
                      </h1>
                    )}
                  </p>
                  <div className="flex flex-row">
                    <p>
                      Published on{" "}
                      {new Date(post.date_added).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      ,
                    </p>
                    <p class="text-sm text-gray-900 ml-2"> 2 min read</p>
                  </div>
                </div>
              </a>

              <div className="flex float-right gap-3 px-4">
                {state.isLoggedIn && state.user.id === post.author_id ? (
                  <>
                    <Link to={`/blog/${id}/edit`}>
                      {" "}
                      <BorderColorSharpIcon className="self-end hover:bg-green-100 cursor-pointer" />{" "}
                    </Link>
                    <DeleteForeverSharpIcon
                      className="self-end hover:bg-red-100 cursor-pointer"
                      onClick={deleteHandler}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div class="max-w-6xl  text-2xl text-gray-700 rounded bg-gray-10">
            <div>
              <p>
                <p class="font-bold  w-full text-gray-700">
                  {post.description}
                </p>
              </p>
            </div>

            <div className="max-w-full p-2 lg:text-md lg:p-1">
              <p class="">
                <pre className="whitespace-pre-wrap overflow-x-auto max-w-full font-serif bg-white p-4 rounded-2 text-md">
                  <div className="ml-80">
                    {loading && (
                      <Audio
                        height="80"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                      />
                    )}
                  </div>
                  <ReactMarkdown
                    components={components}
                    breaks
                    skipHtml={false}
                  >
                    {post.content}
                  </ReactMarkdown>
                </pre>
              </p>
            </div>
            <div className="flex justify-left items-center">
              <div className="flex justify-left items-center align-center mt-10">
                <svg
                  className=" hover:fill-blue-500 cursor-pointer"
                  onClick={(e) => setLike((prev) => prev + 1)}
                  height="25pt"
                  viewBox="0 0 464.30336 464"
                  width="28pt"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m404.730469 193.222656c-4.183594-8.203125-11.554688-14.332031-20.382813-16.945312-8.832031-2.617188-18.347656-1.496094-26.328125 3.105468l-9.527343 5.496094c-1.277344-4.902344-3.695313-9.433594-7.054688-13.222656-4.546875-5.097656-10.550781-8.675781-17.195312-10.25l2.867187-2.863281c13.199219-12.640625 14.191406-33.40625 2.253906-47.25-6.164062-6.875-14.886719-10.910157-24.117187-11.15625-9.234375-.246094-18.160156 3.316406-24.683594 9.855469l-16 16.039062c-3.589844-15.136719-17.097656-25.832031-32.65625-25.847656h-.046875c-8.886719-.019532-17.414063 3.519531-23.679687 9.824218l-54.886719 54.878907-.097657.097656-6.128906 6.125c-1.125-9.898437-5.75-19.074219-13.046875-25.863281-9.90625-8.933594-25.078125-8.507813-34.472656.960937l-57.765625 57.839844c-52.824219 51.285156-55.960938 135.050781-7.121094 190.144531 9.878906 10.8125 21.433594 19.964844 34.222656 27.101563 2.648438 2.824219 5.519532 5.65625 8.625 8.433593 43.789063 38.957032 107.628907 45.4375 158.351563 16.074219l133.054687-76.800781c15.992188-8.8125 22.3125-28.578125 14.402344-45.03125-3.089844-6.125-7.988281-11.152344-14.03125-14.402344l17.015625-9.816406c16.042969-8.757812 22.4375-28.539062 14.550781-45.03125-3.070312-6.09375-7.9375-11.09375-13.945312-14.328125l3.464844-2c16.03125-8.847656 22.335937-28.6875 14.359375-45.167969zm-358.246094 190.191406c-43.101563-48.777343-40.207031-122.828124 6.566406-168.09375l57.800781-57.792968c3.242188-3.457032 8.640626-3.726563 12.207032-.609375 5.167968 4.832031 8.15625 11.550781 8.28125 18.625.125 7.070312-2.625 13.894531-7.617188 18.902343h-.039062l-54.320313 54.320313c-3.125 3.128906-3.121093 8.195313.003907 11.316406 3.125 3.125 8.191406 3.121094 11.316406-.003906l54.222656-54.230469 84.480469-84.480468c3.28125-3.300782 7.742187-5.148438 12.394531-5.136719 7.128906-.015625 13.566406 4.277343 16.296875 10.867187 2.730469 6.585938 1.210937 14.171875-3.84375 19.207032l-90.375 90.429687c-2.078125 2.007813-2.914063 4.984375-2.179687 7.78125.730468 2.796875 2.914062 4.980469 5.710937 5.710937 2.796875.734376 5.773437-.101562 7.78125-2.179687l90.488281-90.480469 36.253906-36.253906c3.421876-3.4375 8.105469-5.308594 12.953126-5.175781 4.84375.128906 9.421874 2.253906 12.648437 5.871093 6.113281 7.554688 5.382813 18.542969-1.679687 25.222657l-23.074219 23.074219v.046874l-102.695313 102.597657c-2.078125 2.011719-2.914062 4.984375-2.179687 7.78125.730469 2.796875 2.914062 4.980469 5.710937 5.714843 2.800782.730469 5.773438-.101562 7.78125-2.183593l102.617188-102.613281c3.332031-3.539063 8.058594-5.425782 12.910156-5.152344 4.84375.109375 9.421875 2.230468 12.640625 5.847656 3.46875 4.03125 4.863281 9.449219 3.785156 14.65625-.148437.8125-.347656 1.613281-.601562 2.398438-.109375.34375-.222657.679687-.351563 1.015624-.222656.59375-.464844 1.167969-.734375 1.738282-.277343.546875-.582031 1.082031-.914062 1.597656-.222657.375-.429688.753906-.679688 1.113281-.648437.929688-1.378906 1.804688-2.175781 2.617188l-34.09375 34.222656-.050781.046875-67.4375 67.417969c-2.082031 2.007812-2.914063 4.980469-2.183594 7.777343.734375 2.796876 2.917969 4.984376 5.714844 5.714844 2.796875.734375 5.769531-.101562 7.78125-2.179687l67.292969-67.304688s.097656-.050781.136718-.089843c5.621094-6.097657 14.867188-7.140626 21.703125-2.445313.386719.238281.800781.414063 1.160157.6875.359374.269531.761718.703125 1.152343 1.046875.535157.4375 1.042969.902344 1.527344 1.390625.035156.054687.074219.105469.113281.152344 1.40625 1.722656 2.488282 3.679687 3.199219 5.785156.449219 1.484375.691406 3.019531.730469 4.566406v.890625c-.050782 3.148438-.847656 6.242188-2.320313 9.023438-.175781.335937-.359375.671875-.5625 1.007812-.746093 1.257813-1.632812 2.429688-2.648437 3.488282-.085938.09375-.148438.207031-.246094.304687l-108.640625 108.636719c-2.398437 2.402344-4.800781 4.601562-7.328125 6.738281-34.050781 28.8125-81.265625 36.382813-122.617188 19.65625-2.910156-1.183594-5.792968-2.488281-8.644531-3.914063-13.257812-6.648437-25.167969-15.699218-35.128906-26.6875zm314.398437-28.269531-133.039062 76.796875c-33.105469 19.179688-73.382812 21.394532-108.390625 5.960938 9.957031 1.199218 20.019531 1.257812 29.992187.167968.796876-.078124 1.542969-.246093 2.328126-.335937 4-.488281 7.902343-1.113281 11.8125-1.945313 1.386718-.285156 2.738281-.679687 4.113281-1.015624 3.289062-.796876 6.542969-1.695313 9.769531-2.75 1.535156-.496094 3.039062-1.054688 4.558594-1.601563 3.03125-1.109375 6.015625-2.320313 8.96875-3.648437 1.527344-.6875 3.046875-1.382813 4.558594-2.132813 2.898437-1.433594 5.730468-3 8.535156-4.648437 1.433594-.800782 2.882812-1.648438 4.289062-2.554688 2.886719-1.839844 5.671875-3.847656 8.433594-5.925781 1.207031-.898438 2.445312-1.730469 3.632812-2.671875 3.460938-2.785156 6.804688-5.761719 10.03125-8.929688.359376-.34375.75-.625 1.101563-.976562l26.296875-26.300782h.089844c1.402344-.003906 2.78125-.371093 4-1.074218l82.558594-47.671875.089843-.070313c4.199219-2.375 9.1875-2.921875 13.804688-1.523437 4.617187 1.402343 8.457031 4.632812 10.632812 8.9375 3.945313 8.878906.394531 19.292969-8.152343 23.914062zm17.441407-69.28125-41.839844 24.160157c-.046875 0-.074219.078124-.121094.101562l-37.785156 21.84375 41.679687-41.683594c1.421876-1.445312 2.714844-3.015625 3.867188-4.6875.375-.527344.703125-1.054687 1.046875-1.597656.683594-1.089844 1.308594-2.214844 1.871094-3.367188.359375-.730468.746093-1.441406 1.046875-2.1875 1-2.53125 1.722656-5.164062 2.152344-7.855468.128906-.800782.257812-1.542969.328124-2.320313.105469-1.0625.152344-2.117187.152344-3.199219 0-.800781-.054687-1.597656-.109375-2.398437 0-.457031 0-.90625-.058593-1.351563l11.488281-6.640624c4.1875-2.417969 9.183593-3.007813 13.820312-1.636719 4.636719 1.367187 8.507813 4.582031 10.707031 8.882812 3.925782 8.90625.339844 19.332031-8.230468 23.9375zm4-61.359375-28.28125 16.34375-9.269531 5.351563c-.703126-1.085938-1.464844-2.132813-2.289063-3.128907-1.050781-1.136718-2.171875-2.207031-3.359375-3.199218-.128906-.105469-.234375-.238282-.363281-.34375-.671875-.550782-1.40625-.992188-2.117188-1.488282-.714843-.496093-1.3125-1-2.015625-1.425781-2.894531-1.714843-6.03125-2.984375-9.304687-3.757812l13.953125-13.945313c1.339844-1.398437 2.570312-2.902344 3.679687-4.496094.429688-.597656.796875-1.199218 1.214844-1.816406.582031-.925781 1.09375-1.878906 1.601563-2.847656.90625-1.769531 1.664062-3.613281 2.261718-5.511719.082032-.238281.183594-.464843.257813-.703125l17.757812-10.257812c4.183594-2.410156 9.171875-3 13.800781-1.625 4.628907 1.371094 8.492188 4.585937 10.679688 8.890625 3.917969 8.898437.359375 19.316406-8.183594 23.960937zm0 0" />
                  <path d="m398.523438 89.703125c3.125 3.121094 8.1875 3.121094 11.3125 0l52-52c2.078124-2.007813 2.914062-4.984375 2.179687-7.78125-.730469-2.796875-2.914063-4.980469-5.710937-5.710937-2.796876-.734376-5.773438.101562-7.78125 2.179687l-52 52c-3.121094 3.125-3.121094 8.1875 0 11.3125zm0 0" />
                  <path d="m452.058594 89.191406-40 24c-2.503906 1.445313-4.035156 4.128906-4.003906 7.023438.035156 2.890625 1.625 5.539062 4.164062 6.925781s5.628906 1.296875 8.082031-.238281l40-24c2.503907-1.445313 4.035157-4.128906 4.003907-7.023438-.035157-2.890625-1.628907-5.539062-4.164063-6.925781-2.539063-1.386719-5.628906-1.296875-8.082031.238281zm0 0" />
                  <path d="m364.605469 87.246094c3.953125 1.976562 8.761719.371094 10.734375-3.582032l24-48c1.976562-3.957031.371094-8.761718-3.585938-10.738281-3.953125-1.972656-8.757812-.371093-10.734375 3.585938l-24 48c-1.976562 3.953125-.371093 8.761719 3.585938 10.734375zm0 0" />
                  <path d="m176.828125 67.199219c1.78125 3.996093 6.4375 5.820312 10.457031 4.09375 4.023438-1.722657 5.914063-6.355469 4.246094-10.398438l-24-56c-1.78125-3.996093-6.4375-5.820312-10.460938-4.09375-4.019531 1.722657-5.910156 6.355469-4.242187 10.398438zm0 0" />
                  <path d="m216.179688 72.046875c4.417968 0 8-3.582031 8-8v-48c0-4.417969-3.582032-8-8-8-4.417969 0-8 3.582031-8 8v48c0 4.417969 3.582031 8 8 8zm0 0" />
                  <path d="m145.929688 85.046875c2.761718 3.449219 7.800781 4.007813 11.25 1.246094 3.449218-2.757813 4.007812-7.796875 1.246093-11.246094l-32-40c-2.757812-3.449219-7.796875-4.007813-11.246093-1.246094-3.449219 2.757813-4.007813 7.796875-1.25 11.246094zm0 0" />
                </svg>
                <p className="ml-2 text-sm">{post.likes + like}</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30pt"
                  className="hover:fill-blue-500 ml-2 cursor-pointer"
                  width="30pt"
                  id="comment"
                >
                  <path
                    fill="#231F20"
                    d="M25.784 21.017A10.992 10.992 0 0 0 27 16c0-6.065-4.935-11-11-11S5 9.935 5 16s4.935 11 11 11c1.742 0 3.468-.419 5.018-1.215l4.74 1.185a.996.996 0 0 0 .949-.263 1 1 0 0 0 .263-.95l-1.186-4.74zm-2.033.11.874 3.498-3.498-.875a1.006 1.006 0 0 0-.731.098A8.99 8.99 0 0 1 16 25c-4.963 0-9-4.038-9-9s4.037-9 9-9 9 4.038 9 9a8.997 8.997 0 0 1-1.151 4.395.995.995 0 0 0-.098.732z"
                  ></path>
                </svg>
                <p className="text-sm">{commentcount}</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="text-2xl mt-4 text-gray-500 font-bold text-center">
          Related Posts
        </h2>

        <div className="flex flex-wrap flex-row gap-4">
          {similarpost &&
            similarpost.map((similar_post, index) => (
              <div className="max-w-lg mt-10">
                <Card blog={similar_post} />
              </div>
            ))}
        </div>

        <div class="max-w-4xl py-16 xl:px-8 flex justify-center mx-auto">
          <div class="w-full mt-16 md:mt-0 ">
            <form
              class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 rounded-lg shadow-2xl px-7"
              onSubmit={commentHandler}
            >
              <h3 class="mb-6 text-2xl font-medium text-center">
                Write a comment
              </h3>
              <textarea
                type="text"
                name="comment"
                class="w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none"
                placeholder="Write your comment"
                rows="5"
                cols="33"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <input
                type="submit"
                value="Submit comment"
                name="submit"
                class=" text-white px-4 py-3 bg-blue-500  rounded-lg cursor-pointer"
              />
            </form>
          </div>
        </div>

        <div class="max-w-4xl px-10 py-16 mx-auto bg-gray-100  bg-white min-w-screen animation-fade animation-delay  px-0 px-8 mx-auto sm:px-12 xl:px-5">
          <p class="mt-1 text-2xl font-bold text-left text-gray-800 sm:mx-6 sm:text-2xl md:text-3xl lg:text-4xl sm:text-center sm:mx-0">
            All comments on this post
          </p>
          {comments &&
            comments.map((comment, index) => (
              <div class="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
                <a href="#" class="flex items-center mt-6 mb-6 mr-6">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                    alt="avatar"
                    class="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                  />
                </a>

                <div>
                  <h3 class="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
                    {comment.name}
                  </h3>
                  <p class="text-sm font-bold text-gray-300">
                    {comment.date_added}
                  </p>
                  <p class="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
