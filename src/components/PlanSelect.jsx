import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

export default function PlanSelect({ value, onChange, options }) {
  // options = [{ value: "Standard", label: "Standard (Flexible)" }, ...]
  const current = options.find((o) => o.value === value);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="formLibSelectTrigger" aria-label="Package">
        <Select.Value>
          {current?.label ?? value}
        </Select.Value>

        <Select.Icon className="formLibSelectIcon">
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="formLibSelectContent" position="popper" sideOffset={8}>
          <Select.Viewport className="formLibSelectViewport">
            {options.map((opt) => (
              <Select.Item key={opt.value} value={opt.value} className="formLibSelectItem">
                <Select.ItemText>{opt.label}</Select.ItemText>

                <Select.ItemIndicator className="formLibSelectCheck">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}