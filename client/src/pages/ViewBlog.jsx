import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.currentUser); // Get logged-in user

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`https://blogbrew.onrender.com/blog/getBlog/${id}`);
        const data = await res.json();
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`https://blogbrew.onrender.com/blog/deleteBlog/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`, // Assuming JWT auth
        },
      });

      if (res.ok) {
        toast.success('Blog deleted');
        navigate('/');
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
        Loading blog...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <p>By <span className="font-semibold">{blog.author || 'Anonymous'}</span></p>
        <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
        {blog.description}
      </div>

      {/* Show Edit/Delete buttons if logged-in user is the author */}
      {user && blog.author === user.username && (
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/update-blog/${blog._id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewBlog;
