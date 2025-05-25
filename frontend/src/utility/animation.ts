interface SliderRightOptions {
  delay: number;
}

export const SliderRight = ({ delay }: SliderRightOptions) => {
  return {
    hidden: {
      opacity: 0,
      x: -100, // Negative for sliding in from the left
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay, // shorthand for delay: delay
      },
    },
  };
};

export const SliderLeft = ({ delay }: SliderRightOptions) => {
  return {
    hidden: {
      opacity: 0,
      x: 100, //
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay, // shorthand for delay: delay
      },
    },
  };
};
