/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/cn";

const randomMessages = [
  {
    title: "Just a moment, generating your pull request review...",
    subtitle:
      "Did you know 50% of pull requests are in idle for over half their lifespan?",
  },
  {
    title:
      "Hang tight, we're finding the best solution for your pull request...",
    subtitle:
      "Fun fact: Smaller pull requests can get picked up 20 times faster than larger ones.",
  },
  {
    title: "Almost there, setting up your pull request review...",
    subtitle:
      "Some teams miss commitments due to long pull request cycles, impacting overall productivity.",
  },
  {
    title: "Generating your pull request review...",
    subtitle:
      "Developers often spend an entire workday on reviewing pull requests. Efficient reviews are key to faster deployments.",
  },
  {
    title: "Preparing your pull request review...",
    subtitle:
      "Teams with automated notifications for pull request assignments reduce idle time significantly, speeding up the review process.",
  },
];

export const TextGenerateEffect = ({
  className,
  filter = true,
  duration = 1,
  aiLoading,
}: {
  className?: string;
  filter?: boolean;
  duration?: number;
  aiLoading: boolean;
}) => {
  const [titleScope, animateTitle] = useAnimate();
  const [subtitleScope, animateSubtitle] = useAnimate();
  const [messageIndex, setMessageIndex] = useState(
    Math.floor(Math.random() * 5)
  );
  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (aiLoading) {
      intervalId = setInterval(() => {
        setMessageIndex((prevIndex) => {
          let randomNum = Math.floor(Math.random() * 5);
          while (prevIndex === randomNum) {
            randomNum = Math.floor(Math.random() * 5);
          }
          return randomNum;
        });
      }, 8000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [aiLoading]);

  const titleWords = randomMessages[messageIndex].title.split(" ");
  const subtitleWords = randomMessages[messageIndex].subtitle.split(" ");

  useEffect(() => {
    const animateAll = async () => {
      await animateTitle(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );

      await animateSubtitle(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        }
      );
    };

    animateAll();
  }, [titleScope.current, subtitleScope.current, messageIndex]);

  const renderWords = (
    words: string[],
    scope: any,
    additionalClass?: string
  ) => {
    return (
      <motion.div ref={scope}>
        {words.map((word, idx) => (
          <motion.span
            key={word + idx}
            className={cn("text-white opacity-0", additionalClass)}
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4 text-center">
        <div className="text-2xl leading-snug tracking-wide">
          {renderWords(titleWords, titleScope, "text-xl font-semibold")}
        </div>
        <div className="text-lg leading-snug tracking-wide mt-2">
          {renderWords(
            subtitleWords,
            subtitleScope,
            "text-xs text-opacity-50 font-normal"
          )}
        </div>
      </div>
    </div>
  );
};
