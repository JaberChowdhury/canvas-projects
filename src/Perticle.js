const miniperticleArray = [];
const limit = 5;

class Miniperticle {
  constructor(state) {
    this.x = state.x;
    this.y = state.y;
    this.speedX = Math.random() * 2.5 - 1;
    this.speedY = Math.random() * 2.5 - 1;
    this.size = state.size;
    this.context = state.context;
    this.color = state.color;
  }
  draw() {
    this.context.beginPath();
    this.this.context.fillStyle = this.color;
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fil();
  }
  update() {
    this.x += speedX;
    this.y += speedY;
  }
}

class Perticle {
  constructor(context) {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.dx = 5;
    this.dy = this.dx;
    this.radius = 5;
    this.hue = Math.floor(Math.random() * 100);
    this.context = context;
  }
  boom(x, y) {
    this.context.beginPath();
    this.context.fillStyle = `hsl(${this.hue},100%,50%)`;
    this.context.arc(x, y, 50, 0, Math.PI * 2);
    this.context.fill();
  }
  draw() {
    this.context.beginPath();
    this.context.fillStyle = `hsl(${this.hue},100%,50%)`;
    this.context.arc(
      Math.abs(this.x),
      Math.abs(this.y),
      this.radius,
      0,
      Math.PI * 2,
    );
    this.context.fill();
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (
      this.x + this.radius > canvas.width ||
      Math.abs(this.x) - this.radius < 1
    ) {
      const a = Math.abs(this.x);
      const b = Math.abs(this.y);
      this.boom(a, b);
    }
    if (
      this.y + this.radius > canvas.height ||
      Math.abs(this.y) - this.radius < 1
    ) {
      const a = Math.abs(this.x);
      const b = Math.abs(this.y);
      this.boom(a, b);
    }
    if (this.x + this.radius > canvas.width) {
      this.x = -this.x;
    }
    if (this.y + this.radius > canvas.height) {
      this.y = -this.y;
    }
    this.hue++;
  }
}

export default Perticle;
