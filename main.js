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
  context.fillRect(0, 0, canvas.width, canvas.height);

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
