import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type SelectOptionType = {
  label: string | number | undefined;
  value: string | number | boolean | null;
};

interface CustomSelectProps extends React.ComponentPropsWithoutRef<typeof Select> {
  options?: SelectOptionType[];
  placeholder?: string;
  id?: string;
  className?: string;
  dropdownClassName?:string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  placeholder = "Select An Option",
  id = "select",
  className,
  dropdownClassName,
  value,
  onValueChange,
  ...props
}) => {
  const filteredOptions = options;

  return (
    <Select
      {...props}
      value={value}
      onValueChange={(newValue) => {
        if (onValueChange) onValueChange(newValue);
      }}
    >
      <SelectTrigger className={cn("w-full", className, props.disabled ? "cursor-not-allowed opacity-50" : null)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={cn(dropdownClassName, props.disabled ? "cursor-not-allowed opacity-50" : null)}>
        {filteredOptions.map((o, i) => (
          <SelectItem key={i} id={`${id}-option-${i}`} value={o.value?.toString() as string}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

