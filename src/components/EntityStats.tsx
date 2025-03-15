"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Opens", value: "18,420", percentage: "+11% of Growth" },
  { label: "Applications", value: "11,147", percentage: "+23.4% of Growth" },
  { label: "Acceptance", value: "2,253", percentage: "+34.5% of Growth" },
  { label: "Approvals", value: "1,123", percentage: "+43.2% of Growth" },
  { label: "Realizations", value: "854", percentage: "-12% of Growth" },
  { label: "Finished", value: "457", percentage: "-13.2% of Growth" },
  { label: "Completions", value: "312", percentage: "+4.4% of Growth" },
];

export default function EntityStats() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <div className="grid grid-cols-7 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          onClick={() => setSelectedIndex(index)}
          className={`shadow-md rounded-lg text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center h-32 p-2 ${
            selectedIndex === index
              ? "bg-blue-100 border border-blue-500"
              : "bg-white"
          }`}
        >
          <CardHeader className="text-center p-0">
            <CardTitle className="text-sm font-semibold">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center p-0">
            <p className="text-3xl font-bold">{stat.value}</p>
            <p
              className={`text-xs mt-1 ${
                stat.percentage.includes("-") ? "text-red-500" : "text-gray-500"
              }`}
            >
              {stat.percentage}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
