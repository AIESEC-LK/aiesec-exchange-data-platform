"use client";

import * as React from "react";
import { EntityChart } from "@/components/EntityChart";
import LcChart from "@/components/LcChart";
import { McChart } from "@/components/McChart";
import RatioTable from "@/components/RatioTable";
import PieChart from "@/components/PieChart";
import DashboardFilters from "@/components/DashboardFilters";
import EntityRanking from "@/components/EntityRanking";
import FunnelChart from "@/components/FunnelChart";
import Navbar from "@/components/Navbar";
import DashboardFooter from "@/components/DashboardFooter";
import { useCallback, useState } from "react";
import {
  convertEntityDataToArray,
  convertLcDataToArray,
  convertMcData,
  converToRatioTableData,
  convertToStageArray,
} from "@/utils/convertDatatoProps";
import { FilterRequestBody } from "./api/route";
import { fetchFilteredData } from "@/services/fetch";

export default function Home() {
  // Sample data for FunnelChart

  const [allData, setAllData] = useState<any>(null);

  const [product, setProduct] = useState<string>("volunteer");
  const handleSetProduct = useCallback((value: string) => {
    setProduct(value);
  }, []);
  const initialFunction = product === "volunteer" ? "iGV" : "iGTe";
  const [functionName, setFunctionName] = useState<string>(initialFunction);
  const handleSetFunction = useCallback((value: string) => {
    setFunctionName(value);
    setFilterData((prev) => ({ ...prev, product: value }));
    console.log("Value setted in Page:", value);
  }, []);

  //need to fix which data to use based on incoming or outgoing
  //TODO: find logic

  const [filterData, setFilterData] = useState<FilterRequestBody>({
    product: initialFunction,
  } as FilterRequestBody);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFilteredData(filterData);
        setAllData(response);
        console.log("Data fetched", response);
        console.log("Application Responce:", allData?.applicationResponce);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [filterData]);

  const [lcChartData, setLcChartData] = useState<any>([]);
  const [mcChartData, setMcChartData] = useState<any>([]);
  const [entityChartData, setEntityChartData] = useState<any>([]);
  const [funnelStages, setFunnelStages] = useState<any>([]);
  const [ratioTableData, setRatioTableData] = useState<any>([]);
  React.useEffect(() => {
    console.log("All Data:", allData);
    console.log("useEffect Running");
    setFunnelStages(
      convertToStageArray(allData?.applicationResponce?.funnelCounts)
    );
    const inComingRatioTableData = converToRatioTableData(
      allData?.applicationResponce?.homeMcApprovedCount,
      allData?.applicationResponce?.homeMcCount
    );
    const outGoingRatioTableData = converToRatioTableData(
      allData?.applicationResponce?.hostMcApprovedCount,
      allData?.applicationResponce?.hostMcCount
    );

    const incomingMcChartData = convertMcData(allData?.responce?.homeMcCount);
    const outGoingMcChartData = convertMcData(allData?.responce?.hostMcCount);

    const incomingLcChartData = convertLcDataToArray(
      allData?.responce?.homeLcCount
    );
    const outGoingLcChartData = convertLcDataToArray(
      allData?.responce?.hostLcCount
    );

    const incomingEntityChartData = convertEntityDataToArray(
      allData?.responce?.hostLcCount
    );

    const outGoingEntityChartData = convertEntityDataToArray(
      allData?.responce?.homeLcCount
    );

    setLcChartData(
      (functionName.startsWith("i")
        ? incomingLcChartData
        : outGoingLcChartData) || []
    );
    setMcChartData(
      (functionName.startsWith("i")
        ? incomingMcChartData
        : outGoingMcChartData) || []
    );

    setEntityChartData(
      (functionName.startsWith("i")
        ? incomingEntityChartData
        : outGoingEntityChartData) || []
    );
    setRatioTableData(
      (functionName.startsWith("i")
        ? inComingRatioTableData
        : outGoingRatioTableData) || []
    );
  }, [allData]);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-blue-600 text-black py-4 px-6 rounded-md shadow-md text-center">
        <Navbar setProduct={handleSetProduct} product={product} />
      </div>

      {/* Filters Section */}
      <DashboardFilters product={product} setFunction={handleSetFunction} />

      {/* First Row: Entity Ranking + Pie Chart + Entity Chart*/}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col p-4 rounded-lg h-full">
          <EntityRanking />
        </div>
        <div className="flex flex-col p-4 rounded-lg h-full">
          <PieChart />
        </div>
        <div className="flex flex-col p-4 rounded-lg h-full">
          {/* TODO: Need to get the status from filter bar */}
          <EntityChart status="" inputData={entityChartData} />
        </div>
      </div>

      {/* Second Row: Funnel Chart + LcChart */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <FunnelChart stages={funnelStages} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <LcChart chartData={lcChartData} />
        </div>
      </div>

      {/* Third Row: Ratio Table + McChart */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <RatioTable data={ratioTableData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          <McChart chartData={mcChartData} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center">
        <DashboardFooter />
      </div>
    </div>
  );
}
