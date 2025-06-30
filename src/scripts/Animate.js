// Animation loop
const Animate = (func_list, canvas, ctx) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw the plus sign
  func_list.forEach((func) => {
    func();
  });

  requestAnimationFrame(() => Animate(func_list, canvas, ctx));
};

export default Animate;
