(function () {

  //constructor function for Game
  let that;

  function Game(map) {
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;
    that = this;
  }

  Game.prototype.start = function () {
    // render game elements
    this.food.render(this.map);
    this.snake.render(this.map);

    // game logic
    // move snake
    snakeMove();

    // control movement through keyboard
    bindKey();

  };

  // control movement through keyboard
  function bindKey() {
    document.addEventListener('keydown', function (e) {
      // 37 - left, 38 - top, 39 - right, 40 - bottom
      switch (e.keyCode) {
        case 37:
          that.snake.direction = 'left';
          break;
        case 38:
          that.snake.direction = 'top';
          break;
        case 39:
          that.snake.direction = 'right';
          break;
        case 40:
          that.snake.direction = 'bottom';
          break;
      }

    }, false);
  }

  // move snake
  function snakeMove() {
    let timerId = setInterval(function () {
      that.snake.move(that.food, that.map);
      that.snake.render(that.map);

      // what happens when snake meets border
      let maxX = that.map.offsetWidth / that.snake.width;
      let maxY = that.map.offsetHeight / that.snake.height;
      let headX = that.snake.body[0].x;
      let headY = that.snake.body[0].y;

      if (headX < 0 || headX >= maxX) {
        alert('Game Over');
        clearInterval(timerId);
      }

      if (headY < 0 || headY >= maxY) {
        alert('Game Over');
        clearInterval(timerId);
      }

    }, 150);
  }

  // allow outside access
  window.Game = Game;

})()

//testing code
let map = document.getElementById('map');
let game = new Game(map);
game.start();