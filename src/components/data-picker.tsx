"use client";

import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const parseDateString = (dateString: string): Date => {
    // Parse YYYY-MM-DD format as local time to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? parseDateString(defaultValue) : undefined
  );

  const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <Popover>
      <PopoverTrigger id={id} className="w-full" asChild>
        <Button
          variant="outline"
          className="justify-start text-left font-normal"
        >
          <LucideCalendar className="mr-2 h-4 w-4" />
          <span className={!date ? "text-muted-foreground" : ""}>
            {formattedStringDate || "Pick a date"}
          </span>
          <input type="hidden" name={name} value={formattedStringDate} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[280px]" align="start" side="bottom">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          classNames={{
            root: "w-full",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
