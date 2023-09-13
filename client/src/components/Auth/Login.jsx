import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import {
  BiLogoJavascript,
  BiLogoJava,
  BiLogoNodejs,
  BiLogoPhp,
  BiLogoReact,
  BiLogoAngular,
  BiLogoGoLang,
  BiLogoPython,
  BiLogoPostgresql,
} from "react-icons/bi";

const Login = () => {
  return (
    <div className="grow flex flex-col-reverse md:flex-row">
      {/* Login */}
      <div className="flex flex-col gap-8 md:grow-0 grow px-10 py-6">
        <div className="flex flex-col gap-8">
          <h2 className="text-3xl font-normal">
            Log in to your account
          </h2>
        </div>
        <div className="flex flex-col gap-1 text-md lg:text-lg">
          <p className="font-bold">Do not have an account ?</p>
          <b className="hover:cursor-pointer text-accent max-w-max text-center btn-ghost rounded-lg">
            <Link to="/register">Sign up</Link>
          </b>
        </div>
        <div>
          <div className="flex flex-col overflow-hidden">
            <div className="w-full p-4 m-auto bg-base-100 rounded-md shadow-md">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      {/* Look */}
      <div className="grow flex flex-col font-bold bg-gradient-to-br from-base-300 to-primary-focus py-6 md:py-20 px-10 items-center justify-center gap-4 md:gap-8">
        <div className="">
          <h2 className="text-xl md:text-2xl font-semibold">
            Find your dream job
          </h2>
        </div>
        <div className="flex flex-col gap-3 md:gap-6">
          <div>
            <p className="text-md font-normal">
              Look for an offer in your favorite technology
            </p>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-2">
            <BiLogoAngular className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoGoLang className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoJava className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoJavascript className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoNodejs className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoPhp className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoPostgresql className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoPython className="w-14 h-14 md:w-20 md:h-20" />
            <BiLogoReact className="w-14 h-14 md:w-20 md:h-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
