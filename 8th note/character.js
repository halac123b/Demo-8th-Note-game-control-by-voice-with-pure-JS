const CHAR_SIZE = 20;

var character = function(game){
  this.game = game;
  this.x = 100;
  this.y = 0;
  this.bottom = this.y + CHAR_SIZE;

  this.speed = 0;
  this.acceleration = 0.5;
  // Check xem character còn ở cao hơn floor không
  this.onFloor = true;
  this.running = false;
  // Lưu lại volume trước đó để check jump
  this.lastVolume = 0;

  var self = this;

  this.init = function(){

  }

  this.update = function(){
    this.running = this.game.sound.volume > VOLUME_BASE;

    this.bottom = this.y + CHAR_SIZE;

    if (this.running){
      this.jump();
    }

    this.onFloor = this.bottom <= FLOOR_BASE;
    // Check volume to jump
    if (this.game.sound.volume - this.lastVolume >= CHANGE_VOL_JUMP){
      this.jump();
    }
    this.lastVolume = this.game.sound.volume;

    if (this.onFloor){
      this.speed += this.acceleration;
      this.y += this.speed;
    }
    else {
      this.speed = 0;
      this.y = FLOOR_BASE - CHAR_SIZE;
    }
    
  }
  this.jump = function(){
    if (this.bottom == FLOOR_BASE){
      console.log('jump');
      this.speed = -10;
    }
  }

  this.draw = function(){
    this.game.context.fillStyle = "#ff0000";
    this.game.context.fillRect(this.x, this.y, CHAR_SIZE, CHAR_SIZE);
  }
}