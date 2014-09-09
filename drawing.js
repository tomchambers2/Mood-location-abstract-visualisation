var coords = {};
var mood = {};

function createTracks(data) {
	coords.data = data;
};

function createMood(data) {
	mood.data = data;
}

function convert(lat, lng) {
	//var x = (lng + 180) * (view.bounds.width / 360);
	//var y = ((-1 * lat) + 90) * (view.bounds.height / 180);

	var x = (lat - 50) * 100;
	var y = Math.abs(lng) * 100;
	return {x:x,y:y};
}

function changeLine(color,width,line) {
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

var paths = new Group();
//paths.applyMatrix = false; not needed unless applying scaling

var bigPath = new Path();
bigPath.moveTo(new Point(500,500));
bigPath.moveTo(new Point(600,600));
bigPath.strokeColor = 'white';
bigPath.strokeWidth = 3;
bigPath.fillColor = 'blue';

function onFrame(event) {
	//if (event.count > 100) return;
	if (coords.data && mood.data) {
		//date += 1000000; //this is the standard slow moving date
		date += 1000000; //fast date for testing
		dateElement.innerHTML = moment(date).format('Do MMMM YYYY, ha');

		var loadedTrackTime = moment(coords.data[i][0]+' '+coords.data[i][1]); //this is the undrawn track. if we pass its date, draw it

		mood.date = mood.data[j][0].split('"')[1];
		mood.hours = mood.data[j][2].split('"')[1];
		mood.minutes = mood.data[j][3].split('"')[1];
		mood.seconds = mood.data[j][4].split('"')[1];
		mood.currentDate = moment(mood.date+' '+mood.hours+':'+mood.minutes+':'+mood.seconds);

		function changeMood(line) {
			if (moment(date).isAfter(mood.currentDate)) {
				moodElement.innerHTML = mood.data[j][5].split('"')[1];
				mood.currentMood = mood.data[j][5].split('"')[1];
				j++;
			};
			switch (mood.currentMood) {
				case 'Very Bad':
					changeLine('#ED1C11',1,line);
					//console.log('changed mood very bad');
					break;
				case 'Bad':
					changeLine('#ED7C38',1,line);
					//console.log('changed mood bad');
					break;				
				case 'Meh':
					changeLine('#21ABED',1,line);
					//console.log('changed mood meh');
					break;				
				case 'So-So':
					changeLine('#C0ED53',1,line);
					//console.log('changed mood so-so');
					break;				
				case 'Okay':
					changeLine('#83ED52',1,line);
					//console.log('changed mood okay');
					break;				
				case 'Good':
					changeLine('#26ED6D',1,line);
					//console.log('changed mood good');
					break;
			};
		};

		if (moment(date).isAfter(loadedTrackTime)) {
			var line = new Path();
			line.strokeColor = '#BCBCBC';
			changeMood(line);
			line.add(convert(coords.x,coords.y));
			coords.x = parseFloat(coords.data[i][3],10);
			coords.y = parseFloat(coords.data[i][4],10);
			line.add(convert(coords.x,coords.y));
			paper.view.center = new Point(convert(coords.x,coords.y));
			//paper.view.zoom = 10;
			line.smooth();
			//console.log(convert(coords.x,coords.y));

			bigPath.join(line);
			/*
			if (paths.children.length > 3) {
				line.remove();
				paths.lastChild.join(line);
				paths.lastChild.smooth();
				paths.lastChild.strokeJoin = 'miter';
				paths.lastChild.strokeCap = 'round';
			}
			paths.addChild(line);

			console.log(paths.children.length);
			if (paths.children.length > 600) {
				//paths.firstChild.remove();
			}
			*/
			i++;
		};
	};
};