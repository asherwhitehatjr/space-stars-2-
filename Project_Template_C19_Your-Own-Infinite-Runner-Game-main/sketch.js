var spaceImg, space;
var rocketImg, rocket;
var asteroidImg, asteroid;
var starImg, star;
var starCollection = 0;
var gameState = "play"

function preload(){
    spaceImg = loadImage("space.png");
    rocketImg = loadImage("rocket3.png");
    asteroidImg = loadImage("asteroid2.png");
    starImg = loadImage("star.png");

}

function setup() {
    createCanvas(windowHeight,windowWidth);
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocityY = 2;

    asteroidGroup = new Group();
    starGroup = new Group();

    rocket = createSprite(200,200,50,50);
    rocket.scale = 0.2;
    rocket.addImage("rocket",rocketImg);

    //rocket.debug = true;
    rocket.setCollider("circle",0,0,30);
    


 
}

function draw() {

    background(0);
   
    

    if(gameState === "play"){

        stroke("red");
        fill("blue");
        textSize(30);
        text("stars: "+starCollection,10,30);

       // edges = createEdgeSprite();
       // rocket.collide(edges);


        if(keyDown("left_arrow")){
            rocket.x = rocket.x -3;
        }

        if(keyDown("right_arrow")){
            rocket.x = rocket.x +3;
        }

        if(keyDown("up_arrow")){
            rocket.y = rocket.y -3
        }

        if(keyDown("down_arrow")){
            rocket.y = rocket.y +4
        }

        if(space.y > 350){
            space.y = 300
        }

        spawnAsteroids();
        spawnStars();

        if(starGroup.isTouching(rocket)){
            starGroup.destroyEach();
            starCollection = starCollection+50;
        }

        if(asteroidGroup.isTouching(rocket) || rocket.y > 600){
            rocket.destroy();
            gameState = "end"
        }

    
        //text("stars: "+starCollection,250,250);
        
        

     drawSprites();
    }

    if(gameState === "end"){
        stroke("orange");
        fill("red");
        textSize(20);
        text("GAME OVER - MISSION FAILED",230,250)
    }
 
}

function spawnAsteroids() {
    if (frameCount % 240 === 0){
        var asteroid = createSprite(200,-50);
        asteroid.scale = 0.2;

        asteroid.x = Math.round(random(120,400));

        asteroid.addImage(asteroidImg);

        asteroid.velocityY = 2;

        rocket.depth = asteroid.depth;
        rocket.depth +=1;

        asteroid.lifetime = 800;

        asteroidGroup.add(asteroid);
    }
}

function spawnStars() {
    if (frameCount % 240 === 0){
        var star = createSprite(200-50);
        star.scale = 0.1;

        star.x = Math.round(random(120,400));

        star.addImage(starImg);

        star.velocityY = 3;

        rocket.depth = star.depth;
        rocket.depth +=1;

        star.lifetime = 800;

        starGroup.add(star);
    }
}