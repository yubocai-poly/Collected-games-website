'use-strict';

const chess = document.getElementById('chess');
// we use the canvas API to draw the chess board
const context = chess.getContext('2d');
context.strokeStyle = "black"; // the color the lines 

let index = 0

// we use a function drawChess to draw the chess board
function drawLine() {
    // we use a function drawLine to close the chess board and make it above the background 
    for (let i = 0; i < 15; i++) { // we use a for loop to draw the lines
        context.moveTo(20, 20 + i * 40);
        context.lineTo(580, 20 + i * 40);
        context.stroke();
        // we draw the horizontal lines with the interval of 40, and with 15 lines, also the padding of 20
        context.moveTo(20 + i * 40, 20);
        context.lineTo(20 + i * 40, 580);
        context.stroke();
    }

}

drawLine();


// we use a function drawChess to draw the chess pieces
let oneStep = function(i, j, black) { //i,j is the location in the chess board
    drawLine();
    context.beginPath();
    context.arc(20 + i * 40, 20 + j * 40, 15, 0, 2 * Math.PI);
    // this is means the radius of the circle is 15, and the location is the center of the circle
    context.closePath();
    const gradient = context.createRadialGradient(20 + i * 40 + 2, 20 + j * 40 - 2, 20, 20 + i * 40, 20 + j * 40, 0);
    if (black) { // if is black, we use the black color
        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(1, "#636766");
        context.strokeStyle = "#0a0a0a";
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
        context.strokeStyle = "#D1D1D1";
    }
    context.fillStyle = gradient;
    context.fill();

}



// now we write the function to click with the mouse and drop the chess pieces in the location
// Also we want to black and white player go each by each
let black = true;
chess.addEventListener('click', oneclick);


// in order to make sure that the player can't drop the chess pieces in the same location, we use a function to check the location
let chessBoard = [];
for (let i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}
// we create the matrix to store the chess pieces, where the value is 0 means no chess piece, 1 means black chess piece, 2 means white chess piece

function oneclick(event) {
    let x = event.offsetX; // now we set the location of the mouse
    let y = event.offsetY;
    let i = Math.floor((x) / 40); // we use the location of the mouse to get the location in the chess board
    let j = Math.floor((y) / 40);

    // we want to justify whether is this place is empty or not
    // if it is empty, we draw the chess piece
    // if it is not empty, we do nothing

    if (chessBoard[i][j] == 0) {
        oneStep(i, j, black);
        turns();
        index += 1;
        console.log(index);
        if (black) {
            chessBoard[i][j] = 1;
        } else {
            chessBoard[i][j] = 2;
        }
        black = !black;
    } else {
        alert("I would recommend you to choose another place, since this place is already occupied !");
        return;
    }
    
    if(check_win(i, j)){
        alert("Congratulations, you win! When you click Yes, the page will be REFRESHED and start a NEW game !");
        window.location.reload();
        
        
    }

    /*
    for (var k = 0; k < count; k++) {
        if (wins[i][j][k]) {
            myWin[k]++;
            computerWin[k] = 6;
            if (myWin[k] == 5) { // when u reach 5 you win
                alert("The Game is Over, One of the player can win with one step");
                over = true;
            }
        }
    }
    */

}

function turns(event) {
    const turn = document.querySelector('.turn');
    if (index % 2 == 0) {
        turn.classList.remove("black");
        turn.classList.add("white");
    } else {
        turn.classList.remove("white");
        turn.classList.add("black");
    }
}

// win list
let wins = [];
//win list in 3 dimension
for (let i = 0; i < 15; i++) {
    wins[i] = [];
    for (let j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

// the number of all win situations
// horizontal
let count = 0
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

// in columns
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
// from the top left to the bottom right
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
// from the top right to the bottom left
for (let i = 0; i < 11; i++) {
    for (let j = 14; j > 3; j--) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}
console.log(count); //572

// we set the valable of myWin and computerWin
let over = false;
let myWin = [];
let computerWin = [];
// we initialize the array
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}




function check_win(x,y){
    /* check vertical */
    c = chessBoard[x][y];
    is_end=false;
    count = 1;
    index=1;
    
    while(!is_end){
            
        if(y-index<0||chessBoard[x][y-index]!=c){
            is_end=true;
            
        }else if(chessBoard[x][y-index]==c){
            count++;
            index++;
        }
        
    }
    
    is_end=false;
    index=1;
    
    while(!is_end){
        if(y+index<0||chessBoard[x][y+index]!=c){
            is_end=true;
            
        }else if(chessBoard[x][y+index]==c){
            count++;
            index++;
        }
    }    
    
    if(count>=5){
        return true;
    }
    /* check horizontal */
    c = chessBoard[x][y];
    is_end=false;
    count = 1;
    index=1;

    while(!is_end){
        if(x-index<0||chessBoard[x-index][y]!=c){
            is_end=true;

        }else if(chessBoard[x-index][y]==c){
            count++;
            index++;
        }
    }

    is_end=false;
    index=1;

    while(!is_end){
        if(x+index<0||chessBoard[x+index][y]!=c){
            is_end=true;

        }else if(chessBoard[x+index][y]==c){
            count++;
            index++;
        }
    }

    if(count>=5){
        return true;
    }
    /* check diagonal */
    c = chessBoard[x][y];
    is_end=false;
    count = 1;
    index=1;

    while(!is_end){
        if(x-index<0||y-index<0||chessBoard[x-index][y-index]!=c){
            is_end=true;

        }else if(chessBoard[x-index][y-index]==c){
            count++;
            index++;
        }
    }

    is_end=false;
    index=1;

    while(!is_end){
        if(x+index<0||y+index<0||chessBoard[x+index][y+index]!=c){
            is_end=true;
            
        }else if(chessBoard[x+index][y+index]==c){
            count++;
            index++;
        }
    }

    if(count>=5){
        return true;
    }
    /* check diagonal */

    c = chessBoard[x][y];
    is_end=false;
    count = 1;
    index=1;

    while(!is_end){
        if(x-index<0||y+index<0||chessBoard[x-index][y+index]!=c){
            is_end=true;

        }else if(chessBoard[x-index][y+index]==c){
            count++;
            index++;
        }
    }

    is_end=false;
    index=1;

    while(!is_end){
        if(x+index<0||y-index<0||chessBoard[x+index][y-index]!=c){
            is_end=true;

        }else if(chessBoard[x+index][y-index]==c){
            count++;
            index++;
        }
    }

    if(count>=5){
        return true;
    }
    return false;
    
    


    
}