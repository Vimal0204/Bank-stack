import axios from 'axios';
import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const Login = () => {
  const Navigate=useNavigate();
  const { addToast } = useToasts();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit=async()=>{
    try {
      const res=await axios.post("http://localhost:5000/user/login",formData);
      // setbankinfo(res.data.data);
      
      if(res.data.success){
        localStorage.setItem("token",res.data.token);
        addToast(res.data.message,{appearance:"success"});
        Navigate("/");
      }
      
    } catch (error) {
      console.log(error);
      
      
    }
    
  }

  const handledirect=()=>{
    Navigate("/regsiter");
  }
  return (
    <div className="flex items-center justify-center h-screen">
    <div className="bg-white p-8 rounded shadow-md w-80">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded"
            required
          />
        </div>
        
        {/* <button
          type="button"
          onClick={handleSubmit}
          className=" bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign In
        </button> */}
         <div className='flex flex-row justify-between'>
        <button
          type="button"
          onClick={handleSubmit}
          className=" bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={handledirect}
          className=" bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        </div>
        {/* <Link
        
          // onClick={handleSubmit}
          className="  ml-14 text-xl text-black py-2 px-4  hover:bg-sky-200"
          to='/regsiter'
        >
          Login
        </Link> */}
      </form>
    </div>
  </div>
  )
}

export default Login