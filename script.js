const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//console.log(canvas.height);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// built-in img class constructor it will create html image element 
const playerImage = new Image();
playerImage.src = "shadow_dog.png";

const spriteWidth = 575; // photo width/ num of cols = 6876 / 12
const spriteHeight = 523; // phot height / num of  rows = 5230 / 10
//var frameX = 0;
//var frameY = 1;

var gameFrame = 0;
var staggerFrame = 4; //speed
var x = 0;
var frameNum = 0;

//player state
var playerState = "idle";
var dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function(e){
    playerState = e.target.value;

});

var staggerFrame = 1;
var dropdown2 = document.getElementById("speed");
dropdown2.addEventListener("change", function(a){
    staggerFrame = parseInt(a.target.value);

});
console.log(staggerFrame);




const spriteAnimations = [];
const animationStates = [
    { name: "idle", frames :7},
    { name: "jump", frames :7},
    { name: "fall", frames :7},
    { name: "run", frames :9},
    { name: "dizzy", frames :11},
    { name: "sit", frames :5},
    { name: "roll", frames :7},
    { name: "bite", frames :7},
    { name: "getHit", frames :12},
    { name: "howl", frames :4}
];

animationStates.forEach((state,index) => { // position of col
    var frames = {
        loc:[],

    }
    for(var j = 0; j<state.frames; j++){
        var positionX = j*spriteWidth;
        var positionY = index*spriteHeight;
        frames.loc.push({x:positionX, y:positionY});
    }
    spriteAnimations[state.name] = frames;
  
});
console.log(animationStates);
    

function animate(){
 
    //clear old paint from canvas
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
    // draw rectangle
    //ctx.fillRect(50,50,100, 100);
    //draw image
    //ctx.drawImage(image, sx,sy,sw,sh, dx,dy,dw,dh);

    var frameX = spriteWidth * position;
    var frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX,frameY,spriteWidth,spriteHeight, 0,0,spriteWidth,spriteHeight);
    
    // if(gameFrame % staggerFrame ==0){ // speed of animation flow  
    //     if(frameX < 6){ // frames dtarted from 0
    //         frameX++;
    //     }
    //     else{
    //         frameX =0;
    //     }
    // }
    gameFrame++;

  
    //x++;
    //to animate; to show picture over and over

    requestAnimationFrame(animate);
};
animate();