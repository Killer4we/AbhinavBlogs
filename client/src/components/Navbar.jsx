import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { useState } from "react";

export default function Navbar() {
  const [searchTerm,setSearchTerm] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

//  const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim() !== "") {
//       navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       setSearchTerm(""); // optional: clear search bar
//     }
//   };
  // console.log("The username is ",user.username);
  // console.log(user);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Section 1: Site Name */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            <Link to="/">AbhinavBlogs</Link>
          </div>

          {/* Section 2: Search Bar */}
          {/* <form onSubmit={handleSearch} className="flex-1 mx-4 hidden md:flex">
            <input
              type="text"
              name="search"
              placeholder="Search blogs..."
              className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form> */}

          {/* Section 3: Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
            {/* <Link to="/view-blogs" className="text-gray-700 hover:text-blue-600 font-medium">
              Blogs
            </Link> */}
            {!user ? (
              <></>
            ) : (
              <Link
                to={`/profile/${user.id}`}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Profile
              </Link>
            )}
            {!user ? (
              <></>
            ) : (
              <Link
                className="text-gray-700 hover:text-blue-600 font-medium"
                to={`/user-blogs/${user.id}`}
              >
                Your Blogs
              </Link>
            )}
            {/* Auth condition */}
            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            ) : (
              <>
                <span className="text-gray-700 font-medium">
                  Hi, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search (below navbar) */}
      {/* <form
        onSubmit={handleSearch}
        className="md:hidden px-4 py-2 bg-white border-t"
      >
        <div className="flex">
          <input
            type="text"
            name="search"
            placeholder="Search blogs..."
            className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form> */}
    </nav>
  );
}
