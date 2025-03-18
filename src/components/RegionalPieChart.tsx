"use client";

import React from "react";
import { Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const RegionalPieChart = ({
  chartInput,
}: {
  chartInput: { region: string; count: number }[];
}) => {
  const chartData = chartInput.map((item) => ({
    ...item,
    fill: getColorForRegion(item.region),
  }));

  const chartConfig = chartData.reduce((config, item) => {
    config[item.region] = {
      label: item.region,
      color: getColorForRegion(item.region),
    };
    return config;
  }, {} as ChartConfig);

  function getColorForRegion(region: string): string {
    switch (region) {
      case "Asia_Pacific":
        return "#343a40";
      case "Europe":
        return "#007bff";
      case "Middle_East_Africa":
        return "#28a745";
      case "Americas":
        return "#dc3545";
      default:
        return "#000000";
    }
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Regional Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="count" />
            <Tooltip
              formatter={(value, name, props) => [
                `${value}`,
                `${props.payload.region}`,
              ]}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="region" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
