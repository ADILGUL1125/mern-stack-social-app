import React from "react";
import { assets } from "../assets/assets/assets";
import { Star } from "lucide-react";
import {SignIn,useAuth} from "@clerk/clerk-react"
import Loading from "../components/loading";
const Login = () => {
  // const {isLoaded}=useAuth()
  return (
    <div className=" flex flex-col md:flex-row min-h-screen">
      {/* background image */}
      <img
        src={assets.bgImage}
        className="h-full w-full object-cover absolute top-0 left-0 -z-1"
      />
      {/* branding */}
      <div className=" flex flex-1 flex-col items-start justify-between p-6 md:p-10 ">
        <img src={assets.logo} alt="" className="h-12 object-contain" />
        <div className="flex flex-col items-start  gap-3 mb-4  ">
          <img src={assets.group_users} alt="" className="h-8 md:h-10" />
          <div>
            <div className="flex">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 md:size-4.5 text-transparent fill-amber-500"
                  />
                ))}
            </div>
            <p>Used by 12k+ developers</p>
          </div>
       <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-indigo-800 to-indigo-950 bg-clip-text text-transparent drop-shadow-lg">
  More than just friends <br />truly connect
</h1>
        <p className="text-xl md:text-3xl text-indigo-900 max-w-72 md:max-w-md">Connect with global  community on pingup</p>
        </div>
        <span className="md:h-10"></span>
      </div>
      {/* right side login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
            <SignIn/>
      </div>
    </div>
  );
};

export default Login;
