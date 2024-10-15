import * as THREE from "three";
import { createGraph2, dijkstra } from './routeCalculator.js';

// Global variables
let isPaused = false;
let lastTime = Date.now();
let simulationTime = Date.now();
const ROTATION_SPEED = (2 * Math.PI) / (24 * 60 * 60); // one full rotation every 24 hours
const UPDATE_INTERVAL = 1000; // in milliseconds
const pausePlayButton = document.getElementById("pausePlayButton");
const dateDisplay = document.getElementById("dateDisplay");
const maxTransmissionDistance = 2000; // in km
let shortestPath = [];
let shortestPathLines = [];
let lastUpdateTime = Date.now();

// Function to update satellites
/**
 * Updates each satellite's position based on the time since TLE epoch.
 * @param {Array} satellites - The array of satellite objects.
 * @param {Number} timeSinceTleEpoch - The time since TLE epoch in minutes.
 */
function updateSatellites(satellites, timeSinceTleEpoch) {
	satellites.forEach((satellite) => {
		satellite.update(timeSinceTleEpoch);
	});
}

// Function to create a line between two points
/**
 * Creates a line between two points using THREE.js.
 * @param {THREE.Vector3} point1 - The first point.
 * @param {THREE.Vector3} point2 - The second point.
 * @returns {THREE.Line} - The line object.
 */
function createLineBetweenPoints(point1, point2) {
	const material = new THREE.LineBasicMaterial({ color: 0xFFFF00 });
	const points = [];
	points.push(point1, point2);
	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	return new THREE.Line(geometry, material);
}

// Function to calculate the global position of a node
/**
 * Calculates the global position of a node.
 * @param {Object} node - The node object.
 * @param {Object} earth - The earth object.
 * @returns {THREE.Vector3} - The global position of the node.
 */
function calculateGlobalPosition(node, earth) {
	let globalPos = node.type === 'marker' ? earth.mesh.localToWorld(node.mesh.position.clone()) : node.mesh.position.clone();
	globalPos = globalPos.clone().sub(earth.mesh.position); // Subtract the Earth's position
	return globalPos;
}

// Function to visualize the shortest path
/**
 * Visualizes the shortest path between nodes by creating lines between them.
 * @param {THREE.Scene} scene - The scene object.
 * @param {Array} satellites - The array of satellite objects.
 * @param {Array} markers - The array of marker objects.
 * @param {Object} earth - The earth object.
 */
function visualizeShortestPath(scene, satellites, markers, earth) {
	shortestPathLines.forEach(line => scene.remove(line)); // Remove old lines from the scene
	shortestPathLines = []; // Clear the old lines

	markers.forEach(marker => marker.type = 'marker'); // Add type to markers

	for (let i = 0; i < shortestPath.length - 1; i++) {
		const node1 = [...satellites, ...markers].find(node => node.type === 'marker' ? node.id == shortestPath[i] : node.satrec ? node.satrec.satnum == shortestPath[i] : false);
		const node2 = [...satellites, ...markers].find(node => node.type === 'marker' ? node.id == shortestPath[i + 1] : node.satrec ? node.satrec.satnum == shortestPath[i + 1] : false);
		if (node1 && node2) {
			if (node1.type !== 'marker') {
				node1.setColor(0xFFFF00);
			}
			if (node2.type !== 'marker') {
				node2.setColor(0xFFFF00);
			}
			if (node1.mesh.position && node2.mesh.position) {
				let globalPos1 = calculateGlobalPosition(node1, earth);
				let globalPos2 = calculateGlobalPosition(node2, earth);
				const line = createLineBetweenPoints(globalPos1, globalPos2);
				scene.add(line);
				shortestPathLines.push(line); // Store the line
			} else {
				console.log('One of the nodes does not have a position property');
			}
		} else {
			console.log('One of the nodes is undefined');
		}
	}
}

// Function to update lines
/**
 * Updates the positions of the lines that represent the shortest path.
 * @param {Array} satellites - The array of satellite objects.
 * @param {Array} markers - The array of marker objects.
 * @param {Object} earth - The earth object.
 */
function updateLines(satellites, markers, earth) {
	shortestPathLines.forEach((line, i) => {
		const node1 = [...satellites, ...markers].find(node => node.type === 'marker' ? node.id == shortestPath[i] : node.satrec ? node.satrec.satnum == shortestPath[i] : false);
		const node2 = [...satellites, ...markers].find(node => node.type === 'marker' ? node.id == shortestPath[i + 1] : node.satrec ? node.satrec.satnum == shortestPath[i + 1] : false);
		if (node1 && node2) {
			if (node1.mesh.position && node2.mesh.position) {
				let globalPos1 = calculateGlobalPosition(node1, earth);
				let globalPos2 = calculateGlobalPosition(node2, earth);
				line.geometry.attributes.position.setXYZ(0, globalPos1.x, globalPos1.y, globalPos1.z);
				line.geometry.attributes.position.setXYZ(1, globalPos2.x, globalPos2.y, globalPos2.z);
				line.geometry.attributes.position.needsUpdate = true; // Flag the position attribute for update
			} else {
				console.log('One of the nodes does not have a position property');
			}
		} else {
			console.log('One of the nodes is undefined');
		}
	});
}

