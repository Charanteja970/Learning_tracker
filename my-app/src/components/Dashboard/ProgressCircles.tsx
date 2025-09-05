import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "default" | "expanded";

const CircleGroup = ({ label }: { label: string }) => {
  const [mode, setMode] = useState<ViewMode>("default");

  // Mocked progress data (you can later sync this with real stats)
  const progressData = {
    Java: 70,
    Python: 55,
    DSA: 40,
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      onMouseEnter={() => setMode("expanded")}
      onMouseLeave={() => setMode("default")}
    >
      <AnimatePresence mode="wait">
        {mode === "default" ? (
          <motion.div
            key="main"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-32 h-32 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg cursor-pointer"
          >
            {label}
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-4"
          >
            {Object.entries(progressData).map(([topic, value]) => (
              <motion.div
                key={topic}
                className="w-20 h-20 rounded-full bg-green-500 text-white flex flex-col items-center justify-center shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-sm font-semibold">{topic}</span>
                <span className="text-xs">{value}%</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProgressCircles() {
  return (
    <div className="flex justify-center gap-12 mt-10">
      <CircleGroup label="Daily" />
      <CircleGroup label="Weekly" />
      <CircleGroup label="Monthly" />
    </div>
  );
}
