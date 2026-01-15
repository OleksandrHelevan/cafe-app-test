import { TextInput } from "~/core/components/TextInput";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "~/core/components/Button";

interface AddPizzaModalProps {
  onClose?: () => void;
}
export function AddPizzaModal({ onClose }: AddPizzaModalProps) {
  const [pizzaName, setPizzaName] = useState("");
  return (
    <form className="fixed flex w-[360px] flex-col gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-8 text-white">
      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute -top-2 -right-2"
      >
        <X size={24} className="text-gray-300 hover:scale-105" />
      </Button>
      <TextInput
        id={"name"}
        value={pizzaName}
        type={"text"}
        placeholder={"Enter pizza name"}
        onChange={(e) => setPizzaName(e.target.value)}
      />
    </form>
  );
}
