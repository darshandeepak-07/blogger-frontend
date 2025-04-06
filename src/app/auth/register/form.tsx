"use client";

import { useState, useRef, useEffect } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { registerUser, verifyUser } from "@/app/api/auth/auth";
import { Snackbar } from "@/app/common/ui/snackbar";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    bio: "",
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Notification state
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    show: boolean;
  }>({
    message: "",
    type: "success",
    show: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
    if (errors.role) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.role;
        return updated;
      });
    }
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({
      message,
      type,
      show: true,
    });
  };

  const closeNotification = () => {
    setNotification((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVerificationCode = () => {
    const newErrors: Record<string, string> = {};
    if (!verificationCode.trim()) {
      newErrors.verificationCode = "Verification code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isVerificationStep) {
        // Validate verification code
        const isCodeValid = validateVerificationCode();
        if (!isCodeValid) {
          setIsSubmitting(false);
          return;
        }

        // Create payload for verification
        const payload: RegisterPayload = {
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          password: formData.password,
          profilePic: "", // Will be handled separately if needed
          confirmPassword: "",
          role: formData.role.toLowerCase(),
        };
        const verifyPayload: VerifyPayload = {
          email: userEmail,
          code: verificationCode,
          signUpData: payload,
        };

        // Call verification API
        const response = await verifyUser(verifyPayload);

        if (response) {
          showNotification(
            "Verification successful! Redirecting to login...",
            "success"
          );
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000);
        } else {
          showNotification(
            response?.message || "Verification failed. Please try again.",
            "error"
          );
        }
        setIsSubmitting(false);
        return;
      }

      // Handle initial registration
      const isValid = validateForm();
      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      // Create form data for file upload if needed
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "confirmPassword") {
          form.append(key, value);
        }
      });
      if (profilePic) form.append("profilePic", profilePic);

      // Create payload for registration
      const payload: RegisterPayload = {
        username: formData.username,
        email: formData.email,
        bio: formData.bio,
        password: formData.password,
        profilePic: "", // Will be handled separately if needed
        confirmPassword: "",
        role: formData.role,
      };

      // Call registration API
      const response = await registerUser(payload);

      if (response?.message) {
        showNotification(
          "Registration successful! Please check your email for verification code.",
          "success"
        );
        setUserEmail(formData.email);
        setIsVerificationStep(true);
        setErrors({});
      } else {
        showNotification(
          response?.message || "Registration failed. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Snackbar Notification */}
      {notification.show && (
        <Snackbar
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-3xl text-sm mx-auto"
      >
        {/* Header and Profile Pic Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <h2 className="font-semibold text-2xl text-center sm:text-left w-full sm:w-auto">
            {isVerificationStep ? "Verify Your Email" : "Create an Account"}
          </h2>

          {!isVerificationStep && (
            <div
              className="relative h-24 w-24 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-green-400">
                <div className="h-full w-full rounded-full bg-white p-[2px]">
                  <div className="h-full w-full rounded-full overflow-hidden bg-white hover:opacity-80 transition">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt="Profile Preview"
                        width={96}
                        height={96}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 text-xs">
                        Upload
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>
          )}
        </div>

        {isVerificationStep ? (
          // Verification Step
          <div className="space-y-4">
            <p className="text-gray-600">
              We've sent a verification code to <strong>{userEmail}</strong>.
              Please check your email and enter the code below to complete your
              registration.
            </p>

            <div className="grid w-full items-center gap-1">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className={errors.verificationCode ? "border-red-500" : ""}
              />
              {errors.verificationCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.verificationCode}
                </p>
              )}
            </div>
          </div>
        ) : (
          // Registration Form
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid items-center gap-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              <div className="grid items-center gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid items-center gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="grid items-center gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="grid w-full items-center gap-1">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger
                  id="role"
                  className={errors.role ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="reader">Reader</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <Button
          className="w-full bg-black text-white"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isVerificationStep
              ? "Verifying..."
              : "Registering..."
            : isVerificationStep
            ? "Verify"
            : "Register"}
        </Button>
      </form>
    </>
  );
}
