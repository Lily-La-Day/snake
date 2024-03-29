const width = 50
const squares = []
let newPos = []
let snakePos = [1200, 1250, 1300]
let direction = ''
let randomNum = 0
let randomNumTwo = 0
let shouldMove = true
let scoreTracker = 0
let speed = 50
let time = 3000


//Need to adjust time food takes to appear as snake length increases



const scoreFunc = () => {
  const score = document.querySelector('h2')
  score.innerText = scoreTracker

}

//handles key presses
function handleKeyDown(e) {

  switch(e.keyCode) {
    case 38:
      direction = 'up'
      moveBody()
      break
    case 39:
      direction = 'right'
      moveBody()
      break
    case 40:
      direction = 'down'
      moveBody()
      break
    case 37:
      direction = 'left'
      moveBody()
      break

  }

}

//space checking functions

const topCheck = () => {
  if (snakePos[0] < 50) {
    return snakePos[0] += 2450
  }
}

const bottomCheck = () => {
  if (snakePos[0] > 2450){
    return snakePos[0] -= 2450
  }
}

const zeroLineCheck = () => {
  if(snakePos[0] === 0)
    return snakePos[0] += 49
}



//changes snakes' direction and moves body accordingly, checking for grid edges beforehand
const bodyCalc = (direction) => {
  let vari
  switch(direction) {
    case 'down':
      bottomCheck()
      vari = snakePos[0] += width
      snakePos[0] -= width
      snakePos.unshift(vari)
      snakePos.pop()
      return snakePos
    case 'up':
      topCheck()
      vari = snakePos[0] -= width
      snakePos[0] += width
      snakePos.unshift(vari)
      snakePos.pop()
      return snakePos
    case 'left':
      zeroLineCheck()
      vari = snakePos[0] -= 1
      snakePos[0] += 1
      snakePos.unshift(vari)
      snakePos.pop()
      return snakePos

    case 'right':
      vari = snakePos[0] += 1
      snakePos[0] -= 1
      snakePos.unshift(vari)
      snakePos.pop()
      return snakePos
  }
  newPos = snakePos

}


const makeRandomNums = () => {
  randomNum = Math.floor(Math.random() * width * width)
  randomNumTwo = Math.floor(Math.random() * width * width)
}

//makes food and positions it on grid somewhere that the snake isn't
const makeFood = () => {
  makeRandomNums()
  const newPos = [...document.querySelectorAll('.snake')]
  const addFood = () => {
    if (newPos.every(pos => pos !== randomNum)) {
      squares[randomNum].classList.add('food')
    } else {
      squares[randomNumTwo].classList.add('food')
    }
  }

  setTimeout(addFood, time)


}


const makeFoodTime = () => {

  if(scoreTracker < 25000) {
    time = 3000
  } else if (scoreTracker < 50000) {
    time = 5000
  } else {
    time = 10000
  }

}


//removes food when snake head contacts food
const eatFood = (randomNum) => {
  const newPos = [...document.querySelectorAll('.snake')]
  const newPosNums = newPos.map(pos=>parseInt(pos.dataset.index))
  if ((newPosNums.some(num => num === randomNum))){
    squares[randomNum].classList.remove('food')
    const nextPosOne = snakePos[-1]
    setTimeout(growSnake(nextPosOne), 1000)
    scoreTracker += width * width
    scoreFunc()
    makeFood()
  }
}

//function to make snake longer and by bigger increments depending on user's score (can almost certainly be refactored)
const growSnake = (nextPosOne) => {
  if(scoreTracker < 1000){
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
  } else if (scoreTracker < 3000) {
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
  } else {
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)
    snakePos.push(nextPosOne)

  }
}

//stops snake if snake body becomes shorter(ie. head is overlapping body)
const loseFunc = (storedNum) => {
  const nowPos = [...document.querySelectorAll('.snake')]
  const nowPosNums = nowPos.map(pos=>parseInt(pos.dataset.index))
  const withoutHead = nowPosNums.slice(1)
  if (withoutHead.length < storedNum && squares.some(square => square.classList.contains('food'))){
    nowPos.forEach(pos => pos.classList.add('dead-snake'))
    squares.forEach(square => square.classList.remove('snake'))
    shouldMove = false
  }
}

//moves snake

const moveBody = () => {
  console.log(snakePos)
  if (shouldMove){
    bodyCalc(direction)
    squares.forEach(square => square.classList.remove('snake'))
    squares.forEach(square => square.classList.remove('snake-bod'))
    for(let i = 0; i < newPos.length; i++) {
      squares.forEach(square => {
        if(parseInt(square.dataset.index) === newPos[i]) {
          square.classList.add('snake')
          snakePos = newPos
        }
      })
    }
    const storeNum = () => {
      const storedNum = snakePos.length -1
      loseFunc(storedNum)
    }
    storeNum()
    eatFood(randomNum)
  }
}

const speedFunc = () => {

  switch(scoreTracker) {
    case scoreTracker < 3000:
      speed = 50
      break
    case scoreTracker < 7000:
      speed = 30
      break
    case scoreTracker < 10000:
      speed = 10

  }
  return speed
}

speedFunc()

makeFoodTime()


setInterval(moveBody, speed)

document.addEventListener('keydown', handleKeyDown)


const init = () => {

  for(let i = 0; i < width * width; i ++ ) {
    const grid = document.querySelector('.grid')
    const square = document.createElement('div')
    grid.append(square)
    square.classList.add('grid-item')
    square.dataset.index = i
    squares.push(square)
  }
  setTimeout(makeFood, 5000)

}




window.addEventListener('DOMContentLoaded', init)
