import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function LoginScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = ({ email, password }) => {};
  async function handleGooglesignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-pink-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-pink-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          <a href="register">Register</a>
        </div>
      </form>
      <div className="flex justify-center flex-col">
        <div className="flex    justify-center" onClick={handleGooglesignin}>
          <a className="hover:bg-gray-400">signin with google &nbsp; </a>
          <Image height={25} width={30} src="/image/google.png"></Image>
        </div>
        <div className="flex  justify-center">
          <a className="hover:bg-gray-400">signin with github &nbsp;</a>
          <Image height={25} width={30} src="/image/git.png"></Image>
        </div>
      </div>
    </Layout>
  );
}
