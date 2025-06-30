class RotatingBar {
  constructor({
    centerX,
    centerY,
    length,
    thickness,
    angle,
    color,
    rotationSpeed,
    ctx,
  }) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.length = length;
    this.thickness = thickness;
    this.angle = angle;
    this.color = color;
    this.rotationSpeed = rotationSpeed;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.rotate(this.angle);

    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.strokeStyle = this.color;
    this.ctx.rect(
      -this.length / 2,
      -this.thickness / 2,
      this.length,
      this.thickness
    );
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.restore();
  }

  update() {
    this.angle += this.rotationSpeed;
  }
}
export default RotatingBar;
