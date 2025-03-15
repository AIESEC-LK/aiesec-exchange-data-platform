"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "count",
  },
} satisfies ChartConfig;

export function EntityChart({
  inputData,
}: {
  inputData: { entity: string; count: number }[];
}) {
  const colors = [
    "hsl(210, 100%, 36%)",
    "hsl(120, 100%, 36%)",
    "hsl(60, 100%, 36%)",
    "hsl(30, 100%, 36%)",
    "hsl(0, 100%, 36%)",
    "hsl(300, 100%, 36%)",
    "hsl(270, 100%, 36%)",
    "hsl(240, 100%, 36%)",
    "hsl(180, 100%, 36%)",
    "hsl(150, 100%, 36%)",
  ];
  const chartData = inputData.map((data, index) => ({
    ...data,
    fill: colors[index],
  }));
  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>Applications By Selected Project</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="entity"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" strokeWidth={2} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
