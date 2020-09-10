var trex, trexRunning, trexCollide, ground, groundImage, invisibleGround, cloudImage, cloudGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleGroup, score, PLAY, END, gameState, restartImage, gameOverImage, restart, gameOver;

function preload(){
trexRunning = loadAnimation ("trex1.png", "trex3.png","trex4.png" );
  

  
trexCollided = loadAnimation ("trex_collided.png"); 
groundImage = loadImage ("ground2.png");
cloudImage = loadImage ("cloud.png");
obstacle1 = loadImage ("obstacle1.png")
obstacle2 = loadImage ("obstacle2.png")
obstacle3 = loadImage ("obstacle3.png")
obstacle4 = loadImage ("obstacle4.png")
obstacle5 = loadImage ("obstacle5.png")
obstacle6 = loadImage ("obstacle6.png")
gameOverImage = loadImage ("gameOver.png");
restartImage = loadImage ("restart.png");
}

function setup(){
  createCanvas(600,200)
    
  trex = createSprite (50,160,20,50)
  trex.addAnimation ("trexRun",trexRunning);
  trex.addAnimation ("Collided",trexCollided)
  trex.scale = 0.5
  
  ground = createSprite (200,180,400,10)
  ground.addImage ("ground",groundImage)
  ground.velocityX = -2;
  ground.x = ground.width/2;

  invisibleGround = createSprite (200,190,400,10)
  invisibleGround.visible = false;

  cloudGroup = new Group();
  obstacleGroup = new Group();

  score = 0
  PLAY = 1
  END = 0

  gameState = PLAY
  
  restart = createSprite(300,85,20,20);
  restart.addImage (restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameOver = createSprite(300,130,20,20);
  gameOver.addImage (gameOverImage);
  gameOver.scale = 0.5
  gameOver.visible = false
}

function draw(){
  background(180)
  
  text(mouseX + "," + mouseY, mouseX, mouseY);
  
if (gameState === PLAY) {
 score = score + Math.round(getFrameRate()/60);
    
  if (ground.x < 0){
  ground.x = ground.width/2;
  }  
  
  if (keyDown ("space")&&trex.y>161){
  trex.velocityY = -10
  }
  
  trex.velocityY = trex.velocityY + 0.5;
    
  if (obstacleGroup.isTouching(trex)){
  gameState=END;
} 
  
  
  
  
  
  
  
  spawnObstacles();
  spawnCloud();
  
  
} else if(gameState === END) {
  
ground.velocityX = 0;

  obstacleGroup.setVelocityXEach (0);
cloudGroup.setVelocityXEach (0);

  trex.velocityY = 0;
trex.changeAnimation ("Collided",trexCollided) 

  obstacleGroup.setLifetimeEach (-1);
cloudGroup.setLifetimeEach (-1);

gameOver.visible = true;
restart.visible = true;
}
  
  text ("Score " + score,530,22)
  trex.collide(invisibleGround)

  
  
  
  
  

  drawSprites();
}

function spawnCloud(){
if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = - (6);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
      break;  
      case 2: obstacle.addImage(obstacle2)
      break;  
      case 3: obstacle.addImage(obstacle3)
      break;  
      case 4: obstacle.addImage(obstacle4)
      break;  
      case 5: obstacle.addImage(obstacle5)
      break;  
      case 6: obstacle.addImage(obstacle6)
      break;  
      default: break;
    }
    
        obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}






