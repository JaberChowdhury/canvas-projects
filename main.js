import "./style.css";
import Screen from "./src/Screen.js";
import Color from "./src/Color.js";

window.onload = () => {
  const canvas = document.querySelector("#canvas");
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

  const { w, h } = size;
  canvas.width = w;
  canvas.height = h;
  context.filStyle = "#000000";
  context.fillRect(0, 0, w, h);
  context.fill();

  const perticleArray = [];

  class Perticle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.dx = 5;
      this.y = Math.random() * canvas.height;
      this.dy = this.dx;
      //this.radius = Math.random() * 10 + 5;
      this.radius = 5;
      this.hue = Math.floor(Math.random() * 100);
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
      if (this.x + this.radius > canvas.width) {
        this.x = -this.x;
      }
      if (this.y + this.radius > canvas.height) {
        this.y = -this.y;
      }
      this.x += this.dx;
      this.y += this.dy;
      this.hue++;
    }
  }

  const drawPerticle = () => {
    for (let i = 0; i < 65; i++) {
      perticleArray.push(new Perticle());
    }
  };

  drawPerticle();

  const handlePerticles = () => {
    for (let i = 0; i < perticleArray.length; i++) {
      perticleArray[i].draw();
      perticleArray[i].update();
    }
  };

  const animate = () => {
    //context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();
};
