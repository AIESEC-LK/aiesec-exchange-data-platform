"use client";

import { useState, useCallback } from "react";
import { Globe, GraduationCap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Navbar({
  product,
  setProduct,
  setProjectInPage,
  setStatusInPage,
}: {
  product: string;
  setProduct: (value: string) => void;
  setProjectInPage: (value: string) => void;
  setStatusInPage: (value: string) => void;
}) {
  // Define a callback function for handling product changes
  const handleProductChange = useCallback(
    (value: string) => {
      setProduct(value);
      console.log("Value set in Navbar:", value);
      console.log("Product in Navbar:", product);
    },
    [product, setProduct]
  ); // useCallback with dependency array ensures the function instance is stable

  const handleProjectChange = (value: string) => {
    setProjectInPage(value);
  };

  const handleStatusChange = (value: string) => {
    setStatusInPage(value);
  };

  return (
    <nav className="p-4" style={{ backgroundColor: "" }}>
      <div className="flex md:items-center md:justify-center flex-col md:flex-row gap-4">
        {" "}
        {/* md:justify-center to center title */}
        {/* Title - Top on Mobile, Center on Desktop */}
        <div className="w-full md:w-auto text-center">
          {" "}
          {/* Removed md:text-left, kept text-center for all views */}
          <h1 className="text-white text-lg font-bold">
            AIESEC SRI LANKA OPS DASHBOARD
          </h1>
        </div>
        {/* Spacer to push dropdown to bottom on mobile */}
        <div className="hidden md:block flex-1"></div>
        {/* Product Selection Dropdown - Bottom on Mobile, Left on Desktop */}
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <Select
            onValueChange={(e) => {
              handleProductChange(e);
              handleProjectChange("");
              handleStatusChange("");
            }}
            value={product}
          >
            <SelectTrigger className="w-full md:w-[220px] bg-white text-black">
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
              <SelectItem value="volunteer" className="bg-white">
                <Globe className="mr-2 h-4 w-4" />
                Global Volunteer
              </SelectItem>
              <SelectItem value="talent/teacher" className="bg-white">
                <GraduationCap className="mr-2 h-4 w-4" />
                Global Talent/ Teacher
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Right: Menu Options (Hidden in Mobile) - Removed from main flow, not needed */}
      {/* <div className="hidden md:flex space-x-4 text-white">
        </div> */}
    </nav>
  );
}
