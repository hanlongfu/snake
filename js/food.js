// use IIFE to avoid naming conflicts

(function () {

  //record food created previously to prepare for deletion
  let elements = [];

  //constructor function for food
  function Food(options) {
    //set default for options
    options = options || {};

    //coordinates
    this.x = options.x || 0;
    this.y = options.x || 0;

    //size
    this.width = options.width || 20;
    this.height = options.height || 20;

    // color
    this.color = options.color || 'red';
  }

  // render food on the map
  Food.prototype.render = function (map) {
    //remove food created previously
    //food disappears when it meets the snake
    remove();

    //generate random coordinates for x, y
    this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
    this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;

    // dynamically create a div
    let div = document.createElement('div');

    //append to the map
    map.appendChild(div);

    elements.push(div);

    //styling the div
    div.style.position = 'absolute';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.backgroundColor = this.color;
  };

  function remove() {
    for (i = elements.length - 1; i >= 0; i--) {
      //delete div
      elements[i].parentNode.removeChild(elements[i]);

      //delete elements in array
      elements.splice(i, 1);
    }
  }

  // so that Food can be accessed from outside
  window.Food = Food;
})()