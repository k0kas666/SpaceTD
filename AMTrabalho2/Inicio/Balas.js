//TODO acabar
var Balas = Entity.extend(function () {
    this.currState;// estado atual;
    this.states = {
        ATIVO: 'ATIVO',
        EXPLODIR: 'EXPLODIR'
    };
    this.damage;
    this.special;
    this.speed;
    this.range;
    this.type;
    this.constructor = function (spriteSheet, x, y, type, damage, speed, range, special) {
        this.super();
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.damage = damage;
        this.speed = speed;
        this.range = range;
        this.special = special;
        setup();
    };
    this.update = function () {
        if (!this.active) return;

        this.x -= this.vx;
        this.vx -= this.vx > 0 ? 0.005 : 0;

        this.y -= this.vy;

        this.width = this.frames[this.currentFrame].width;
        this.height = this.frames[this.currentFrame].height;
        this.updateSize();

        if (this.currState == this.states.EXPLODIR && this.currentFrame == this.frames.length - 1)
            this.active = false;

        this.currentFrame = (++this.currentFrame) % this.frames.length;

    };

    var setup = function () {
        this.eStates.ATIVO = this.spriteSheet.getStats('BALA');
        this.eStates.EXPLODIR = this.spriteSheet.getStats('FOGO');

        this.frames = this.eStates[this.currentState];
        this.width = this.frames[0].width;
        this.height = this.frames[0].height;
    }.bind(this);

    this.explodir = function () {
        if (!this.active || this.exploding) return;

        toogleState(this.states.EXPLODIR);
        this.vx = 0;
        this.vy = 0;
        this.exploding = true;
        // COMPLETAR: reproduzir o som de explos�o
    };

    var toogleState = function (theState) {
        if (this.currState != theState) {
            this.currState = theState;
            this.frames = this.eStates[theState];
            this.currentFrame = 0;
        }
    }.bind(this);

})