"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.2,
      }}
      className={`flex flex-wrap ${className}`}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className="mr-[0.25em] inline-block overflow-hidden"
        >
          <motion.span
            variants={{
              hidden: {
                y: "110%",
                opacity: 0,
              },

              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration: 0.8,
                  delay: delay + wordIndex * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}