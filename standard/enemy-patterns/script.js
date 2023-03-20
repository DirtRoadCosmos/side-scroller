let enemy1;
let enemies = [];
const NUM_ENEMIES = 50;

function preload() {
  // images by https://bevouliin.com/
  enemy1 = loadImage("enemy1.png")
}

function setup() {
  cnv = createCanvas(600, 500);
  for (let i = 0; i < NUM_ENEMIES; i++) {
    enemies.push(new Enemy(enemy1));
  }
}

function draw() {
  background(255);
  enemies.forEach(e => {
    e.show();
    e.update();
  })
}

class Enemy {
  constructor(img) {
    this.img = img;
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.x = random(width);
    this.y = random(height);
    this.width = this.spriteWidth / 3;
    this.height = this.spriteHeight / 3;
    this.speed = random(-3, 3);
  }

  show() {
    image(this.img,
      this.x, this.y, this.width, this.height,
      0, 0, this.spriteWidth, this.spriteHeight);
  }

  update() {
    this.x += this.speed;
    this.y += this.speed;
  }
}