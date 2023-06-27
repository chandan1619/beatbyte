import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";
import { Audio } from "react-loader-spinner";

const Cards = () => {
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [matchingPosts, setMatchingPosts] = useState([]);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    console.log(`search query is ${searchQuery}`);

    setLoading(true);

    // Make a request to the backend endpoint
    const response = await axios.get(
      `${API_BASE_URL}/blogs/all/search?query=${query}`
    );
    setMatchingPosts(response.data);

    setLoading(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/blogs`);
        setBlogs(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="mx-auto justify-center items-center mt-20 max-w-2xl mb-20">
        <div class="flex items-center justify-center mt-10 ">
          <label for="voice-search" class="sr-only">
            Search
          </label>
          <div class="relative w-full">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search topics, titles, ad concepts..."
              required
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              type="button"
              class="flex absolute inset-y-0 right-0 items-center pr-3"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-6 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              class="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            Search
          </button>
        </div>

        <div className="mt-2 z-100 text-black-900 text-sm rounded-lg block w-full p-2.5">
          {searchQuery.trim().length > 1 && matchingPosts.length === 0 ? (
            <p>No matching posts found.</p>
          ) : searchQuery.trim().length > 1 ? (
            <div>
              {matchingPosts.map((post) => (
                <div className="flex justify-items-center items-center align-middle border-1 p-3 max-w-6xl">
                  <div className="container max-w-6xl py-6 rounded-lg shadow-sm dark:bg-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-400">
                        {new Date(post.date_added).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        className="py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900"
                      >
                        {post.title}
                      </a>
                    </div>
                    <div className="mt-3">
                      <a
                        rel="noopener noreferrer"
                        href="#"
                        className="text-2xl font-bold hover:underline"
                      >
                        {post.description}
                      </a>
                      <p className="mt-2 ">
                        {post.content.length > 100
                          ? post.content.substring(0, 100)
                          : post.content}{" "}
                        .....
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Link
                        to={`/blog/${post.id}`}
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Read more
                        <svg
                          class="-mr-1 ml-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                      <div>
                        <a
                          rel="noopener noreferrer"
                          href="#"
                          className="flex items-center"
                        >
                          <img
                            src="https://source.unsplash.com/50x50/?portrait"
                            alt="avatar"
                            className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500"
                          />
                          <span className="hover:underline dark:text-gray-400">
                            {}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 mx-5">
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
        {blogs.map((blog, index) => (
          <Card blog={blog} />
        ))}

        <nav aria-label="Page navigation example">
          <ul class="inline-flex items-center -space-x-px">
            <li>
              <a
                href="#"
                class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Previous</span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span class="sr-only">Next</span>
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Cards;
