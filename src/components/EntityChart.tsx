"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  count: {
    label: "count",
  },
} satisfies ChartConfig;

interface EntityData {
  entity: string;
  count: number;
}

interface EntityChartProps {
  apiUrl?: string; // Optional API URL prop
  inputData?: EntityData[]; // Optional input data prop, for static data or overrides
  status?: string; // Optional title prop
  project?: string; // Optional title prop
  product: string;
}

export function EntityChart({
  apiUrl,
  inputData: propInputData,
  status = "applied",
  project = "all projects",
  product,
}: EntityChartProps) {
  const [chartData, setChartData] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const title = `${
    status === ""
      ? "Applications"
      : status === "applied"
      ? "Applications"
      : status === "accepted"
      ? "Acceptances"
      : status === "approved"
      ? "Approvals"
      : status === "realized"
      ? "Realizations"
      : status === "completed"
      ? "Completions"
      : status.charAt(0).toUpperCase() + status.slice(1)
  } by entity for ${
    project === ""
      ? `All ${product === "volunteer" ? "projects" : "workfields"}`
      : project
  }`;
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

  // Determine data source: prop data takes priority, then API if apiUrl is provided
  const dataSource = propInputData ? propInputData : apiUrl;

  useEffect(() => {
    if (dataSource && typeof dataSource === "string") {
      // Fetch data from API if apiUrl is provided and no prop data
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(dataSource);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const jsonData: EntityData[] = await response.json();
          setChartData(jsonData);
        } catch (e: any) {
          setError(e.message || "Error fetching data");
          setChartData([]); // Ensure chartData is empty in case of error
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else if (propInputData) {
      // Use prop data directly if provided
      setChartData(propInputData);
      setLoading(false); // Not loading from API in this case
    } else {
      setLoading(false); // No data source provided, not loading
    }
  }, [dataSource, propInputData]); // Re-fetch if apiUrl or propInputData changes

  const formattedChartData = chartData.map((data, index) => ({
    ...data,
    fill: colors[index % colors.length], // Cycle through colors
  }));

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <Skeleton className="w-[200px] h-[20px]" />
            <Skeleton className="w-full h-[200px]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : formattedChartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart
              data={formattedChartData}
              className="w-full h-full" // Responsive width and height
              margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="entity"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                interval={0} // Show all entity names
                tick={(props) => (
                  <text
                    {...props}
                    transform={`rotate(-90, ${props.x}, ${props.y})`} // Rotate labels for better alignment
                    textAnchor="end"
                    className="text-xs" // Adjust font size for responsiveness
                  >
                    {props.payload.value}
                  </text>
                )}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="count"
                fill="hsl(210, 100%, 36%)"
                barSize={30}
                radius={[8, 8, 0, 0]}
                label={{
                  position: "top", // Show count values on top of bars
                  fill: "#000", // Black text for visibility
                  fontSize: 12, // Adjust font size for responsiveness
                }}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-gray-500">No data available.</div>
        )}
      </CardContent>
    </Card>
  );
}
