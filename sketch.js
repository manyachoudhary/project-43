var bananaImage, obstacleImage, monkeyImage, backGroundImage;
var monkey;
var obstacleGroup, bananaGroup;
var ground, backGround;
var score, size;

function preload(){
  bananaImage = loadImage("banana.png");
  backGroundImage = loadImage("jungle.jpg");
  obstacleImage = loadImage("stone.png");
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(400, 400);

  backGround = createSprite(300,200);
  backGround.addAnimation("jungle",backGroundImage);

  ground = createSprite(200,380,400,20);
  ground.visible = false;

  monkey = createSprite(50,-100,10,10);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.1;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  size = 10;
}

function draw() {
  background(220);

 if(keyDown("space") && monkey.y >= (365 - (size * 3)) && monkey.velocityX > 0){
    monkey.velocityY = -15;
 }
  monkey.velocityY += 1;
  monkey.collide(ground);

  if (monkey.x - backGround.x > 150){
    backGround.x = monkey.x + 350
  }

  if(frameCount % 80 === 0 && size > 0){
    createBanana();
  }

  if(frameCount % 60 === 0 && size > 0){
    createObstacle();
  }

  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    size += 10;
  }

  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    size -= 10;
  }



  switch(size){
    case 0: monkey.scale = 0.1;
      break;
    default: monkey.scale = (size / 100); 
  }

  drawSprites();

    if(size < 1){
    end();
    fill("red");
    text("GAME OVER",monkey.position.x + 100,200);
  }else{
    ground.velocityX  = 8;
    monkey.velocityX = 8

    if(score >= 20){
      end();
      fill("blue");
      textSize = 100;
      text("Congratulations!", monkey.position.x + 90,200);
    }
  } 
  score = floor(monkey.position.x/100)
  textSize = 20;
  text("Score: " + score,monkey.position.x + 250,20);
  if(size >= 1 && score < 20){
    camera.position.x += 8
  }
}

function createBanana(){
  var banana;
  banana = createSprite(monkey.position.x + 400,200,10,10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  //banana.velocityX = -8;
  banana.lifetime = 50;
  bananaGroup.add(banana);
}

function createObstacle(){
  var obstacle;
  obstacle = createSprite(monkey.position.x + 400 ,350,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  //obstacle.velocityX = -8;
  obstacle.setCollider("circle",0,-10,40);
  obstacle.lifetime = 55;
  obstacleGroup.add(obstacle);
}

function end(){
  bananaGroup.setVelocityEach(0);
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach(-1);
  monkey.velocityX = 0;
  ground.velocityX = 0;
}