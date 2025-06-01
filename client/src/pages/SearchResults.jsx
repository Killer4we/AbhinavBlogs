// SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const SearchResults = () => {
  const queryParams = useQuery(); // 👈 get URLSearchParams instance
  const query = queryParams.get("q") || ""; // 👈 extract 'q' param

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://blogbrew.onrender.com/blog/getBlogs");
        const data = await res.json();

        // Make sure data.data exists and is an array
        const filtered = (data.data || []).filter((blog) =>
          blog.title.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-blue-600">"{query}"</span>
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500">No matching blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((blog) => (
            <Link to={`/view-blog/${blog._id}`} key={blog._id}>
              <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.description}
                </p>
                <div className="text-sm text-gray-400">By {blog.author}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
