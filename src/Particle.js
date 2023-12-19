import _ from "lodash";
import { ctx, canvas, circles } from "../main.js";
import distance from "./distance.js";
import resolveCollision from "./resolveCollision.js";

class Perticle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size; // radius of circle
    this.color = color;
    this.velocity = {
      //x: _.random(-8, 8),
      //y: _.random(-8, 8),
      x: 1,
      y: 1,
    };
    this.cacheColor = color;
    this.mass = 1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    for (let i = 0; i < circles.length; i++) {
      if (this === circles[i]) continue;
      if (distance(this, circles[i]) - (this.size + circles[i].size) < 0) {
        resolveCollision(this, circles[i]);
        /*
        this.velocity.x = - this.velocity.x
        this.velocity.y = - this.velocity.y
        circles[i].velocity.x = - circles[i].velocity.x
        circles[i].velocity.y = - circles[i].velocity.y
        */
      }
    }

    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.velocity.y = -this.velocity.y;
    }
  }
}

export default Perticle;
