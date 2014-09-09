function Particle() {
	var dampen = 0.81;

	rectangle = new Path.Rectangle(new Point(100, 100), 100);
	rectangle.strokeColor = 'black';
	//rectangle.rotate(20);
	rectangle.velocityY = 0;

	this.update = function() {
		rectangle.velocityY += 0.3;
		rectangle.velocityY *= 0.99;
		rectangle.position.y += rectangle.velocityY;

		console.log(rectangle.velocityY);

		if (rectangle.bounds.bottom >= view.bounds.height) {
			//rectangle.position.y = view.bounds.height;
			rectangle.velocityY = -rectangle.velocityY;

			rectangle.velocityY *= dampen;
		}
	}

	//calculate downward force/
	//calculate x vector force
	//calculate rotation
};

var a = new Particle();

function onFrame() {
	a.update();
}