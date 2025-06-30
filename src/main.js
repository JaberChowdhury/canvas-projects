import "./style.css";
import RotatingBar from "./scripts/RotatingBar";
import Circle from "./scripts/Circle";
import Animate from "./scripts/Animate";

window.onload = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  // Configurable parameters
  const config = {
    plusSign: {
      centerX: window.innerWidth - 300,
      centerY: window.innerHeight / 2,
      horizontalLength: 300,
      verticalLength: 300,
      thickness: 20,
      color: "orange",
      rotationSpeed: 0.01,
    },
    centerCircle: {
      radius: 15,
      color: "red",
    },
  };

  // Handle window resize
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  // Create the plus sign bars
  const horizontalBar = new RotatingBar({
    centerX: config.plusSign.centerX,
    centerY: config.plusSign.centerY,
    length: config.plusSign.horizontalLength,
    thickness: config.plusSign.thickness,
    angle: 0,
    color: config.plusSign.color,
    rotationSpeed: config.plusSign.rotationSpeed,
    ctx,
  });

  const verticalBar = new RotatingBar({
    centerX: config.plusSign.centerX,
    centerY: config.plusSign.centerY,
    length: config.plusSign.verticalLength,
    thickness: config.plusSign.thickness,
    angle: Math.PI / 2,
    color: config.plusSign.color,
    rotationSpeed: config.plusSign.rotationSpeed,
    ctx,
  });

  const center_circle = new Circle({
    fillStyle: "red",
    strokeStyle: "red",
    x: config.plusSign.centerX,
    y: config.plusSign.centerY,
    radius: config.centerCircle.radius,
    ctx,
  });

  // Create 4 circles for each edge of the plus sign
  const edgeCircles = [
    // End of vertical bar (top)
    new Circle({
      x: config.plusSign.centerX,
      y: config.plusSign.centerY,
      radius: config.centerCircle.radius - 5,
      fillStyle: "red",
      strokeStyle: "red",
      ctx,
    }),
    // End of vertical bar (bottom)
    new Circle({
      x: config.plusSign.centerX,
      y: config.plusSign.centerY,
      radius: config.centerCircle.radius - 5,
      fillStyle: "blue",
      strokeStyle: "blue",
      ctx,
    }),
    // End of horizontal bar (right)
    new Circle({
      x: config.plusSign.centerX,
      y: config.plusSign.centerY,
      radius: config.centerCircle.radius - 5,
      fillStyle: "green",
      strokeStyle: "green",
      ctx,
    }),
    // End of horizontal bar (left)
    new Circle({
      x: config.plusSign.centerX,
      y: config.plusSign.centerY,
      radius: config.centerCircle.radius - 5,
      fillStyle: "#98A1BC",
      strokeStyle: "#98A1BC",
      ctx,
    }),
  ];

  function updateEdgeCircles() {
    // Vertical bar ends (top and bottom)
    const vBar = verticalBar;
    const vHalf = vBar.length / 2;
    // edgeCircles[0].x = vBar.centerX + vHalf * Math.cos(vBar.angle);
    edgeCircles[0].x += -1;
    edgeCircles[0].y = vBar.centerY + vHalf * Math.sin(vBar.angle);
    // edgeCircles[1].x = vBar.centerX - vHalf * Math.cos(vBar.angle);
    edgeCircles[1].x += -1;
    edgeCircles[1].y = vBar.centerY - vHalf * Math.sin(vBar.angle);
    // Horizontal bar ends (right and left)
    const hBar = horizontalBar;
    const hHalf = hBar.length / 2;
    // edgeCircles[2].x = hBar.centerX + hHalf * Math.cos(hBar.angle);
    edgeCircles[2].x += -1;
    edgeCircles[2].y = hBar.centerY + hHalf * Math.sin(hBar.angle);
    // edgeCircles[3].x = hBar.centerX - hHalf * Math.cos(hBar.angle);
    edgeCircles[3].x += -1;
    edgeCircles[3].y = hBar.centerY - hHalf * Math.sin(hBar.angle);
  }
  // Pass functions, not function calls!
  Animate(
    [
      () => horizontalBar.update(),
      () => verticalBar.update(),
      () => updateEdgeCircles(),
      () => horizontalBar.draw(),
      () => verticalBar.draw(),
      () => center_circle.draw(),
      ...edgeCircles.map((c) => () => c.draw()),
    ],
    canvas,
    ctx
  );

  window.config = config;
};
