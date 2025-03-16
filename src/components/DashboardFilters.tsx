"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { useCallback } from "react";
import { FilterRequestBody } from "@/app/api/route";

export default function DashboardFilters({
  selectedProduct,
  filterData,
  setFilterData,
}: {
  selectedProduct: string;
  filterData: FilterRequestBody;
  setFilterData: (key: string, value: string) => void;
}) {
  const handleFilterUpdate = useCallback(
    (key: string, value: string) => {
      setFilterData(key, value);
      console.log("Value set in Filter:", value);
      console.log("Product in Filter:", filterData);
    },
    [setFilterData]
  );
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const [selectedFunction, setSelectedFunction] = React.useState<string | null>(
    null
  );

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
  const v_projects = [
    "Heartbeat",
    "fingerprint",
    "global classroom",
    "discover",
    "happy bus",
    "youth 4 impact",
    "raise your voice",
    "skill up!",
    "on the map",
    "equify",
    "eco city",
    "eat 4 change",
    "green leaders",
    "aquatica",
    "explorer",
    "rooted",
    "myself, my world",
    "scale up!",
  ];

  const isInternal =
    filterData.product === "iGV" ||
    filterData.product === "iGTa" ||
    filterData.product === "iGTe";

  const isTalentTeacher = selectedProduct === "talent/teacher";

  const mcLabel = isInternal ? "Home MC" : "Host MC";
  const lcLabel = isInternal ? "Home LC" : "Host LC";
  const projectLabel = isTalentTeacher ? "Workfield" : "Project";

  const handleLCchange = (value: string) => {
    if (filterData.product?.startsWith("iG")) {
      setFilterData("homeLc", value);
    } else {
      setFilterData("hostLc", value);
    }
  };

  const handleMCchange = (value: string) => {
    if (filterData.product?.startsWith("iG")) {
      setFilterData("homeMc", value);
    } else {
      setFilterData("hostMc", value);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center justify-between">
      <Select>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Local Entity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sri_lanka">AIESEC Sri Lanka</SelectItem>
          <SelectItem value="global">Global AIESEC</SelectItem>
        </SelectContent>
      </Select>

      <DatePickerWithRange
        value={dateRange}
        onChange={(e) => {
          setDateRange(e);
          handleFilterUpdate("from", e!.from?.toISOString() || "");
          handleFilterUpdate("to", e!.to?.toISOString() || "");
        }}
      />

      <Select
        onValueChange={(e) => {
          handleFilterUpdate("product", e);
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Functions" />
        </SelectTrigger>
        <SelectContent>
          {selectedProduct === "volunteer"
            ? v_products.map((sub_product) => (
                <SelectItem key={sub_product} value={sub_product}>
                  {sub_product}
                </SelectItem>
              ))
            : selectedProduct === "talent/teacher"
            ? t_products.map((sub_product) => (
                <SelectItem key={sub_product} value={sub_product}>
                  {sub_product}
                </SelectItem>
              ))
            : null}
        </SelectContent>
      </Select>

      <Select onValueChange={(e) => handleFilterUpdate("status", e)}>
        <SelectTrigger className="w-32">
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

      <Select onValueChange={(e) => handleFilterUpdate("project", e)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder={projectLabel} />
        </SelectTrigger>
        <SelectContent>
          {selectedProduct === "volunteer"
            ? v_projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))
            : selectedProduct === "talent/teacher"
            ? filterData.product === "iGTa" || filterData.product === "oGTa"
              ? t_projects
                  .filter((project) => project !== "Teaching")
                  .map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))
              : null
            : null}
        </SelectContent>
      </Select>

      <Select onValueChange={(e) => handleMCchange(e)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder={mcLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="India">India</SelectItem>
          <SelectItem value="Turkey">Turkey</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(e) => handleLCchange(e)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder={lcLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Delhi">Delhi</SelectItem>
          <SelectItem value="Helwan">Helwan</SelectItem>
        </SelectContent>
      </Select>

      {/* Hide Duration filter when Global Volunteer is selected */}
      {filterData.product !== "iGV" && filterData.product !== "oGV" && (
        <Select onValueChange={(e) => handleFilterUpdate("duration", e)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
