import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUser} from '../features/user/userSlice';
import {Eye} from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await fetch('https://blogbrew.onrender.com/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    // console.log(data);
    if (data.success) {
      dispatch(setUser(data.data)); // assuming your API returns { user: { username: "..." }, success: true }
      navigate('/');
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
  }
};
  function handlePasswordChange(){
    if(showPassword===true){
      setShowPassword(false);
    }
    else{
      setShowPassword(true);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />

        <div className="relative w-full mb-6">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handlePasswordChange}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
          >
            <Eye size={18} />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Redirect to Signup */}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/sign-up')}
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
