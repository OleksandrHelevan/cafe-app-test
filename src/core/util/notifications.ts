import { toast } from "react-toastify";

export type Mode = "success" | "error";

interface NotificationOptions {
  text: string;
  mode: Mode;
}

export function showNotification({ text, mode }: NotificationOptions) {
  switch (mode) {
    case "success":
      toast.success(text);
      break;
    case "error":
      toast.error(text);
      break;
  }
}
