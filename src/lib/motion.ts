export const motionPresets = {
  blurWordRise: {
    hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
    }
  },

  fadeBlurUp: (delay = 0) => ({
    initial: { opacity: 0, y: 26, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
  }),

  softScaleIn: (delay = 0) => ({
    initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
    whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }
  })
};
