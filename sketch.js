
var monkey , monkey_running;
var banana ,bananaImage,obstacleImage, obstacle, jungleImage, jungle, invisibleGround, gameState="play", gameOverImage;
var bannanaGroup, obstacleGroup, survivalTime ;

function preload(){

monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage=loadImage("Jungle.png");
  gameOverImage=loadImage("monkeyGameOver.png")
}



function setup() {
  createCanvas(600, 400);
  background("white");

  score=0;
  energy=5;
  survivalTime=0;
  
  jungle=createSprite(500, 200);
  jungle.addImage(jungleImage);
  jungle.velocityX=-4;
  
  monkey=createSprite(100, 340);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.2;
  
  bannanaGroup=createGroup();
  obstacleGroup=createGroup();
  
  
  invisibleGround=createSprite(300, 399, 600, 1);
  
  
}


function draw() {
if(gameState==="play"){
  
  if(jungle.x<100){
     jungle.x=500;
  }
  
  if(keyDown("space") && (monkey.y>=325)){
    monkey.velocityY=-(energy*2);
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState="over";
  }
  
  if(monkey.isTouching(bannanaGroup)){
    bannanaGroup.destroyEach();
    energy=energy+2;
  }
 
  if(energy>=10){
     
  if(keyDown("space") && (monkey.y>=325)){
    monkey.velocityY=-20;
  }
  
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(invisibleGround);
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  spawnObstacles();
  spawnBannanas();
  
}
  
  if(gameState==="over"){
    monkey.destroy();
    jungle.velocityX=0;
    obstacle.destroy();
    banana.destroy();
    gameOver=createSprite(300, 200);
    gameOver.addImage(gameOverImage);
  }
  drawSprites();
  text("energy = " + energy, 450, 50);
  text("Survival Time = " + survivalTime, 75, 50);
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   
   obstacle = createSprite(600,385,10,40);
   obstacle.setCollider("rectangle", 5, 10, 30, 30);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.15;
   obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
   
   
 }
}

function spawnBannanas(){
   if (frameCount % 150 === 0){
   banana = createSprite(600,Math.round(random(200, 280)),10,40);
   banana.velocityX = -4;
   banana.addImage(bananaImage);
   banana.scale=0.15;
   banana.lifetime = 300;
     
  bannanaGroup.add(banana);
}
}