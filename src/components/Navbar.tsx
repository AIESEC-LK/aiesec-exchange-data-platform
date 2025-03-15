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
}: {
  product: string;
  setProduct: (value: string) => void;
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

  return (
    <nav
      className="p-4 flex items-center justify-between"
      style={{ backgroundColor: "" }}
    >
      {/* Left: Product Selection Dropdown */}
      <Select onValueChange={(e) => handleProductChange(e)} value={product}>
        <SelectTrigger className="w-[220px] bg-white">
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

      {/* Title */}
      <h1 className="text-white text-lg font-bold flex-1 text-center md:text-center md:ml-4">
        AIESEC SRI LANKA OPS DASHBOARD
      </h1>

      {/* Right: Menu Options (Hidden in Mobile) */}
      <div className="hidden md:flex space-x-4 text-white">
        {/* Additional menu items can be added here */}
      </div>

      {/* Right: Three Dots Menu */}
      <button className="text-white">
        <span className="text-xl">⋮</span>
      </button>
    </nav>
  );
}
