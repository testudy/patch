function TimeInfo(goalFPS){
	var oldTime = 0,
		pause = true,
		iterCount = 0,
		totalFPS = 0;

	return {
		getInfo : function() {
			if (pause) {
				pause = false;
				oldTime = Date.now();
				return {
					elapsed : 0,
					coeff : 0,
					FPS : 0,
					averageFPS : 0
				};
			}

			var newTime = Date.now();
			var elapsed = newTime - oldTime;
			oldTime = newTime;
			var FPS = 1000 / elapsed;
			iterCount++;
			totalFPS += FPS;

			return {
				elapsed : elapsed,
				coeff : goalFPS / FPS,
				FPS : FPS,
				averageFPS : totalFPS / iterCount
			};
		},
		pause : function() {
			pause = true;
		}
	};
}
