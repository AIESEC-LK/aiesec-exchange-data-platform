"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

const rankingData = [
  { entity: "Colombo Central", apl: 4321, ppl: 4318 },
  { entity: "Colombo North", apl: 4033, ppl: 4030 },
  { entity: "Colombo South", apl: 3122, ppl: 3122 },
  { entity: "Kandy", apl: 2104, ppl: 2100 },
  { entity: "NIBM", apl: 2003, ppl: 2000 },
  { entity: "NSBM", apl: 1894, ppl: 1700 },
  { entity: "Rajarata", apl: 2500, ppl: 2400 },
  { entity: "Ruhuna", apl: 2402, ppl: 2402 },
  { entity: "SLIIT", apl: 1335, ppl: 1328 },
  { entity: "USJ", apl: 567, ppl: 560 },
];

export default function EntityRanking() {
  return (
    <Card className="shadow-md rounded-lg bg-white p-4">
      <CardContent>
        <h2 className="text-lg font-bold mb-4">Entity Ranking</h2>
        <div className="grid grid-cols-3 text-sm font-semibold text-gray-700 border-b pb-2">
          <span>Entity</span>
          <span className="text-center">APL</span>
          <span className="text-center">PPL</span>
        </div>
        {rankingData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 text-sm py-2 border-b last:border-none"
          >
            <span>{item.entity}</span>
            <span className="text-center">{item.apl}</span>
            <span className="text-center">{item.ppl}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
