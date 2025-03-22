"use client";

import * as React from "react";
import { EntityChart } from "@/components/EntityChart";
import LcChart from "@/components/LcChart";
import { McChart } from "@/components/McChart";
import RatioTable from "@/components/RatioTable";
import { RegionalPieChart } from "@/components/RegionalPieChart";
import EntityStats from "@/components/EntityStats";
import DashboardFilters from "@/components/DashboardFilters";
import EntityRanking from "@/components/EntityRanking";
import FunnelChart from "@/components/FunnelChart";
import Navbar from "@/components/Navbar";
import DashboardFooter from "@/components/DashboardFooter";
import { useCallback, useState } from "react";
import {
  convertToStageArray,
  converToRatioTableData,
  convertMcData,
  convertLcDataToArray,
  convertEntityDataToArray,
  convertToRegionalData,
  convertRankingData,
  convertToStatsData,
} from "@/utils/convertDatatoProps";
import LoadingComponent from "@/components/LoadingComponent";

export default function Home() {
  const [responce, setResponce] = useState<any>({});
  const [functionName, setFunctionName] = useState<string>("iGV");

  // Sample data for FunnelChart
  const [product, setProduct] = useState<string>("volunteer");
  const handleSetProduct = useCallback((value: string) => {
    setProduct(value);
    console.log("Value setted in Page:", value);
  }, []);
  const [lcChartData, setLcChartData] = useState<any>([]);
  const [mcChartData, setMcChartData] = useState<any>([]);
  const [entityChartData, setEntityChartData] = useState<any>([]);
  const [funnelStages, setFunnelStages] = useState<any>([]);
  const [ratioTableData, setRatioTableData] = useState<any>([]);
  const [regionalChartData, setRegionalChartData] = useState<any>([]);
  const [rankingData, setRankingData] = useState<any>([]);
  const [statsData, setStatsData] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(false);
  React.useEffect(() => {
    setFunnelStages(
      convertToStageArray(responce?.applicationResponce?.funnelCounts)
    );
    console.log("Funnel Stages", funnelStages);
    const inComingRatioTableData = converToRatioTableData(
      responce?.applicationResponce?.homeMcApprovedCount,
      responce?.applicationResponce?.homeMcCount,
      responce?.applicationResponce?.averageProcessTimePerHomeMc
    );
    const outGoingRatioTableData = converToRatioTableData(
      responce?.applicationResponce?.hostMcApprovedCount,
      responce?.applicationResponce?.hostMcCount,
      responce?.applicationResponce?.averageProcessTimePerHostMc
    );

    const incomingMcChartData = convertMcData(
      responce?.responce?.homeMcCount ??
        responce?.applicationResponce?.homeMcCount
    );
    const outGoingMcChartData = convertMcData(
      responce?.responce?.hostMcCount ??
        responce?.applicationResponce?.hostMcCount
    );

    const incomingLcChartData = convertLcDataToArray(
      responce?.responce?.homeLcCount ??
        responce?.applicationResponce?.homeLcCount
    );
    const outGoingLcChartData = convertLcDataToArray(
      responce?.responce?.hostLcCount ??
        responce?.applicationResponce?.hostLcCount
    );

    const incomingEntityChartData = convertEntityDataToArray(
      responce?.responce?.hostLcCount ??
        responce?.applicationResponce?.hostLcCount
    );

    const outGoingEntityChartData = convertEntityDataToArray(
      responce?.responce?.homeLcCount ??
        responce?.applicationResponce?.homeLcCount
    );
    const incomingRegionalChartData = convertToRegionalData(
      responce?.responce?.homeRegionalCount ??
        responce?.applicationResponce?.homeRegionalCount
    );
    const outGoingRegionalChartData = convertToRegionalData(
      responce?.responce?.hostRegionalCount ??
        responce?.applicationResponce?.hostRegionalCount
    );

    const incomingRankingData = convertRankingData(
      responce?.applicationResponce?.hostLcCount,
      responce?.applicationResponce?.hostLcPplCount
    );
    const outGoingRankingData = convertRankingData(
      responce?.applicationResponce?.homeLcCount,
      responce?.applicationResponce?.homeLcPplCount
    );
    setStatsData(convertToStatsData(responce?.appCounts));
    setRankingData(
      (functionName.startsWith("i")
        ? incomingRankingData
        : outGoingRankingData) || []
    );
    setRegionalChartData(
      (functionName.startsWith("i")
        ? incomingRegionalChartData
        : outGoingRegionalChartData) || []
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
  }, [responce]);

  const [project, setProject] = useState<string>("all projects");
  const [status, setStatus] = useState<string>("applied");

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-blue-600 text-black py-4 px-6 rounded-md shadow-md text-center">
        <Navbar setProduct={handleSetProduct} product={product} />
      </div>

      {/* Filters Section */}
      <DashboardFilters
        product={product}
        setProjectInPage={setProject}
        setStatusInPage={setStatus}
        setResponce={setResponce}
        setFunctioName={setFunctionName}
        setLoading={setLoading}
      />
      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          {/* Entity Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {" "}
            {/* Responsive full width */}
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <EntityStats statData={statsData} />{" "}
              {/* Passing data to EntityStats */}
            </div>
          </div>

          {/* First Row: Entity Ranking + Pie Chart + Entity Chart*/}
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col p-4 rounded-lg h-full">
              <EntityRanking rankingData={rankingData} />
            </div>
            <div className="flex flex-col p-4 rounded-lg h-full">
              <RegionalPieChart chartInput={regionalChartData} />
            </div>
            <div className="flex flex-col p-4 rounded-lg h-full">
              <EntityChart
                inputData={entityChartData}
                status={status}
                project={project}
                product={product}
              />
            </div>
          </div>

          {/* Second Row: Funnel Chart + LcChart */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <FunnelChart stages={funnelStages} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <LcChart
                chartData={lcChartData}
                project={project}
                product={product}
              />
            </div>
          </div>

          {/* Third Row: Ratio Table + McChart */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <RatioTable data={ratioTableData} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md h-full">
              <McChart
                chartData={mcChartData}
                project={project}
                product={product}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-center">
        <DashboardFooter />
      </div>
    </div>
  );
}
