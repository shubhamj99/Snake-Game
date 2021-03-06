let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

import { update as updateSnake, draw as drawSnake, snakeBody, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

function main(currentTime){
    if(gameOver){
        let score = snakeBody.length
        if (confirm('Your Score is ' + score + '. Press OK to restart.')){
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return
    
    //console.log("render")
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}