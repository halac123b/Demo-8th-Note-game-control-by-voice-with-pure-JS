var background = function(game){
  this.game = game;
  this.x = 500;
  this.width = 70;
  this.height = 40;

  this.init = function(){
    
  }
  this.update = function(){
    if (this.game.character.running)
      this.x -= 3;
  }
  
  this.draw = function(){
    this.game.context.fillStyle = "#000000";
    this.game.context.fillRect(this.x, FLOOR_BASE, this.width, this.height);
  }
}