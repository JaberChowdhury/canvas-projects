import "./style.css";
import dom from "./src/dom.js";

window.onload = () => {
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
  const mouse = {
    x: 0,
    y: 0,
  };

  /*
   x1 = circle1.x
   y1 = circle1.y
   x2 = circle2.x
   y2 = circle2.y
  */

  const calculateDistance = (x1, y1, x2, y2) => {
    const distanceX = x2 - x1;
    const distanceY = y2 - y1;
    return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
  };

  canvas.ontouchmove = (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  };

  context.fillRect(0, 0, canvas.width, canvas.height);

  class Circle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
    }
    draw() {
      context.beginPath();
      context.fillStyle = this.color;
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fill();
    }
    update() {
      this.x = mouse.x;
      this.y = mouse.y;
    }
  }

  const circle1 = new Circle(
    canvas.width / 2,
    canvas.height / 2,
    60,
    colors[0],
  );
  const circle2 = new Circle(mouse.x, mouse.y, 30, colors[5]);

  const init = () => {
    circle1.draw();
    circle2.draw();
    circle2.update();
    const distance = calculateDistance(
      canvas.width / 2,
      canvas.height / 2,
      mouse.x,
      mouse.y,
    );
    context.font = "30px sans-serif";

    if (distance < circle1.size + circle2.size) {
      circle1.color = "red";
      context.fillText("Boom 💣", canvas.width / 2.5, 100);
    } else {
      context.fillText("move small circle", canvas.width / 5.5, 100);
      circle1.color = colors[0];
    }
  };

  const animate = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    init();
    requestAnimationFrame(animate);
  };
  animate();
};
