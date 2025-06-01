import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/blog/getBlog/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBlog();
  }, [id]); //yeh pehli baar chalega bas

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill out all fields");
      return;
    }

    console.log(formData);

    try {
      const res = await fetch(`/blog/updateBlog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog updated Successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update your blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-600 font-medium mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-600 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={8}
            placeholder="Write your blog content..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
