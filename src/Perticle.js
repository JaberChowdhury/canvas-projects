<<<<<<< HEAD
const miniperticleArray = [];
const limit = 45;
const animate = (context, handleMiniPerticle) => {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  handleMiniPerticle();
  requestAnimationFrame(animate);
};

=======
>>>>>>> bouncing-ball-3.0
class Miniperticle {
  constructor(state) {
    this.x = state.x + 100;
    this.y = state.y;
    this.dx = Math.random() * 14;
    this.dy = Math.random() * 14;
    this.radius = state.radius / 1.5;
    this.color = state.color;
    this.context = state.context;
    this.negativeDirection = [true, false][Math.floor(Math.random() * 2)];
  }
  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
<<<<<<< HEAD
    this.context.arc(this.x, this.y, this.size / limit, 0, Math.PI * 2);
    this.context.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
=======
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // this.context.fillRect(this.x,this.y,200,200)
    this.context.fill();
  }
  update() {
    if (this.negativeDirection) {
      this.x -= this.dx;
      this.y -= this.dy;
    } else {
      this.x += this.dx;
      this.y += this.dy;
    }
>>>>>>> bouncing-ball-3.0
  }
}

class Perticle {
  constructor(context) {
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.dx = 5;
    this.dy = 5;
    this.radius = 5;
    this.hue = Math.floor(Math.random() * 100);
    this.context = context;
<<<<<<< HEAD
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
=======
    this.miniperticleArray = [];
    this.negativeDirection = [true, false][Math.floor(Math.random() * 2)];
>>>>>>> bouncing-ball-3.0
  }
  draw() {
    this.context.beginPath();
    this.context.fillStyle = `hsl(${this.hue},100%,50%)`;
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
    this.miniperticleArray = [];
    for (let i = 0; i < 10; i++) {
      this.miniperticleArray.push(
        new Miniperticle({
          x: this.x,
          y: this.y,
          radius: this.radius,
          color: `hsl(${this.hue},100%,50%)`,
          context: this.context,
        }),
      );
    }
  }

  handleMiniPerticle() {
    for (let i = 0; i < 10; i++) {
      this.miniperticleArray[i].x++;
      this.miniperticleArray[i].y++;
      this.miniperticleArray[i].draw();
      this.miniperticleArray[i].update();
    }
  }

  update() {
<<<<<<< HEAD
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
=======
    if (this.negativeDirection) {
      this.x -= this.dx;
      this.y -= this.dy;
    } else {
      this.x += this.dx;
      this.y += this.dy;
>>>>>>> bouncing-ball-3.0
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      setInterval(() => {
        this.handleMiniPerticle();
      }, 1);
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.hue++;
  }
}

export default Perticle;
