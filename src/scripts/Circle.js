class Circle {
  constructor({
    x = 0,
    y = 0,
    radius = 10,
    fillStyle = "red",
    strokeStyle = "red",
    ctx,
  }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  }
  update(x_speed = 1, y_speed = 1) {
    this.x += x_speed;
    this.y += y_speed;
  }
}

export default Circle;
