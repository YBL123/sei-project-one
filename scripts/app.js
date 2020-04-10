function init() {



  // * Dom Elements
  const grid = document.querySelector('.grid')
  const cells = []
  // * grid variables
  const width = 10
  const cellCount = width * width
  // * game variables
  let flareonPosition = 95

  let playerScore = 0
  
  function createGrid(startingPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells[startingPosition].classList.add('flareonIdle')
    
  }
  function handleKeyDown(event) {
    cells[flareonPosition].classList.remove('flareonIdle') // * remove knight class from old position
    cells[flareonPosition].classList.remove('flareonRunRight')
    cells[flareonPosition].classList.remove('flareonRunLeft')
    cells[flareonPosition].classList.remove('flareonRunUp')
    cells[flareonPosition].classList.remove('flareonRunDown')

    const x = flareonPosition % width
    const y = Math.floor(flareonPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39: 
        if (x < width - 1) flareonPosition++ //* right
        cells[flareonPosition].classList.add('flareonRunRight') 
        break
      case 37:
        if (x > 0) flareonPosition-- //* left
        cells[flareonPosition].classList.add('flareonRunLeft')
        break
      case 38:
        if (y > 0) flareonPosition -= width //* up
        cells[flareonPosition].classList.add('flareonRunUp')
        break
      case 40:
        if (y < width - 1) flareonPosition += width //* down
        cells[flareonPosition].classList.add('flareonRunDown')
        break
      default:
        cells[flareonPosition].classList.add('flareonIdle')
        console.log('invalid key do nothing') 
      
        
    }
    gameScore()
    cells[flareonPosition].classList.add('flareonIdle') // * add the class back at the new position
    
  }
  createGrid(flareonPosition)
  
  // gameScore()

  function gameScore() {
    // console.log(cells.indexOf(cells[1]))
    console.log(flareonPosition)
    if (flareonPosition === 1 || flareonPosition ===  3 || flareonPosition ===  5 || flareonPosition ===  7) {
      console.log('at the end')
      return playerScore = 150
    }
  
  }
  
  // * Event listeners
  document.addEventListener('keydown', handleKeyDown)







}
window.addEventListener('DOMContentLoaded', init)