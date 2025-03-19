import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MarqueePrompts({
  prompts,
  speed,
  direction = "left",
  handleSubmitSuggested,
}: {
  prompts: string[];
  speed: number;
  direction?: "left" | "right";
  handleSubmitSuggested: (query: string) => void;
}) {
  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      const totalWidth = prompts.reduce(
        (acc, prompt) => acc + prompt.length * 10,
        0
      );
      setMarqueeWidth(totalWidth);
    };
    calculateWidth();
  }, [prompts]);

  return (
    <div className="overflow-hidden whitespace-nowrap max-w-xl mx-auto relative w-full">
      <motion.div
        className="flex gap-3"
        animate={{
          x: direction === "left" ? [0, -marqueeWidth] : [-marqueeWidth, 0],
        }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
        style={{ minWidth: marqueeWidth * 2 }}
      >
        {[...prompts, ...prompts].map((prompt, index) => (
          <p key={index} className="text-sm px-4 py-2 rounded-full bg-black/5 text-black/60 cursor-pointer hover:bg-black/10" onClick={() => handleSubmitSuggested(prompt)}>
            {prompt}
          </p>
        ))}
      </motion.div>
      <div className="absolute top-0 left-0 left-to-right-gradient h-full w-full z-[100] pointer-events-none"/>
    </div>
  );
}
