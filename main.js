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
  const perticlesArray = [];
  let hue = 0;
  canvas.width = w;
  canvas.height = h;
  context.filStyle = "#000000";
  context.fillRect(0, 0, w, h);
  context.fill();

  const mouse = {
    x: 20,
    y: 20,
  };

  canvas.ontouchmove = (e) => {
    mouse.x = e.touches[0].clientX || 0;
    mouse.y = e.touches[0].clientY || 0;
    init();
  };
  canvas.onclick = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    init();
  };
  canvas.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    init();
  };

  class Perticle {
    constructor() {
      this.x = Math.abs(mouse.x);
      this.y = Math.abs(mouse.y);
      this.size = Math.random() * 3 + 1;
      this.dx = Math.random() * 5 - 2.5;
      this.dy = Math.random() * 5 - 2.5;
      this.fillStyle = `hsl(${hue},100%,40%)`;
    }
    update() {
      this.x += this.dx;
      this.y += this.dy;
      if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.fillStyle;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  const init = () => {
    for (let i = 0; i < 60; i++) {
      perticlesArray.push(new Perticle());
    }
  };

  const handlePerticles = () => {
    for (let i = 0; i < perticlesArray.length; i++) {
      perticlesArray[i].update();
      perticlesArray[i].draw();
      if (perticlesArray[i].size <= 0.3) {
        perticlesArray.splice(i, 1);
        i++;
      }
    }
  };

  const automate = () => {
    mouse.x = Math.random() * canvas.width;
    mouse.y = Math.random() * canvas.height;
  };

  const animate = () => {
    context.beginPath();
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    hue++;
    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();

  const variant = () => {
    const speed = 5;
    if (mouse.x > canvas.width) {
      mouse.x = -mouse.x;
    }
    if (mouse.y > canvas.height) {
      mouse.y = -mouse.y;
    }
    mouse.x += speed;
    mouse.y += speed;
    init();

    requestAnimationFrame(variant);
  };

  variant();

  /*
  setInterval(() => {
    mouse.x = Math.random() * canvas.width
    mouse.y = Math.random() * canvas.height
  }, 1000);
  */
};
