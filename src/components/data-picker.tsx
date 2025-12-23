"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { RefObject, useImperativeHandle, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type ImperativeHandleFromDatePicker = {
  reset: () => void;
};

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
  imperativeHandleRef?: RefObject<ImperativeHandleFromDatePicker>;
};

const DatePicker = ({
  id,
  name,
  defaultValue,
  imperativeHandleRef,
}: DatePickerProps) => {
  const parseDateString = (dateString: string): Date => {
    // Parse YYYY-MM-DD format as local time to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const [date, setDate] = useState<Date>(
    defaultValue ? parseDateString(defaultValue) : new Date()
  );

  useImperativeHandle(imperativeHandleRef, () => ({
    reset: () => {
      setDate(new Date());
    },
  }));

  const [open, setOpen] = useState(false);

  const formattedStringDate = format(date, "yyyy-MM-dd");

  const handleSelect = (date: Date | undefined) => {
    setDate(date ?? new Date());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          <span>{formattedStringDate}</span>
          <input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[280px]" align="start" side="bottom">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          classNames={{
            root: "w-full",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
