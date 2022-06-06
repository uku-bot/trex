
var trex, trex_running;
var edges;
var ground;
var invsground;
var cloud;
var cactusgroup;
var score;
var death;
var rand;
var gameState = PLAY;
var PLAY = 1;
var OVER = 0;
function preload() {
 
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  floor = loadAnimation("ground2.png")
  cloud_moving = loadAnimation("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  death = loadImage("trex_collided.png");
  GameOver = loadImage("gameOver.png");
}

function setup() {
 
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(51, 150, 10, 40)
  trex.addAnimation("trexrunning", trex_running)
  trex.scale = 0.5
  ground = createSprite(10, 178, 600, 10);
  ground.addAnimation("floor", floor);
  invsground = createSprite(51, 180, 1, 1);
  score = 0;
  edges = createEdgeSprites()
  cactusgroup = new Group();
 
}

function draw(){
  background("white")
  score = score + Math.round(getFrameRate(140)/60);
  if (gameState === PLAY) {
    if (ground.x < 0) {
    ground.x = width+600;
  }
   text("SCORE:" + score, 530, 10);
    
    ground.velocityX = -(10 + frameCount / 60);
    if (keyDown('space') && trex.y > 150) {
   trex.velocityY = -10 
    }
    trex.velocityY = trex.velocityY + 0.8
    if (trex.isTouching(cactusgroup)) {
      gameState = OVER;
    }
    spawnClouds();
    spawnObstacles();
  } else if (gameState === OVER) {
    ground.velocityX = 0;
  }
   invsground.visible = false;
   trex.collide(invsground);
  drawSprites();
  
}

function spawnClouds() {
  if (frameCount % 180 === 0) {
    cloud = createSprite(600, 50, 60, 20);
    cloud.addAnimation("cloud", cloud_moving);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.y = Math.round(random(25, 100))
    cloud.lifeTime = 200;
  }
  if (frameCount % 240 === 0) {
    cloud = createSprite(600, 50, 60, 20);
    cloud.addAnimation("cloud", cloud_moving);
    cloud.scale = 0.35;
    cloud.velocityX = -2;
    cloud.y = Math.round(random(50, 100))
    cloud.lifeTime = 300;
  }
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 160, 10, 40);
    obstacle.velocityX = -(10+frameCount/60);
    rand = Math.round(random(0,5));
    switch (rand) {
      case 0: obstacle.addImage("cactus", obstacle1);
        obstacle.scale = 0.75;
        break;
      case 1: obstacle.addImage("cactus", obstacle2);
        obstacle.scale = 0.75;
        break;
      case 2: obstacle.addImage("cactus", obstacle3);
        obstacle.scale = 0.75;
        break;
      case 3: obstacle.addImage("cactus", obstacle4);
        obstacle.scale = 0.5;
        break;
      case 4: obstacle.addImage("cactus", obstacle5);
        obstacle.scale = 0.5;
        break;
      case 5: obstacle.addImage("cactus", obstacle6);
        obstacle.scale = 0.5;
        break;
      default:
        break;
   }
    obstacle.lifeTime = 60;
    cactusgroup.add(obstacle);
  }
}