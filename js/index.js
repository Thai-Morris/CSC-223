var BlossomScene = function(id) {
	var container = document.getElementById(id),
		placeholder = document.createElement('div'),
		petals = [],
		options = {
			numPetals: 10,
			gravity: 0.8,
			wind: {
				magnitude: 0.2,
				maxSpeed: 4,
				duration: 10,
				start: 0
			},
		},
		width = container.offsetWidth,
		height = container.offsetHeight,
		timer = 0;

	/**
	 * Reset the petal position when it goes out of container
	 */
	function resetPetal(petal) {
		petal.x = width * 2 - Math.random() * width * 1.75;
		petal.y = -10;
		petal.z = Math.random() * 200;

		if (petal.x > width) {
			petal.x = width + 10;
			petal.y = Math.random() * height / 2;
		}

		if (timer === 0) {
			petal.y = Math.random() * height;
		}

		// Rotation
		petal.rotation.speed = Math.random() * 10;
		var randomAxis = Math.random();
		if (randomAxis > 0.5) {
			petal.rotation.axis = 'X';
		} else if (randomAxis > 0.25) {
			petal.rotation.axis = 'Y';
			petal.rotation.x = Math.random() * 180 + 90;
		} else {
			petal.rotation.axis = 'Z';
			petal.rotation.x = Math.random() * 360 - 180;
			// looks weird if the rotation is too fast around this axis
			petal.rotation.speed = Math.random() * 3;
		}

		// random speed
		petal.xSpeedVariation = Math.random() * 0.8 - 0.4;
		petal.ySpeed = Math.random() + options.gravity;

		return petal;
	}

	/**
	 * Update petal position
	 */
	function updatePetal(petal) {
		var petalWindSpeed = options.wind.speed(timer - options.wind.start, petal.y),
			xSpeed = petalWindSpeed + petal.xSpeedVariation;

		petal.x -= xSpeed;
		petal.y += petal.ySpeed;
		petal.rotation.value += petal.rotation.speed;

		var t = 'translateX( ' + petal.x + 'px ) translateY( ' + petal.y + 'px ) translateZ( ' + petal.z + 'px )  rotate' + petal.rotation.axis + '( ' + petal.rotation.value + 'deg )';
		if (petal.rotation.axis !== 'X') {
			t += ' rotateX(' + petal.rotation.x + 'deg)';
		}
		petal.el.style.webkitTransform = t;
		petal.el.style.MozTransform = t;
		petal.el.style.oTransform = t;
		petal.el.style.transform = t;

		// reset if out of view
		if (petal.x < -10 || petal.y > height + 10) {
			resetPetal(petal);
		}
	}

	/**
	 * Change the wind speed
	 */
	function updateWind() {
		// wind follows a sine curve: asin(b*time + c) + a
		// where a = wind magnitude as a function of petal position, b = wind.duration, c = offset
		// wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

		if (timer === 0 || timer > (options.wind.start + options.wind.duration)) {

			options.wind.magnitude = Math.random() * options.wind.maxSpeed;
			options.wind.duration = options.wind.magnitude * 50 + (Math.random() * 20 - 10);
			options.wind.start = timer;

			var screenHeight = height;

			options.wind.speed = function(t, y) {
				var a = this.magnitude / 2 * (screenHeight - 2 * y / 3) / screenHeight;
				return a * Math.sin(2 * Math.PI / this.duration * t + (3 * Math.PI / 2)) + a;
			}
		}
	}

	/**
	 * Get a random int number, max is excluded
	 */
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * Create the petals elements
	 */
	function createPetals() {
		var petal,
			petalElement;

		for (var i = 0; i < options.numPetals; i++) {
			petalElement = document.createElement('div');
			petalElement.className = 'petal petal-style' + getRandomInt(1, 5);

			petal = {
				el: petalElement,
				x: 0,
				y: 0,
				z: 0,
				rotation: {
					axis: 'X',
					value: 0,
					speed: 0,
					x: 0
				},
				xSpeedVariation: 0,
				ySpeed: 0,
				path: {
					type: 1,
					start: 0,
				},
				image: 1
			};

			resetPetal(petal);
			petals.push(petal);
			placeholder.appendChild(petal.el);
		}

		placeholder.className = 'blossom-scene';
		container.appendChild(placeholder);
	}

	/**
	 * Update the animation frame
	 */
	function updateFrame() {
		updateWind();
		for (var i = 0; i < petals.length; i++) {
			updatePetal(petals[i]);
		}

		timer++;
		requestAnimationFrame(updateFrame);
	}

	createPetals();

	return {
		start: function() {
			requestAnimationFrame(updateFrame);
		}
	};
}

// Init Cherry Blossom Scene
var CherryBlossoms = new BlossomScene('blossom_container');
CherryBlossoms.start();