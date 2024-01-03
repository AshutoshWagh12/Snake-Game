let snakeDirection = {x: 0, y: 0}; // Initial Direction snake don't move 
const foodSound = new Audio('./Sounds/FoodEat.mp3');
const gameOverSound = new Audio('./Sounds/gameOver.mp3');
const moveSound = new Audio('./Sounds/Move.wav');
const musicSound = new Audio('./Sounds/Background.mp3');

let score = 0;
let speed = 5;
let lastPaintTIme = 0;
let snakeArr = [ 
    {x:13 , y:15}
]

food = {x:6 , y:7};


// Game Functions 

function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTIme)/1000 < 1/speed){  // 1/speed means how many    
        return;                            //  times you want to render your screen.
    } 
    lastPaintTIme = currentTime;
    gameEngine();
}

function isCollide(snake){
    // If you bumb into your self 

    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
}

function gameEngine(){

    // part-1 : Updating the snake array & food 

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.play();
        snakeDirection = {x:0 , y: 0};
        alert("Game Over. Press any key to play againe");
        snakeArr = [{x:13 , y:15}];
        musicSound.play('');
        score = 0;
    }

    // If you have eaten the food , Increment the score & regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play('');
        score +=1;
        scoreBox.innerHTML = "Score: " + score;
        if(score>highSocre_value){
            highSocre_value = score;
            localStorage.setItem('highScore',JSON.stringify(highSocre_value));
            highScoreBox.innerHTML = 'highSocre: '+highSocre_value;
        }
        snakeArr.unshift({x: snakeArr[0].x + snakeDirection.x , y: snakeArr[0].y + snakeDirection.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y: Math.round(a+(b-a)*Math.random())};
    }

    // Moving the SNAKE

    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += snakeDirection.x;
    snakeArr[0].y += snakeDirection.y;


    // part-2 : Display the snake & food

    // Display the Snake

    board.innerHTML = "";                             //          e.x
    snakeArr.forEach((e,index)=>{                     //       _____x_____
        snakeElement = document.createElement("div"); //    y |          |
        snakeElement.style.gridRowStart = e.y;        // e.y  |          |
        snakeElement.style.gridColumnStart = e.x;     //      |__________|
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    }) 

    // Display the Food
                           
        foodElement = document.createElement("div"); 
        foodElement.style.gridRowStart = food.y;        
        foodElement.style.gridColumnStart = food.x;     
        foodElement.classList.add('food');
        board.appendChild(foodElement);

}

// Main Logic 

let highSocre = localStorage.getItem('highScore'); // if high is not present in local storage ->
if(highSocre === null){
    highSocre_value = 0;
    localStorage.setItem('highScore',JSON.stringify(highSocre_value));
}
else{
    highSocre_value = JSON.parse(highSocre);
    highScoreBox.innerHTML = 'highSocre: '+highSocre;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    snakeDirection = {x: 0 , y: 1}  // Start the game
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            snakeDirection.x = 0;
            snakeDirection.y = -1;
            break;
        case 'ArrowDown':
            snakeDirection.x = 0;
            snakeDirection.y = 1;
            break;
        case 'ArrowLeft':
            snakeDirection.x = -1;
            snakeDirection.y = 0;
            break;
        case 'ArrowRight':
            snakeDirection.x = 1;
            snakeDirection.y = 0;
            break;
        default:
            break;
    }
})