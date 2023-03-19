let layer11, layer12, layer13, layer14, layer15, layer16, layer17;
let layer21, layer22, layer23, layer24, layer25, layer26, layer27, layer28;
let layer31, layer32, layer33, layer34, layer35, layer36, layer37;
let layer41, layer42, layer43, layer44, layer45;
let background1, background2, background3, background4;
let gameObjects;
let gameSpeed;
let objectResizeFactor;
let cnv;
let p, s, i;


function preload() {
  // assets from https://free-game-assets.itch.io/free-horizontal-game-backgrounds
  layer11 = loadImage("dark/sky.png");
  layer12 = loadImage("dark/clouds_1.png");
  layer13 = loadImage("dark/rocks.png");
  layer14 = loadImage("dark/ground_1.png");
  layer15 = loadImage("dark/clouds_2.png");
  layer16 = loadImage("dark/ground_2.png");
  layer17 = loadImage("dark/ground_3.png");

  layer21 = loadImage("hills/sky.png");
  layer22 = loadImage("hills/clouds_3.png");
  layer23 = loadImage("hills/rocks_3.png");
  layer24 = loadImage("hills/clouds_2.png");
  layer25 = loadImage("hills/rocks_2.png");
  layer26 = loadImage("hills/pines.png");
  layer27 = loadImage("hills/clouds_1.png");
  layer28 = loadImage("hills/rocks_1.png");

  layer31 = loadImage("rocks/sky.png");
  layer32 = loadImage("rocks/clouds_1.png");
  layer33 = loadImage("rocks/rocks_1.png");
  layer34 = loadImage("rocks/clouds_2.png");
  layer35 = loadImage("rocks/clouds_3.png");
  layer36 = loadImage("rocks/rocks_2.png");
  layer37 = loadImage("rocks/clouds_4.png");

  layer41 = loadImage("water/sky.png");
  layer42 = loadImage("water/clouds_1.png");
  layer43 = loadImage("water/rocks.png");
  layer44 = loadImage("water/clouds_2.png");
  layer45 = loadImage("water/ground.png");
}

function setup() {
  cnv = createCanvas(600, 500);
  cnv.parent("container");
  background(0);
  gameSpeed = 3;
  objectResizeFactor = height / layer11.height;
  background1 = [
    new Layer(layer11, 0.05),
    new Layer(layer12, 0.10),
    new Layer(layer13, 0.20),
    new Layer(layer14, 0.35),
    new Layer(layer15, 0.55),
    new Layer(layer16, 0.80),
    new Layer(layer17, 1)
  ];
  background2 = [
    new Layer(layer21, 0.05),
    new Layer(layer22, 0.10),
    new Layer(layer23, 0.15),
    new Layer(layer24, 0.20),
    new Layer(layer25, 0.35),
    new Layer(layer26, 0.55),
    new Layer(layer27, 0.80),
    new Layer(layer28, 1)
  ];
  background3 = [
    new Layer(layer31, 0.05),
    new Layer(layer32, 0.10),
    new Layer(layer33, 0.15),
    new Layer(layer34, 0.45),
    new Layer(layer35, 0.65),
    new Layer(layer36, 0.85),
    new Layer(layer37, 1.00),
  ];
  background4 = [
    new Layer(layer41, 0.10),
    new Layer(layer42, 0.20),
    new Layer(layer43, 0.30),
    new Layer(layer44, 0.40),
    new Layer(layer45, 1.00),
  ];
  gameObjects = background1;
  createUI();
}

function draw() {
  gameObjects.forEach(o => {
    o.update();
    o.show();
  });
}

function createUI() {
  p = createP("Speed: ");
  p.parent("container");
  s = createSpan();
  s.html(gameSpeed);
  s.id = "currentSpeed";
  s.parent(p);
  i = createInput();
  i.id("slider");
  i.attribute("type", "range");
  i.attribute("min", -3);
  i.attribute("max", 9);
  i.attribute("step", 0.3)
  i.value(gameSpeed);
  i.changed(userChangedSpeed);
  i.parent("container");
  r = createDiv();
  r.id("levelPicker");
  r.html(
    '<br><select name="levels" id="levels">'
    + '<option value="1">Level 1</option>'
    + '<option value="2">Level 2</option>'
    + '<option value="3">Level 3</option>'
    + '<option value="4">Level 4</option>'
    + '</select>'
  )
  r.changed(userChangedLevel);
  r.parent("container");
}

function userChangedLevel(e) {
  const newLevel = e.target.value;
  if (newLevel == "1") gameObjects = background1;
  if (newLevel == "2") gameObjects = background2;
  if (newLevel == "3") gameObjects = background3;
  if (newLevel == "4") gameObjects = background4;
}

function userChangedSpeed(e) {
  gameSpeed = e.target.value;
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
    if (this.x > 0) this.x = -this.width;
  }

  show() {
    image(this.image, this.x, this.y);
    image(this.image, this.x + this.width, this.y);
  }
} 