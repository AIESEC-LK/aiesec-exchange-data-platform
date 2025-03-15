"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "count",
    color: "blue",
  },
} satisfies ChartConfig;

import { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          className="label"
          style={{ margin: 0, fontWeight: "bold", color: "#333" }}
        >{`${payload[0].payload.lc}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function LcChart({
  chartData,
}: {
  chartData: { lc: string; count: number }[];
}) {
  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>LC Breakdown by selected Project</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div style={{ height: 400, overflowY: "auto" }}>
            <ResponsiveContainer width="100%" height={chartData.length * 30}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: -20,
                }}
              >
                <XAxis type="number" dataKey="count" hide />
                <YAxis
                  dataKey="lc"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<CustomTooltip />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={5}>
                  <LabelList dataKey="count" position="right" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
