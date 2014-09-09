var coords = {};
var mood = {};

function createTracks(data) {
	coords.data = data;
};

function createMood(data) {
	mood.data = data;
}

function convert(lat, lng) {
	var x = (lng + 180) * (view.bounds.width / 360);
	var y = ((-1 * lat) + 90) * (view.bounds.height / 180);
	return {x:x,y:y};
}

function changeLine(color,width,smooth) {
	line.strokeColor = color;
	line.fillColor = null;
	line.strokeWidth = width;
};

loadData('tracks',createTracks);
loadData('mood', createMood);

var date = 1395416710000; //start with first day of data
var i = 1;
var j = 2;
var dateElement = document.getElementsByClassName('date')[0];
var moodElement = document.getElementsByClassName('mood')[0];

var line = new Path();
line.strokeColor = 'black';

line.applyMatrix = false;
line.scale(3,new Point(0,0));
line.position = new Point(-1500,-100);

var paths = new Group();
paths.applyMatrix = false;
paths.scale(2);

function onFrame(event) {
	if (event.count > 100) return;
	if (coords.data && mood.data) {
		date += 1000000;
		dateElement.innerHTML = moment(date).format('Do MMMM YYYY, ha');

		var loadedTrackTime = moment(coords.data[i][0]+' '+coords.data[i][1]); //this is the undrawn track. if we pass its date, draw it

		mood.date = mood.data[j][0].split('"')[1];
		mood.hours = mood.data[j][2].split('"')[1];
		mood.minutes = mood.data[j][3].split('"')[1];
		mood.seconds = mood.data[j][4].split('"')[1];
		mood.currentDate = moment(mood.date+' '+mood.hours+':'+mood.minutes+':'+mood.seconds);

		if (moment(date).isAfter(mood.currentDate)) {
			moodElement.innerHTML = mood.data[j][5].split('"')[1];
			var currentMood = mood.data[j][5].split('"')[1];
			switch (currentMood) {
				case 'Very Bad':
					changeLine('black',0.5);
					break;
				case 'Bad':
					changeLine('grey',1);
					break;				
				case 'Meh':
					changeLine('blue',2);
					break;				
				case 'So-So':
					changeLine('orange',3);
					break;				
				case 'Okay':
					changeLine('green', 4);
					break;				
				case 'Good':
					changeLine('red',40);
					break;				
			};
			j++;
		};

		if (moment(date).isAfter(loadedTrackTime)) {
			//draw a line from out last point to the new point
			line = new Path();


			//HERE IS THE BUG!!! YOU ARE ADDING A LINE WITH ONLY ONE END, OF COURSE THEY DON'T MATCH UP!!!!
			coords.x = parseFloat(coords.data[i][3],10);
			coords.y = parseFloat(coords.data[i][4],10);
			if (coords.x && coords.y) {
				line.add(convert(coords.x,coords.y));
			} else {
				line.add(convert(coords.x,coords.y));
			}
			console.log(convert(coords.x,coords.y));
			paths.addChild(line);
			i++;
		};
		console.log(paths);
	};
};