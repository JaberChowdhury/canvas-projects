import "./style.css";
import Screen from "./src/Screen.js";
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

  const limit = 1;

  const { w, h } = size;
  canvas.width = w;
  canvas.height = h;
  context.filStyle = "#000000";
  context.fillRect(0, 0, w, h);
  context.fill();

  const perticleArray = [];

  class Perticle {
    constructor() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      this.dx = 5;
      this.dy = this.dx;
      this.radius = 5;
      this.hue = Math.floor(Math.random() * 100);
    }
    boom(x, y) {
      context.beginPath();
      context.fillStyle = `hsl(${this.hue},100%,50%)`;
      context.arc(x, y, 50, 0, Math.PI * 2);
      context.fill();
    }
    draw() {
      context.beginPath();
      context.fillStyle = `hsl(${this.hue},100%,50%)`;
      context.arc(
        Math.abs(this.x),
        Math.abs(this.y),
        this.radius,
        0,
        Math.PI * 2,
      );
      context.fill();
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;
      if (
        this.x + this.radius > canvas.width ||
        Math.abs(this.x) - this.radius < 1
      ) {
        const a = Math.abs(this.x);
        const b = Math.abs(this.y);
        this.boom(a, b);
      }
      if (
        this.y + this.radius > canvas.height ||
        Math.abs(this.y) - this.radius < 1
      ) {
        const a = Math.abs(this.x);
        const b = Math.abs(this.y);
        this.boom(a, b);
      }

      if (this.x + this.radius > canvas.width) {
        this.x = -this.x;
      }
      if (this.y + this.radius > canvas.height) {
        this.y = -this.y;
      }
      this.hue++;
    }
  }

  (() => {
    for (let i = 0; i < limit; i++) {
      perticleArray.push(new Perticle());
    }
  })();

  const handlePerticles = () => {
    for (let i = 0; i < perticleArray.length; i++) {
      perticleArray[i].draw();
      perticleArray[i].update();
    }
  };

  const animate = () => {
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();
};
