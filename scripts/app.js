const width = 100
const squares = []
const bodyLength = 1
let headPos = 1000
let newPos = []
let snakePos = [1000, 1100, 1200]
let direction = ''
let bodyPart = 500
let randomNum = 0
let randomNumTwo = 0
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
  console.log(randomNum)

  const newPos = [...document.querySelectorAll('.snake')]
  if (newPos.every(pos => pos !== randomNum)) {
    squares[randomNum].classList.add('food')
  } else {
  squares[randomNumTwo].classList.add('food')
  }



}





const eatFood = (randomNum) => {
console.log('eating')
console.log(randomNum)

const newPos = [...document.querySelectorAll('.snake')]
console.log(newPos)
  if ((parseInt(newPos[0].dataset.index) === randomNum)){

    squares[randomNum].classList.remove('food')
    const nextPos = snakePos[-1]

setTimeout(growSnake(nextPos), 1000)
  makeFood()
}
}


const growSnake = (nextPos) => {
    snakePos.push(nextPos)
}







const moveBody = () => {
  bodyCalc(direction)

  // document.querySelectorAll('[class*="snake"]')
  squares.forEach(square => square.classList.remove('snake'))
  for(let i = 0; i < newPos.length; i++) {
    squares.forEach(square => {
      if(parseInt(square.dataset.index) === newPos[i]) {
        square.classList.add('snake')

        snakePos = newPos

      }

    }
    )
}
  eatFood(randomNum)
}

setInterval(moveBody, 500)



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

  squares[headPos].classList.add('snake-head')


}

setTimeout(makeFood, 10000)



window.addEventListener('DOMContentLoaded', init)
