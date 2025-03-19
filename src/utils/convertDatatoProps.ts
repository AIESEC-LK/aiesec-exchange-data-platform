type FunnelStages = {
  applied?: number;
  accepted?: number;
  approved?: number;
  realized?: number;
  completed?: number;
};

export const convertToStageArray = (data: any) => {
  console.debug("convertToStageArray - input:", data);
  if (!data) return [];

  const stages = ["applied", "accepted", "approved", "realized", "completed"];

  const result = stages.map((stage) => ({
    stage: stage.charAt(0).toUpperCase() + stage.slice(1), // Capitalizing first letter
    value: data[stage as keyof FunnelStages] || 0, // Default to 0 if missing
  }));

  console.debug("convertToStageArray - output:", result);
  return result;
};

// Example usage:
// const funnelStages = { applied: 123, accepted: 20, approved: 13 };
// const result = convertToStageArray(funnelStages);
// console.log(result);

type McData = Record<string, number>;

type RatioTableEntry = {
  mc: string;
  aplCount: number;
  aplApd: number;
  processTime: number;
};

export const converToRatioTableData = (
  mcApprovedCount: McData | null,
  mcCount: McData | null,
  ProcessTimeData: McData | null
): RatioTableEntry[] => {
  if (!mcApprovedCount || !mcCount) return [];

  const allKeys = new Set([
    ...Object.keys(mcApprovedCount),
    ...Object.keys(mcCount),
  ]);

  const result = Array.from(allKeys).map((mc) => {
    const aplCount = mcCount[mc] || 0;
    const approvedCount = mcApprovedCount[mc] || 0;
    const aplApd = aplCount > 0 ? (approvedCount / aplCount) * 100 : 0;
    const processTime = ProcessTimeData![mc] || 0;

    return {
      mc: mc,
      aplCount: aplCount,
      aplApd: parseFloat(aplApd.toFixed(2)),
      processTime: processTime,
    };
  });

  return result;
};
// const mcApprovedCount = { hongkong: 34, Turkey: 24, India: 13, Pakistan: 35 };
// const mcCount = { India: 46, Pakistan: 34, HonhKong: 100, Turkey: 20 };
// const ratioTableData = converToRatioTableData(mcApprovedCount, mcCount);
// console.log(ratioTableData);

type McEntry = {
  mc: string;
  count: number;
};

export const convertMcData = (data: McData | null): McEntry[] => {
  if (!data) return [];
  const result = Object.entries(data).map(([mc, count]) => ({ mc, count }));
  return result;
};

// Example usage:
// const exampleData: McData = { india: 34, japan: 100, pakistan: 45 };
// const convertedArray: McEntry[] = convertMapToArray(exampleData);

// console.log(convertedArray);

type LcData = Record<string, number>;

type LcEntry = {
  lc: string;
  count: number;
};

export const convertLcDataToArray = (data: LcData | null): LcEntry[] => {
  if (!data) return [];
  const result = Object.entries(data).map(([lc, count]) => ({ lc, count }));
  return result;
};

// Example usage:
// const exampleLcData: LcData = { Ainshams: 186, Helwan: 305 };
// const lcChartData: LcEntry[] = convertLcDataToArray(exampleLcData);

// console.log(lcChartData);

type EntityData = Record<string, number>;

type EntityEntry = {
  entity: string;
  count: number;
};

export const convertEntityDataToArray = (
  data: EntityData | null
): EntityEntry[] => {
  if (!data) return [];
  const result = Object.entries(data).map(([entity, count]) => {
    let shortEntity = entity;
    if (entity.toUpperCase() === "COLOMBO SOUTH") shortEntity = "CS";
    else if (entity.toUpperCase() === "COLOMBO NORTH") shortEntity = "CN";
    else if (entity.toUpperCase() === "COLOMBO CENTRAL") shortEntity = "CC";
    else if (entity.toUpperCase() === "KANDY") shortEntity = "Kan";
    else if (entity.toUpperCase() === "RAJARATA") shortEntity = "Raj";
    else if (entity.toUpperCase() === "RUHUNA") shortEntity = "Ruh";
    else if (entity === "MC Sri Lanka") shortEntity = "MC";
    return { entity: shortEntity, count };
  });
  return result;
};

// Example usage:
// const exampleEntityData: EntityData = { CS: 187, CC: 200, CN: 275, Kandy: 173 };
// const entityChartData: EntityEntry[] =
//   convertEntityDataToArray(exampleEntityData);

// console.log(entityChartData);
export function convertToRegionalData(
  input: Record<string, number> | null
): { region: string; count: number }[] {
  if (!input) return [];
  return Object.entries(input)
    .map(([key, value]) => ({
      region: key.replace(/\s+/g, "_"), // Replace spaces with underscores
      count: value,
    }))
    .sort((a, b) => b.count - a.count); // Sort by count in descending order
}

export function convertRankingData(
  lcCount: Record<string, number> | null,
  lcPplCount: Record<string, number> | null
): { entity: string; apl: number; ppl: number }[] {
  if (!lcCount || !lcPplCount) return [];

  const entities = Object.keys(lcCount);
  const arr = entities.map((entity) => ({
    entity,
    apl: lcCount[entity] || 0,
    ppl: lcPplCount[entity] || 0,
  }));
  return arr.sort((a, b) => b.apl - a.apl);
}

export function convertToStatsData(
  data: Record<string, number> | null
): { label: string; value: number }[] {
  if (!data) return [];

  const stages = [
    "open",
    "applied",
    "accepted",
    "approved",
    "realized",
    "finished",
    "completed",
  ];
  const stats = stages.map((stage) => ({
    label: stage.charAt(0).toUpperCase() + stage.slice(1),
    value: data[stage] || 0,
  }));
  return stats;
}
