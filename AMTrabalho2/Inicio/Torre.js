var Torre = Entity.extend(function () {
        this.currState = undefined; // por equanto é inutil
        var podeDisparar = undefined;
        var callback = undefined;
        this.states = {
            turret1: 'turret1',
            turret2: 'turret2',
            turret6: 'turret6',
            turret7: 'turret7'
        }; // por equanto é inutil
        this.speed = undefined; //velocidade da bala
        this.damage = undefined;
        this.range = undefined;
        this.special = undefined;
        this.nearbyMinion = false;
        //  this.accuracy;  Para ver
        this.constructor = function (spriteSheet, x, y, type) {
            this.super();
            this.x = x;
            this.y = y;
            this.spriteSheet = spriteSheet;

            switch (type) {
                case "cannonTower":
                    this.speed = 5;
                    this.damage = 50;
                    this.range = 4;
                    this.currState = this.states.turret6;
                    break;
                case "iceTower":
                    this.speed = 0;
                    this.damage = 10;
                    this.range = 2;
                    this.special = "slow";
                    this.currState = this.states.turret1;
                    break;
                case "flameTower":
                    this.speed = 1;
                    this.damage = 25;
                    this.range = 2;
                    this.special = "burn";
                    this.currState = this.states.turret7;
                    break;
                case "sniperTower":
                    this.speed = 9;
                    this.damage = 100;
                    this.range = 6;
                    this.currState = this.states.turret2;
                    break;
            }
            this.currentFrame = 0;
            setup();
        };
        this.update = function () {
            if (!this.active) return;
            if (this.nearbyMinion) {
                this.podeDisparar = true;
                //disparar()
            }
        };
        var setup = function () {
            this.eStates[this.currState] = this.spriteSheet.getStats(this.currState);
            this.frames = this.eStates[this.currState];
            this.width = this.frames[0].width;
            this.height = this.frames[0].height;
        }.bind(this);

        this.disparar = function (criarBala) {
            if (!podeDisparar) return;

            podeDisparar = false;

            callback = criarBala;
        };
        this.getSprite = function () {
            return this.frames[this.currentFrame];
        };

        this.attack = function (mobX, mobY) {
                var difX = this.x - mobX;
                var difY = this.y - mobY;

                var alpha = Math.atan(difY / difX);

                if(difX<0){
                    this.rotation = alpha + Math.PI*(2/4);
                }else{
                    this.rotation = alpha + Math.PI*(-2/4);
                }


                //disparar()
        }
    }
);