var Balas = Entity.extend(function () {
    this.currState = undefined; // estado atual;
    this.states = {};
    this.speed = undefined;
    this.damage = undefined;
    this.upgrades=undefined
    this.constructor = function (spriteSheet, x, y, type, wave, upgrades) {
        this.super();
        this.x = x;
        this.y = y;
        this.upgrades=upgrades;
        this.spriteSheet = spriteSheet;
        /* this.currState = this.states.VOAR;
            this.currentFrame = 0;*/
        setup();
        switch (type) {
            case cannonTower:
                this.damage=50;
                break;
            case iceTower:
                this.damage=10;
                this.special="slow";
                break;
            case flameTower:
                this.damage=25;
                this.special="burn";
                break;
            case sniperTower:
                this.damage=100;
                break;
        }
        this.damage += (wave * 10)
    }
})