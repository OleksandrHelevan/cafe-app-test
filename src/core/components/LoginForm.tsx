import { type FormEvent, useState } from "react";
import { TextInput } from "~/core/components/TextInput";
import { Button } from "~/core/components/Button";
import { useLogin } from "~/domains/user/useLogin";
import { EMAIL_REGEX, PASSWORD_REGEX } from "~/core/constants/regex";
import { X } from "lucide-react";

interface LoginFormProps {
  onClose?: () => void;
}
export function LoginForm({ onClose }: LoginFormProps) {
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
        `Password must be correct`,
      );
      return;
    }

    login({ email, password });
  };

  return (
    <form
      className="relative flex max-h-dvh flex-col gap-8 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-8 text-white"
      onSubmit={onSubmit}
    >
      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute top-0 right-2"
      >
        <X size={24} className="text-gray-300 transition-all hover:scale-105" />
      </Button>

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
        <p className="text-sm">{validationError}</p>
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
