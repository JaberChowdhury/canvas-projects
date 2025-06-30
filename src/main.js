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

  const dot_circle = new Circle({
    x: config.plusSign.centerX,
    y: config.plusSign.centerY + config.plusSign.verticalLength - 310 / 2,
    radius: config.centerCircle.radius - 5,
    ctx,
  });
  // Pass functions, not function calls!
  Animate(
    [
      () => horizontalBar.update(),
      () => verticalBar.update(),
      () => horizontalBar.draw(),
      () => verticalBar.draw(),
      () => center_circle.draw(),
      () => dot_circle.draw(),
      // () => dot_circle.update(-2, 0),
    ],
    canvas,
    ctx
  );

  window.config = config;
};
