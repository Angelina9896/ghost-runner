var ghost, ghostImage, tower, towerImage;
var door, doorImage, doorGroup, climber, climberImage, climberGroup, invisibleBlock, invisibleGroup;
PLAY = 1;
END = 0;
var gameState = PLAY;

function preload(){
  ghostImage = loadImage("ghost-standing.png")
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
}

function setup(){
  createCanvas(600,600)
  background("white")
  
  tower = createSprite(300,300)
  tower.addImage("tower", towerImage)
  tower.velocityY = 2;
  
  ghost = createSprite(300,300)
  ghost.addImage("ghost", ghostImage)
  ghost.scale = 0.3

  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();
  
}

function draw(){
  background("white")
  if(gameState = PLAY){
  spawnObstacles();
  if(keyDown("space")){
    ghost.velocityY = -12;
  }
  ghost.velocityY = ghost.velocityY + 0.5 
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5
  }
  
  if(tower.y>400){
    tower.y = 300
  }
  
  
  if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleGroup.isTouching(ghost) || ghost.y > 400 || ghost.y<0){
      ghost.destroy();
      gameState = END;
    }
  }
  
  
  drawSprites();
  if (gameState ===  END){
    background("white")
    stroke("teal");
    fill("teal");
    textSize(50);
    text("Game Over", 300,300)
  }
}

function spawnObstacles(){
  if(frameCount%200 === 0){
    door = createSprite(200, -50)
    door.x = Math.round(random(200,400))
    door.addImage(doorImage)
    door.velocityY = 2
    doorGroup.add(door)
    door.lifetime = 700
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    
    climber = createSprite(200, 0)
    climber.addImage(climberImage)
    climber.x = door.x
    climber.velocityY = 2
    climberGroup.add(climber)
    climber.lifetime = 700

    
    invisibleBlock = createSprite(200, 15)
    invisibleBlock.x = door.x
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 2;
    invisibleGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 700
    invisibleBlock.visible=false

    
  }
}
