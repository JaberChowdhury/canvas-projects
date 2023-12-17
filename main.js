import "./style.css";
import dom from "./src/dom.js";
import _ from "lodash";

window.onload = () => {
  const canvas = dom("#canvas");
  const context = canvas.getContext("2d");

  const size = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  window.onresize = () => {
    canvas.width = size.w;
    canvas.height = size.h;
  };
  canvas.width = size.w;
  canvas.height = size.h;

  // state
  const limit = 100;
  const perticlesArray = [];
  const randomAxis = [];
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
  const mouse = {
    x: 0,
    y: 0,
  };

  class Circle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size; // radius of the circle
      this.color = color;
      this.dx = 5;
      this.dy = 5;
      this.direction = [1, -1][_.random(0, 2)];
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
    update() {
      this.x += this.dx * this.direction;
      this.y += this.dy * this.direction;

      if (
        this.x + this.size + this.dx > canvas.width ||
        this.x - this.size < 0
      ) {
        this.dx = -this.dx;
      }
      if (
        this.y + this.size + this.dy > canvas.height ||
        this.y - this.size < 0
      ) {
        this.dy = -this.dy;
      }
    }
  }

  const mega_circle = new Circle(
    canvas.width / 2,
    canvas.height / 2,
    40,
    colors[1],
  );

  const generateAxis = () => {
    randomAxis.push({
      x: _.random(30, canvas.width - 70),
      y: _.random(30, Math.floor(canvas.height / 2 - 70)),
    });

    randomAxis.push({
      x: _.random(30, canvas.width - 30),
      y: _.random(
        Math.floor(canvas.height / 2 + 70),
        Math.floor(canvas.height - 30),
      ),
    });
  };

  const init = () => {
    for (let i = 0; i < limit; i++) {
      const index = _.random(0, randomAxis.length);
      generateAxis();
      perticlesArray.push(
        new Circle(
          randomAxis[index].x,
          randomAxis[index].y,
          _.random(8, 30),
          colors[_.random(0, colors.length)],
        ),
      );
    }
  };
  init();

  const handlePerticles = () => {
    for (let i = 0; i < limit; i++) {
      perticlesArray[i].draw();
      perticlesArray[i].update();
    }
  };

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    mega_circle.draw();
    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();
};
