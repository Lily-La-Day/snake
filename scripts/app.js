const width = 100
const squares = []
let playerIndex = 0


const init = () => {

  for(let i = 0; i < width * width; i ++ ) {
  const grid = document.querySelector('.grid')
console.log(grid)
     const square = document.createElement('div')
     grid.append(square)
     square.classList.add('grid-item')
     square.dataset.index = i
     // square.innerHTML = i




  }
}

window.addEventListener('DOMContentLoaded', init)
