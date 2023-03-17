let layer1, layer2, layer3, layer4, layer5;
let gameObjects;
let gameSpeed;
let objectResizeFactor;
let cnv;
let p, s, i;

function preload() {
  layer1 = loadImage("layer-1.png");
  layer2 = loadImage("layer-2.png");
  layer3 = loadImage("layer-3.png");
  layer4 = loadImage("layer-4.png");
  layer5 = loadImage("layer-5.png");
}

function setup() {
  cnv = createCanvas(600, 500);
  cnv.parent("container");
  background(0);
  gameSpeed = 3;
  objectResizeFactor = height / layer1.height;
  gameObjects = [
    new Layer(layer1, 0.2),
    new Layer(layer2, 0.4),
    new Layer(layer3, 0.6),
    new Layer(layer4, 0.8),
    new Layer(layer5, 1)
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
  i.attribute("min", 0);
  i.attribute("max", 20);
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