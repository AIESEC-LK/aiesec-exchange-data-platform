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
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange"; // Correct import!

export default function DashboardFilters({
  product,
  setResponce,
}: {
  product: string;
  setResponce: (values: any) => void;
}) {
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
        hostMc: "sri_lanka", // Assuming this is the default value
      };
    } else if (["oGTa", "oGTe", "oGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.localLc,
        homeMc: "sri_lanka", // Assuming this is the default value
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
        <Select onValueChange={handleFunctionSelect}>
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
        <Select
          className="w-full sm:w-32"
          onValueChange={(value) => handleSelectChange("status", value)}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Filter */}
      {showProjectFilter && (
        <div className="w-full sm:w-auto">
          {" "}
          {/* Added wrapper div for width control */}
          <Select
            className="w-full sm:w-32"
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
        {" "}
        {/* Added wrapper div for width control */}
        <Select
          onValueChange={(value) => handleSelectChange("foreignMc", value)}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder={mcLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mc1">MC 1</SelectItem>
            <SelectItem value="mc2">MC 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* LC Selection */}
      <div className="w-full sm:w-auto">
        {" "}
        {/* Added wrapper div for width control */}
        <Select
          onValueChange={(value) => handleSelectChange("foreignLc", value)}
        >
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder={lcLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lc1">LC 1</SelectItem>
            <SelectItem value="lc2">LC 2</SelectItem>
          </SelectContent>
        </Select>
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
