"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function EntityRanking({
  rankingData,
}: {
  rankingData: { entity: string; apl: number; ppl: number }[];
}) {
  return (
    <Card className="shadow-md rounded-lg bg-white p-4">
      <CardContent className="min-h-[350px]">
        <h2 className="text-lg font-bold mb-4">Entity Ranking</h2>
        <div className="grid grid-cols-3 text-sm font-semibold text-gray-700 border-b pb-2">
          <span>Entity</span>
          <span className="text-center">APL</span>
          <span className="text-center">PPL</span>
        </div>
        {rankingData.length > 0 ? (
          <div>
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
          </div>
        ) : (
          <div className="text-center text-gray-500">No data available.</div>
        )}
      </CardContent>
    </Card>
  );
}
