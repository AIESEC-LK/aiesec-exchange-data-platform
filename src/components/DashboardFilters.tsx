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
import { DatePickerWithRange } from "./DatePickerWithRange";



export default function DashboardFilters({ product, setResponce }: { product: string; setResponce: (values: any) => void }) {
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


  const [request, setRequest] = React.useState({});
  
  const handleSubmit = async (e: React.FormEvent) => {


    formatRequest(filterValues);
    console.log(filterValues);
    


    console.log(request);


    
    e.preventDefault();
    await fetchData(request);
  };


  function formatRequest(filterValues: any) {
    let formattedRequest: any = {
      status: filterValues.status,
      from: filterValues.from,
      to: filterValues.to,
      product: filterValues.product
    };
  
    // Handle product-specific fields
    if (["iGTa", "iGTe", "iGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.foreignLc,
        homeMc: filterValues.foreignMc,
        hostLc: filterValues.localLc,
        hostMc: "sri_lanka" // Assuming this is the default value
      };
    } else if (["oGTa", "oGTe", "oGV"].includes(filterValues.product)) {
      formattedRequest = {
        ...formattedRequest,
        homeLc: filterValues.localLc,
        homeMc: "sri_lanka", // Assuming this is the default value
        hostLc: filterValues.foreignLc,
        hostMc: filterValues.foreignMc
      };
    }
  
    // Handle project-specific fields
    if (product === "volunteer") {
      formattedRequest = {
        ...formattedRequest,
        project: filterValues.project
        
      };
    } else if (product === "talent/teacher") {
      formattedRequest = {
        ...formattedRequest,
        subProject: filterValues.project,
        duration: filterValues.duration
      };
    }
  
    // Update the request state
    setRequest(formattedRequest);
    
    // Return the formatted request for immediate use
    return formattedRequest;
  }


  

  

  const fetchData = async (params:any) => {

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!response.ok) throw new Error('Failed to fetch data');
      const responseData = await response.json();
      console.log(responseData);

      setResponce(responseData);
    } catch (err) {
console.log(err);

    } finally {
      console.log('Data fetched');
    
    }
  };

  
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
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
    "Volunteering Project1",
    "Volunteering Project2",
    "Volunteering Project3",
    "Volunteering Project4",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center justify-between">


<button className="border-2 p-3" onClick={handleSubmit}>Apply Filters</button>

      <Select onValueChange={(value) => handleSelectChange("localLc", value)}>
      <SelectTrigger className="w-48">
          <SelectValue placeholder="AIESEC SRI LANKA" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sri_lanka">AIESEC Sri Lanka</SelectItem>
          <SelectItem value="global">Global AIESEC</SelectItem>
        </SelectContent>
      </Select>

      <DatePickerWithRange value={dateRange} onChange={handleDateChange} />

      <Select onValueChange={(value) => handleSelectChange("product", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Functions" />
        </SelectTrigger>
        <SelectContent>
          {product === "volunteer"
            ? v_products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))
            : product === "talent/teacher"
            ? t_products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))
            : null}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleSelectChange("status", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>


        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleSelectChange("project", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          {product === "volunteer"
            ? v_projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))
            : product === "talent/teacher"
            ? t_projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project}
                </SelectItem>
              ))
            : null}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleSelectChange("foreignMc", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Home MC" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mc1">MC 1</SelectItem>
          <SelectItem value="mc2">MC 2</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleSelectChange("foreignLc", value)}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Home LC" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lc1">LC 1</SelectItem>
          <SelectItem value="lc2">LC 2</SelectItem>
        </SelectContent>
      </Select>

      {/* Hide Duration filter when Global Volunteer is selected */}
      {product !== "volunteer" && (
      <Select onValueChange={(value) => handleSelectChange("duration", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short</SelectItem>
            <SelectItem value="long">Long</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
