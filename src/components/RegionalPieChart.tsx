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
      case "Asia Pacific":
        return "#037ef3";
      case "Europe":
        return "#f48924";
      case "Middle East Africa":
        return "#00c16e";
      case "Americas":
        return "#7552cc";
      default:
        return "#000000";
    }
  }
  const isAllValuesZero = chartData.every((item) => item.count === 0);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Regional Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 justify-center items-center min-h-[300px]">
        {chartData && chartData.length > 0 && !isAllValuesZero ? (
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
        ) : (
          <div className="text-center text-gray-500">No data available.</div>
        )}
      </CardContent>
    </Card>
  );
};
