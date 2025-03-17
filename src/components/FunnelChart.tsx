interface Stage {
  stage: string;
  value: number;
}

export interface FunnelChartProps {
  stages: Stage[];
}

const FunnelChart: React.FC<FunnelChartProps> = ({ stages }) => {
  // Predefined colors for percentage labels
  const labelColors = [
    "bg-yellow-200",
    "bg-blue-300",
    "bg-purple-200",
    "bg-green-200",
  ];

  // Calculate conversion percentages between consecutive stages
  const calculateConversionRates = () => {
    return stages.map((stage, index) => {
      if (index === 0) return null;
      const previousStageValue = stages[index - 1].value;
      const conversionRate = (stage.value / previousStageValue) * 100;
      return conversionRate.toFixed(2);
    });
  };

  const conversionRates = calculateConversionRates();

  // Calculate heights for visualization (percentage based on max value)
  const calculateHeights = () => {
    const maxValue = Math.max(...stages.map((stage) => stage.value));
    return stages.map((stage) => (stage.value / maxValue) * 100);
  };

  const heights = calculateHeights();

  return (
    <div className="w-full max-w-6xl mx-auto border border-gray-300 rounded-lg p-6">
      {/* --- Horizontal Layout (for md screens and above) --- */}
      <div className="md:block hidden">
        {/* Header information - Stage names and absolute values (Horizontal) */}
        <div className="grid grid-cols-5 w-full mb-6 text-center text-lg font-semibold">
          {stages.map((stage, index) => (
            <div key={index}>
              <div className="text-gray-700">{stage.stage}</div>
              <div className="text-2xl font-extrabold text-blue-500">
                {stage.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Funnel visualization - horizontal */}
        <div className="relative w-full h-64">
          {stages.map((_stage, index) => {
            const leftHeight = heights[index];
            const rightHeight = heights[index + 1];

            return (
              <div
                key={index}
                className="absolute h-full"
                style={{
                  left: `${(index * 100) / 5}%`,
                  width: "20%",
                }}
              >
                {/* Trapezoid shape for each funnel segment (Horizontal) */}
                <div
                  className="absolute w-full transition-transform duration-300 transform hover:scale-105 hover:border-blue-400 shadow-md border border-gray-300 rounded-md"
                  style={{
                    height: `${leftHeight}%`,
                    top: `${(100 - leftHeight) / 2}%`,
                    clipPath: `polygon(0 0, 100% ${
                      (1 - rightHeight / leftHeight) * 50
                    }%, 100% ${
                      100 - (1 - rightHeight / leftHeight) * 50
                    }%, 0 100%)`,
                    background: `linear-gradient(135deg,
                      ${index === 0 ? "#fcd34d" : "#60a5fa"},
                      ${index === stages.length - 2 ? "#3b82f6" : "#60a5fa"})`,
                    boxShadow: "0px 0px 8px rgba(0, 0, 255, 0.2)",
                    zIndex: 10 - index,
                  }}
                ></div>

                {/* Conversion rate label (Horizontal) */}
                {stages.length - 1 > index && (
                  <div
                    className={`absolute px-4 py-2 rounded-md font-semibold text-lg z-20 text-gray-800 bg-white bg-opacity-75 shadow-sm border border-gray-200`}
                    style={{
                      right: "-12%",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {conversionRates[index + 1]}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Vertical Layout (for sm screens and below) --- */}
      <div className="block md:hidden">
        {/* Funnel visualization - vertical */}
        <div className="relative w-full">
          {stages.map((stage, index) => {
            const stageHeight = heights[index];
            const nextStageHeight = heights[index + 1];
            const isLastStage = index === stages.length - 1;

            return (
              <div key={index} className="relative w-full mb-10 last:mb-0">
                {/* Header information - Stage names and absolute values (Vertical) */}
                <div className="text-center mb-3">
                  <div className="text-gray-700 text-lg">{stage.stage}</div>
                  <div className="text-2xl font-extrabold text-blue-500">
                    {stage.value.toLocaleString()}
                  </div>
                </div>

                {/* Trapezoid shape for each funnel segment (Vertical) - Refined Styling */}
                <div
                  className="relative mx-auto transition-transform duration-300 transform hover:scale-105 hover:border-blue-400 shadow-md border border-gray-300 rounded-md"
                  style={{
                    width: "90%",
                    height: `90px`,
                    clipPath: isLastStage
                      ? `polygon(0 0, 100% 0%, ${
                          100 - (1 - stageHeight / stageHeight) * 40
                        }% 100%, ${(1 - stageHeight / stageHeight) * 40}% 100%)`
                      : `polygon(0 0, 100% 0%, ${
                          100 -
                          (1 -
                            (nextStageHeight ? nextStageHeight : stageHeight) /
                              stageHeight) *
                            40
                        }% 100%, ${
                          (1 -
                            (nextStageHeight ? nextStageHeight : stageHeight) /
                              stageHeight) *
                          40
                        }% 100%)`,
                    background: `linear-gradient(90deg,
                      ${index === 0 ? "#fcd34d" : "#60a5fa"},
                      ${index === stages.length - 2 ? "#3b82f6" : "#60a5fa"})`,
                    boxShadow: "0px 0px 8px rgba(0, 0, 255, 0.2)",
                    zIndex: 10 - index,
                  }}
                ></div>

                {/* Conversion rate label (Vertical) - Adjusted positioning and styling */}
                {stages.length - 1 > index && (
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-7 px-4 py-2 rounded-md font-semibold text-lg z-20 text-gray-800 bg-white bg-opacity-75 shadow-sm border border-gray-200`}
                  >
                    {conversionRates[index + 1]}%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
