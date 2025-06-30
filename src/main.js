import "./style.css";

window.onload = () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  // Configurable parameters
  const config = {
    plusSign: {
      centerX: 200, // Center X position
      centerY: window.innerHeight / 2, // Center Y position
      horizontalLength: 300, // Length of horizontal bar
      verticalLength: 300, // Length of vertical bar
      thickness: 30, // Thickness of both bars
      color: "orange", // Color of bars
      rotationSpeed: 0.01, // Rotation speed in radians
    },
    centerCircle: {
      radius: 25, // Radius of center circle
      color: "red", // Color of circle
    },
  };

  // Handle window resize
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", handleResize);
  handleResize(); // Initialize

  class RotatingBar {
    constructor({
      centerX,
      centerY,
      length,
      thickness,
      angle,
      color,
      rotationSpeed,
    }) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.length = length;
      this.thickness = thickness;
      this.angle = angle;
      this.color = color;
      this.rotationSpeed = rotationSpeed;
    }

    draw() {
      ctx.save();
      ctx.translate(this.centerX, this.centerY);
      ctx.rotate(this.angle);

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.strokeStyle = this.color;
      ctx.rect(
        -this.length / 2,
        -this.thickness / 2,
        this.length,
        this.thickness
      );
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }

    update() {
      this.angle += this.rotationSpeed;
    }
  }

  // Create the plus sign bars
  const horizontalBar = new RotatingBar({
    centerX: config.plusSign.centerX,
    centerY: config.plusSign.centerY,
    length: config.plusSign.horizontalLength,
    thickness: config.plusSign.thickness,
    angle: 0,
    color: config.plusSign.color,
    rotationSpeed: config.plusSign.rotationSpeed,
  });

  const verticalBar = new RotatingBar({
    centerX: config.plusSign.centerX,
    centerY: config.plusSign.centerY,
    length: config.plusSign.verticalLength,
    thickness: config.plusSign.thickness,
    angle: Math.PI / 2,
    color: config.plusSign.color,
    rotationSpeed: config.plusSign.rotationSpeed,
  });

  class Circle {
    constructor({
      x = 0,
      y = 0,
      radius = 0,
      fillStyle = "red",
      strokeStyle = "red",
    }) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.fillStyle = fillStyle;
      this.strokeStyle = strokeStyle;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.fillStyle;
      ctx.strokeStyle = this.strokeStyle;
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }
    update(x_speed = 1, y_speed = 1) {
      this.x += x_speed;
      this.y += y_speed;
    }
  }
  const center_circle = new Circle({
    fillStyle: "red",
    strokeStyle: "red",
    x: config.plusSign.centerX,
    y: config.plusSign.centerY,
    radius: config.centerCircle.radius,
  });

  // Animation loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw the plus sign
    horizontalBar.update();
    verticalBar.update();
    horizontalBar.draw();
    verticalBar.draw();

    // Draw the center circle
    center_circle.draw();

    requestAnimationFrame(animate);
  };

  animate();

  // Make the config object available in console for easy tweaking
  window.config = config;
};
