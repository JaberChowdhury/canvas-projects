import "./style.css";
import dom from "./src/dom.js";

window.onload = (e) => {
  console.log(e.timeStamp);

  const canvas = dom("#canvas");
  const context = canvas.getContext("2d");

  const size = {
    w: window.innerWidth,
    h: window.innerHeight,
  };

  window.onresize = () => {
    canvas.width = ww;
    canvas.height = wh;
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
      this.size = 10;
      this.x = Math.floor(Math.random() * canvas.width - 20 + 1) + 20;
      this.y = Math.floor(Math.random() * 200);
      this.dy = 5;
      this.gravity = 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.friction = 0.9;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
    update() {
      this.y += this.dy;
      if (this.y + this.size + this.dy > canvas.height) {
        this.dy = -this.dy * this.friction;
      } else {
        this.dy += this.gravity;
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
  makePerticles();
  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();
};
