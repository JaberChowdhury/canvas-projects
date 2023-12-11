const miniperticleArray = [];
const limit = 45;
const animate = (context, handleMiniPerticle) => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  handleMiniPerticle();
  requestAnimationFrame(animate);
};

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
    this.context.fillStyle = this.color;
    this.context.arc(this.x, this.y, this.size / limit, 0, Math.PI * 2);
    this.context.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
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
    for (let i = 0; i < limit; i++) {
      miniperticleArray.push(
        new Miniperticle({
          x,
          y,
          size: this.radius * 10,
          context: this.context,
          color: `hsl(${this.hue},100%,50%)`,
        }),
      );
    }
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

      const handleMiniPerticle = () => {
        for (let i = 0; i < limit; i++) {
          miniperticleArray[i].draw();
          miniperticleArray[i].update();
        }
      };

      animate(this.context, handleMiniPerticle);
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
