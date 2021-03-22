var ball;
var database;
var ballPosition;
var newPosition;

function setup(){

    //create the database inside the variable 'database' --> firebase.database()
    database= firebase.database();
    
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //create a variable 'ballPosition' that will go and refer to anything in the database --> database.ref('specify the reference')
    ballPosition= database.ref('ball/position');

    //to create a listener to the ballPosition variable to listen to the changes happening in the canvas --> variablName.on("value",function)
    ballPosition.on("value", readPosition)

 
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //refer to the database and set the values of the position to the newly listened values
    database.ref('ball/position').update({
        //the 'x' and 'y' entries of the database should be updated with the newly listened values
        'x':  newPosition.x + x,
        'y': newPosition.y + y
    })
   
   
   
   
}

function readPosition(data){
    
    //the listened values are stored inside a variable called 'newPosition' --> variableName = data.val()
   newPosition= data.val();

   //match the values of the positions in the databse to the position created in VSC
   ball.x = newPosition.x;
   ball.y = newPosition.y;

}