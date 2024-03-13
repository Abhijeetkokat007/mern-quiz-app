import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      // console.log(response.data)
      localStorage.setItem("quizappuser", JSON.stringify(response?.data));
      alert("Login Successfull !");
      navigate('/')
      // if (response?.data?.success) {
      //   localStorage.setItem('quizappuser', JSON.stringify(response?.data));
      //   window.location.href = "/";
      // }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="flex flex-wrap">
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          {/* <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-3xl font-semibold leading-10">We work 10x faster than our compeititors and stay consistant. While they're bogged won with techincal debt, we're realeasing new features.</p>
            <p className="mb-4 text-3xl font-semibold">John Elmond</p>
            <p className="">Founder, Emogue</p>
            <p className="mb-7 text-sm opacity-70">Web Design Agency</p>
          </div> */}
          <img className="-z-1 absolute top-0 h-full w-full object-cover opacity-[.5]" src="https://cdn.pixabay.com/photo/2018/01/17/07/06/laptop-3087585_640.jpg" />
        </div>
        <div className="flex w-full  flex-col md:w-1/2">
          <div className="flex ">
            <a href="/" className=" m-3   mb-3 btn btn-primary rounded-2xl border  text-indigo-600 border-indigo-600 hover:text-gray-100 hover:bg-indigo-600 p-2 ">Back Home  </a>
          </div>
          <div className="lg:w-[28rem] mx-auto sign-res my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p className="text-left text-3xl font-bold">Welcome To Our,  <span className='text-indigo-600'> ZERO TO HERO</span></p>
            <p className="mt-2 text-left text-gray-500">Welcome back, please enter your details.</p>

            <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">SignUp</div>
            </div>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input type="Email" id="login-email" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="UserName" required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                  <input type="password" id="login-password" className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password" required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="w-full hover:bg-indigo-500 rounded-lg bg-indigo-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"> Login</button>
            </form>
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600">
                Create A New Account 
                <a href="Signup" className="underline-offset-4 font-semibold text-gray-900 underline"> Signup Now</a>
              </p>
            </div>
          </div>
        </div>
        
      </div>

    </div>
  )
}

export default Login
