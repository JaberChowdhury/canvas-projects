const distance = (circle1, circle2) => {
  const x1 = circle1.x;
  const y1 = circle1.y;
  const x2 = circle2.x;
  const y2 = circle2.y;
  const distanceX = x2 - x1;
  const distanceY = y2 - y1;
  return Math.sqrt(Math.pow(distanceX, 2), Math.pow(distanceY, 2));
};

export default distance;
