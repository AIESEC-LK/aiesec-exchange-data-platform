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
      if (previousStageValue === 0) return "0.00";
      const conversionRate = (stage.value / previousStageValue) * 100;
      return conversionRate.toFixed(2);
    });
  };

  const conversionRates = calculateConversionRates();

  // Calculate heights for visualization
  const calculateHeights = () => {
    const maxValue = Math.max(...stages.map((stage) => stage.value));
    return stages.map((stage) => (stage.value / maxValue) * 100);
  };

  const heights = calculateHeights();

  return (
    <div className="w-full max-w-6xl mx-auto border border-gray-300 rounded-lg p-4 ">
      {/* Header information - Stage names and absolute values */}
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

      {/* Funnel visualization - horizontal with center alignment */}
      <div className="relative w-full h-64">
        {stages.map((_stage, index) => {
          // Calculate height of the current and next stage
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
              {/* Trapezoid shape for each funnel segment */}
              <div
                className="absolute w-full transition-transform duration-300 transform hover:scale-105 hover:border-blue-400 shadow-md border border-gray-300 rounded-xl"
                style={{
                  height: `${leftHeight}%`,
                  top: `${(100 - leftHeight) / 2}%`,
                  clipPath: `polygon(0 0, 100% ${
                    (1 - rightHeight / leftHeight) * 50
                  }%, 100% ${
                    100 - (1 - rightHeight / leftHeight) * 50
                  }%, 0 100%)`,
                  background: `linear-gradient(135deg, 
                    ${index === 0 ? "#fbbf24" : "#93c5fd"}, 
                    ${index === stages.length - 2 ? "#60a5fa" : "#93c5fd"})`,
                  boxShadow: "0px 0px 10px rgba(0, 0, 255, 0.3)",
                  zIndex: 10 - index,
                }}
              ></div>

              {/* Conversion rate label */}
              {stages.length - 1 > index && (
                <div
                  className={`absolute px-4 py-2 rounded-md font-bold text-lg z-20 text-black bg-opacity-80 ${labelColors[index]} shadow-md border border-gray-300`}
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
  );
};

export default FunnelChart;
