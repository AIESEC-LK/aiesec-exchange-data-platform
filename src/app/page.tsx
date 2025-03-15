"use client";

import * as React from "react";
import { EntityChart } from "@/components/EntityChart";
import LcChart from "@/components/LcChart";
import { McChart } from "@/components/McChart";
import RatioTable from "@/components/RatioTable";
import PieChart from "@/components/PieChart";
import EntityStats from "@/components/EntityStats";
import DashboardFilters from "@/components/DashboardFilters";
import EntityRanking from "@/components/EntityRanking";
import FunnelChart from "@/components/FunnelChart";
import Navbar from "@/components/Navbar";
import DashboardFooter from "@/components/DashboardFooter";
import { useCallback, useState } from "react";

export default function Home() {








  const [responce, setResponce] = useState({});

  // Sample data for FunnelChart
  const [product, setProduct] = useState<string>("volunteer");
  const handleSetProduct = useCallback((value: string) => {
    setProduct(value);
    console.log("Value setted in Page:", value);
  }, []);
  const funnelStages = [
    {
      stage: "Applied",
      value: 10000,
    },
    {
      stage: "Accepted",
      value: 6507,
    },
    {
      stage: "Approved",
      value: 2500,
    },
    {
      stage: "Realized",
      value: 1252,
    },
    {
      stage: "Completed",
      value: 7,
    },
  ];
  const ratioTableData = [
    { mc: "Turkey", aplCount: 209, aplApd: 54.74, processTime: 4.5 },
    { mc: "Cambodia", aplCount: 214, aplApd: 54.74, processTime: 4.5 },
    { mc: "Brazil", aplCount: 192, aplApd: 54.74, processTime: 4.5 },
    { mc: "China", aplCount: 321, aplApd: 54.74, processTime: 4.5 },
    { mc: "Germany", aplCount: 178, aplApd: 54.74, processTime: 4.5 },
    { mc: "Japan", aplCount: 256, aplApd: 54.74, processTime: 4.5 },
    { mc: "USA", aplCount: 400, aplApd: 54.74, processTime: 4.5 },
    { mc: "Canada", aplCount: 150, aplApd: 54.74, processTime: 4.5 },
    { mc: "Australia", aplCount: 220, aplApd: 54.74, processTime: 4.5 },
    { mc: "Russia", aplCount: 310, aplApd: 54.74, processTime: 4.5 },
    { mc: "France", aplCount: 190, aplApd: 54.74, processTime: 4.5 },
    { mc: "Italy", aplCount: 230, aplApd: 54.74, processTime: 4.5 },
    { mc: "Spain", aplCount: 210, aplApd: 54.74, processTime: 4.5 },
    { mc: "South Korea", aplCount: 280, aplApd: 54.74, processTime: 4.5 },
    { mc: "Mexico", aplCount: 170, aplApd: 54.74, processTime: 4.5 },
    { mc: "Argentina", aplCount: 140, aplApd: 54.74, processTime: 4.5 },
    { mc: "South Africa", aplCount: 200, aplApd: 54.74, processTime: 4.5 },
    { mc: "Nigeria", aplCount: 130, aplApd: 54.74, processTime: 4.5 },
    { mc: "Kenya", aplCount: 120, aplApd: 54.74, processTime: 4.5 },
    { mc: "Indonesia", aplCount: 260, aplApd: 54.74, processTime: 4.5 },
    { mc: "Malaysia", aplCount: 240, aplApd: 54.74, processTime: 4.5 },
    { mc: "Thailand", aplCount: 270, aplApd: 54.74, processTime: 4.5 },
    { mc: "Vietnam", aplCount: 250, aplApd: 54.74, processTime: 4.5 },
    { mc: "Philippines", aplCount: 180, aplApd: 54.74, processTime: 4.5 },
    { mc: "Bangladesh", aplCount: 160, aplApd: 54.74, processTime: 4.5 },
  ];
  const mcChartData = [
    { mc: "Egypt", count: 186 },
    { mc: "India", count: 305 },
    { mc: "Nederlands", count: 237 },
    { mc: "Pakistan", count: 73 },
    { mc: "Turkey", count: 209 },
    { mc: "Cambodia", count: 214 },
    { mc: "Brazil", count: 192 },
    { mc: "China", count: 321 },
    { mc: "Germany", count: 178 },
    { mc: "Japan", count: 256 },
    { mc: "USA", count: 400 },
  ];
  const lcChartData = [
    { lc: "Ainshams", count: 186 },
    { lc: "Helwan", count: 305 },
    { lc: "Hyderabad", count: 237 },
    { lc: "Chennai", count: 73 },
    { lc: "FHCMC", count: 209 },
    { lc: "MUST", count: 214 },
    { lc: "Cairo", count: 150 },
    { lc: "Alexandria", count: 180 },
    { lc: "GUC", count: 220 },
    { lc: "Bangalore", count: 190 },
    { lc: "Mumbai", count: 210 },
    { lc: "Delhi", count: 230 },
    { lc: "Pune", count: 175 },
    { lc: "Kolkata", count: 160 },
    { lc: "Jaipur", count: 140 },
    { lc: "Lucknow", count: 155 },
    { lc: "Kanpur", count: 165 },
    { lc: "Nagpur", count: 145 },
  ];
  const entityChartData = [
    { entity: "CS", count: 187 },
    { entity: "CC", count: 200 },
    { entity: "CN", count: 275 },
    { entity: "Kandy", count: 173 },
    { entity: "SLIIT", count: 190 },
    { entity: "NIBM", count: 90 },
    { entity: "NSBM", count: 70 },
    { entity: "Rajarata", count: 70 },
    { entity: "Ruhuna", count: 90 },
    { entity: "USJ", count: 80 },
  ];
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-blue-600 text-black py-4 px-6 rounded-md shadow-md text-center">
        <Navbar setProduct={handleSetProduct} product={product} />
      </div>

      {/* Filters Section */}
      <DashboardFilters product={product} setResponce={setResponce}  />

      {/* First Row: Entity Ranking + Pie Chart + Entity Chart*/}
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col p-4 rounded-lg h-full">
          <EntityRanking />
        </div>
        <div className="flex flex-col p-4 rounded-lg h-full">
          <PieChart />
        </div>
        <div className="flex flex-col p-4 rounded-lg h-full">
          <EntityChart inputData={entityChartData} />
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



// 'use client'

// import React, { useState, FormEvent, ChangeEvent } from 'react';
// import { AlertCircle, ChevronUp, ChevronDown } from "lucide-react";



// interface ApiResponse {
//   filteredData: OpportunityData[];
//   statusCount: Record<string, number>;
//   totalCount: number;
//   hostLcs: {
//     hostLcApplicationCount: Record<string, number>;
//     hostLcPplCount: Record<string, number>;
//   };
//   homeMcApplicationCount: Record<string, number>;
//   aplToApdConverstion: {
//     apdCounts: Record<string, number>;
//     homeMcApplicationCount: Record<string, number>;
//     aplapd: Record<string, number>;
//   };
//   homeLcApplicationCount: Record<string, number>;
//   dataForFunnel: {
//     statusCount: Record<string, number>;
//     rlz_com: Number;
//     apl_acc: Number;
//     apd_rlz: Number;
//     acc_apd: Number;




//   };

//   regionCount: Record<string, number>;

// }

// const DataFilterPage: React.FC = () => {
//   const [formValues, setFormValues] = useState<FilterParams>({
//     hostLc: '',
//     from: '',
//     to: '',
//     project: '',
//     product: '',
//     homeMc: '',
//     homeLc: '',
//     status: ''
//   });

//   const [data, setData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: 'asc' | 'desc';
//   } | null>(null);

//   const handleSort = (key: string) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({ ...prev, [name]: value }));
//   };

  // const handleSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   await fetchData(formValues);
  // };

  // const handleReset = () => {
  //   setFormValues({
  //     hostLc: '',
  //     from: '',
  //     to: '',
  //     project: '',
  //     product: '',
  //     homeMc: '',
  //     homeLc: '',
  //     status: ''
  //   });
  //   setData(null);
  // };

  // const fetchData = async (params: FilterParams) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch('/api', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(params),
  //     });
  //     if (!response.ok) throw new Error('Failed to fetch data');
  //     const responseData: ApiResponse = await response.json();
  //     console.log(responseData);

  //     setData(responseData);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'An unknown error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

 

//   return (
//     <div className="container mx-auto px-4 py-8">

//       <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
//         <h2 className="text-xl font-semibold mb-4">Filter Data</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {Object.entries(formValues).map(([key, value]) => (
//               <div key={key} className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </label>
//                 <input
//                   type={key === 'from' || key === 'to' ? 'date' : 'text'}
//                   name={key}
//                   value={value}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-4 py-2 border border-gray-300 rounded-md"
//             >
//               Reset
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md"
//             >
//               {loading ? 'Loading...' : 'Apply Filters'}
//             </button>
//           </div>
//         </form>
//       </div>

//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//           <div className="flex">
//             <AlertCircle className="h-5 w-5 text-red-500" />
//             <div className="ml-3 text-red-700">{error}</div>
//           </div>
//         </div>
//       )}

     
//     </div>
//   );
// };

// export default DataFilterPage;









