(function () {

  // record previously created snake segments
  let elements = [];

  //snake constructor function
  function Snake(options) {

    options = options || {};

    //snake properties
    this.width = options.width || 20;
    this.height = options.height || 20;

    //snake moving direction
    this.direction = options.direction || 'right';

    //first element is the head, each element has
    //position and color property
    this.body = [
      //first element: head
      {
        x: 3, //initial position coordinates
        y: 2,
        color: 'orchid',
      },

      {
        x: 2, //initial position coordinates
        y: 2,
        color: 'turquoise'
      },
      {
        x: 1, //initial position coordinates
        y: 2,
        color: 'turquoise'
      },
    ];
  }

  Snake.prototype.render = function (map) {

    //remove previously created snake segments
    remove();

    //render snake segments on the map
    for (let i = 0, len = this.body.length; i < len; i++) {
      //snake segments
      let object = this.body[i];

      let div = document.createElement('div');
      map.appendChild(div);

      //record snake segments
      elements.push(div);

      //style snake segments
      div.style.position = 'absolute';

      //width and height of every element
      div.style.width = this.width + 'px';
      div.style.height = this.height + 'px';


      div.style.left = object.x * this.width + 'px';
      div.style.top = object.y * this.height + 'px';
      div.style.backgroundColor = object.color;
    }

  };

  function remove() {
    for (let i = elements.length - 1; i >= 0; i--) {
      //remove div
      elements[i].parentNode.removeChild(elements[i]);
      //remove array elements
      elements.splice(i, 1);
    }

  }

  //snake move method
  Snake.prototype.move = function (food, map) {
    //how snake body moves
    //current segment moves to the position of its preceding segment
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }

    //how snake head moves
    // determine direction
    let head = this.body[0];
    switch (this.direction) {
      case 'right':
        head.x += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'top':
        head.y -= 1;
        break;
      case 'bottom':
        head.y += 1;
        break;
    }

    // determine if head meets food
    // see if their coordiantes match

    // snake head coordinates
    let headX = head.x * this.width;
    let headY = head.y * this.height;

    if (headX === food.x && headY === food.y) {
      // increase snake segments by 1
      // get the last snake segment
      let last = this.body[this.body.length - 1];
      this.body.push({
        x: last.x,
        y: last.y,
        color: last.color
      });

      // randomly gene rate new food 
      food.render(map);

    }


  };

  window.Snake = Snake;

})()