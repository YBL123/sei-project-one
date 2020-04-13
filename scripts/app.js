function init() {



  // * Dom Elements
  const grid = document.querySelector('.grid')
  // const startButton = document.querySelector('#start')
  const cells = []
  const scoreDisplay = document.querySelector('#score-display')

  // * Grid variables
  const width = 9
  const cellCount = (width * width) + (width * 2)

  // * Game variables 
  let playerLives = 3
  const startingPosition = 94
  let flareonPosition = 94
  let playerOnFloatFlag = false
  let playerScore = 0
  let collisionExplosionPosition = 0
  const water = []  //* change to let

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
    },
    {
      floatposition: 38,
      name: 'float'
    },
    {
      floatposition: 40,
      name: 'float'
    },
    {
      floatposition: 42,
      name: 'float'
    },
    
    {
      floatposition: 25,
      name: 'float'
    },
    {
      floatposition: 23,
      name: 'float'
    },
    {
      floatposition: 21,
      name: 'float'
    },
    {
      floatposition: 19,
      name: 'float'
    }   
  ]

  startGame()    //* Start Game function called here
  // * Functions
  function startGame() {
    createGrid()
    // * Event listeners
    document.addEventListener('keydown', handleKeyDown)
    addPlayer('flareonIdle') //* adds player
    loopGame() //* loops game
  }

  function createGrid() {                    //* creates grid and then cells
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.textContent = i //take out later
    }
  }

  function handleKeyDown(event) {
    const x = flareonPosition % width
    const y = Math.floor(flareonPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39:
        if ((x < width - 1) && (!cells[flareonPosition + 1].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going right you may go in. If there is you may not.
          flareonPosition++ //* right 
          addPlayer('flareonRunRight')
        }
        break
      case 37:
        if ((x > 0) && (!cells[flareonPosition - 1].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going left, you may go in. If there is you may not.
          flareonPosition-- //* left
          addPlayer('flareonRunLeft')
        }
        break
      case 38:
        if ((y > 0) && (!cells[flareonPosition - width].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going up, you may go in. If there is you may not.
          flareonPosition -= width //* up
          addPlayer('flareonRunUp')
        }
        break
      case 40:
        if (y < width + 1) {
          flareonPosition += width //* down
          addPlayer('flareonRunDown')
        }
        break
      default:
        console.log('invalid key do nothing')
    }

    setTimeout(function () {       //* when flareon has finished making her move she will return to flareonIdle
      cells[flareonPosition].classList.remove('flareonIdle') // * remove flareon class from old position
      cells[flareonPosition].classList.remove('flareonRunRight')
      cells[flareonPosition].classList.remove('flareonRunLeft')
      cells[flareonPosition].classList.remove('flareonRunUp')
      cells[flareonPosition].classList.remove('flareonRunDown')
      cells[flareonPosition].classList.add('flareonIdle') // * add the class back at the new position
    }, 1000)

    //* calling win logic function below
    winLogic()
  }

  //* win logic function begins here
  function winLogic() {

    // console.log(flareonPosition)
    //* gameScore if statement begins here 
    if (flareonPosition === 1 || flareonPosition === 3 || flareonPosition === 5 || flareonPosition === 7) {  //* end points
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
        nextFlareon()  //* next flareon function called here. Spawns next flareon once one of the 4 reach an end point.
      }
    }
  }


  //* add player function starts here
  function addPlayer(playerDirection) {     //* player direction is the direction the player will be taking 
    //* character creation
    removeFlareon() //* so when a new flareon is spawned in event of collision or "death" the previous one will be removed from the board
    playerOnFloat() //* player on float function is called here. This way the playeronfloat variable will update and let me know if it's true or false.
    if (playerOnFloatFlag) {
      cells[flareonPosition].classList.add('floatAndFlareon', 'flareona') //* if player is on float then add float and flareon class + flareona class.
    } else {
      cells[flareonPosition].classList.add(playerDirection, 'flareona') //* if player is not on flag then only add player direction + flareona class.
    }
  }

  //* playerOnWater function starts here
  function playerOnFloat() {
    for (let index = 0; index < floatsArray.length; index++) {
      if (floatsArray[index].floatposition === flareonPosition) {
        playerOnFloatFlag = true
      } else {
        playerOnFloatFlag = false
      }
    }
  }

  //* loop game function starts here
  function loopGame() {   //* called in createGrid function
    setTimeout(loopGame, 500)
    // console.log(flareonPosition)
    moveEnemies() //* calling moveEnemies function here so that enemies can move
    // enemyCollision() //* collision function called here
    moveFloats()  //* floats function called here
    // floatCollision() //* float collision function called here
  }

  //* move enemies function starts here 
  function moveEnemies() { //* moveEnemies function    [index] is for all object in array
    for (let index = 0; index < enemiesArray.length; index++) {

      const x = enemiesArray[index].enemyposition % width
      if (x > 0) {    //* if x is greater than 0 it is allowed to move left
        enemiesArray[index].enemyposition = enemiesArray[index].enemyposition - 1  //* reassigns the value for the object's enemyposition property
      } else {   //* if enemy can't move left anymore
        enemiesArray[index].enemyposition = enemiesArray[index].enemyposition + (width - 1)  //* places the enemy back at it's starting position by using enemy position + ((with=9) - 1)
      }
    }
    displayEnemies() //* displays enemies. (removeEnemies function is already inside)
    enemyCollision() //* enemy collision is called here
  }

  //* display
  function displayEnemies() {
    removeEnemies()   //* removes the enemy 
    enemiesArray.forEach(enemy => cells[enemy.enemyposition].classList.add(enemy.name)) //* adds the enemy back on the grid - always need to remove before displaying so the board is a clean slate.
  }

  //* remove enemies
  function removeEnemies() {
    cells.forEach(cell => cell.classList.remove('lugiaEnemy', 'lugia2Enemy')) //* removes enemies
    // console.log('test')
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
      // console.log('you lose'); return false
    }
  }

  //* next flareon function begins here - spawns the next sprite once one sprite has reached an end point
  function nextFlareon() {
    playerLives--     //* so player lives will decrease when you "die"
    if (playerLives === 0) {   //* if plyaer loses all lives
      clearTimeout(loopGame)   //* stops game loop when player dies
      alert('GAME OVER')
    } else {
      flareonPosition = startingPosition    //* takes player back to starting position
      addPlayer('flareonIdle')
    }
    
  }

  //* remove flareon function begins here 
  function removeFlareon() {
    cells.forEach(function (currentValue, index) {
      if (index !== 1 && index !== 3 && index !== 5 && index !== 7) {  //* if it's not one of the end indexes then continue
        // console.log('remove')
        return currentValue.classList.remove('flareonIdle', 'flareonRunUp', 'flareonRunRight', 'flareonRunLeft', 'flareonRunDown', 'flareona') // * remove flareon class from old position
      }
    })
  }

  //* move floats function starts here
  function moveFloats() {
    for (let index = 0; index < floatsArray.length; index++) {

      const x = floatsArray[index].floatposition % width
      if (x > 0) {
        floatsArray[index].floatposition = floatsArray[index].floatposition - 1  //* changes the value for the object's float position property
      } else {
        floatsArray[index].floatposition = floatsArray[index].floatposition + (width - 1)  //* places the float back by using float position + ((with=9) - 1)
      }
    }
    displayFloats() //* display floats function called here. Remove float function is already inside
    floatCollision() //* float collision function is called here
  }

  //* displays floats
  function displayFloats() {
    removeFloats() //* remove floats function called here
    floatsArray.forEach(floatitem => cells[floatitem.floatposition].classList.add(floatitem.name))   //* float item "becomes the object name for the duration of the loop"
  }

  //* removes floats
  function removeFloats() {
    cells.forEach(cell => cell.classList.remove('float', 'floatAndFlareon'))
  }

  //* floats collision function starts here
  function floatCollision() {
    for (let index = 0; index < floatsArray.length; index++) {
      if (floatsArray[index].floatposition === flareonPosition - 1) {  //* checking if float position is equal to flareon position. The flareon position is decreased by one in order for float position to chase after flareon position. 
        flareonPosition--   //* if statement above is true , then flareon position is reassigned. (flareon position = flareon position -1). This way the flareon position is one step ahead allows the float position to chase it.
        addPlayer('floatAndFlareon') //* adds float and flareon class to show flareon on float
      }
    }
    waterDangerZone() //* water danger zone function is called here 
  }

  //* danger zone function starts here
  function waterDangerZone() {
    // water = cells.slice(9, 44) //* selects all indexes ranging from 9 - 44 for danger zone/water
    if (flareonPosition >= 9 && flareonPosition <= 44 && !cells[flareonPosition].classList.contains('floatAndFlareon')) {
      nextFlareon() 
    }
  }














}
window.addEventListener('DOMContentLoaded', init)