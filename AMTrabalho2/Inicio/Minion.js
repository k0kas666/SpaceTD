var Minion = Entity.extend(function () {
    this.currState; // estado atual;
    this.states = {
        WALK: 'WALK'
    };
    this.speed;
    this.health;
    this.vFrame=0;

    this.constructor = function (spriteSheet, x, y, type, wave, mode) {
        this.super();
        this.x = x;
        this.y = y;
        this.currentFrame = 0;
        this.currState=this.states.WALK;
        this.isColliding = false;
        this.spriteSheet = spriteSheet;

        if (mode == "hard") type = mode + type;


        switch (type) {
            case "normal":
                this.speed = 3;
                this.health = 100;
                break;
            case "fast":
                this.speed = 4;
                this.health = 75;
                break;
            case "turtle":
                this.speed = 2;
                this.health = 125;
                break;
            case "boss":
                this.speed = 1;
                this.health = 150;
                break;
            case "hardnormal":
                this.speed = 3;
                this.health = 125;
                break;
            case "hardfast":
                this.speed = 5;
                this.health = 100;
                break;
            case "hardturtle":
                this.speed = 3;
                this.health = 150;
                break;
            case "hardboss":
                this.speed = 2;
                this.health = 1000;
                break;
        }
        this.health += Math.pow((wave / 2), Math.E);
        setup();
    }
    this.update = function () {
        this.vFrame = this.vFrame < this.frames.length - 1 ?this. vFrame + 0.1 : 0;
        this.currentFrame = Math.floor(this.vFrame);
        this.x++;
    };
    var setup = function () {
        this.eStates[this.states.WALK] = this.spriteSheet.getStats(this.states.WALK);
        this.frames = this.eStates[this.currState];
        this.width = this.frames[0].width;
        this.height = this.frames[0].height;
    }.bind(this);

    this.getSprite = function () {
        return this.frames[this.currentFrame];
    };

});