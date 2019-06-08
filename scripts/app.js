const width = 100
const squares = []
const bodyLength = 1
let headPos = 500
let newPos = []
let snakePos = [300, 400, 500]
let direction = ''
let bodyPart = 500
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


const bodyCalc = (direction) => {


//   for(let i = 1; i < snakePos.length; i++) {
// console.log(snakePos[2])
//     snakePos[i] = snakePos[i-1]
// }
let vari
let onePos
    switch(direction) {
      case 'down':
    vari = snakePos[0] += 100
    snakePos[0] -= 100
    snakePos.unshift(vari)
    snakePos.pop()
    return snakePos


      case 'up':
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


console.log(snakePos[2])

  newPos = snakePos





}

// const bodyCalc = (direction) => {
//    return newPos = snakePos.map((x) => {
//     switch(direction) {
//       case 'down':
//       x += 100
// return x
//       break
//       case 'up':
//       x -= 100
// return x
//       break
//       case 'right':
//       x += 1
// return x
//       break
//       case 'left':
//       x -= 1
// return x
//       break
//     }
//
//
//   }
//
// )
//
// }




const moveBody = () => {
  bodyCalc(direction)
  console.log(newPos)
  // document.querySelectorAll('[class*="snake"]')
  squares.forEach(square => square.classList.remove('snake'))
  for(let i = 0; i < newPos.length; i++) {
    squares.forEach(square => {
      if(parseInt(square.dataset.index) === newPos[i]) {
        square.classList.add('snake')
        console.log()
        snakePos = newPos
        console.log(snakePos)
      }

    }
  )}
}

console.log(moveBody())


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




window.addEventListener('DOMContentLoaded', init)
