// desenho de backerounds com o software tiled 
// Autor:Cláudio Barradas 2018
(function () { //não apagar

	var canvas; // representação genérica dos canvas

	var canvases = {
		background: {
			canvas: null,
			ctx: null
		}, // canvas, drawingSurface (contex2d)
		entities: {
			canvas: null,
			ctx: null
		},
		components: {
			canvas: null,
			ctx: null
		}
	};
		
	var entities = [];
	var asBalas = [];
	var teclas = new Array(255);
 
	var tileBackground;
	var offscreenBackground;
	  
	var animationHandler;
	 
	var loadInfo = undefined;
	var assetsLoadInfo = undefined;
	var assetsLoaded = 0;
	var assets = [];

	var GameSounds = {
		BALA: {},
	};  
	
	var GameStates = {
		RUNNING: 1,
		PAUSED: 2,
		STOPED: 3,
		LOADING: 4,
		LOADED: 5
	}
	
	var tx=0;
	var ty=0;
	var pvTx=-1;
	var pvTy=-1;
	
	var gameState = undefined;

	window.addEventListener("load", init, false);

	function init() {
		canvases.background.canvas = document.querySelector("#canvasBack");
		canvases.background.ctx = canvases.background.canvas.getContext("2d");

		canvases.entities.canvas = document.querySelector("#canvasEnt");
		canvases.entities.ctx = canvases.entities.canvas.getContext("2d");

		canvases.components.canvas = document.querySelector("#canvasComp");
		canvases.components.ctx = canvases.components.canvas.getContext("2d");
  		load();	 
	}
		
	function load(){
		loadInfo = document.querySelector("#loadInfo");
		assetsLoadInfo = document.querySelector("#assetLoaded");	
		gameState = GameStates.LOADING;
 		
		tileBackground= new TiledMap();
		tileBackground.load('./data','largeLevel_claudio.json', loaded); 
		assets.push(tileBackground);
		
		var spTanque = new SpriteSheet();
		spTanque.load("assets//tank.png", "assets//tank.json", loaded);
		assets.push(spTanque);
		
		gSoundManager.loadAsync("sounds/missilExplosion.mp3", function (so) {
			GameSounds.BALA.EXPLOSION = so;
			loaded("sounds/missilExplosion.mp3")
		});
		assets.push(GameSounds.BALA.EXPLOSION);
	}

	function loaded(assetName) {
		assetsLoaded++;
		assetsLoadInfo.innerHTML = "Loading: " + assetName;
		if (assetsLoaded < assets.length) return;
 		assetsLoadInfo.innerHTML = "Jogo carregado! Navegue utilizando as teclas direcionais"	
		gameState = GameStates.LOADED;
	 	window.addEventListener("keypress",setupGame,false); // espera por uma tecla pressionada para  
	}
	
	function setupGame(){
	  
		window.removeEventListener("keypress",setupGame,false);
		
		loadInfo.classList.toggle("hidden"); // esconder a informaçao de loading
	 
		 
		// ajustar os canvas ao tamanho da janela
		canvases.background.canvas.width = window.innerWidth;
		canvases.background.canvas.height = window.innerHeight;
		canvases.entities.canvas.width = window.innerWidth;
		canvases.entities.canvas.height = window.innerHeight;
		canvases.components.canvas.width = window.innerWidth;
		canvases.components.canvas.height = window.innerHeight;
		
		offscreenBackground= document.createElement("canvas");
		offscreenBackground.width=tileBackground.getWidth();
		offscreenBackground.height=tileBackground.getHeight();
		
		//fazer o translate do background canvas para que a imagem carregada no ecra
		// apareça centrada no ecra
		canvases.background.ctx.translate(-(offscreenBackground.width>>1),
										-(offscreenBackground.height>>1));
		
		// desenhar o tiledBackgroun num canvas em offscreen(não está no documento HTML)
		// nota: um canvas pode desenhar outro canvas, como se fosse uma imagem
		tileBackground.draw(offscreenBackground.getContext("2d"));

		var entidades=tileBackground.getLayerByName("objectos").objects;
		for(umaEntidade of entidades){
			var umaBala = new Bala(gSpriteSheets['assets//tank.png'], umaEntidade.x,umaEntidade.y, GameSounds.BALA.EXPLOSION);
				asBalas.push(umaBala);
				entities.push(umaBala);
			 
		}
		 
		
		gameState = GameStates.RUNNING;
		
		window.addEventListener("keydown",  function(e){ teclas[e.keyCode]=true;},false);
		window.addEventListener("keyup",    function(e){ teclas[e.keyCode]=false;},false); 
		update();
		 
	}
	
	function update(){
		
		animationHandler=requestAnimationFrame(update);
		render();
		if(teclas[keyboard.LEFT])tx+=5;
		if(teclas[keyboard.RIGHT])tx-=5;
		if(teclas[keyboard.UP])ty+=5;
		if(teclas[keyboard.DOWN])ty-=5;
		 
		if(teclas[keyboard.SPACE]){
			for(bala of asBalas){
				bala.explodir();
				GameSounds.BALA.EXPLOSION.play(false,1);
			}
		}
	   canvases.background.ctx.translate(tx,ty);
	   tx=0;
	   ty=0;
	   
	   for(entity of entities){
			entity.update();
		}
		 
		 
	}
	
	//função que para o jogo. É chamada pelo timer, quando a contagem chega a zero
	function stopGame() {
		cancelAnimationFrame(animationHandler);
		gameState = GameStates.STOPED;
	}
 
	// Desenho dos elementos gráficos
	function render() {
		canvases.background.ctx.clearRect(0,0,offscreenBackground.width,offscreenBackground.height,
										0,0,offscreenBackground.width,offscreenBackground.height); //limpa o canvas
		
		// desenhar o tiled background em offscreen optimiza o rendering, pois só se desenha uma vez o tile completo		
		canvases.background.ctx.drawImage(offscreenBackground,
				0,0,offscreenBackground.width,offscreenBackground.height,
				0,0,offscreenBackground.width,offscreenBackground.height
		);
		for(entity of entities){
			entity.render(canvases.background.ctx);
		}
		 
	}
	
})(); // não apagar
