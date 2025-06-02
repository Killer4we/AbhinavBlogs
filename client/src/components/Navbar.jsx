import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/user/userSlice";
import { useState } from "react";
import {Menu,X} from 'lucide-react';

export default function Navbar() {
  const [menuOpen,setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            <Link to="/">BlogBrew</Link>
          </div>

          {/* Hamburger menu (mobile only) */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Links (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>

            {user && (
              <>
                <Link
                  to={`/profile/${user.id}`}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Profile
                </Link>
                <Link
                  to={`/user-blogs/${user.id}`}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Your Blogs
                </Link>
              </>
            )}

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

        {/* Links (mobile dropdown) */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>

            {user && (
              <>
                <Link
                  to={`/profile/${user.id}`}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Profile
                </Link>
                <Link
                  to={`/user-blogs/${user.id}`}
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Your Blogs
                </Link>
              </>
            )}

            {!user ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
              >
                Login
              </Link>
            ) : (
              <>
                <span className="text-gray-700 font-medium text-center">
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
        )}
      </div>
    </nav>
  );
}
