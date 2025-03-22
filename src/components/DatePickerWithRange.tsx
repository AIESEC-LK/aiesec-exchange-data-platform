"use client";

import React, { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateRange } from "react-day-picker";

const getThisLCTerm = (): DateRange => ({
  from: new Date("2025-02-01"),
  to: new Date(),
});

const getLastLCTerm = (): DateRange => ({
  from: new Date("2024-02-01"),
  to: new Date("2025-01-31"),
});

const getThisMCTerm = (): DateRange => ({
  from: new Date("2024-07-01"),
  to: new Date(),
});

const getLastMCTerm = (): DateRange => ({
  from: new Date("2023-07-01"),
  to: new Date("2024-06-30"),
});

const getToday = (): DateRange => ({
  from: new Date(),
  to: new Date(),
});

const getLastWeek = (): DateRange => ({
  from: subDays(new Date(), 7),
  to: new Date(),
});

const getLastMonth = (): DateRange => ({
  from: startOfMonth(subDays(new Date(), 30)),
  to: endOfMonth(subDays(new Date(), 30)),
});

const PRESET_RANGES: { label: string; range: DateRange }[] = [
  { label: "Today", range: getToday() },
  { label: "Last Week", range: getLastWeek() },
  { label: "Last Month", range: getLastMonth() },
  { label: "This LC Term", range: getThisLCTerm() },
  { label: "Last LC Term", range: getLastLCTerm() },
  { label: "This MC Term", range: getThisMCTerm() },
  { label: "Last MC Term", range: getLastMCTerm() },
];

export function DatePickerWithRange({
  value,
  onChange,
  className,
}: {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"preset" | "custom">("preset");
  const [startDate, setStartDate] = useState<Date | null>(
    value?.from || new Date("2025-02-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(value?.to || new Date());

  const handleApply = () => {
    if (startDate && endDate) {
      onChange({ from: startDate, to: endDate });
      setOpen(false);
    }
  };

  const handlePresetSelect = (range: DateRange) => {
    setStartDate(range.from);
    setEndDate(range.to);
    onChange(range);
    setOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal",
              !(startDate && endDate) && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {startDate && endDate
              ? `${format(startDate, "LLL dd, yyyy")} - ${format(
                  endDate,
                  "LLL dd, yyyy"
                )}`
              : "Pick a date range"}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full sm:w-auto max-w-[400px] p-0 rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b bg-gray-100">
            <Button
              variant={tab === "preset" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setTab("preset")}
            >
              Preset
            </Button>
            <Button
              variant={tab === "custom" ? "default" : "ghost"}
              className="flex-1 rounded-none"
              onClick={() => setTab("custom")}
            >
              Custom
            </Button>
          </div>

          {tab === "preset" ? (
            <ScrollArea className="max-h-[250px] p-2">
              {PRESET_RANGES.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                  onClick={() => handlePresetSelect(preset.range)}
                >
                  {preset.label}
                </Button>
              ))}
            </ScrollArea>
          ) : (
            <div className="flex flex-col space-y-2 p-4">
              <label className="text-sm font-medium">From</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start date"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="w-full p-2 border rounded-md"
                minDate={new Date("2015-01-01")}
                maxDate={new Date("2025-12-31")}
              />
              <label className="text-sm font-medium">To</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                placeholderText="End date"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                className="w-full p-2 border rounded-md"
                minDate={startDate || new Date("2015-01-01")}
                maxDate={new Date("2025-12-31")}
              />
              <Button onClick={handleApply} className="w-full sm:w-auto">
                Apply
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
