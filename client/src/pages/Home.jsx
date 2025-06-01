import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user.currentUser);
  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/blog/getBlogs"); // adjust if your endpoint differs
        const data = await res.json();
        // console.log(data);
        setBlogs(data.data); // handle depending on your API structure
      } catch (err) {
        // console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);
   const filteredBlogs = blogs.filter((blog) => {
  const query = searchQuery.toLowerCase();
  return (
    blog.title.toLowerCase().includes(query) ||
    blog.author?.toLowerCase().includes(query) ||
    blog.description.toLowerCase().includes(query)
  );
});

  function handleUserClick(){
    if(user){
      navigate('/create-blog');
    }
    else{
      toast.error("Please login to create a blog");
      navigate('/login');
    }
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-blue-50 p-8 rounded-2xl shadow-md text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Abhinav Blogs
        </h1>
        <p className="text-gray-600 mb-6">
          Share your stories, thoughts, and experiences with the world.
        </p>
        <button
          onClick={handleUserClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
        >
          Create Blog
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs by title..."
          className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
  <p className="text-gray-500 text-center col-span-full">No blogs found.</p>
) : (
  filteredBlogs.map((blog) => (
    <Link to={`/view-blog/${blog._id}`} key={blog._id}>
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
        <div className="text-sm text-gray-400">
          By {blog.author || "Anonymous"}
        </div>
      </div>
    </Link>
  ))
)}

      </div>
    </div>
  );
};

export default Home;