// Function to get positions
/**
 * Gets the positions of all markers and satellites.
 * @param {Array} markers - The array of marker objects.
 * @param {Array} satellites - The array of satellite objects.
 * @param {Object} earth - The earth object.
 * @returns {Object} - An object where the keys are the IDs of the markers and satellites, and the values are their positions.
 */
function getPositions(markers, satellites, earth) {
	const positions = {};

	markers.forEach(marker => {
		const markerWorldPosition = marker.position.clone();
		earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
		positions[marker.id] = markerWorldPosition;
	});

	satellites.forEach(satellite => {
		positions[satellite.satrec.satnum] = satellite.mesh.position;
	});

	return positions;
}

// Function to update simulation time
/**
 * Updates the simulation time based on the delta time and speed.
 * @param {Number} deltaTime - The delta time in seconds.
 * @param {Number} speed - The speed of the simulation.
 */
function updateSimulationTime(deltaTime, speed) {
	simulationTime += deltaTime * 1000 * speed;
}

function updateDateDisplay() {
	const simulationDate = new Date(simulationTime);
	dateDisplay.textContent = simulationDate.toLocaleString('fi-FI');
}

// Function to rotate earth
/**
 * Rotates the earth based on the delta time and speed.
 * @param {Object} earth - The earth object.
 * @param {Number} deltaTime - The delta time in seconds.
 * @param {Number} speed - The speed of the simulation.
 */
function rotateEarth(earth, deltaTime, speed) {
	earth.mesh.rotation.y += ROTATION_SPEED * deltaTime * speed;
}

// Function to update loads
/**
 * Updates the load of each satellite.
 * @param {Array} satellites - The array of satellite objects.
 */
function updateLoads(satellites) {
	for (let i = 0; i < satellites.length; i++) {
		satellites[i].updateLoad();
	}
}

// Function to update shortest path if needed
/**
 * Updates the shortest path if there are exactly two markers.
 * @param {THREE.Scene} scene - The scene object.
 * @param {Array} satellites - The array of satellite objects.
 * @param {Array} markers - The array of marker objects.
 * @param {Object} earth - The earth object.
 */
function updateShortestPathIfNeeded(scene, satellites, markers, earth) {
	if (markers.length === 2) {
		const graph = createGraph2(getPositions(markers, satellites, earth), maxTransmissionDistance);
		shortestPath = dijkstra(graph, markers[0].id, markers[1].id);
		visualizeShortestPath(scene, satellites, markers, earth);
	}
}

// Function to animate
/**
 * The main animation loop of the simulation.
 * @param {THREE.Scene} scene - The scene object.
 * @param {THREE.Camera} camera - The camera object.
 * @param {THREE.Renderer} renderer - The renderer object.
 * @param {THREE.OrbitControls} controls - The orbit controls object.
 * @param {Object} earth - The earth object.
 * @param {Number} earliestEpoch - The earliest TLE epoch in milliseconds.
 * @param {Array} satellites - The array of satellite objects.
 * @param {Array} markers - The array of marker objects.
 * @param {Function} updateMarkerAndPathList - The function to update the marker and path list.
 */
function animate(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerAndPathList) {
	if (isPaused) return;

	requestAnimationFrame(() => animate(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerAndPathList));

	const currentTime = Date.now();
	const deltaTime = (currentTime - lastTime) / 1000; // in seconds
	lastTime = currentTime;

	const speed = speedSlider.value;
	updateSimulationTime(deltaTime, speed);
	updateDateDisplay();
	rotateEarth(earth, deltaTime, speed);

	const timeSinceTleEpoch = (simulationTime - earliestEpoch) / 60000; // in seconds
	updateSatellites(satellites, timeSinceTleEpoch);

	if (Date.now() - lastUpdateTime >= UPDATE_INTERVAL) {
		updateLoads(satellites);
		updateShortestPathIfNeeded(scene, satellites, markers, earth);
		lastUpdateTime = Date.now();

	}
	
	if (shortestPath.length > 0) {
		updateLines(satellites, markers, earth);
	}
	updateMarkerAndPathList(markers, satellites);

}

// Function to start the animation
export function startAnimation(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerList) {
	animate(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerList);

	pausePlayButton.addEventListener("click", () => {
		isPaused = !isPaused;
		pausePlayButton.textContent = isPaused ? "Play" : "Pause";
		if (!isPaused) {
			lastTime = Date.now(); // Reset lastTime when the animation is resumed
			animate(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerList);
		}
	});

	// Separate loop for controls update and rendering
	function render() {
		requestAnimationFrame(render);
		controls.update();
		renderer.render(scene, camera);
	}

	render();
}

export { shortestPath };