import React, { useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CustomSelect } from "./CustomSelect";

interface DatePickerProps {
  triggerClassName?: string;
  defaultDate?: Date;
  name?: string;
  yearInput?: boolean;
  modal?: boolean;
  futureSelect?:boolean;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name = "date_picker",
  yearInput=false,
  modal=false,
  futureSelect=false,
  defaultDate,
  onSelect,
  className,
  id,
  triggerClassName,
  disabled=false
}) => {
  const [dob, setDob] = useState<Date>(defaultDate || new Date());
  const [calendarView, setCalendarView] = useState<Date>(defaultDate || new Date());
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const minDate = useMemo(() => new Date("1900-01-01"), []);
  const maxDate = useMemo(() => futureSelect ? new Date("2100-01-01") :new Date(), []);

  // 1. memoize the options
  const yearOptions = useMemo(() => {
    const years: { label: string; value: string }[] = [];
    for (let y = currentYear; y >= 1900; y--) {
      years.push({ label: `${y}`, value: `${y}` });
    }
    return years;
  }, [currentYear]);

  // 2. stable callback
  const handleYearChange = useCallback((value: string) => {
    setCalendarView((cv) => {
      const next = new Date(cv);
      next.setFullYear(parseInt(value, 10));
      return next;
    });
  }, []);

  // 3. derived formatted label
  const display = useMemo( () => (dob ? format(dob, "PPP") : "Pick a date"),[dob]);

  return (
    <>
      <input type="hidden" name={name} value={dob ? format(dob, "yyyy-MM-dd") : ""} className={className} id={id} />
      <Popover modal={modal} open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id ? id + '_button' : undefined}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !dob && "text-muted-foreground",
              triggerClassName
            )}
          >
            {display}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          {yearInput && <div className="p-2 border-b flex justify-between items-center">
            <CustomSelect
              options={yearOptions}
              placeholder={
                calendarView.getFullYear().toString() || "Year"
              }
              onValueChange={handleYearChange}
            />
          </div>}

          <Calendar
            mode="single"
            selected={dob}
            onSelect={e=>{
                if(e) {
                  setDob(e);
                  if (onSelect) onSelect(e);
                }
                if (dob) setIsOpen(false);
            }}
            month={calendarView}
            onMonthChange={setCalendarView}
            disabled={(date) => date > maxDate || date < minDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default React.memo(DatePicker);
