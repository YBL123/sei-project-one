function init() {



  // * Dom Elements
  const grid = document.querySelector('.grid')
  const gameMenu = document.querySelector('.game-menu')
  const gameWon = document.querySelector('.game-won')
  const gameOver = document.querySelector('.game-over')
  const gameWrapper = document.querySelector('.game-wrapper')
  const startButton = document.querySelector('#start')
  const resetButton = document.querySelector('#reset')
  const playAgainButton = document.querySelector('.play-again-button')
  const difficultyButtons = document.querySelectorAll('.difficulty-button')   //* difficulty buttons
  let cells = []
  const scoreDisplay = document.querySelector('#score-display')
  const remainingLives = document.querySelector('#player-lives')

  // * Grid variables
  const width = 9
  const cellCount = (width * width) + (width * 2)

  // * Game variables 
  let loopFloats = null
  let loopEnemies = null
  let playerLives = 5
  const startingPosition = 94
  let flareonPosition = 94
  let playerWinFlag = false
  let playerOnFloatFlag = false
  let playerScore = 0
  let collisionExplosionPosition = 0
  let splashPosition = 0
  let gameSounds



  const enemiesArray = [   //* enemy array

    //* first row of enemies
    {
      enemyposition: 89,    //* position property and the value is the index in which the enemy will first be positioned
      name: 'lugiaEnemy',
      direction: 'left'
    },
    {
      enemyposition: 86,
      name: 'lugiaEnemy',
      direction: 'left'
    },
    //* second row of enemies
    {
      enemyposition: 72,
      name: 'lugia2Enemy',
      direction: 'right'
    },
    {
      enemyposition: 74,
      name: 'lugia2Enemy',
      direction: 'right'
    },
    //* third row of enemies
    {
      enemyposition: 70,
      name: 'lugiaEnemy',
      direction: 'left'
    },
    {
      enemyposition: 67,
      name: 'lugiaEnemy',
      direction: 'left'
    },
    //* fourth row of enemies
    {
      enemyposition: 54,
      name: 'lugia2Enemy',
      direction: 'right'
    },
    {
      enemyposition: 57,
      name: 'lugia2Enemy',
      direction: 'right'
    },
    {
      enemyposition: 59,
      name: 'lugia2Enemy',
      direction: 'right'
    }
  ]

  //* floats Array
  const floatsArray = [
    //* first row of floats
    {
      floatposition: 36,
      name: 'float-left',
      direction: 'left'
    },
    {
      floatposition: 38,
      name: 'float-left',
      direction: 'left'
    },
    {
      floatposition: 40,
      name: 'float-left',
      direction: 'left'
    },
    {
      floatposition: 42,
      name: 'float-left',
      direction: 'left'
    },
    //* second row of floats
    {
      floatposition: 33,
      name: 'float-right',
      direction: 'right'
    },
    {
      floatposition: 32,
      name: 'float-right',
      direction: 'right'
    },
    {
      floatposition: 31,
      name: 'float-right',
      direction: 'right'
    },
    {
      floatposition: 30,
      name: 'float-right',
      direction: 'right'
    },
    //* third row of floats
    {
      floatposition: 25,
      name: 'float-left',
      direction: 'left'
    },
    {
      floatposition: 23,
      name: 'float-left',
      direction: 'left'
    },
    {
      floatposition: 21,
      name: 'float-left',
      direction: 'left'
    },
    {
      floatposition: 19,
      name: 'float-left',
      direction: 'left'
    },
    //* fourth row of floats
    {
      floatposition: 9,
      name: 'float-right',
      direction: 'right'
    },
    {
      floatposition: 10,
      name: 'float-right',
      direction: 'right'
    },
    {
      floatposition: 11,
      name: 'float-right',
      direction: 'right'
    },
    {
      floatposition: 12,
      name: 'float-right',
      direction: 'right'
    }
  ]

  //* game sounds

  class Sounds {

    constructor() {
      this.game = './sounds/backgroundSound.mp3'
      this.splash = './sounds/splashSound.mp3'
      this.explosion = './sounds/explosionSound.mp3'
      this.win = './sounds/win.mp3'
      this.coin = './sounds/coin-won.mp3'
      this.gameover = './sounds/gameover.mp3'
    }
    playBackgroundSound() {
      this.backGroundSound = new Audio(this.game)
      this.backGroundSound.loop = true
      this.backGroundSound.play()
    }
    stopBackGroundSound() {
      this.backGroundSound.pause()
    }
    playSplashSound() {
      this.splashSound = new Audio(this.splash)
      this.splashSound.loop = false
      this.splashSound.play()
    }
    playExplosionSound() {
      this.explosionSound = new Audio(this.explosion)
      this.explosionSound.loop = false
      this.explosionSound.play()
    }
    playCoinSound() {
      this.actionsound = new Audio(this.coin)
      this.actionsound.loop = false
      this.actionsound.play()
    }
    playWinSound() {
      this.actionsound = new Audio(this.win)
      this.actionsound.loop = false
      this.actionsound.play()
    }
    playLostSound() {
      this.actionsound = new Audio(this.gameover)
      this.actionsound.loop = false
      this.actionsound.play()
    }
    stopLostSound() {
      this.backGroundSound.pause()
    }
  }

  //* initial functions

  //* game difficulty    matching values  takes the even target value and matches the button value with cases
  function gameDifficulty(event) {
    difficultyButtons.forEach(button => {     //* removes active button class from all so all buttons start without it.
      button.classList.remove('active-button')
    })
    this.classList.add('active-button')  //* this refers to the button being clicked.
    switch (event.target.value) {
      case 'easy':
        playerLives = 5
        break
      case 'medium':
        playerLives = 3
        break
      case 'hard':
        playerLives = 1
        break
      default:
        playerLives = 5
    }
    console.log(playerLives)
  }

  //* game initiation. When start button is clicked menu is hidden and game grid becomes visible - then game loads
  function initiateGame() {
    gameMenu.style.display = 'none'
    gameWrapper.style.display = 'flex'
    gameOver.style.display = 'none'
    gameWon.style.display = 'none'
    gameSounds = new Sounds()
    gameSounds.playBackgroundSound()  //* play background sound
    startGame() //* Start Game function called here
  }

  //* reset buton function
  function resetGame() {
    gameWrapper.style.display = 'none'
    gameMenu.style.display = 'flex'
    difficultyButtons.forEach(button => {   //* removes active button class from all so all buttons start without it.
      if (button.value === 'easy') {
        button.classList.add('active-button')
      } else {
        button.classList.remove('active-button')
      }
    })
    gameOver.style.display = 'none'
    gameWon.style.display = 'none'
    gameSounds.stopBackGroundSound()  //* stop background sound
    resetComponents()
  }

  //* reset components function
  function resetComponents() {
    while (grid.firstChild) {
      grid.removeChild(grid.lastChild)
    }
    clearInterval(loopFloats)
    clearInterval(loopEnemies)
    cells = []
    // * Game variables 
    loopFloats = null
    loopEnemies = null
    playerLives = 5
    flareonPosition = startingPosition
    playerOnFloatFlag = false
    playerScore = 0
    collisionExplosionPosition = 0
  }

  //* the game won function
  function theGameWon() {
    gameSounds.stopBackGroundSound()  //* stop background sound
    gameSounds.playWinSound()  //* plays win sound
    gameWon.style.display = 'flex'
    gameMenu.style.display = 'none'
    gameWrapper.style.display = 'none'
    gameOver.style.display = 'none'
    document.querySelector('.final-score2').textContent = 'You Scored ' + playerScore + ' Points!'
    resetComponents()
  }

  //* the game over function
  function theGameOver() {
    gameSounds.stopBackGroundSound()  //* stop background sound
    gameSounds.playLostSound()  //* plays lost sound
    gameOver.style.display = 'flex'
    gameMenu.style.display = 'none'
    gameWrapper.style.display = 'none'
    gameWon.style.display = 'none'
    document.querySelector('.final-score').textContent = 'You Scored ' + playerScore + ' Points!'
    resetComponents()
  }



  // * Game Functions
  function startGame() {
    createGrid()
    style()
    document.getElementById('player-lives').innerHTML = playerLives
    document.getElementById('score-display').innerHTML = playerScore
    // * Event listeners
    window.addEventListener('keydown', handleKeyDown)
    addPlayer('flareonIdle') //* adds player
    loopGame() //* loops game
  }

  //* create grid function starts here
  function createGrid() {                    //* creates grid and then cells
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      // cell.textContent = i //take out later
    }
  }

  //* handle key down function starts here 
  function handleKeyDown(event) {
    //* remove float and flareon whether right or left if present. add Only right or left float image.
    const x = flareonPosition % width
    const y = Math.floor(flareonPosition / width)
    switch (event.keyCode) { // * calculate the new index
      case 39:
        if ((x < width - 1) && (!cells[flareonPosition + 1].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going right you may go in. If there is you may not.
          resetFlareonOnFloat()
          flareonPosition++ //* right 
          console.log('allowed')
          addPlayer('flareonRunRight')
        }
        break
      case 37:
        if ((x > 0) && (!cells[flareonPosition - 1].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going left, you may go in. If there is you may not.
          resetFlareonOnFloat()
          flareonPosition-- //* left
          addPlayer('flareonRunLeft')
        }
        break
      case 38:
        if ((y > 0) && (!cells[flareonPosition - width].classList.contains('flareona'))) { //* if a flareona class is not present within cell's index if going up, you may go in. If there is you may not.
          resetFlareonOnFloat()
          flareonPosition -= width //* up
          addPlayer('flareonRunUp')
        }
        break
      case 40:
        if (y < width + 1) {
          resetFlareonOnFloat()
          flareonPosition += width //* down
          addPlayer('flareonRunDown')
        }
        break
      default:
        console.log('invalid key do nothing') //* comment out later
    }

    //* this may need to be commented out
    // setTimeout(function () {       //* when flareon has finished making her move she will return to flareonIdle
    //   cells[flareonPosition].classList.remove('flareonIdle') // * remove flareon class from old position
    //   cells[flareonPosition].classList.remove('flareonRunRight')
    //   cells[flareonPosition].classList.remove('flareonRunLeft')
    //   cells[flareonPosition].classList.remove('flareonRunUp')
    //   cells[flareonPosition].classList.remove('flareonRunDown')
    //   cells[flareonPosition].classList.add('flareonIdle') // * add the class back at the new position
    // }, 1000)

  }

  function resetFlareonOnFloat() {
    if (cells[flareonPosition].classList.contains('floatAndFlareonLeft')) {
      cells[flareonPosition].classList.remove('floatAndFlareonLeft')
      cells[flareonPosition].classList.add('float-left')
    } else if (cells[flareonPosition].classList.contains('floatAndFlareonRight')) {
      cells[flareonPosition].classList.remove('floatAndFlareonRight')
      cells[flareonPosition].classList.add('float-right')
    }
  }

  //* win logic function begins here
  function winLogic() {
    //* gameScore if statement begins here 
    if (flareonPosition === 1 || flareonPosition === 3 || flareonPosition === 5 || flareonPosition === 7) {  //* end points
      cells[flareonPosition].classList.remove('coin') 
      cells[flareonPosition].classList.add('flareonIdle', 'flareona')  //* replaces coin with flareon 
      cells[flareonPosition].style.backgroundColor = '#ffdb57'  //* once coin is collected background chanes back to background colour
      gameSounds.playCoinSound()
      playerScore += 150
      scoreDisplay.textContent = playerScore   //* prints score points ends here
      //* checking to see if all end points contain the shared class of 'flareona'. once all end points contain a 'flareona' class - player wins the game.
      if (cells[1].classList.contains('flareona') && cells[3].classList.contains('flareona') &&    //* flareona class so it doesn't depend on what arrow key used to get into end point
        cells[5].classList.contains('flareona') && cells[7].classList.contains('flareona')) {
        //* timer for 'win!' alert
        setTimeout(theGameWon, 500)

      } else {
        playerWinFlag = true
        nextFlareon()  //* next flareon function called here. Spawns next flareon once one of the 4 reach an end point.
      }
    }
  }


  //* add player function starts here
  function addPlayer(playerDirection) {     //* player direction is the direction the player will be taking
    winLogic()
    //* character creation
    removeFlareon() //* so when a new flareon is spawned in event of collision or "death" the previous one will be removed from the board
    if (cells[flareonPosition].classList.contains('float')) {
      playerOnFloatFlag = true
      if (cells[flareonPosition].classList.contains('float-left')) {
        cells[flareonPosition].classList.add('floatAndFlareonLeft', 'flareona') //* if player is on float then add float and flareon class + flareona class.
      } else if (cells[flareonPosition].classList.contains('float-right')) {
        cells[flareonPosition].classList.add('floatAndFlareonRight', 'flareona') //* if player is on float then add float and flareon class + flareona class.
      }
    } else {
      playerOnFloatFlag = false
      cells[flareonPosition].classList.add(playerDirection, 'flareona') //* if player is not on flag then only add player direction + flareona class.
    }
    enemyCollision() //* fixes bug so that no matter in what key the player collides with the enemy there is a collision
    waterDangerZone() //* called here again to check the player has fallen into water
  }


  //* loop game function starts here
  function loopGame() {   //* called in createGrid function
    loopFloats = setInterval(moveFloats, 800) //* floats function called here
    loopEnemies = setInterval(moveEnemies, 800) //* calling moveEnemies function here so that enemies can move
  }

  //* move enemies function starts here 
  function moveEnemies() { //* moveEnemies function    [index] is for all object in array
    for (let index = 0; index < enemiesArray.length; index++) {
      const x = enemiesArray[index].enemyposition % width
      if (enemiesArray[index].direction === 'left') {
        if (x > 0) {    //* if x is greater than 0 it is allowed to move left
          enemiesArray[index].enemyposition = enemiesArray[index].enemyposition - 1  //* reassigns the value for the object's enemyposition property
        } else {   //* if enemy can't move left anymore
          enemiesArray[index].enemyposition = enemiesArray[index].enemyposition + (width - 1)  //* places the enemy back at it's starting position by using enemy position + ((with=9) - 1)
        }
      } else if (enemiesArray[index].direction === 'right') {
        if (x < width - 1) {
          enemiesArray[index].enemyposition = enemiesArray[index].enemyposition + 1
        } else {
          enemiesArray[index].enemyposition = enemiesArray[index].enemyposition - (width - 1)
        }
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
  }

  //* enemy collison function starts here
  function enemyCollision() {
    if (cells[flareonPosition].classList.contains('lugiaEnemy') || cells[flareonPosition].classList.contains('lugia2Enemy')) {
      cells[flareonPosition].classList.add('collision')
      gameSounds.playExplosionSound() //* explosion sound called here!
      removeFlareon()
      collisionExplosionPosition = flareonPosition //* collision explosion position is now equal to the flareon position so that the explosion will be removed and not just flareon
      setTimeout(function () {
        cells[collisionExplosionPosition].classList.remove('collision')
      }, 250)
      nextFlareon()
    }
  }

  //* next flareon function begins here - spawns the next sprite once one sprite has reached an end point + decreases number of lives when player is in enemy collision and water danger zone
  function nextFlareon() {     //* need to fix this function so that it doesn't decrease life when reaching end points and respawning!!!!!!!
    flareonPosition = startingPosition    //* takes player back to starting position
    if (!playerWinFlag) {
      playerLives--     //* so player lives will decrease when you "die"
    }
    playerWinFlag = false
    remainingLives.textContent = playerLives  //* prints number of lives remaining here
    if (playerLives === 0) {   //* if plyaer loses all lives
      setTimeout(theGameOver, 500)
    } else {
      addPlayer('flareonIdle')
    }

  }


  //* remove flareon function begins here 
  function removeFlareon() {
    cells.forEach((currentValue, index) => {
      if (index !== 1 && index !== 3 && index !== 5 && index !== 7) {  //* if it's not one of the end indexes then continue
        return currentValue.classList.remove('flareonIdle', 'flareonRunUp', 'flareonRunRight', 'flareonRunLeft', 'flareonRunDown', 'flareona') // * remove flareon class from old position
      }
    })
  }

  //* move floats function starts here
  function moveFloats() {
    for (let index = 0; index < floatsArray.length; index++) {
      const x = floatsArray[index].floatposition % width
      if (floatsArray[index].direction === 'left') {
        if (x > 0) {
          floatsArray[index].floatposition = floatsArray[index].floatposition - 1  //* changes the value for the object's float position property
        } else {
          floatsArray[index].floatposition = floatsArray[index].floatposition + (width - 1)  //* places the float back by using float position + ((with=9) - 1)
        }
      } else if (floatsArray[index].direction === 'right') {
        if (x < width - 1) {
          floatsArray[index].floatposition = floatsArray[index].floatposition + 1
        } else {
          floatsArray[index].floatposition = floatsArray[index].floatposition - (width - 1)
        }
      }
    }
    displayFloats() //* display floats function called here. Remove float function is already inside
  }

  //* displays floats
  function displayFloats() {
    removeFloats() //* remove floats function called here
    floatsArray.forEach(floatitem => cells[floatitem.floatposition].classList.add('float', floatitem.name)) //* 
    floatCollision() //* float collision function is called here
  }

  //* removes floats
  function removeFloats() {
    cells.forEach(cell => cell.classList.remove('float', 'float-left','float-right', 'floatAndFlareonLeft', 'floatAndFlareonRight'))
  }

  //* floats positive collision function starts here
  function floatCollision() {
    if (playerOnFloatFlag) {  //* checks if player is on a float - true or false
      if (cells[flareonPosition - 1].classList.contains('float-left')) {  //* checking if falreon position - 1 contains the class of float left. This checks if the player's future movement will be left  
        flareonPosition--   //* if so player moves left
        addPlayer('floatAndFlareonLeft')
      } else if (cells[flareonPosition + 1].classList.contains('float-right')){ //* checking if falreon position + 1 contains the class of float right. This checks if the player's future movement will be right
        flareonPosition++ //* if so player moves right
        addPlayer('floatAndFlareonRight')
      }
    }
    waterDangerZone() //* water danger zone function is called here
  }


  //* water danger zone function starts here
  function waterDangerZone() {
    //* selects all indexes ranging from 9 - 44 for danger zone/water
    if (flareonPosition >= 9 && flareonPosition <= 44 && (!cells[flareonPosition].classList.contains('floatAndFlareonLeft') && !cells[flareonPosition].classList.contains('floatAndFlareonRight'))) {
      cells[flareonPosition].classList.add('splash')
      gameSounds.playSplashSound() //* splash sound!
      removeFlareon()
      splashPosition = flareonPosition //* splash position is now equal to the flareon position so that the splash will be removed and not just flareon
      setTimeout(function () {
        // console.log(collisionExplosionPosition) 
        cells[splashPosition].classList.remove('splash')
      }, 250)
      nextFlareon()
    }
  }


  //* style

  function style() {
    cells.forEach((cell, index) => {
      if (index >= 90 && index <= 98) {
        cell.style.backgroundColor = '#07253f'
      }
      if (index === 94) {
        cell.style.backgroundColor = '#edb3eb'
      }
      if (index >= 54 && index <= 89) {
        cell.style.backgroundColor = '#edb3eb'
      }
      if (index >= 45 && index <= 53) {
        cell.style.backgroundColor = '#ffdb57'
      }
      if (index >= 9 && index <= 44) {
        cell.style.backgroundColor = '#9cdcef'
      }
      if (index === 0 || index === 2 || index === 4 || index === 6 || index === 8) {   //* end points
        cell.style.backgroundColor = '#ffdb57'
      }
      if (index === 1 || index === 3 || index === 5 || index === 7) {
        cell.style.backgroundColor = '#ffdb57'
        cell.classList.add('coin')
      }
    })
  }







  document.querySelector('.play-again-button2').addEventListener('click', resetGame)
  playAgainButton.addEventListener('click', resetGame)  //* goes back to main menu
  startButton.addEventListener('click', initiateGame)
  resetButton.addEventListener('click', resetGame)
  difficultyButtons.forEach(button => {
    button.addEventListener('click', gameDifficulty) //* difficulty buttons
  })






}
window.addEventListener('DOMContentLoaded', init)