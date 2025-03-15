"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  value,
  onChange,
  className,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <style jsx>{`
            .rdp-with-year-dropdown .rdp-head_row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0.5rem;
            }

            .rdp-with-year-dropdown .rdp-nav {
              display: flex;
              align-items: center;
            }

            .rdp-with-year-dropdown .rdp-nav_button {
              background: none;
              border: none;
              color: inherit;
              cursor: pointer;
              font-size: 1.25rem;
              padding: 0;
            }

            .rdp-with-year-dropdown .rdp-dropdown_year {
              padding: 0.5rem;
            }

            .rdp-day {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .rdp-nav_button {
              border: none;
              background-color: white;
            }
          `}</style>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            className="rdp-with-year-dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
