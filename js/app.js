var RIGHT_EDGE = 505;
var BOTTOM_EDGE = 404;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var POINTS = 0;
var ENEMIES = 5;


// Enemies our player must avoid
var Enemy = function(x, y) {
    'use strict';
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

    var speed = Math.random() * (200 - 100) + 100;
    if (this.x < RIGHT_EDGE) {
        this.x += speed * dt;
    } else {
        this.x = 0;
        this.y = Math.floor(Math.random() * 200) + 20;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprites), this.x, this.y);
};

// Create the player and players initial position
var player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 404;
};

player.prototype.update = function() {


};

var checkCollisions = function() {
    for (var i = 0, len = allEnemies.length; i < len; i++) {
        if (player.x < allEnemies[i].x + 50 &&
            player.x + 50 > allEnemies[i].x &&
            player.y < allEnemies[i].y + 40 &&
            player.y + 40 > allEnemies[i].y) {

            allEnemies = [];
            document.location.reload();

        }
    }
};



player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if (this.x - TILE_WIDTH < 0) {
                this.x = 0;
            } else {
                this.x -= TILE_WIDTH;
            }
            break;

        case 'right':
            if (this.x + TILE_WIDTH >= RIGHT_EDGE) {
                this.x = 404;
            } else {
                this.x += TILE_WIDTH;
            }
            break;

        case 'up':
            if (this.y - TILE_HEIGHT < 0) {
                POINTS = POINTS + 1;
                this.y = 404;
                var canvas = document.querySelector('canvas');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '36pt Impact';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'white';
                ctx.fillText('Your Point' + ' ' + POINTS, canvas.width / 2, 40);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 3;
                ctx.strokeText('Your Point' + ' ' + POINTS, canvas.width / 2, 40);

            } else {
                this.y -= TILE_HEIGHT;
            }
            break;

        case 'down':
            if (this.y + TILE_HEIGHT >= BOTTOM_EDGE) {
                this.y = 404;
            } else {
                this.y += TILE_HEIGHT;
            }
            break;
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new player();

// Create number of set enemies in random locations
for (var i = 0, len = ENEMIES; i < len; i++) {
    x = Math.floor(Math.random() * 200) + 20;
    y = Math.floor(Math.random() * 200) + 20;
    allEnemies.push(new Enemy(x, y));
}


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