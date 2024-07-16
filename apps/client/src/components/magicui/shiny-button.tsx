import { motion, type AnimationProps } from "framer-motion";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

const ShinyButton = ({ text = "shiny-button" }) => {
  return (
    <motion.button
      {...animationProps}
      style={{
        maskImage:
          "linear-gradient(-75deg, var(--primary) calc(var(--primary) + 20%), transparent calc(var(--primary-foreground) + 30%), var(--primary) calc(var(--x) + 100%))",
      }}
    >
      <p className="text-white">
        {text}
      </p>
    </motion.button>
  );
};

export default ShinyButton;