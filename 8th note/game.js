const GAME_WIDTH = 600;
const GAME_HEIGHT = 500;
const FLOOR_BASE = 300;
const VOLUME_BASE = 50;
const CHANGE_VOL_JUMP = 80;

var game = function(){
  this.sound = null;
  this.character = null;
  this.backgrounds = [];

  var self = this;

  this.init = function(){
    this.sound = new sound(this);
    this.sound.init();
    this.character = new character(this);
    this.character.init();
    this.createBackground();

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
    document.body.appendChild(this.canvas);

    this.loop();
  }

  this.loop = function(){
    self.update();
    self.draw();

    setTimeout(self.loop, 20);
  }

  this.createBackground = function(){
    var lastX = 0;
    
    for (let i = 0; i < 5; i++){
      var newBackground = new background(this);
      newBackground.init();
      newBackground.x = lastX + 70 + 40;
      this.backgrounds.push(newBackground);
      lastX = newBackground.x;
    }
  }

  this.update = function(){
    var volumeBar = document.getElementById("volumeBar");
    volumeBar.style.width = this.sound.volume + "px";
    this.character.update();
    this.backgrounds.forEach( (background) => {
      background.update();
    });
  }
  this.clearScreen = function(){
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  this.draw = function(){
    this.clearScreen();
    this.character.draw();
    this.backgrounds.forEach( (background) => {
      background.draw();
    });
  }
}

var g = new game();
g.init();