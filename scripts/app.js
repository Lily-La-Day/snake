const width = 100
const squares = []
const bodyLength = 1
let headPos = 1000
let newPos = []
let snakePos = [1000, 1100, 1200]
let direction = ''

let randomNum = 0
let randomNumTwo = 0
let shouldMove = true
let scoreTracker = 0



const scoreFunc = () => {
const score = document.querySelector('h2')
score.innerText = scoreTracker

}
// (parseInt(square.dataset.id) === newPos)








// const moveFunc = (x) => {
//
//   switch(direction) {
//     case 'down':
// x += width
//
//     break
//     case 'up':
//   x -= width
//     break
//     case 'right':
//
//  x += 1
//     break
//     case 'left':
//
//  x -= 1
//     break
//   }
//
//
//
// }


const moveHead = () => {
  squares[headPos].classList.add('snake-head')
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

  if (snakePos[0] < 100) {
    return snakePos[0] += 9900
  }

}

const bottomCheck = () => {

  if (snakePos[0] > 9900) {
    return snakePos[0] -= 9900
  }

}

const bodyCalc = (direction) => {


  //   for(let i = 1; i < snakePos.length; i++) {
  // console.log(snakePos[2])
  //     snakePos[i] = snakePos[i-1]
  // }

  let vari

  switch(direction) {
    case 'down':
    bottomCheck()
    vari = snakePos[0] += 100
    snakePos[0] -= 100
    snakePos.unshift(vari)
    snakePos.pop()
    return snakePos


    case 'up':
    topCheck()
    vari = snakePos[0] -= 100
    snakePos[0] += 100
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
  randomNum = Math.floor(Math.random() * 10000)
  randomNumTwo = Math.floor(Math.random() * 10000)
  // let randomNumTwo =  Math.floor(Math.random() * 10000)
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
    const nextPos = snakePos[-1]
    const nextPosTwo = snakePos[-2]

    setTimeout(growSnake(nextPos, nextPosTwo), 1000)
    scoreTracker += 10000
    scoreFunc()
    makeFood()
  }
}


const growSnake = (nextPos, nextPosTwo) => {
  snakePos.push(nextPos)
  snakePos.push(nextPosTwo)
}

const loseFunc = (storedNum) => {
  const nowPos = [...document.querySelectorAll('.snake')]
  const nowPosNums = nowPos.map(pos=>parseInt(pos.dataset.index))
  const withoutHead = nowPosNums.slice(1)

  console.log(squares.length)
  if (withoutHead.length < storedNum && squares.some(square => square.classList.contains('food'))){
    nowPos.forEach(pos => pos.classList.add('dead-snake'))
    squares.forEach(square => square.classList.remove('snake'))
    shouldMove = false




  }
}





const moveBody = () => {
  if (shouldMove){
    bodyCalc(direction)

    // document.querySelectorAll('[class*="snake"]')
    squares.forEach(square => square.classList.remove('snake'))
    squares.forEach(square => square.classList.remove('snake-bod'))

    for(let i = 0; i < newPos.length; i++) {
      squares.forEach(square => {
        if(parseInt(square.dataset.index) === newPos[i]) {
          square.classList.add('snake')


          snakePos = newPos

        }

      }
    )
  }
  const storeNum = () => {
    const storedNum = snakePos.length -1

    loseFunc(storedNum)
  }
  storeNum()


  eatFood(randomNum)
}
}

setInterval(moveBody, 1)



// snake.forEach(square => square.classList.remove('snake'))
// squares.forEach(square => square.classList.add('snake'))






document.addEventListener('keydown', handleKeyDown)








const init = () => {

  for(let i = 0; i < width * width; i ++ ) {

    const grid = document.querySelector('.grid')
    // console.log(grid)
    const square = document.createElement('div')
    grid.append(square)
    square.classList.add('grid-item')
    square.dataset.index = i
    squares.push(square)
    // square.innerHTML = i

    //
  }
  setTimeout(makeFood, 2000)
  squares[headPos].classList.add('snake-head')


}

// setTimeout(makeFood, 10000)



window.addEventListener('DOMContentLoaded', init)
