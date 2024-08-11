import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosRequestConfig } from "axios";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const redirectToLoginWithDelay = () => {
    setTimeout(() => {
      router.push("./login");
    }, 3000); // Delay for 2 seconds (2000 milliseconds)
  };

  const toastify = (message: string, res: string) => {
    toast({
      title: message,
      description: res,
    });
  };

  const onSubmit = async (data: any) => {
    const apiUrl = "http://localhost:8080/api/user/login";
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": "token",
    };
    const requestBody = {
      email: data.email,
      password: data.password,
    };
    const payload: AxiosRequestConfig = {
      method: "post",
      headers,
      url: apiUrl,
      data: requestBody,
    };
    try {
      let response = await axios(payload);

      if (response.status == 200) {
        toastify(response.statusText, response.status ? "true" : "false");
        // loading bar
        redirectToLoginWithDelay();
      } else {
        console.error("API call failed with status:", response.status);
        return null;
      }
    } catch (error) {
      console.error("An error occurred while making the API call:", error);
      return null;
    }
    // Handle form submission
    console.log(data);
  };
  const handleGoogleAuth = async () => {
    const apiUrl = "http://localhost:8080/api/auth/google";

    window.open(apiUrl, "_self");

    // if (authWindow) {
    //   // Polling to check if the window is closed
    //   const checkClosed = async () => {
    //     if (authWindow.closed) {
    //       console.log("Authentication window closed");
    //       // After the window is closed, fetch user data
    //       await fetchUser();
    //     } else {
    //       // Continue polling until the window is closed
    //       setTimeout(checkClosed, 1000);
    //     }
    //   };

    //   // Start polling
    //   checkClosed();
    // }

    // console.log("hereWindow", newWindow);

    // if (newWindow) {
    //   timer = setInterval(async () => {
    //     if (newWindow.closed) {
    //       console.log("we are authenticated");
    //       await fetchUser();
    //       if (timer) clearInterval(timer);
    //     }
    //   }, 2500);
    // }
  };

  return (
    <div className="w-full h-full  flex flex-col justify-center mx-auto">
      <div className="px-6 py-4 md:w-[500px] flex flex-col mx-auto ">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* Email */}
          <div className="flex flex-col gap-0.5">
            <Input
              {...register("email", { required: "Email is required" })}
              className="w-full text-white h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none border-b-2 border-white/70 focus:border-none outline-none placeholder:text-white/70"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                <span className="font-bold italic mr-1">!</span>
                {errors.email.message as string}
              </p>
            )}
          </div>
          {/* password */}
          <div className="flex flex-col gap-0.5">
            <Input
              {...register("password", { required: "password is required" })}
              className="w-full h-8 text-white placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-none border-b-2 border-white/70 focus:border-none outline-none placeholder:text-white/70"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                <span className="font-bold italic mr-1">!</span>
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center w-full">
            <button
              type="submit"
              className="rounded-full px-10 du-btn du-btn-secondary py-1 bg-black/60"
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleGoogleAuth}
              className="rounded-full du-btn-secondary du-btn py-0 bg-black/60"
            >
              <span className="text-2xl ">
                <FcGoogle />
              </span>
              <span>Continue with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
