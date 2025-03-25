"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "count",
    color: "orange",
  },
} satisfies ChartConfig;

import { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p
          className="label"
          style={{ margin: 0, fontWeight: "bold" }}
        >{`${payload[0].payload.mc}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export function McChart({
  chartData,
  project,
  product,
}: {
  chartData: { mc: string; count: number }[];
  project: string;
  product: string;
}) {
  return (
    <Card className="h-[500px]">
      <CardHeader>
        <CardTitle>
          MC Breakdown for{" "}
          {project === ""
            ? `All ${product === "volunteer" ? "projects" : "workfields"}`
            : project}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData && chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <div style={{ height: 400, overflowY: "auto" }}>
              <ResponsiveContainer
                width="100%"
                height={Math.max(chartData.length * 30, 200)}
              >
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  barGap={106}
                  barSize={32}
                  margin={{
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 50,
                  }}
                >
                  <XAxis type="number" dataKey="count" />
                  <YAxis
                    dataKey="mc"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip cursor={false} content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={5} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        ) : (
          <div className="text-center text-gray-500">No data available.</div>
        )}
      </CardContent>
    </Card>
  );
}
