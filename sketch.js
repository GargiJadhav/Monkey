  //For creating Sprites
  var monkey , monkey_running;
  var ground;
  var banana;
  var bananaImage;
  var bananaGroup;
  var obstace;
  var obstaceImage;
  var FoodGroup;
  var SurvivalTime=0;
  var PLAY = 1;
  var END = 0;
  var gameState=PLAY;
  var monkeyStop;
  //For loading animations
  function preload(){


    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
    monkeyStop = loadAnimation("sprite_0.png");
   bananaImage = loadImage("banana.png");
    obstaceImage = loadImage("obstacle.png");

  }



  function setup() {
    ground = createSprite(290,520,630,20);


   monkey = createSprite(100,500,20,20);
    monkey.addAnimation("moving",monkey_running);
    monkey.addAnimation("stop", monkeyStop);
    monkey.scale = 0.1;

    FoodGroup = createGroup();
     obstace = createSprite(500,480,20,20);
      obstace.addImage(obstaceImage);
      obstace.scale=0.2;
      obstace.velocityX=-4;
      obstace.lifetime=-1;
    monkey.setCollider("circle",0,0,100);
      monkey.debug=true
  }


  function draw() {
    createCanvas(600,600);
    background("skyblue");

  monkey.collide(ground);

    if(gameState===PLAY){
       if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
      if(monkey.isTouching(obstace)){
        gameState = END;
      obstace.velocityX=0;
        FoodGroup.destroyEach();
      }


      if(ground.x >= 0){
      ground.x = ground.width/2;
    }

      bananas();
    obstacles();
       if(keyDown("space")&&monkey.y>=180){
      monkey.velocityY=-12;
       }
       SurvivalTime=SurvivalTime + Math.round(getFrameRate()/60);
      monkey.velocityY=monkey.velocityY+0.8;
    }
   else if(gameState===END){
     monkey.changeAnimation("stop",monkeyStop);
      ground.velocityX=0;
     stroke("pink");
     fill("pink");
     textSize(50);
  text("G A M E O V E R ",100,100);
     if(SurvivalTime>=500){
      text("🥇👑🍦",200,200);
    }
   }


   console.log(gameState);

  monkey.depth = obstace.dept ;
    monkey.depth=monkey.depth+4;





    stroke("black");
    textSize(20);
    fill("yellow");

    text("Survival Time:"+SurvivalTime,100,50);
  drawSprites();  
  }
  function bananas(){
    if(frameCount%80===0){
      banana = createSprite(200,300,20,20);
      banana.addImage(bananaImage);
      banana.velocityX = -7;
      banana.scale = 0.1;
      banana.lifetime = -1;
      banana.y=Math.round(random(120,200));

    FoodGroup.add(banana)
    }

  }
  function obstacles(){
    if(frameCount%300===0){
      obstace = createSprite(500,480,20,20);
      obstace.addImage(obstaceImage);
      obstace.scale=0.2;
      obstace.velocityX=-4;
      obstace.lifetime=-1;

    }
  }




