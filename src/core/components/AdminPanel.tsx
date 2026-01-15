import { Button } from "~/core/components/Button";
import { useModalContext } from "~/core/components/ModalContext";
import { X } from "lucide-react";

const actions = [
  { key: "addPizza", title: "Add pizza" },
  { key: "addIngredients", title: "Add ingredients" },
];
interface AdminPanelProps {
  onClose?: () => void;
}
export function AdminPanel({ onClose }: AdminPanelProps) {
  const { openAddPizza } = useModalContext();

  return (
    <div className="fixed flex w-[360px] flex-col gap-4 rounded-2xl border-2 border-orange-600 bg-[#2F0C00] p-8 text-white">
      <Button
        buttonStyle="circle"
        type="button"
        onClick={onClose}
        className="!absolute -top-2 -right-2"
      >
        <X size={24} className="text-gray-300 hover:scale-105" />
      </Button>
      {actions.map((item) => (
        <Button
          key={item.key}
          buttonStyle="colored"
          type="button"
          onClick={() => {
            if (item.key === "addPizza") {
              openAddPizza();
            }
          }}
        >
          {item.title}
        </Button>
      ))}
    </div>
  );
}
