import { motion } from "motion/react";

export default function Loader({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.1 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 2 }}
      className="tracking-[0.2rem] text-zinc-700 flex items-center justify-center h-full w-full font-accent break-all text-2xl lowercase">
      {text}
    </motion.div>
  );
}
