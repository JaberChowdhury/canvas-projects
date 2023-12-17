import "./style.css";
import Color from "./src/Color.js";
import dom from "./src/dom.js";

window.onload = () => {
  const canvas = dom("#canvas");
  const context = canvas.getContext("2d");

  const size = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  window.onresize = () => {
    size.w = window.innerWidth;
    size.h = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  canvas.width = size.w;
  canvas.height = size.h;

  // state
  const limit = 100;
  const perticlesArray = [];
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

  context.fillRect(0, 0, canvas.width, canvas.height);

  class Perticle {
    constructor() {
      this.size = Math.random() * 10 + 2;
      this.x =
        Math.floor(Math.random() * (canvas.width - this.size - this.size)) +
        this.size;
      this.y = Math.floor(Math.random() * 200);
      this.dx = 5;
      this.dy = 5;
      this.gravity = 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.friction = 0.9;
      this.yvalues = [];
      this.index = -1;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (Math.abs(this.yvalues[this.index] - this.y) < this.size) {
        this.dx = 0;
      }

      if (
        this.x + this.size + this.dx > canvas.width ||
        this.x - this.size < 0
      ) {
        this.dx = -this.dx;
      }

      if (this.y + this.size + this.dy > canvas.height) {
        this.dy = -this.dy * this.friction;
        this.index++;
        this.yvalues.push(Math.floor(this.y + this.size));
      } else {
        this.dy += this.gravity * this.size;
      }
    }
  }

  const init = () => {
    for (let i = 0; i < limit; i++) {
      perticlesArray.push(new Perticle());
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
    handlePerticles();
    requestAnimationFrame(animate);
  };

  animate();
};
