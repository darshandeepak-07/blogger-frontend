"use client";

import LoginForm from "./form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100 space-y-8">
      <h1 className="text-5xl font-bold text-black">Bloggy</h1>
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-8">
        <h2 className="font-semibold text-2xl">Login</h2>
        <LoginForm />
        <p className="text-center">
          Need to create an account?{" "}
          <Link
            className="text-indigo-500 hover:underline"
            href="/auth/register"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

