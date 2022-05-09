// This is the javascript program of the famous game Flappy Bird
// Language: javascript
// Path: flip bird/app.js   

"use strict";


let currentTime1 = performance.now();


document.addEventListener("DOMContentLoaded", start_game);

function start_game() {
    const bird = document.querySelector(".bird");
    const container = document.querySelector(".container");
    const ground = document.querySelector(".ground");
    const score = document.querySelector(".number");

    // adjustment the position of the bird
    let bird_left = 140;
    let bird_bottom = 350;
    let gap = 430;
    let isGameOver = false;
    let index = -1;

    function moveBird() {
        bird_bottom -= 1 // move the bird down
        bird.style.left = bird_left + "px";
        bird.style.bottom = bird_bottom + "px";

    }

    // we want to execute the function moveBird every 10 milliseconds
    let GametimeID = setInterval(moveBird, 10);

    // now we set a jump function to the bird
    function jump() {
        if (bird_bottom < 560) {
            bird_bottom += 53;
            bird.style.bottom = bird_bottom + "px";
        }
    }

    // you can both use the spacebar or the up arrow to jump
    container.addEventListener("click", jump);
    document.addEventListener("keydown", jump);

    // new we create a function to create the new pillars and add them to the container
    function generate_pillars() {
        // now we want to set a random height for the pillars
        let pillar_height = Math.floor(Math.random() * 150)
        let pillar_left = 500;
        const pillar = document.createElement("div");
        // now we try to create the top pillar which is the rotated of the pillar
        const top_pillar = document.createElement("div");
        if (isGameOver === false) {
            pillar.classList.add("pillar");
            top_pillar.classList.add("top_pillar");
        }
        pillar.style.width = "60px";
        pillar.style.height = "300px"
        pillar.style.left = pillar_left + "px";
        top_pillar.style.left = pillar_left + "px";
        pillar.style.bottom = pillar_height + "px";
        top_pillar.style.bottom = pillar_height + gap + "px";
        if (isGameOver === false) {
            container.appendChild(pillar);
            container.appendChild(top_pillar);
        }

        function pillar_move() {
            pillar_left -= 1;
            pillar.style.left = pillar_left + "px";
            // we also want to move the top pillar
            top_pillar.style.left = pillar_left + "px"; // move the top pillar

            // if the pillar is out of the screen we remove it
            if (pillar_left < -60) {
                clearInterval(timeID);
                container.removeChild(pillar);
                container.removeChild(top_pillar);
            }

            if (
                // if the bird is in the pillar we set the game over
                pillar_left > 120 && pillar_left < 190 && bird_left == 140 && (bird_bottom < pillar_height + 298 ||
                    bird_bottom > pillar_height + gap - 68) // 碰撞算法，计算鸟是否碰撞到了柱子，记得以后还要进行调整
                /* add the similiar restriction to the top pillar */
                ||
                bird_bottom === 150
            ) {
                gameOver();
                clearInterval(timeID);
            }
        }
        let timeID = setInterval(pillar_move, 10);
        // we want to create a new pillar every 500 milliseconds
        if (isGameOver === false) { // we want to not create new pillars if the game is over
            setTimeout(generate_pillars, 4000);
            index += 1;
            console.log(index);
            // 把index的值输入·到score中
            score.innerHTML = index;
        }

    }
    generate_pillars();

    //  now we want to create the function of gameover
    function gameOver() {
        clearInterval(GametimeID);
        console.log("Game Over");
        isGameOver = true;
        // remove the eventlistener of click and keydown
        container.removeEventListener("click", jump);
        document.removeEventListener("keydown", jump);
        alert_function()
            // print the gameover text to the container
    }

    const gameOver_display = document.querySelector(".Gameover_button");

    function alert_function() {
        // we add a div in the container with the class gameover
        const gameover = document.createElement("div");
        gameover.classList.add("gameover");
        gameover.innerHTML = "Game Over";
        container.appendChild(gameover);
        // we want to remove the display class of the gameover
        gameOver_display.classList.remove("display");
        setTimeout(() => {
            location.replace("start.html");

        }, 5000);
    }

}