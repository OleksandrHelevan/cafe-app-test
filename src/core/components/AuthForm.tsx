"use client";

import { type FormEvent, useState } from "react";
import { TextInput } from "~/core/components/TextInput";
import { Button } from "~/core/components/Button";
import { useLogin } from "~/domains/user/useLogin";
import { EMAIL_REGEX, PASSWORD_REGEX } from "~/core/constants/regex";
import { X } from "lucide-react";

type Mode = "login" | "register";

interface AuthFormProps {
    onClose?: () => void;
}

export function AuthForm({ onClose }: AuthFormProps) {
    const [mode, setMode] = useState<Mode>("login");
    const { mutate: login, isPending } = useLogin();

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
            const registerPayload = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
            };

            console.log("REGISTER", registerPayload);
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="fixed flex flex-col gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-8 text-white"
        >
            <Button
                type="button"
                buttonStyle="colored"
                onClick={() =>
                    setMode((m) => (m === "login" ? "register" : "login"))
                }
                className="absolute -top-8 left-4 !h-[32px] w-[110px] rounded-b-xs rounded-t-xl !p-0 text-sm"
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
                    <TextInput
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextInput
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextInput
                        id="phone"
                        type="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </>
            )}

            <TextInput
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p className="min-h-[20px] text-sm text-red-400">
                {validationError ?? "\u00A0"}
            </p>

            <Button type="submit" buttonStyle="colored" disabled={isPending}>
                {isPending
                    ? "Processing..."
                    : mode === "login"
                        ? "Login"
                        : "Register"}
            </Button>
        </form>
    );
}
