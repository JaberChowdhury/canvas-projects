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
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
  /*
  canvas.ontouchmove = (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  };
*/
  const calculate_distance = (x1, y1, x2, y2) => {
    const distanceX = x2 - x1;
    const distanceY = y2 - y1;
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  };

  class Circle {
    constructor(x, y, size, color, index) {
      this.x = x;
      this.y = y;
      this.size = size; // radius of the circle
      this.color = color;
      this.dx = _.random(1, 3);
      this.dy = _.random(1, 4);
      this.cacheColor = color;
      this.index = index;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
    updatePosition() {
      this.x += this.dx;
      this.y += this.dy;
    }
    update() {
      context.font = "30px sans-serif";
      if (
        calculate_distance(mouse.x, mouse.y, this.x, this.y) <
        this.size + 40
      ) {
        this.color = "red";
        context.fillText(
          this.index,
          canvas.width / 2 - 10,
          canvas.height / 2 + 10,
        );
        this.dx = -this.dx;
        this.dy = -this.dy;
      } else {
        this.color = this.cacheColor;
      }
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

  const mega_circle = new Circle(mouse.x, mouse.y, 40, colors[1]);

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
          i,
        ),
      );
    }
  };
  init();

  const handlePerticles = () => {
    for (let i = 0; i < limit; i++) {
      perticlesArray[i].draw();
      perticlesArray[i].updatePosition();
      perticlesArray[i].update();
    }
  };

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.fillStyle = "rgba(0,0,0,0.01)";
    //context.fillRect(0, 0, canvas.width, canvas.height);
    mega_circle.draw();
    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();
};
