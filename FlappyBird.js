let tubes = [];
let Player;
let score = 0;

function setup() {
  createCanvas(400, 400);
  tubes.push(new tube());
  Player = new player();
}

function draw() {
  background(10, 50, 200);
  for (let i = 0; i < tubes.length; i++) {
    tubes[i].drawTube();
    tubes[i].updatePosition();
    
    if (tubes[i].isOffscreen() === true) {
      tubes.splice(i, 1);
      score += 1;
    }
    
    if (tubes[i].isColllision(Player) === true) {
      console.log("Game Over, your score was: " + score);
      noLoop();
    }
  }
  
  if (frameCount % 150 === 0) {
    tubes.push(new tube());
  }
  
  Player.updatePosition();
  Player.drawPlayer();
}

function tube() {
  this.height = Math.floor(Math.random() * ((width - ((height / 8) * 1.5)) / 2));
  this.x = width;
  this.gameSpeed = 2;
  this.width = width / 8;
  
  this.updatePosition = function() {
    this.x -= this.gameSpeed;
  }
  
  this.drawTube = function() {
    fill(0, 100, 20);
    rect(this.x, height - (height - (this.height + (height / 4) * 1.5)), this.width, (height - (this.height + (height / 4) * 1.5)));
    rect(this.x, 0, this.width, this.height);
  }
  
  this.isOffscreen = function() {
    if (this.x < 0) {
      return true;
    } else {
      return false;
    }
  }
  
  this.isColllision = function(Player) {
    if (Player.y < this.height || Player.y > height - (height - (this.height + (height / 4) * 1.5))) {
      if (Player.x > this.x && Player.x < this.x + this.width) {
        return true;
      }
    }
    return false;
  }
}

function player() {
  this.size = height / 8;
  this.x = width / 4;
  this.y = height / 2;
  this.gravity = 0.65;
  this.lift = -11;
  this.velo = 0;
  
  this.drawPlayer = function() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  this.moveUp = function() {
    this.velo += this.lift;
  }
  
  this.updatePosition = function() {
    this.velo += this.gravity;
    this.y += this.velo;
    
    if (this.y > height) {
      this.y = height;
      this.velo = 0;
    }
    
    if (this.y < 0) {
      this.y = 0;
      this.velo = 0;
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    Player.moveUp();
  }
}
