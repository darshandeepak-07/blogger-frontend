"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Snackbar } from "@/app/common/ui/snackbar";
import { loginUser } from "@/app/api/auth/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setSnackbar({
        message: "Both email and password are required.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const payload: LoginPayload = {
        username: email,
        password: password,
      };
      const res = await loginUser(payload);

      if (res.data) {
        setSnackbar({ message: "Login successful!", type: "success" });

        setTimeout(() => {
          router.push("/dashboard/home");
        }, 500);
      } else {
        throw new Error("Error occured while logging you in!");
      }
    } catch (error: any) {
      let errorMessage = "Something went wrong during login.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setSnackbar({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className="space-y-5 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            className="w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            className="w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
          />
        </div>
        <div className="w-full">
          <Button
            className="w-full bg-black text-white"
            size="lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </>
  );
}

