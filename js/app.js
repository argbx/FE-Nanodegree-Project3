var rightEdge = 505;
var bottomEdge = 404;
var tileWidth = 101;
var tileHeight = 83;
var failed = 0;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprites = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.checkCollision(player);

    var speed = Math.random() * (200 - 100) + 100;
    //console.log(speed);
    if (this.x < rightEdge) {
        this.x += speed * dt;
        //console.log(this.x);
    } else {
        this.x = 0;
    } //var now = Date.now(),
    //dt = (now - lastTime) / 1000.0;
    //enemy.render();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprites), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
};

player.prototype.update = function() {


};

var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x < allEnemies[i].x + 50 &&
            player.x + 50 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 40 &&
            player.y + 40 > allEnemies[i].y) {


            document.location.reload();

        }
    }
};



player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
player.prototype.handleInput = function(key) {
    console.log(this.x, this.y);

    console.log(failed);
    switch (key) {
        case 'left':
            if (this.x - tileWidth < 0) {
                this.x = 0;
            } else {
                this.x -= tileWidth;
            }
            break;

        case 'right':
            if (this.x + tileWidth >= rightEdge) {

                this.x = 404;
            } else {
                this.x += tileWidth;
            }
            break;

        case 'up':
            if (this.y - tileHeight < 0) {
                failed = failed + 1
                this.y = 404;

                var canvas = document.querySelector('canvas');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.font = "36pt Impact";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("Your Point" + " " + failed, canvas.width / 2, 40);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 3;
                ctx.strokeText("Your Point" + " " + failed, canvas.width / 2, 40);

            } else {
                this.y -= tileHeight;
            }
            break;

        case 'down':
            if (this.y + tileHeight >= bottomEdge) {
                this.y = 404;
            } else {
                this.y += tileHeight;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 60), new Enemy(101, 150), new Enemy(3, 3)];
//var Enemy = new Enemy(10,10);
var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});