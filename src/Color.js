const Color = () => {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return `rgba(${r},${g},${b},1)`;
};

export default Color;
