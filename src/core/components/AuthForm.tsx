"use client";

import { type FormEvent, useState } from "react";
import { Input } from "~/core/components/Input";
import { Button } from "~/core/components/Button";
import { useLogin } from "~/domains/user/useLogin";
import { useSignup } from "~/domains/user/useSignup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "~/core/constants/regex";
import { X } from "lucide-react";

type Mode = "login" | "register";

interface AuthFormProps {
  onClose?: () => void;
}

export function AuthForm({ onClose }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>("login");
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (mode === "register") {
      if (!firstName || !lastName) {
        setValidationError("First name and last name are required");
        return;
      }
      if (!phoneNumber) {
        setValidationError("Phone number is required");
        return;
      }
    }

    if (!EMAIL_REGEX.test(email)) {
      setValidationError("Invalid email format");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setValidationError(
        mode === "register"
          ? "Password must be at least 8 characters and contain uppercase letter"
          : "Invalid email or password",
      );
      return;
    }

    if (mode === "login") {
      login({ email, password });
    } else {
      signup(
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
        {
          onSuccess: () => {
            setMode("login");
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setPhoneNumber("");
          },
        },
      );
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="fixed w-[360px] flex flex-col gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-8 text-white"
    >
      <Button
        type="button"
        buttonStyle="colored"
        onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
        className="absolute -top-8 left-4 !h-[32px] w-[110px] rounded-t-xl rounded-b-xs !p-0 text-sm"
      >
        {mode === "login" ? "Sign up" : "Log in"}
      </Button>

      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute -top-2 -right-2"
      >
        <X size={24} className="text-gray-300 hover:scale-105" />
      </Button>

      <h2 className="text-xl font-semibold">
        {mode === "login" ? "Log in" : "Create account"}
      </h2>

      {mode === "register" && (
        <>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            id="phone"
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </>
      )}

      <Input
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="min-h-[20px] text-sm">
        {validationError ?? "\u00A0"}
      </p>

      <Button
        type="submit"
        buttonStyle="colored"
        disabled={isLoginPending || isSignupPending}
      >
        {isLoginPending || isSignupPending
          ? "Processing..."
          : mode === "login"
            ? "Login"
            : "Register"}
      </Button>
    </form>
  );
}
