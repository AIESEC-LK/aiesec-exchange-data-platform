"use client";

import * as React from "react";
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Updated LC & MC Term Date Calculation ---
const getThisLCTerm = () => {
  return { from: new Date("2025-02-01"), to: new Date() }; // Up to today's date
};

const getLastLCTerm = () => {
  return { from: new Date("2024-02-01"), to: new Date("2025-01-31") };
};

const getThisMCTerm = () => {
  return { from: new Date("2024-07-01"), to: new Date() }; // Up to today's date
};

const getLastMCTerm = () => {
  return { from: new Date("2023-07-01"), to: new Date("2024-06-30") };
};

// --- Preset Date Ranges ---
const PRESET_RANGES = [
  { label: "Today", range: { from: new Date(), to: new Date() } },
  {
    label: "Yesterday",
    range: { from: addDays(new Date(), -1), to: addDays(new Date(), -1) },
  },
  {
    label: "This Month",
    range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) },
  },
  {
    label: "This Year",
    range: { from: startOfYear(new Date()), to: endOfYear(new Date()) },
  },
  { label: "This LC Term", range: getThisLCTerm() },
  { label: "Last LC Term", range: getLastLCTerm() },
  { label: "This MC Term", range: getThisMCTerm() },
  { label: "Last MC Term", range: getLastMCTerm() },
];

const CustomDateRangePicker = React.forwardRef<
  {
    onSelect: (range: DateRange | undefined) => void;
    value: DateRange | undefined;
  },
  HTMLDivElement
>(({ onSelect, value }, ref) => {
  return (
    <div ref={ref} className="flex flex-wrap justify-center p-4 w-full">
      <DayPicker
        mode="range"
        selected={value}
        onSelect={onSelect}
        numberOfMonths={window.innerWidth < 640 ? 1 : 2} // Show 1 month on mobile, 2 months on larger screens
        className="rdp-custom"
      />
    </div>
  );
});
CustomDateRangePicker.displayName = "CustomDateRangePicker";

export function DatePickerWithRange({
  value,
  onChange,
  className,
}: {
  value: DateRange | undefined;
  onChange: (date: DateRange | undefined) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<"preset" | "custom">("preset");

  return (
    <div className={cn("grid gap-2", className)}>
      {/* Pop-up Trigger */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[300px] justify-start text-left font-normal",
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

        {/* Pop-up Content */}
        <PopoverContent className="w-full sm:w-auto max-w-[400px] p-0 rounded-lg shadow-md overflow-hidden">
          {/* Tabs: Preset | Custom */}
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

          {/* Preset Dates or Custom Picker */}
          {tab === "preset" ? (
            <ScrollArea className="max-h-[250px] p-2">
              {PRESET_RANGES.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    onChange(preset.range);
                    setOpen(false);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </ScrollArea>
          ) : (
            <CustomDateRangePicker value={value} onSelect={onChange} />
          )}
        </PopoverContent>
      </Popover>

      <style jsx>{`
        .rdp-custom {
          display: flex;
          flex-direction: row;
          padding: 10px;
        }

        @media (max-width: 640px) {
          .rdp-custom {
            flex-direction: column;
          }
        }

        .rdp-custom .rdp-day_selected {
          background-color: #2563eb;
          color: white;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
