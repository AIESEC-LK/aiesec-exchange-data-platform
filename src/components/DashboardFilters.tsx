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
import { DatePickerWithRange } from "./DatePickerWithRange";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const hostMCs = [
  { value: "China", label: "China" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Ukraine", label: "Ukraine" },
];

const hostLCs = [
  { value: "Istanbul", label: "Istanbul" },
  { value: "Bardo", label: "Bardo" },
  { value: "Helwan", label: "Helwan" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Hyderabad", label: "Hyderabad" },
];

export default function DashboardFilters({
  product,
  setResponce,
  setFunctioName,
  setLoading,
  setSelectedStatus,
}: {
  product: string;
  setResponce: (values: any) => void;
  setFunctioName: (value: string) => void;
  setLoading: (value: boolean) => void;
  setSelectedStatus: (value: string | null) => void;
}) {
  const handleFunctionNameChange = (value: string) => {
    setFunctioName(value);
  };

  const defaultFunctionName = "iGV";
  const defaultLcTermStartDate = new Date(2025, 1, 1);

  const defaultFilterValues = {
    localLc: "",
    from: defaultLcTermStartDate.toISOString().split("T")[0],
    to: new Date().toISOString().split("T")[0],
    product: defaultFunctionName,
    foreignMc: "",
    foreignLc: "",
    status: "",
    project: "",
    duration: "",
  };

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: defaultLcTermStartDate,
    to: new Date(),
  });
  const [selectedFunction, setSelectedFunction] = React.useState<
    string | undefined
  >(defaultFunctionName);
  const [filterValues, setFilterValues] = React.useState(defaultFilterValues);
  const [McComboOpen, setMcComboOpen] = React.useState(false);
  const [LcComboOpen, setLcComboOpen] = React.useState(false);
  const [hostMcValue, setHostMcValue] = React.useState("");
  const [hostLcValue, setHostLcValue] = React.useState("");
  const [request, setRequest] = React.useState({});

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
    handleFunctionNameChange(value);
    handleSelectChange("product", value);
  };

  const showProjectFilter = !(
    selectedFunction === "iGTe" || selectedFunction === "oGTe"
  );
  const isInternal = ["iGV", "iGTa", "iGTe"].includes(selectedFunction || "");
  const isTalentTeacher = product === "talent/teacher";
  const mcLabel = isInternal ? "Home MC" : "Host MC";
  const lcLabel = isInternal ? "Home LC" : "Host LC";
  const projectLabel = isTalentTeacher ? "Workfield" : "Project";

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    handleDateChange(newDateRange);
    console.log("Selected Date Range in DashboardFilters:", newDateRange);
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilterValues((prev: any) => ({ ...prev, [name]: value }));
    if (name === "status") {
      setSelectedStatus(value);
    }
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
    e.preventDefault();
    const formattedRequest = formatRequest(filterValues);
    console.log("Filter Values:", filterValues);
    console.log("Formatted Request:", formattedRequest);
    await fetchData(formattedRequest);
  };

  const handleClearFilters = () => {
    setFilterValues(defaultFilterValues);
    setDateRange({ from: defaultLcTermStartDate, to: new Date() });
    setSelectedFunction(undefined);
    setFunctioName(defaultFunctionName);
    setHostMcValue("");
    setHostLcValue("");
    setSelectedStatus(null);
  };

  function formatRequest(filterValues: any) {
    let formattedRequest: any = {
      status: filterValues.status,
      from: filterValues.from,
      to: filterValues.to,
      product: filterValues.product,
    };

    if (["iGTa", "iGTe", "iGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.foreignLc,
        homeMc: filterValues.foreignMc,
        hostLc: filterValues.localLc,
        hostMc: "Sri Lanka",
      };
    } else if (["oGTa", "oGTe", "oGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.localLc,
        homeMc: "Sri Lanka",
        hostLc: filterValues.foreignLc,
        hostMc: filterValues.foreignMc,
      };
    }

    if (product === "volunteer") {
      formattedRequest.project = filterValues.project;
    } else if (product === "talent/teacher") {
      formattedRequest.subProduct = filterValues.project;
      formattedRequest.duration = filterValues.duration;
    }

    setRequest(formattedRequest);
    return formattedRequest;
  }

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const responseData = await response.json();
      setResponce(responseData);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const initialRequest = formatRequest(defaultFilterValues);
    fetchData(initialRequest);
    setFunctioName(defaultFunctionName);
    setFilterValues(defaultFilterValues);
    setDateRange({ from: defaultLcTermStartDate, to: new Date() });
    setSelectedFunction(defaultFunctionName);
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-center md:justify-between">
      <div className="w-full sm:w-auto flex justify-center sm:justify-start gap-2">
        <Button variant="outline" size="sm" onClick={handleSubmit}>
          Apply Filters
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(value) => handleSelectChange("localLc", value)}
          value={filterValues.localLc}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Local Entity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CC">CC</SelectItem>
            <SelectItem value="CN">CN</SelectItem>
            <SelectItem value="CS">CS</SelectItem>
            <SelectItem value="KANDY">Kandy</SelectItem>
            <SelectItem value="NIBM">NIBM</SelectItem>
            <SelectItem value="NSBM">NSBM</SelectItem>
            <SelectItem value="RAJARATA">RAJARATA</SelectItem>
            <SelectItem value="RUHUNA">RUHUNA</SelectItem>
            <SelectItem value="SLIIT">SLIIT</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <DatePickerWithRange
          value={dateRange}
          onChange={handleDateRangeChange}
        />
      </div>

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(e) => handleFunctionSelect(e)}
          value={selectedFunction}
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

      <div className="w-full sm:w-auto">
        <Select
          onValueChange={(value) => handleSelectChange("status", value)}
          value={filterValues.status}
        >
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

      {showProjectFilter && (
        <div className="w-full sm:w-auto">
          <Select
            onValueChange={(value) => handleSelectChange("project", value)}
            value={filterValues.project}
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
                : mcLabel}
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
                        handleSelectChange("foreignMc", currentValue);
                        setHostMcValue(
                          currentValue === hostMcValue ? "" : currentValue
                        );
                        setMcComboOpen(false);
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
                ? hostLCs.find((lc) => lc.value === hostLcValue)?.label
                : lcLabel}
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
                        handleSelectChange("foreignLc", currentValue);
                        setHostLcValue(
                          currentValue === hostLcValue ? "" : currentValue
                        );
                        setLcComboOpen(false);
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

      {product !== "volunteer" && (
        <div className="w-full sm:w-auto">
          <Select
            onValueChange={(value) => handleSelectChange("duration", value)}
            value={filterValues.duration}
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
