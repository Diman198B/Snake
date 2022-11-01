let canvas = document.getElementById('holst');   // Playing field
let ctx = canvas.getContext('2d');               // Set canvas 2d
let grid = 20;      // The size of one cell on the field is 20 pixels. (field 500x500 / 25x25 cells)
let count = 0;      // Counter for game speed
let score = 0;      // Counter of mouses
let MaxSpeed = 5;   // Game difficulty variable

let snake = {
  x: 20,            // Snake initial x coordinates (multiples of 20)
  y: 20,            // Snake initial y coordinates (multiples of 20)
  dx: grid,         // Snake speed - in each new frame, the snake moves along the X or Y axis.
  dy: 0,            // At the start, the snake will move horizontally.
  cells: [],        // Snake tail
  maxCells: 3       // Initial snake length
};

let mouse = {
  x: 300,           // Mouse initial x coordinates (multiples of 20)
  y: 300            // Mouse initial y coordinates (multiples of 20)
};

function getRandomInt(min, max) {  // Function to create a random number generator in the min max range
  return Math.floor(Math.random() * (max - min)) + min;     
}
function clearState() {            // Function to return to the initial state of the game
  snake.x = 20;
  snake.y = 20;
  snake.cells = [];
  snake.maxCells = 3;
  snake.dx = grid;
  snake.dy = 0;
  score = 0;
  document.getElementById("numberMouse").innerHTML = score;
  mouse.x = getRandomInt(0, 25) * grid;     // Put the mouse in a random place
  mouse.y = getRandomInt(0, 25) * grid;     // Put the mouse in a random place
  }
function funDifficult() {         // Function to control the difficulty of the game using the slider
  let RangeSpeed = document.getElementById('range'); 
  MaxSpeed = RangeSpeed.value;
}

//-------------------Game loop-----------------------------
function loop() {
  requestAnimationFrame(loop);    // We slow down the speed of the game from 60 to 12 frames / sec. The game code will be executed only once out of five.
  if (++count < MaxSpeed) {
    return;
  }
  count = 0;                      // Reset counter for game speed
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clearing the playing field
  snake.x += snake.dx;            // Moving the snake along the X axis
  snake.y += snake.dy;            // Moving the snake along the Y axis

  snake.cells.unshift({x: snake.x, y: snake.y});        // Add the coordinates of the snake's head to the beginning of the snake array.
  if (snake.cells.length > snake.maxCells) {            // Immediately after that, we remove the last element from the snake array, 
    snake.cells.pop();                                  // because it moves and constantly frees the cells after itself.
  }
  
  ctx.fillStyle = '#4C4C4C';      // Draw a mouse
  ctx.fillRect(mouse.x, mouse.y, grid - 1, grid - 1);   // To create the cell effect, make the squares smaller by one px (For mouse)
  ctx.fillStyle = '#007439';      // One movement of the snake - one new drawn square

    // We process each element of the snake
  snake.cells.forEach(function (cell, index) {          // First, work with the elements of the cells array
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);   // To create the cell effect, make the squares smaller by one px (For snake)

    if (cell.x === mouse.x && cell.y === mouse.y) {     // If the snake ate the mouse
      snake.maxCells++;                                 // Increase the length of the snake
      score++;                                          // Increment the counter of mice eaten
      document.getElementById("numberMouse").innerHTML = score; // Display the counter of mice eaten
      mouse.x = getRandomInt(0, 25) * grid;             // Put the mouse in a random place
      mouse.y = getRandomInt(0, 25) * grid;             // Put the mouse in a random place
    }
   
    //Checking if the snake has hit a wall
   if (snake.x < 0 || snake.x === canvas.width || snake.y < 0 || snake.y === canvas.height) {
    clearState();
  }
    // Checking if the snake has collided with itself:
    // In the for loop, compare the elements and indexes of the array of snakes
    for (let i = index + 1; i < snake.cells.length; i++) {   
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        clearState();
      }
    }
  });
}
document.getElementById("numberMouse").innerHTML = score;      //Draw a counter with 0 eaten mice

document.addEventListener('keydown', function (event) {
    // Additionally, we check that when the button is pressed in the opposite direction of movement,
    // the snake does not turn around
  if (event.code === "ArrowLeft" && snake.dx === 0) {          // Left Arrow
    snake.dx = -grid;   
    snake.dy = 0;
  }
  else if (event.code === "ArrowUp" && snake.dy === 0) {       // Up arrow
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (event.code === "ArrowRight" && snake.dx === 0) {    // Right Arrow
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (event.code === "ArrowDown" && snake.dy === 0) {     // Arrow to down
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop); 
//-----------------End of game loop------------------