import Particle from "../Particle.js";
import _ from "lodash";
import distance from "../distance.js";

const circles = [];
const limit = 20;
const canvas = {
  width: 500,
  height: 500,
};
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

class Circle extends Particle {
  constructor(x, y, size, color, ctx) {
    super(x, y, size, color, ctx);
  }
}

let failed = 0;
let passed = 0;
let count200 = 0; // Initialize count200
const init = () => {
  for (let i = 0; i < limit; i++) {
    let size = _.random(5, 12);
    // let x = _.random(size, canvas.width - size);
    // let y = _.random(size, canvas.height - size);
    let x = _.random(size, 500 - size);
    let y = _.random(size, 1500 - size);
    let color = colors[_.random(0, colors.length - 1)];

    if (i !== 0) {
      for (let j = 0; j < circles.length; j++) {
        if (
          distance({ x, y }, { x: circles[j].x, y: circles[j].y }) -
            (size + circles[j].size) <
          0
        ) {
          failed++;
          console.log({ failed }, "❌️");
          x = _.random(size, canvas.width - size);
          y = _.random(size, canvas.height - size);
          j = -1;
        }
      }
    }

    passed++;
    circles.push(new Circle(x, y, size, color, {}));
    console.log({ passed }, "✅️");
  }
  return "completed";
};

init();
console.log({ failed, passed, count200 });
