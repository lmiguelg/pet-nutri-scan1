import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export const FullScreenLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    >
      <motion.h1
        initial={{ scale: 0.9, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-primary mb-8"
      >
        PawScan AI
      </motion.h1>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-2"
      >
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-lg text-gray-600">Analyzing ingredients...</p>
      </motion.div>
    </motion.div>
  );
};