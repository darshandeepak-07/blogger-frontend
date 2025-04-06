import RegisterForm from "./form";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100 space-y-8">
      <h1 className="text-4xl font-bold text-black">Bloggy</h1>
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-8">
        <RegisterForm />
        <p className="text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
