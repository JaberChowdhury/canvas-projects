import "./style.css";
import dom from "./src/dom";
import Particle from "./src/Particle";
import _ from "lodash";
import distance from "./src/distance";

let circles = [];
let canvas;
let loader;
let ctx;
window.onload = () => {
  // state
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let limit = 4;
  if (ww > wh) {
    limit = ww / 70;
  }
  const colors = [
    "#FDF7E4",
    "#FAEED1",
    "#DED0B6",
    "#BBAB8C",
    "#9A3B3B",
    "#C08261",
    "#E2C799",
    "#F2ECBE",
  ];

  // selecting canvas
  canvas = dom("#canvas");
  loader = dom("#loader");
  ctx = canvas.getContext("2d");
  canvas.width = ww;
  canvas.height = wh;

  window.onresize = () => {
    ww = window.innerWidth;
    canvas.window = window.innerWidth;
    wh = window.innerHeight;
    canvas.height = window.innerHeight;
  };

  class Circle extends Particle {
    constructor(x, y, size, color, ctx, canvas) {
      super(x, y, size, color, ctx, canvas);
    }
  }

  let failed = 0;
  const init = () => {
    for (let i = 0; i < limit; i++) {
      // let size = _.random(60, 80);
      let size = 60;
      let x = _.random(size, canvas.width - size);
      let y = _.random(size, canvas.height - size);
      let color = colors[_.random(0, colors.length - 1)];
      if (i !== 0) {
        for (let j = 0; j < circles.length; j++) {
          if (
            distance({ x, y }, { x: circles[j].x, y: circles[j].y }) -
              (size + circles[j].size) <
            0
          ) {
            failed++;
            x = _.random(size, canvas.width - size);
            y = _.random(size, canvas.height - size);
            j = -1;
          }
        }
      }
      circles.push(new Circle(x, y, size, color, ctx, canvas));
    }
  };
  init();
  loader.innerHTML = JSON.stringify({ failed });

  const handleCircles = () => {
    for (let i = 0; i < limit; i++) {
      circles[i].draw();
      circles[i].update();
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleCircles();
    requestAnimationFrame(animate);
  };
  animate();
};

export { canvas, ctx, circles };
