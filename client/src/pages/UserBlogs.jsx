import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserBlogs = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/blog/getBlogs`);
        const data = await res.json();
        const filteredBlogs = data.data.filter(
          (blog) => blog.author === user.username
        );
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [user.username]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Blogs
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : blogs.length === 0 ? (
        <div>
          <p className="text-center text-gray-500 text-lg">No blogs found.</p>
          <Link to='/create-blog'><button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl mt-3">Create Blog</button></Link>
          </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link to={`/view-blog/${blog._id}`} key={blog._id}>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <div className="text-sm text-gray-500">
                  By <span className="font-medium">{blog.author || "Anonymous"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
