var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana , bananaImage , obstacle , obstacleImage;
var FoodGroup , obstacleGroup;
var survivalTime=0;
var score;

function preload(){
  
  
   monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
   bananaImage = loadImage("banana.png")
   obstacleImage = loadImage("obstacle.png")
  
}



function setup(){
  // creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  
}


function draw(){
  background("lightgreen");
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score"+ score , 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime: "+survivalTime, 100, 50)
  
 
  if(gameState === PLAY){
    
  if (ground.x<0) {
  ground.x=ground.width/2;
  }
  
  if(keyDown("space") ) {
  monkey.velocityY = -12;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
 
  spawnbanana()
  spawnobstacle()
    
  if(obstacleGroup.isTouching(monkey)) {
  gameState = END;
  }
 }
 
   else if(gameState === END){
  
  //stop the ground
  ground.velocityX = 0;
  
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
     
  }
  
 
 
 drawSprites();
}

//function to spawn the food
function spawnbanana(){
  if(frameCount%80===0) {
    banana = createSprite(600,100,20,20);
    banana.velocityX = -2;
    banana.y = Math.round(random(120,200));
    banana.addImage (bananaImage);
    banana.scale = 0.1;
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
 
}

//function to spawn the obstacle
function spawnobstacle(){
  if(frameCount%300===0) {
    obstacle = createSprite(400,330,10,40);
    obstacle.velocityX = -2;
   //obstacle.y = Math.round(random(120,200));
    obstacle.addImage (obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
 
}