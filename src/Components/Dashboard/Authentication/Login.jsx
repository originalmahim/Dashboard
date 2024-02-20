import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { WholewebsiteContex } from "./AuthProvider";

const Login = () => {
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { Login } = useContext(WholewebsiteContex);
  
  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError('');
    Login(email, password)
      .then(() => {
        Swal.fire(
          'Logged In',
          'You have logged in successfully',
          'success'
        );
        navigate(location?.state ? location.state : '/dashboard');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center py-6"
    style={{
      backgroundImage: "url('https://play.tailwindcss.com/img/beams.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}>
 <div className="relative bg-white px-4 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 mx-auto max-w-lg rounded-lg sm:px-10">
   <div className="mx-auto max-w-md">
     <img src="https://i.ibb.co/9ZZJMGw/Yellow-and-Black-Modern-Streaming-Platform-Logo-6.png" className="w-40 mx-auto" alt="logo" />
     <div className="divide-y divide-gray-300/50 text-base leading-7 text-gray-600">
       <div className="w-full">
         <h2 className="my-2 text-center text-lg font-semibold text-black">
           Hi Admin. Please Login
         </h2>

         <form onSubmit={handleSubmit}>
           <div className="mb-1 ">
             <label htmlFor="email" className="mb-2.5 block font-medium text-black">
               Email
             </label>
             <div className="relative">
               <input id="email" type="email" placeholder="Enter your email" className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow" />
             </div>
           </div>

           <div className="mb-4">
             <label htmlFor="password" className="mb-2.5 block font-medium text-black">
               Password
             </label>
             <div className="relative">
               <input id="password" type="password" placeholder="enter your password" className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow" />
             </div>
           </div>

           <div className="mb-0">
             <input type="submit" value="Log In" className="w-full cursor-pointer rounded-lg border border-primary bg-pink-400 p-2 text-white transition hover:bg-opacity-90" />
           </div>
         </form>
         <p className="text-center text-lg text-red-400 mt-1">{error ? error : ''}</p>
       </div>
       <div className="pt-4 text-base font-semibold ">
         <p className="text-black">Not Andalib Admin?</p>
         <p>
           <a href="https://google.com/" className="text-sky-500 hover:text-sky-600">Then Get Out From Here &rarr;</a>
         </p>
       </div>
     </div>
   </div>
 </div>
</div>

        
  );
};

export default Login;
