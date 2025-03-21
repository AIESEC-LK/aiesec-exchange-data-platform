"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange"; // Correct import!

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const hostMCs = [
  {
    value: "China",
    label: "China",
  },
  {
    value: "India",
    label: "India",
  },
  {
    value: "Indonesia",
    label: "Indonesia",

  },
  {
    value: "Malaysia",
    label: "Malaysia",
  },
  {
    value: "Eukraine",
    label: "Eukraine",
  },
]

const hostLCs = [
  {
    value: "Istanbul",
    label: "Istanbul",
  },
  {
    value: "Bardo",
    label: "Bardo",
  },
  {
    value: "Helwan",
    label: "Helwan",
  },
  {
    value: "Mumbai",
    label: "Mumbai",
  },
  {
    value: "Hyderabad",
    label: "Hyderabad",
  },
]

export default function DashboardFilters({
  product,
  setResponce,
  setFunctioName,
}: {
  product: string;
  setResponce: (values: any) => void;
  setFunctioName: (value: string) => void;
}) {
  const handleFunctionNameChange = (value: string) => {
    setFunctioName(value);
  };
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const [selectedFunction, setSelectedFunction] = React.useState<string | null>(
    null
  );
  const [filterValues, setFilterValues] = React.useState({
    localLc: "",
    from: "",
    to: "",
    product: "",
    foreignMc: "",
    foreignLc: "",
    status: "",
    project: "",
    duration: "",
  });
  const [request, setRequest] = React.useState({});

  const [McComboOpen, setMcComboOpen] = React.useState(false)
  const [LcComboOpen, setLcComboOpen] = React.useState(false)

  const [hostMcValue, setHostMcValue] = React.useState("")
  const [hostLcValue, setHostLcValue] = React.useState("")

  const t_products = ["oGTa", "iGTa", "oGTe", "iGTe"];
  const v_products = ["oGV", "iGV"];

  const t_projects = [
    "Information Technology",
    "Engineering",
    "Business Developement",
    "Marketing",
    "Teaching",
    "Other",
  ];

  const gv_projects = [
    "Heartbeat",
    "Fingerprint",
    "Global Classroom",
    "Discover",
    "Happy Bus",
    "Youth 4 Impact",
    "Raise Your Voice",
    "Skill Up!",
    "On The Map",
    "Equify",
    "Eco City",
    "Eat 4 Change",
    "Green Leaders",
    "Aquatica",
    "Explorer",
    "Rooted",
    "Myself, My World",
    "Scale Up!",
  ];

  const handleFunctionSelect = (value: string) => {
    setSelectedFunction(value);
    handleSelectChange("product", value); // Also update product in filterValues
  };

  const showProjectFilter = !(
    selectedFunction === "iGTe" || selectedFunction === "oGTe"
  );
  const isInternal =
    selectedFunction === "iGV" ||
    selectedFunction === "iGTa" ||
    selectedFunction === "iGTe";
  const isTalentTeacher = product === "talent/teacher";
  const mcLabel = isInternal ? "Home MC" : "Host MC";
  const lcLabel = isInternal ? "Home LC" : "Host LC";
  const projectLabel = isTalentTeacher ? "Workfield" : "Project";

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    handleDateChange(newDateRange); // Update filterValues with date range
    console.log("Selected Date Range in DashboardFilters:", newDateRange);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilterValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);

    setFilterValues((prev: any) => ({
      ...prev,
      from: range?.from ? range.from.toISOString().split("T")[0] : "",
      to: range?.to ? range.to.toISOString().split("T")[0] : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const formattedRequest = formatRequest(filterValues); // Format the request
    console.log("Filter Values:", filterValues);
    console.log("Formatted Request:", formattedRequest);

    await fetchData(formattedRequest); // Fetch data with formatted request
  };

  function formatRequest(filterValues: any) {
    let formattedRequest: any = {
      status: filterValues.status,
      from: filterValues.from,
      to: filterValues.to,
      product: filterValues.product,
    };

    // Handle product-specific fields
    if (["iGTa", "iGTe", "iGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.foreignLc,
        homeMc: filterValues.foreignMc,
        hostLc: filterValues.localLc,
        hostMc: "Sri Lanka", // Assuming this is the default value
      };
    } else if (["oGTa", "oGTe", "oGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.localLc,
        homeMc: "Sri Lanka", // Assuming this is the default value
        hostLc: filterValues.foreignLc,
        hostMc: filterValues.foreignMc,
      };
    }

    // Handle project-specific fields
    if (product === "volunteer") {
      formattedRequest = {
        ...formattedRequest,
        project: filterValues.project,
      };
    } else if (product === "talent/teacher") {
      formattedRequest = {
        ...formattedRequest,
        subProject: filterValues.project,
        duration: filterValues.duration,
      };
    }

    // Update the request state (optional, but might be useful for debugging or other purposes)
    setRequest(formattedRequest);

    // Return the formatted request for immediate use
    return formattedRequest;
  }

  const fetchData = async (params: any) => {
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const responseData = await response.json();
      console.log("Fetched Data:", responseData);

      setResponce(responseData);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      console.log("Data fetch operation completed.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-center md:justify-between">
      {/* Apply Filters Button - Placed at the beginning for better visibility on smaller screens */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        <Button variant="outline" size="sm" onClick={handleSubmit}>
          Apply Filters
        </Button>
      </div>

      {/* Entity Selection */}
      <div className="w-full sm:w-auto">
        {" "}
        {/* Added wrapper div for width control */}
        <Select onValueChange={(value) => handleSelectChange("localLc", value)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Local Entity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cc">CC</SelectItem>
            <SelectItem value="cn">CN</SelectItem>
            <SelectItem value="cs">CS</SelectItem>
            <SelectItem value="kandy">Kandy</SelectItem>
            <SelectItem value="nibm">NIBM</SelectItem>
            <SelectItem value="nsbm">NSBM</SelectItem>
            <SelectItem value="rajarata">Rajarata</SelectItem>
            <SelectItem value="ruhuna">Ruhuna</SelectItem>
            <SelectItem value="sliit">SLIIT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date Picker */}
      <div className="w-full sm:w-auto">
        <DatePickerWithRange
          value={dateRange}
          onChange={handleDateRangeChange}
        />
      </div>

      {/* Functions Selection */}
      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(e) => {
            handleFunctionSelect(e);
            handleFunctionNameChange(e);
          }}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Functions" />
          </SelectTrigger>
          <SelectContent>
            {product === "volunteer"
              ? v_products.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))
              : product === "talent/teacher"
                ? t_products.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))
                : null}
          </SelectContent>
        </Select>
      </div>

      {/* Status Selection */}
      <div className="w-full sm:w-auto">
        <Select onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="realized">Realized</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Filter */}
      {showProjectFilter && (
        <div className="w-full sm:w-auto">
          {" "}
          {/* Added wrapper div for width control */}
          <Select
            onValueChange={(value) => handleSelectChange("project", value)}
          >
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder={projectLabel} />
            </SelectTrigger>
            <SelectContent>
              {product === "volunteer"
                ? gv_projects.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))
                : product === "talent/teacher"
                  ? t_projects.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))
                  : null}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* MC Selection */}
      <div className="w-full sm:w-auto">
        <Popover open={McComboOpen} onOpenChange={setMcComboOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={McComboOpen}
              className="w-[120px] justify-between font-normal text-gray-500"
            >
              {hostMcValue
                ? hostMCs.find((mc) => mc.value === hostMcValue)?.label
                : "Host MC"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search MC..." className="h-9" />
              <CommandList>
                <CommandEmpty>No MC found.</CommandEmpty>
                <CommandGroup>
                  {hostMCs.map((mc) => (
                    <CommandItem
                      key={mc.value}
                      value={mc.value}
                      onSelect={(currentValue) => {
                        handleSelectChange("foreignMc", currentValue)
                        setHostMcValue(currentValue === hostMcValue ? "" : currentValue)
                        setMcComboOpen(false)
                      }}
                    >
                      {mc.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          hostMcValue === mc.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* LC Selection */}
      <div className="w-full sm:w-auto">
        <Popover open={LcComboOpen} onOpenChange={setLcComboOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={LcComboOpen}
              className="w-[120px] justify-between font-normal text-gray-500"
            >
              {hostLcValue
                ? hostLCs.find((mc) => mc.value === hostLcValue)?.label
                : "Host LC"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search LC..." className="h-9" />
              <CommandList>
                <CommandEmpty>No LC found.</CommandEmpty>
                <CommandGroup>
                  {hostLCs.map((lc) => (
                    <CommandItem
                      key={lc.value}
                      value={lc.value}
                      onSelect={(currentValue) => {
                        handleSelectChange("foreignLc", currentValue)
                        setHostLcValue(currentValue === hostLcValue ? "" : currentValue)
                        setLcComboOpen(false)
                      }}
                    >
                      {lc.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          hostLcValue === lc.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Duration Filter (Hidden for Global Volunteer) */}
      {product !== "volunteer" && (
        <div className="w-full sm:w-auto">
          {" "}
          {/* Added wrapper div for width control */}
          <Select
            onValueChange={(value) => handleSelectChange("duration", value)}
          >
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short</SelectItem>
              <SelectItem value="long">Long</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
