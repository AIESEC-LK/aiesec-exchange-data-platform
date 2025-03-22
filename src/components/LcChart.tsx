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
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <div style={{ height: 400, overflowY: "auto" }}>
              <ResponsiveContainer width="100%" height={chartData.length * 30}>
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
                  <XAxis type="number" dataKey="count" hide />
                  <YAxis
                    dataKey="lc"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    // Ensure all LC names are displayed
                    tickFormatter={(value) => {
                      if (value.includes("University")) {
                        value = value.replace("University", "Uni");
                      }
                      if (value.length > 20) {
                        value = value
                          .split(" ")
                          .map(
                            (word: string, index: number) =>
                              index === 0
                                ? word.replace(/[^a-zA-Z]/g, "") // Keep the first word fully, remove special characters
                                : word.replace(/[^a-zA-Z]/g, "").charAt(0) // Use acronym for subsequent words
                          )
                          .join("");
                      }
                      value = value.replace(/\([^)]*\)/g, "");
                      return value.split(" ").join("-"); // Break LC names into separate lines
                    }}
                  />
                  <ChartTooltip cursor={false} content={<CustomTooltip />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={5}
                    className="my-2"
                    barSize={20} // Set a fixed bar size to avoid narrow bars
                  >
                    <LabelList dataKey="count" position="right" />
                  </Bar>
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
// Update the tickFormatter function to display the full LC name
