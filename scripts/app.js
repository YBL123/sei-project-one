function init() {



  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  // * grid variables
  const width = 10
  const cellCount = width * width
  // * game variables
  let knightPosition = 95
  
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('knightIdle')
    
  }
  function handleKeyUp(event) {
    cells[knightPosition].classList.remove('knightIdle') // * remove knight class from old position
    cells[knightPosition].classList.remove('knightRunRight')
    cells[knightPosition].classList.remove('knightRunLeft')
    
    const x = knightPosition % width
    const y = Math.floor(knightPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39: 
        if (x < width - 1) knightPosition++ // right
        cells[knightPosition].classList.add('knightRunRight')
        break
      case 37:
        if (x > 0) knightPosition-- // left
        cells[knightPosition].classList.add('knightRunLeft')
        break
      case 38:
        if (y > 0) knightPosition -= width // up
        break
      case 40:
        if (y < width - 1) knightPosition += width //down
        break
      default:
        console.log('invalid key do nothing') 
    }
    cells[knightPosition].classList.add('knightIdle') // * add the class back at the new position
  }
  createGrid(knightPosition)
  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)







}
window.addEventListener('DOMContentLoaded', init)