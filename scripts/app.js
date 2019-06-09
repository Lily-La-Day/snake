const width = 50
const squares = []
let newPos = []
let snakePos = [1200, 1250, 1300]
let direction = ''
let randomNum = 0
let randomNumTwo = 0
let shouldMove = true
let scoreTracker = 0

const scoreFunc = () => {
  const score = document.querySelector('h2')
  score.innerText = scoreTracker

}

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

const topCheck = () => {
  if (snakePos[0] < 50) {
    return snakePos[0] += 2450
  }
}

const bottomCheck = () => {
  if (snakePos[0] > 2450) {
    return snakePos[0] -= 2450
  }
  }


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
  // let randomNumTwo =  Math.floor(Math.random() * width00)
}

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

  setTimeout(addFood, 1000)


}
const eatFood = (randomNum) => {
  const newPos = [...document.querySelectorAll('.snake')]

  const newPosNums = newPos.map(pos=>parseInt(pos.dataset.index))
  if ((newPosNums.some(num => num === randomNum))){

    squares[randomNum].classList.remove('food')
    const nextPosOne = snakePos[-1]
// const nextPosThree = snakePos[-2]
// const nextPosFive = snakePos[-3]
// const nextPosSix = snakePos[-4]
// const nextPosTwo = snakePos[-5]
// const nextPosSeven = snakePos[-6]
// const nextPosNine = snakePos[-7]
// const nextPosTen = snakePos[-8]
// const nextPosEight =  snakePos[-9]

    setTimeout(growSnake(nextPosOne), 1000)
      // nextPosOne, nextPosTwo, nextPosThree, nextPosFive, nextPosSix, nextPosSeven, nextPosEight, nextPosNine, nextPosTen), 1000)
    scoreTracker += width * width
    scoreFunc()
    makeFood()
  }
}

const growSnake = (nextPosOne) => {
  // nextPosTwo, nextPosThree, nextPosFive, nextPosSix, nextPosSeven, nextPosEight, nextPosNine, nextPosTen)
  snakePos.push(nextPosOne)
    // snakePos.push(nextPosTwo)
    //   snakePos.push(nextPosThree)
    //     snakePos.push(nextPosFive)
    //       snakePos.push(nextPosSix)
    //       snakePos.push(nextPosSeven)
    //       snakePos.push(nextPosNine)
    //       snakePos.push(nextPosTen)

  console.log(snakePos)
  }

const loseFunc = (storedNum) => {
  const nowPos = [...document.querySelectorAll('.snake')]
  const nowPosNums = nowPos.map(pos=>parseInt(pos.dataset.index))
  const withoutHead = nowPosNums.slice(1)
  if (withoutHead.length < storedNum && squares.some(square => square.classList.contains('food'))){
    console.log(withoutHead.length, storedNum)
    nowPos.forEach(pos => pos.classList.add('dead-snake'))
    squares.forEach(square => square.classList.remove('snake'))
    shouldMove = false
  }
}

const moveBody = () => {
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

setInterval(moveBody, 50)

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
  setTimeout(makeFood, 3000)

}




window.addEventListener('DOMContentLoaded', init)
