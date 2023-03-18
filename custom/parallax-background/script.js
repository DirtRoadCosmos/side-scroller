let layer1, layer2, layer3, layer4, layer5, layer6, layer7;
let gameObjects;
let gameSpeed;
let objectResizeFactor;
let cnv;
let p, s, i;


function preload() {
  // assets from https://free-game-assets.itch.io/free-horizontal-game-backgrounds
  layer1 = loadImage("dark/sky.png");
  layer2 = loadImage("dark/clouds_1.png");
  layer3 = loadImage("dark/rocks.png");
  layer4 = loadImage("dark/ground_1.png");
  layer5 = loadImage("dark/clouds_2.png");
  layer6 = loadImage("dark/ground_2.png");
  layer7 = loadImage("dark/ground_3.png");
}

function setup() {
  cnv = createCanvas(600, 500);
  cnv.parent("container");
  background(0);
  gameSpeed = 3;
  objectResizeFactor = height / layer1.height;
  gameObjects = [
    new Layer(layer1, 0.05),
    new Layer(layer2, 0.10),
    new Layer(layer3, 0.20),
    new Layer(layer4, 0.35),
    new Layer(layer5, 0.55),
    new Layer(layer6, 0.80),
    new Layer(layer7, 1)
  ];
  createSpeedUI();
}

function draw() {
  gameObjects.forEach(o => {
    o.update();
    o.show();
  });
}

function createSpeedUI() {
  p = createP("Speed: ");
  p.parent("container");
  s = createSpan();
  s.html(gameSpeed);
  s.id = "currentSpeed";
  s.parent(p);
  i = createInput();
  i.id("slider");
  i.attribute("type", "range");
  i.attribute("min", -9);
  i.attribute("max", 9);
  i.attribute("step", 0.3)
  i.value(gameSpeed);
  i.changed(userChangedSpeed);
  i.parent("container");
}

function userChangedSpeed(e) {
  gameSpeed = e.target.value;
  console.log(s);
  s.html(gameSpeed);
}

class Layer {
  constructor(image, speedModifier) {
    image.resize(0, image.height * objectResizeFactor);
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.width = image.width;
    this.height = image.height;
    this.speedModifier = speedModifier;
  }

  update() {
    this.x -= gameSpeed * this.speedModifier;
    if (this.x < -this.width) this.x = 0;
  }

  show() {
    image(this.image, this.x, this.y);
    image(this.image, this.x + this.width, this.y);
  }
}