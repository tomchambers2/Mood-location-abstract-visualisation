

var paths = [];

function onMouseDown(e) {
	var point = Math.random() * 1000;
	var rect = new Rectangle(e.point.x,e.point.y,100,100);
	var path = new Path.Rectangle(rect);

	path.smooth();
	//path.selected = !!Math.floor(Math.random() * 2);
	path.fillColor = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	}
	path.velocity = 0;
	paths.push(path);
}

var friction = 0.3;

function onFrame(e) {
	for (var i=0;i<paths.length;i++) {

		if (paths[i].velocity >= 0.3) {
			paths[i].velocity -= friction;
		} else if (paths[i].velocity < 0.3 && paths[i].velocity >= 0) {
			paths[i].velocity = 0;
		}

		if (paths[i].bounds.y + paths[i].bounds.height > view.bounds.height) {
			paths[i].velocity = -paths[i].velocity + (paths[i].velocity * 0.3);
		} else {
			paths[i].velocity += 1;
		}

		console.log(paths[i].bounds)

		for (var j=0;j<paths.length;j++) {
			//if ()
		}
 
		paths[i].position.y += paths[i].velocity;
	};
}