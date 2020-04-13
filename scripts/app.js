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
  const startingPosition = 94
  let flareonPosition = 94
  let playerScore = 0
  let collisionExplosionPosition = 0
  // let floatsPosition = 0

  const enemiesArray = [   //* enemy array
    {
      enemyposition: 81,    //* position property and the value is the index in which the enemy will first be positioned
      name: 'lugiaEnemy'
    },
    {
      enemyposition: 88,
      name: 'lugiaEnemy'
    },
    {
      enemyposition: 80,
      name: 'lugia2Enemy'
    },
    {
      enemyposition: 78,
      name: 'lugiaEnemy'
    },
    {
      enemyposition: 79,
      name: 'lugia2Enemy'
    },
    {
      enemyposition: 68,
      name: 'lugiaEnemy'
    },
    {
      enemyposition: 66,
      name: 'lugia2Enemy'
    },
    {
      enemyposition: 54,
      name: 'lugiaEnemy'
    },
    {
      enemyposition: 61,
      name: 'lugia2Enemy'
    },
    {
      enemyposition: 59,
      name: 'lugiaEnemy'
    }
  ]
  const floatsArray = [           //* floats array
    {
      floatposition: 36, 
      name: 'float'
    }
  ]
  // * Functions
  function startGame() {
    console.log('start button was clicked')
  }

  function loopGame() {   //* called in createGrid function
    setTimeout(loopGame, 500)
    floatCollision() //* float collision function called here
    floats()  //* floats function called here
    console.log(flareonPosition)
    moveEnemies() //* calling moveEnemies function here so that enemies can move
    enemyCollision() //* collision function called here
  }

  function moveEnemies() { //* moveEnemies function    [index] is for all object in array
    for (let index = 0; index < enemiesArray.length; index++) {

      const x = enemiesArray[index].enemyposition % width
      if (x > 0) {
        cells[enemiesArray[index].enemyposition].classList.remove(enemiesArray[index].name)
        cells[enemiesArray[index].enemyposition - 1].classList.add(enemiesArray[index].name) //* adds the property name of the object in the index order using the for loop. Adds and removes dynamically
        enemiesArray[index].enemyposition = enemiesArray[index].enemyposition - 1  //* changes the value for the object's enemyposition property
      } else {
        cells[enemiesArray[index].enemyposition].classList.remove(enemiesArray[index].name)  //* removes the enemy 
        enemiesArray[index].enemyposition = enemiesArray[index].enemyposition + (width - 1)  //* places the enemy back by using enemy position + ((with=9) - 1)
        cells[enemiesArray[index].enemyposition].classList.add(enemiesArray[index].name) //* adds the enemy back on the grid
      }

      // enemyCollision() //* collision function called here
      // // floats()  //* floats function called here
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

    // console.log(flareonPosition)
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

  //* enemy collison function starts here
  function enemyCollision() {
    if (cells[flareonPosition].classList.contains('lugiaEnemy') || cells[flareonPosition].classList.contains('lugia2Enemy')) {
      cells[flareonPosition].classList.add('collision')
      removeFlareon()
      collisionExplosionPosition = flareonPosition //* collision explosion position is now equal to the flareon position so that the explosion will be removed and not just flareon
      setTimeout(function () {
        // console.log(collisionExplosionPosition) 
        cells[collisionExplosionPosition].classList.remove('collision')
      }, 250)
      nextFlareon()
      console.log('you lose'); return false
    }
  }

  //* nextFlareon function begins here - spawns the next sprite once one sprite has reached an end point
  function nextFlareon() {
    cells[94].classList.add('flareonIdle')
    flareonPosition = 94
  }

  //* floats collision function starts here
  function floatCollision() {
    // console.log(cells[floatsArray[0].floatposition])
    if (cells[floatsArray[0].floatposition].classList.contains('flareona')) {
      removeFlareon()
      flareonPosition = floatsArray[0].floatposition - 1
      // console.log(flareonPosition)
      // cells[flareonPosition].classList.add('flareonIdle', 'flareona')
      cells[floatsArray[0].floatposition - 1].classList.add('floatAndFlareon','flareonIdle', 'flareona')
      console.log('floatAndFlareon')
      // console.log(flareonPosition)
    }
  }

  //* floats function starts here
  function floats() {
    for (let index = 0; index < floatsArray.length; index++) {
      const x = floatsArray[index].floatposition % width
      // console.log(x)
      if (x > 0) {
        cells[floatsArray[index].floatposition].classList.remove(floatsArray[index].name)
        cells[floatsArray[index].floatposition - 1].classList.add(floatsArray[index].name) //* adds the property name of the object in the index order using the for loop. Adds and removes dynamically
        floatsArray[index].floatposition = floatsArray[index].floatposition - 1  //* changes the value for the object's floatposition property
        // floatsCollision()
      } else {
        cells[floatsArray[index].floatposition].classList.remove(floatsArray[index].name)  //* removes the float 
        floatsArray[index].floatposition = floatsArray[index].floatposition + (width - 1)  //* places the float back by using floatposition + ((with=9) - 1)
        cells[floatsArray[index].floatposition].classList.add(floatsArray[index].name) //* adds the float back on the grid
      } 
    } 
  }



  // * Event listeners
  startButton.addEventListener('click', startButton)
  document.addEventListener('keydown', handleKeyDown)







}
window.addEventListener('DOMContentLoaded', init)