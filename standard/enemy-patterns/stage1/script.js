const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 500;

const enemy1 = {
  x: 10,
  y: 50,
  width: 100,
  height: 100,
}

function animate(){
  ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
}
animate();
