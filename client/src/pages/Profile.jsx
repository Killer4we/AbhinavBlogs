import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout, setUser } from '../features/user/userSlice';
import {useNavigate} from 'react-router-dom';
const UserProfile = () => {
  // Access from global state (Redux example)
  const user = useSelector((state) => state.user.currentUser); // Update key path to match your store
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // Local state for editing
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
  });
  console.log(formData);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    setEditable(true);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your profile?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/user/delete/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        toast.success("User Deleted successfully");
        dispatch(logout());
        navigate('/'); 
      } else {
        const err = await res.json();
        alert(`Delete failed: ${err.message}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting.');
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Profile</h2>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-600 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full mt-1 p-3 border border-gray-300 rounded-lg ${editable ? 'bg-white' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editable}
            className={`w-full mt-1 p-3 border border-gray-300 rounded-lg ${editable ? 'bg-white' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>

        <div className="flex justify-center mt-6">
        

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl shadow"
          >
            Delete
          </button>
        </div>

    
      </form>
    </div>
  );
};

export default UserProfile;
