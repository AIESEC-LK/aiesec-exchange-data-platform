import React from "react";
import { motion } from "framer-motion";

const LoadingComponent = () => {
  const circleColors = ["#f85a40", "#037ef3", "#00c16e"];

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-pink-50">
      <div className="flex flex-col items-center space-y-10">
        <div className="flex space-x-4">
          {circleColors.map((color, index) => (
            <motion.div
              key={index}
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: color }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        <motion.p
          className="text-xl font-medium text-gray-700"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading, please wait...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingComponent;
