"use strict";

/* initial chess board */
let chessboard = new Array([0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]);

/* initial score */
let score = 0;
let isWin = false;
let isLose = false;
let high_score = 0




    

function display(){
    /* display and update the chess board */
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            
            /* change value */
            document.getElementById("g"+i+"-"+j).innerHTML = chessboard[i][j];
            /* change color */
            document.getElementById("g"+i+"-"+j).style.backgroundColor = `rgb(255,${210-200*(Math.log(chessboard[i][j])/8)},${210-200*(Math.log(chessboard[i][j])/8)})`;
            if(chessboard[i][j] == 0){
                document.getElementById("g"+i+"-"+j).innerHTML = "";
                document.getElementById("g"+i+"-"+j).style.backgroundColor = "#b6acac82";
            }

           
        }
    }
    /* display score */
    document.getElementById("score").innerHTML = score;
    /* display high score */
    if(score > high_score){
        high_score = score;
        document.getElementById("hscore").innerHTML = high_score;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }


/* add random number to random grids*/
function add(){
    let is_full = false;
    while(!is_full){

        let x = getRandomInt(0,4);
        let y = getRandomInt(0,4);
        let value = getRandomInt(1,3);
        
        if(chessboard[y][x] == 0){
            chessboard[y][x] = 2**value;
            break;
        }
        /* change up to here */
        is_full = true;
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                if(chessboard[i][j] == 0){
                    is_full = false;
                    break;
                }
            }
        }
        
    }
    if(is_full){
        isLose = true;
        alert("You Lose! Please click the 'New Game' button to start a new game.");
    }
}


function moveLeft(){
    /* move all the grids to the left and merge if needed */
    let is_moved = false;
    let is_merged = new Array([false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]);
    for(let i = 0; i < 4; i++){
        for(let j=0; j < 4; j++){
            if(chessboard[i][j] != 0){
                let k = j;
                while(k > 0){
                    if(chessboard[i][k-1] == 0){
                        chessboard[i][k-1] = chessboard[i][k];
                        chessboard[i][k] = 0;
                        is_moved = true;
                        k--;
                    }
                    else if(chessboard[i][k] == chessboard[i][k-1] && !is_merged[i][k]){
                        chessboard[i][k-1] = chessboard[i][k]*2;
                        score += chessboard[i][k];
                        is_merged[i][k] = true;
                        chessboard[i][k] = 0;
                        is_moved = true;
                        break;
                    }
                    else{
                        break;
                    }
                }
            }
        }
    }
    if(is_moved){
        add();
    }
}


function moveRight(){
    /* move all the grids to the right and merge if needed */
    let is_moved = false;
    let is_merged = new Array([false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]);
    for(let i = 0; i < 4; i++){
        for(let j=3; j >= 0; j--){
            if(chessboard[i][j] != 0){
                let k = j;
                while(k < 3){
                    if(chessboard[i][k+1] == 0){
                        chessboard[i][k+1] = chessboard[i][k];
                        chessboard[i][k] = 0;
                        is_moved = true;
                        k++;
                    }
                    else if(chessboard[i][k] == chessboard[i][k+1] && !is_merged[i][k]){
                        chessboard[i][k+1] = chessboard[i][k]*2;
                        score += chessboard[i][k];
                        is_merged[i][k] = true;
                        chessboard[i][k] = 0;
                        is_moved = true;
                        break;
                    }
                    else{
                        break;
                    }
                }
            }
        }
    }
    if(is_moved){
        add();
    }
}



function moveUp(){
    /* move all the grids to the up and merge if needed */
    let is_moved = false;
    let is_merged = new Array([false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]);
    for(let i = 0; i < 4; i++){
        for(let j=0; j < 4; j++){
            if(chessboard[j][i] != 0){
                let k = j;
                while(k > 0){
                    if(chessboard[k-1][i] == 0){
                        chessboard[k-1][i] = chessboard[k][i];
                        chessboard[k][i] = 0;
                        k--;
                        is_moved = true;
                    }
                    else if(chessboard[k][i] == chessboard[k-1][i] && !is_merged[k][i]){
                        chessboard[k-1][i] = chessboard[k][i]*2;
                        score += chessboard[k][i];
                        is_merged[k][i] = true;
                        chessboard[k][i] = 0;
                        is_moved = true;
                        break;
                    }
                    else{
                        break;
                    }
                }
            }
        }
    }
    if(is_moved){
        add();
    }
}

function moveDown(){
    /* move all the grids to the down and merge if needed */
    let is_moved = false;
    let is_merged = new Array([false,false,false,false],[false,false,false,false],[false,false,false,false],[false,false,false,false]);
    for(let i = 0; i < 4; i++){
        for(let j=3; j >= 0; j--){
            if(chessboard[j][i] != 0){
                let k = j;
                while(k < 3){
                    if(chessboard[k+1][i] == 0){
                        chessboard[k+1][i] = chessboard[k][i];
                        chessboard[k][i] = 0;
                        k++;
                        is_moved = true;
                    }
                    else if(chessboard[k][i] == chessboard[k+1][i] && !is_merged[k][i]){
                        chessboard[k+1][i] = chessboard[k][i]*2;
                        score += chessboard[k][i];
                        is_merged[k][i] = true;
                        chessboard[k][i] = 0;
                        is_moved = true;
                        break;
                    }
                    else{
                        break;
                    }
                }
            }
        }
    }
    if(is_moved){
        add();
    }
}

function newGame(){
    /* start a new game */
    score = 0;
    isLose = false;
    isWin = false;
    chessboard = new Array([0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]);
    add();
    display();
}




/* move the chess board */
document.onkeydown = move;


function move(event){
    let e=window.event||event;
    if(check_lose()){
        isLose = true;
        alert("You Lose! Please click the 'New Game' button to start a new game.");
    }
    if(check_win()){
        isWin = true;
        alert("You Win! Please click the 'New Game' button to start a new game.");
    }  
    switch(e.keyCode){
        case 37: //left;
            moveLeft();
            display();
            break;
        
        case 38: //up;
            moveUp();
            display();
            break;
        
        case 39: //right;

            moveRight();
            display();
            break;
        
        case 40: //down;
            moveDown();
            display();
            break;
    }
    
        
    
}

function check_lose(){
    /* check if the game is lose */
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(chessboard[i][j] == 0){
                return false;
            }
        }
    }
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 3; j++){
            if(chessboard[i][j] == chessboard[i][j+1]){
                return false;
            }
    
        }
    }
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 4; j++){
            if(chessboard[i][j] == chessboard[i+1][j]){
                return false;
            }
        }
    }

    return true;
}

function check_win(){
    /* check if the game win */
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(chessboard[i][j] == 2048){
                return true;
            }
        }
    }
    return false;
}

function cheat(){
    /* cheat */
    chessboard[0][0] = 1024;
    chessboard[0][1] = 1024;
    display();
    if(check_win()){
        isWin = true;
        
        alert("You Win!");
    }  
}
    
newGame();
