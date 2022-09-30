var mario,mario_running,mario_standing,mario_jumping;
var scenery,sceneryImg;
var obstacles,obstaclesImg;
var invisibleGround;

var END = 0;
var PLAY = 1;

var gameState = PLAY;

var score = 2;

function preload() {
   mario_standing = loadAnimation("mario_standing.png");
   mario_running = loadAnimation("mario_standing.png","mario_walking.png");
   mario_jumping = loadAnimation("mario_jumping.png");
   sceneryImg = loadImage("background.png");
   obstaclesImg = loadImage("obstacle.png");
}

function setup() {
   createCanvas(1294,637);

   scenery = createSprite(647,318.5,100,100);
   scenery.addImage(sceneryImg);
   scenery.scale = 2.6;

   obstaclesGroup = new Group();
   
   invisibleGround = createSprite(120,560,400,10);
   invisibleGround.visible = false;

   mario = createSprite(65,460);
   mario.addAnimation("mario",mario_running);
   mario.scale = 0.25;
}

function draw() {
   
   background("black");
   
   if(gameState === PLAY){
      //mover o chão
      scenery.velocityX = -4;
      //pontuação
      score = score + Math.round(frameCount/60);
      
      if (scenery.x < 0){
        scenery.x = scenery.width/2;
      }
      
      //pular quando a tecla espaço é pressionada
      if(keyDown("space") && mario.y >=100) {
          mario.velocityY = -13;
      }
      
      //acrescentar gravidade
      mario.velocityY = mario.velocityY + 0.8
    
      //gerar obstáculos no chão
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(mario)){
          gameState = END;
      }
    }
     else if (gameState === END) {
        scenery.velocityX = 0;
       
       obstaclesGroup.setVelocityXEach(0);
     }
    
   
    //impedir que mario caia
    mario.collide(invisibleGround); 
    invisibleGround.x = mario.x;

    drawSprites();
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
     var obstacles = createSprite(400,165,10,40);
     obstacles.velocityX = -6;

    
     obstacles.addImage("obstacle.png");
             
     obstacles.scale = 0.5;
     obstacles.lifetime = 300;
    
     obstaclesGroup.add(obstacles);
  }
}