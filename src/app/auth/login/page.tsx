"use client";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="flex flex-col w-full min-h-screen h-fit bg-base-100 ">
      <div className="md:w-2/3 rounded-3xl flex flex-col bg-base-300 mx-auto md:py-24 gap-10 my-auto py-44">
        <div className="mx-auto w-2/3 flex flex-col gap-3">
          <h1 className="mx-auto w-fit text-5xl text-white font-heading1">
            Log In
          </h1>
        </div>

        {/* form  */}
        <LoginForm />

        {/* sign up instead  */}
        <div className="mx-auto text-xs flex flex-col gap-5 text-white/40 text-center items-center md:w-2/3 w-full">
          <div>{"don't have an account?"}</div>
          <div className="flex flex-row gap-5">
            <Link
              href={"/auth/signup"}
              className="du-btn-secondary du-btn rounded-full py-1"
            >
              Sign Up
            </Link>
            <Link
              href={"/auth/signup/designer"}
              className="du-btn-secondary du-btn rounded-full py-1"
            >
              Sign Up As a Designer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
