import "./style.css";
import Screen from "./src/Screen.js";
import Color from "./src/Color.js";
import dom from "./src/dom.js";
import Perticle from "./src/Perticle.js";

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

  const limit = 2;
  const perticleArray = [];

  const { w, h } = size;
  canvas.width = w;
  canvas.height = h;
  context.filStyle = "#000000";
  context.fillRect(0, 0, w, h);
  context.fill();

  (() => {
    for (let i = 0; i < limit; i++) {
      perticleArray.push(new Perticle(context));
    }
  })();
  const handlePerticles = () => {
    for (let i = 0; i < perticleArray.length; i++) {
      perticleArray[i].draw();
      perticleArray[i].update();
    }
  };

  //  setInterval(handlePerticles,1000)

  const animate = () => {
    context.fillStyle = "rgba(0,0,0,0.1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    handlePerticles();
    requestAnimationFrame(animate);
  };
  animate();
};
