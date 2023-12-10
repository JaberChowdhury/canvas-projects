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
    x: 0,
    y: 0,
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

  class Perticle {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      //this.x = Math.random() * canvas.width;
      //this.y = Math.random() * canvas.height;
      this.size = Math.random() * 7 + 1;
      this.speedX = Math.random() * 5 - 2.5;
      this.speedY = Math.random() * 5 - 2.5;
      //this.fillStyle = Color();
      this.fillStyle = `hsl(${hue},100%,50%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      // context.fillStyle = Color();
      context.beginPath();
      context.fillStyle = this.fillStyle;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  const init = () => {
    for (let i = 0; i < 50; i++) {
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
    // context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    hue++;
    handlePerticles();
    // automate()
    //  init();
    requestAnimationFrame(animate);
  };
  animate();
};
