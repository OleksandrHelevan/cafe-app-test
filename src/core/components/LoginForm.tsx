import { type FormEvent, useState } from "react";
import { TextInput } from "~/core/components/TextInput";
import { Button } from "~/core/components/Button";
import { useLogin } from "~/domains/user/useLogin";
import { EMAIL_REGEX, PASSWORD_REGEX } from "~/core/constants/regex";

export function LoginForm() {
  const { mutate: login, isPending, data } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError(null);

    if (!EMAIL_REGEX.test(email)) {
      setValidationError("Invalid email format");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setValidationError(
        "Password must be at least 8 characters and contain 1 uppercase letter",
      );
      return;
    }

    login({ email, password });
  };

  return (
    <form className="relative flex max-h-dvh flex-col gap-8 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-6 text-white"
    onSubmit={onSubmit}>
      <TextInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {validationError && (
        <p className="text-sm text-red-500">{validationError}</p>
      )}
      <Button type="submit" buttonStyle="colored" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
      {data && (
        <p className="text-sm text-green-600">Logged in as {data.role}</p>
      )}
    </form>
  );
}
