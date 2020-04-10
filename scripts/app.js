function init() {



  // * Dom Elements
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []
  const scoreDisplay = document.querySelector('#score-display')

  // * Grid variables
  const width = 9
  const cellCount = width * width

  // * Game variables
  let flareonPosition = 76
  let playerScore = 0
  const startingPosition = 76

  // * Functions
  function startGame() {
    console.log('start button was clicked')
  }


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.textContent = i //take out later
    }
    cells[startingPosition].classList.add('flareonIdle')

  }

  function handleKeyDown(event) {
    cells[flareonPosition].classList.remove('flareona')
    cells[flareonPosition].classList.remove('flareonIdle') // * remove knight class from old position
    cells[flareonPosition].classList.remove('flareonRunRight')
    cells[flareonPosition].classList.remove('flareonRunLeft')
    cells[flareonPosition].classList.remove('flareonRunUp')
    cells[flareonPosition].classList.remove('flareonRunDown')

    const x = flareonPosition % width
    const y = Math.floor(flareonPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39:
        if ((x < width - 1) && (!cells[flareonPosition + 1].classList.contains('flareona'))) { //* if a falerona is not present within cell's index if going right you may go in. If there is you may not.
          flareonPosition++ //* right 
          cells[flareonPosition].classList.add('flareonRunRight', 'flareona')
        }
        break
      case 37:
        if ((x > 0) && (!cells[flareonPosition - 1].classList.contains('flareona'))) { //* if a flareona is not present within cell's index if going left, you may go in. If there is you may not.
          flareonPosition-- //* left
          cells[flareonPosition].classList.add('flareonRunLeft', 'flareona')
        }
        break
      case 38:
        if ((y > 0) && (!cells[flareonPosition - width].classList.contains('flareona'))) { //* if a flareona is not present within cell's index if going up, you may go in. If there is you may not.
          flareonPosition -= width //* up
          cells[flareonPosition].classList.add('flareonRunUp', 'flareona')
        }

        break
      case 40:
        if (y < width - 1) flareonPosition += width //* down
        cells[flareonPosition].classList.add('flareonRunDown', 'flareona')
        break
      default:
        // cells[flareonPosition].classList.add('flareonIdle')
        console.log('invalid key do nothing')
    }
    //* calling gameLogic function below
    gameLogic()
    setTimeout(function () {
      cells[flareonPosition].classList.remove('flareonIdle') // * remove knight class from old position
      cells[flareonPosition].classList.remove('flareonRunRight')
      cells[flareonPosition].classList.remove('flareonRunLeft')
      cells[flareonPosition].classList.remove('flareonRunUp')
      cells[flareonPosition].classList.remove('flareonRunDown')
      cells[flareonPosition].classList.add('flareonIdle') // * add the class back at the new position
    }, 3000)
  }
  createGrid()


  //* gameLogic function begins here
  function gameLogic() {

    console.log(flareonPosition)
    //* gameScore if statement begins here 
    if (flareonPosition === 1 || flareonPosition === 3 || flareonPosition === 5 || flareonPosition === 7) {
      console.log('at the end')
      playerScore += 150
      scoreDisplay.textContent = playerScore   //* print score points ends here
      if (cells[1].classList.contains('flareona') && cells[3].classList.contains('flareona') &&    //* flareona class so it doesn't depend on what arrow key used to get into end point
        cells[5].classList.contains('flareona') && cells[7].classList.contains('flareona')) {
        setTimeout(function () {
          window.alert('win!')
        }, 100)

      } else {
        nextFlareon()  //* nextFlareon function called here 
      }

    }
  }

  //* nextFlareon function begins here - spawns the next sprite once one sprite has reached an end point
  function nextFlareon() {
    cells[76].classList.add('flareonIdle')
    flareonPosition = 76
  }

  //* win or lose logic function
  // function winOrLose() {
  //   if 
  // }

  // * Event listeners
  startButton.addEventListener('click', startButton)
  document.addEventListener('keydown', handleKeyDown)







}
window.addEventListener('DOMContentLoaded', init)