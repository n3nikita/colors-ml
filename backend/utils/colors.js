export const generateTrainData = (length) => {
  const data = getRGBArray(length);
  return Array.from({ length }, (_, i) => {
    const calculateColor = (color) => {
      let r = color[0],
        g = color[1],
        b = color[2];
      let yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? 0 : 1;
    };
    return {
      color: data[i],
      type: calculateColor(data[i]),
    };
  });
};

export const getRGBArray = (length = 10) => {
  const getColor = () => {
    const generateValue = (min = 0, max = 255) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return Array.from({ length: 3 }, () => generateValue());
  };
  return Array.from({ length }, () => getColor());
}