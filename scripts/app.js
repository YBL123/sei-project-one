function init() {



  // * Dom Elements
  const grid = document.querySelector('.grid')
  const startButton = document.querySelector('#start')
  const cells = []
  const scoreDisplay = document.querySelector('#score-display')

  // * Grid variables
  const width = 9
  const cellCount = (width * width) + (width * 2)

  // * Game variables
  let flareonPosition = 94
  let playerScore = 0
  const startingPosition = 94
  const enemiesArray = [   //* enemy array
    {
      enemyposition: 63,    //* position property and the value is the index in which the enemy will first be positioned
      name: 'laprusEnemy'
    },
    {
      enemyposition: 60,
      name: 'laprusEnemy'
    },
    {
      enemyposition: 61,
      name: 'goldeenEnemy'
    }
  ]

  // * Functions
  function startGame() {
    console.log('start button was clicked')
  }

  function loopGame() {   //* called in createGrid function
    setTimeout(loopGame, 400)
    moveEnemies() //* calling moveEnemies function here so that enemies can move
  }

  function moveEnemies() { //* moveEnemies function    [index] is for all object in array
    for (let index = 0; index < enemiesArray.length; index++) {

      const x = enemiesArray[index].enemyposition % width
      if (x > 0) {
        cells[enemiesArray[index].enemyposition].classList.remove(enemiesArray[index].name)
        cells[enemiesArray[index].enemyposition - 1].classList.add(enemiesArray[index].name) //* adds the property name of the object in the index order using the for loop. Adds and removes dynamically
        enemiesArray[index].enemyposition = enemiesArray[index].enemyposition - 1  //* changes the value for the object's enemyposition property
      } else {
        cells[enemiesArray[index].enemyposition].classList.remove(enemiesArray[index].name)  //* removes the laprus 
        enemiesArray[index].enemyposition = enemiesArray[index].enemyposition + (width - 1)  //* places the laprus back by using enemy position + ((with=9) - 1)
        cells[enemiesArray[index].enemyposition].classList.add(enemiesArray[index].name) //* adds the laprus back on the grid
      }
    }
  }


  function createGrid() {                    //* creates grid and then cells
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.textContent = i //take out later
    }
    cells[startingPosition].classList.add('flareonIdle')
    loopGame() //* loops game
  }

  function removeFlareon() {
    cells[flareonPosition].classList.remove('flareona')
    cells[flareonPosition].classList.remove('flareonIdle') // * remove flareon class from old position
    cells[flareonPosition].classList.remove('flareonRunRight')
    cells[flareonPosition].classList.remove('flareonRunLeft')
    cells[flareonPosition].classList.remove('flareonRunUp')
    cells[flareonPosition].classList.remove('flareonRunDown')
  }

  function handleKeyDown(event) {
    const x = flareonPosition % width
    const y = Math.floor(flareonPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39:
        if ((x < width - 1) && (!cells[flareonPosition + 1].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going right you may go in. If there is you may not.
          removeFlareon()
          flareonPosition++ //* right 
          cells[flareonPosition].classList.add('flareonRunRight', 'flareona')
        }
        break
      case 37:
        if ((x > 0) && (!cells[flareonPosition - 1].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going left, you may go in. If there is you may not.
          removeFlareon()
          flareonPosition-- //* left
          cells[flareonPosition].classList.add('flareonRunLeft', 'flareona')
        }
        break
      case 38:
        if ((y > 0) && (!cells[flareonPosition - width].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going up, you may go in. If there is you may not.
          removeFlareon()
          flareonPosition -= width //* up
          cells[flareonPosition].classList.add('flareonRunUp', 'flareona')
        }
        break
      case 40:
        if (y < width + 1) {
          removeFlareon()
          flareonPosition += width //* down
          cells[flareonPosition].classList.add('flareonRunDown', 'flareona')
        }
        break
      default:
        console.log('invalid key do nothing')
    }
    //* calling gameLogic function below
    gameLogic()
    setTimeout(function () {       //* when flareon has finished making her move she will return to flareonIdle
      cells[flareonPosition].classList.remove('flareonIdle') // * remove flareon class from old position
      cells[flareonPosition].classList.remove('flareonRunRight')
      cells[flareonPosition].classList.remove('flareonRunLeft')
      cells[flareonPosition].classList.remove('flareonRunUp')
      cells[flareonPosition].classList.remove('flareonRunDown')
      cells[flareonPosition].classList.add('flareonIdle') // * add the class back at the new position
    }, 1000)
  }
  createGrid()


  //* gameLogic function begins here
  function gameLogic() {

    console.log(flareonPosition)
    //* gameScore if statement begins here 
    if (flareonPosition === 1 || flareonPosition === 3 || flareonPosition === 5 || flareonPosition === 7) {
      console.log('at the end')
      playerScore += 150
      scoreDisplay.textContent = playerScore   //* prints score points ends here
      //* checking to see if all end points contain the shared class of 'flareona'. once all end points contain a 'flareona' class - player wins the game.
      if (cells[1].classList.contains('flareona') && cells[3].classList.contains('flareona') &&    //* flareona class so it doesn't depend on what arrow key used to get into end point
        cells[5].classList.contains('flareona') && cells[7].classList.contains('flareona')) {
        //* timer for 'win!' alert
        setTimeout(function () {
          window.alert('win!')
        }, 100)

      } else {
        nextFlareon()  //* nextFlareon function called here. Spawns next flareon once one of the 4 reach an end point.
      }

    }
  }

  //* nextFlareon function begins here - spawns the next sprite once one sprite has reached an end point
  function nextFlareon() {
    cells[94].classList.add('flareonIdle')
    flareonPosition = 94
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