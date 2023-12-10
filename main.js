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
};
