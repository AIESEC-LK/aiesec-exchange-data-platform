"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EntityStats({
  statData,
  selectedStatus,
}: {
  statData: { label: string; value: number }[];
  selectedStatus: string | null;
}) {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const stats = statData.map((stat) => ({
    label: stat.label,
    value: stat.value,
    percentage: "0% of growth",
  }));

  if (!stats || !stats.length || stats.length === 0)
    return <div className="text-center text-gray-500">No data available.</div>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {stats.map((stat, index) => {
        const isSelected =
          selectedStatus?.toLowerCase() === stat.label.toLowerCase();

        return (
          <Card
            key={index}
            onClick={() => {
              if (!selectedStatus) {
                setSelectedIndex(index);
              }
            }}
            className={`shadow-md rounded-lg text-center transition-all duration-200 flex flex-col items-center justify-center h-32 p-2 ${
              isSelected
                ? "bg-blue-100 border border-blue-500 pointer-events-none"
                : selectedIndex === index
                ? "bg-blue-100 border border-blue-500"
                : "bg-white cursor-pointer"
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
                  stat.percentage.includes("-")
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {stat.percentage}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
