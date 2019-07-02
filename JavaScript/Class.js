class Rex {
  constructor() {
    this.width = area.width * 0.1;
    this.height = area.height * 0.15;
    this.defaultX = 0;
    this.defaultY = area.height - 5 - this.height;
    this.x = this.defaultX;
    this.y = this.defaultY;
    this.step = area.width/100;
    this.image = new Image()
    this.image.src = "Images/Rex.png";
    this.jumpAudio = new Audio();
    this.jumpAudio.src = "Audio/Jump.wav";
    this.jumpAudio.volume = 0.1;
  }

  left() {
    this.x -= this.step;
  }

  right() {
    this.x += this.step;
  }

  jump() {
    this.jumpAudio.currentTime = 0;
    this.jumpAudio.play();
    for (var i = 0; i < 30; i++) {
        this.y -= 1;
        this.x += 1;
    }
      for (var i = 0; i < 30; i++) {
          this.y += 1;
          this.x += 1;
      }


  }

  down() {
    //console.log("down");
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}

class Tree {
  constructor() {
    this.image = new Image();
    this.image.src = "Images/Tree.png";
    this.width = area.width * 0.1;
    this.height = area.height * 0.15;
    this.defaultX = area.width * 0.75;
    this.defaultY = area.height - 5 - this.height;
    this.defaultSpeed = 15;
    this.speed = this.defaultSpeed;
    this.image.onload = () => this.draw();
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    console.log("move tree");
    if(this.x > 0) this.x--;
    else {
      this.x = area.width;
      rex.x = 0;
    }
    if(game.status == 1) setTimeout(() => this.move(), this.speed);
  }

}

class Score {
  constructor() {
    this.score = 0;
    this.defaultSpeed = 1000;
    this.speed = this.defaultSpeed;
  }

  draw() {
    //console.log("draw Score");
    canvasBoard.fillStyle = "black";
    canvasBoard.font = "18px Arial";
    canvasBoard.fillText(`Score: ${this.score}`, area.width - (this.score.toString().length + 6) * 18, 18)
  }

  show() {
    this.score++;
    if(this.score%10 == 0) {
      tree.speed -= 1;
      this.speed -= 25;
    }
    setTimeout(() => this.show(), this.speed);
  }

}

class Board {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.clearBoard();
    this.createBoard();
  }

  createBoard() {
    canvasBoard.fillStyle = "white";
    canvasBoard.fillRect(0, 0, this.width , this.height );
    canvasBoard.strokeStyle = "green";
    canvasBoard.fillStyle = "green";
    canvasBoard.fillRect(0, this.height-5, this.width, 5);
    canvasBoard.beginPath();
    for (var i = 0; i < this.width; i += 15) {
      // drawing grass
      canvasBoard.moveTo(i, this.height - 5);
      canvasBoard.lineTo(i, this.height - 7);
    }
    canvasBoard.stroke();
  }

  clearBoard() {
    //console.log("clearBoard");
    canvasBoard.clearRect(0, 0, this.width, this.height);
  }
}

class Gold {
  constructor() {
    this.image = new Image();
    this.image.src = "Images/Gold.png";
    this.width = area.width * 0.075;
    this.height = area.height * 0.075;
    this.defaultY = area.height - 20 - Math.floor(Math.random() * rex.height);
    this.defaultX = area.width - 2 * this.width;
    this.x = this.defaultX;
    this.y = this.defaultY;
    this.collectAudio = new Audio();
    this.collectAudio.src = "Audio/Gold.wav";
    this.defaultSpeed = 15;
    this.speed = this.defaultSpeed;
    this.defaultPrice = 5;
    this.price = this.defaultPrice;
  }

  draw() {
    canvasBoard.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  collectPlay() {
    this.collectAudio.play();
  }

  move() {
    if(this.x > 0) this.x--;
    else {
      this.x = area.width;
    }
    if(game.status == 1) setTimeout(() => this.move, this.speed);
  }

}

class Game {
  constructor() {
    this.status = 0;
    this.start();
  }

  start() { // 0 code
    canvasBoard.fillStyle = "white";
    canvasBoard.fillRect(0, 0, area.width, area.height);
    canvasBoard.fillStyle = "black";
    canvasBoard.font = " 16px Arial";
    canvasBoard.textAlign = "center";
    canvasBoard.fillText(`Press Space or key Up to start game`, area.width / 2, area.height / 2 - 20);
  }

  game() { // 1 code
    // reset variable
    tree.speed = tree.defaultSpeed;
    score.speed = score.defaultSpeed;
    gold.speed = gold.defaultSpeed;
    tree.x = tree.defaultX;
    tree.y = tree.defaultY;
    rex.x = rex.defaultX;
    rex.y = rex.defaultY;
    gold.x = gold.defaultX;
    gold.y = gold.defaultY;
    score.score = 0;
    gold.move();
    tree.move();
    score.show();
    detectionCollision();
  }

  end() { // 2 code
    //console.error("Game Over");
    this.status = 2;
    this.endBoard();
  }

  endBoard() {
    area.clearBoard();
    canvasBoard.fillStyle = "white";
    canvasBoard.fillRect(0, 0, area.width, area.height);
    canvasBoard.fillStyle = "red";
    canvasBoard.font = "bold 24px Arial";
    canvasBoard.textAlign = "center";
    canvasBoard.fillText(`Game Over!`, area.width / 2, area.height / 2 - 20);
    canvasBoard.font = "24px Arial";
    canvasBoard.fillText(`Your scoure: ${score.score}`, area.width / 2, area.height / 2 + 10);

    canvasBoard.font = "16px Arial";
    canvasBoard.fillStyle = "black";
    canvasBoard.fillText(`Press Space or key Up to start game`, area.width / 2, area.height / 2 + 50);
  }

}