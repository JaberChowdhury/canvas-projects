import "./style.css";
import dom from "./src/dom.js";

window.onload = (e) => {
  console.log(e.timeStamp);

  const canvas = dom("#canvas");
  const ctx = canvas.getContext("2d");

  // states
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  const perticlesArray = [];
  const mouse = {
    x: undefined,
    y: undefined,
  };
  const limit = 600;
  const colors = ["#034159", "#025951", "#02735E", "#038C3E", "#0CF25D"];

  canvas.width = ww;
  canvas.height = wh;

  window.onresize = () => {
    canvas.width = ww;
    canvas.height = wh;
  };

<<<<<<< HEAD
  window.ontouchmove = (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  };
=======
  const limit = 2;
  const perticleArray = [];
>>>>>>> bouncing-ball-3.0

  window.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  class Perticle {
    constructor() {
      this.x = Math.floor(Math.random() * canvas.width);
      this.y = Math.floor(Math.random() * canvas.height);
      //this.hue = Math.floor(Math.random() * 360);
      this.speedX = Math.floor(Math.random() * 2) + 0.5;
      this.speedY = Math.floor(Math.random() * 2) + 0.5;
      this.size = Math.random() * 6 + 2;
      this.color = colors[Math.floor(Math.random() * 5)];
      this.stroke = colors.reverse()[Math.floor(Math.random() * 5)];
      this.bol = [true, false][Math.floor(Math.random() * 2)];
    }
    draw() {
      ctx.beginPath();
      //ctx.fillStyle = `hsl(${this.hue},100%,25%)`;
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.stroke;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    update() {
      if (this.bol) {
        this.x += this.speedX;
        this.y += this.speedY;
      } else {
        this.x -= this.speedX;
        this.y -= this.speedY;
      }
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.speedY = -this.speedY;
      }

      const previousSize = this.size;
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50 &&
        this.size < 40
      ) {
        this.size += 1;
      } else if (this.size > 3) {
        this.size -= 1;
      }
    }
  }

  const makePerticles = () => {
    for (let i = 0; i < limit; i++) {
      perticlesArray.push(new Perticle());
    }
  };

<<<<<<< HEAD
  makePerticles();

  const handlePerticle = () => {
    for (let i = 0; i < limit; i++) {
      perticlesArray[i].draw();
      perticlesArray[i].update();
    }
=======
  //  setInterval(handlePerticles,1000)

  const animate = () => {
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    handlePerticles();
    requestAnimationFrame(animate);
>>>>>>> bouncing-ball-3.0
  };

  const animation = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handlePerticle();
    requestAnimationFrame(animation);
  };
  animation();
};
