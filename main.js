import * as THREE from "three";
import { createCamera } from "./camera.js";
import { createControls } from "./controls.js";
import { createRenderer } from "./renderer.js";
import { Earth } from "./earth.js";
import { startAnimation } from "./animation.js";
import { createGroundMarker } from "./groundMarker.js";
import Satellite from "./satellite.js";
import { shortestPath } from "./animation.js";

// 2 imports from the same file on separate lines, copilot did not catch that

// Create a scene
const scene = new THREE.Scene();

// Array to hold the satellites
let satellites = [];

// Create and add Earth to the scene
const earth = new Earth();
scene.add(earth.mesh);

// Create camera, renderer, and controls
const camera = createCamera();
const renderer = createRenderer();
const controls = createControls(camera, renderer);

// Create a Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Array to hold the markers
let markers = [];

// Flag to track whether location placing is on
let locationPlacing = false;

window.onload = function () {
	document.getElementById('speedSlider').value = 1;
	addEventListeners();
	loadData();
}

/**
 * Adds event listeners to various elements in the DOM.
 */
function addEventListeners() {
	window.addEventListener('mousedown', onMouseDown, false);

	document.getElementById('realTimeButton').addEventListener('click', () => {
		document.getElementById('speedSlider').value = 1;
	});

	document.getElementById('oneMinButton').addEventListener('click', () => {
		document.getElementById('speedSlider').value = 60;
	});

	document.getElementById('oneHourButton').addEventListener('click', () => {
		document.getElementById('speedSlider').value = 3600;
	});

	document.getElementById('toggleLocationPlacingButton').addEventListener('click', () => {
		toggleLocationPlacing();
	});

	document.getElementById('removeMarkersButton').addEventListener('click', () => {
		removeMarkersAndPath(markers, satellites);
	});
}

/**
 * Loads the TLE data and starts the animation loop.
 */
function loadData() {
	// Load the TLE data
	// Data from https://celestrak.com/NORAD/elements/
	fetch("starlinkCurrent.txt")
		.then((response) => response.text())
		.then((data) => {
			const lines = data.split("\n");
			let earliestEpoch;

			for (let i = 0; i < lines.length; i += 3) {
				const name = lines[i].trim();
				const tle1 = lines[i + 1].trim();
				const tle2 = lines[i + 2].trim();

				// Get the epoch from the TLE data
				const epoch = getTleEpoch(tle1, tle2);

				// Create a Satellite object and add it to the scene
				const satellite = new Satellite(tle1, tle2, name, epoch);
				scene.add(satellite.mesh);
				satellites.push(satellite);

				// If this is the first epoch or it's earlier than the current earliest epoch, update the earliest epoch
				if (!earliestEpoch || epoch < earliestEpoch) {
					earliestEpoch = epoch;
				}
			}

			document.getElementById('satelliteCount').textContent = `Number of satellites: ${satellites.length}`;

			// Start the animation loop, passing in the earliest epoch and shortestpath
			startAnimation(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerAndPathList);
		});
}

/**
 * Toggles the location placing mode.
 */
function toggleLocationPlacing() {
	locationPlacing = !locationPlacing;
	const button = document.getElementById('toggleLocationPlacingButton');
	if (locationPlacing) {
		button.classList.add('on');
	} else {
		button.classList.remove('on');
	}
}

/**
 * Handles the mousedown event. If location placing is enabled, it places a marker at the clicked location on the Earth's surface.
 * It also manages the markers array, ensuring that it contains at most two markers, and toggles off location placing if two markers are already placed.
 * @param {Event} event - The mousedown event.
 */
function onMouseDown(event) {
	// If the event target is the toggleLocationPlacingButton, return early
	if (event.target.id === 'toggleLocationPlacingButton') {
		return;
	}

	// Only place a marker if location placing is on
	if (locationPlacing) {
		// Normalize mouse position to -1 to 1 range
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		// Set the ray from the camera using the mouse coordinates
		raycaster.setFromCamera(mouse, camera);

		// Calculate objects intersecting the picking ray
		const intersects = raycaster.intersectObject(earth.mesh);

		for (let i = 0; i < intersects.length; i++) {
			// Transform the intersection point to the Earth's local coordinate system
			const localPoint = earth.mesh.worldToLocal(intersects[i].point.clone());

			// Create a marker at the intersection point
			const marker = createGroundMarker(localPoint);

			// Position the marker at the transformed intersection point
			marker.position.copy(localPoint);

			// Add the marker as a child of the Earth so it rotates with the Earth
			earth.mesh.add(marker);

			// Initialize the closest satellite to null
			marker.closestSatellite = null;

			// Add the marker to the markers array
			markers.push(marker);

			// Update the marker list
			updateMarkerAndPathList(markers, satellites);

			// If there are more than 2 markers, remove the oldest one
			if (markers.length > 2) {
				const removedMarker = markers.shift();
				earth.mesh.remove(removedMarker);
				// If the removed marker has a line, remove it from the scene
				if (removedMarker.line) {
					scene.remove(removedMarker.line);
					removedMarker.line = null;
				}
			}

			// If there are already 2 markers, toggle off location placing
			if (markers.length >= 2) {
				toggleLocationPlacing();
			}
		}
	}
}

/**
 * Updates the marker and path list.
 * @param {Array} markers - The array of markers.
 * @param {Array} satellites - The array of satellites.
 */
function updateMarkerAndPathList(markers, satellites) {
	// Update the marker list
	const markerList = document.getElementById('markerList');
	while (markerList.firstChild) {
		markerList.removeChild(markerList.firstChild);
	}

	// If shortestPath is not defined or has less than 2 elements, add the markers to the list manually
	if (!shortestPath || shortestPath.length < 2) {
		markers.forEach((marker, index) => {
			const listItem = document.createElement('li');
			const lat = marker.coordinates.latitude.toFixed(2);
			const lon = marker.coordinates.longitude.toFixed(2);
			const latLabel = lat >= 0 ? 'N' : 'S';
			const lonLabel = lon >= 0 ? 'E' : 'W';
			listItem.textContent = `Location ${index + 1}: ${Math.abs(lat)}°${latLabel}, ${Math.abs(lon)}°${lonLabel}`;
			markerList.appendChild(listItem);
		});
		return;
	}

	// Add each item in the shortest path to the list
	let locationIndex = 1;
	shortestPath.forEach((id, index) => {
		const listItem = document.createElement('li');

		// Find the corresponding Satellite or marker
		const satellite = satellites.find(sat => sat.satrec.satnum === id);
		let marker;

		// If the id is the first or last in the shortestPath, it's a marker
		if (index === 0) {
			marker = markers[0];
		} else if (index === shortestPath.length - 1) {
			marker = markers[markers.length - 1];
		}

		if (satellite) {
			listItem.textContent = `Satellite ${index}: ${satellite.mesh.userData.name}`; // Use the satellite's name
			listItem.className = 'satelliteListItem'; // Apply the new CSS class
		} else if (marker) {
			const lat = marker.coordinates.latitude.toFixed(2);
			const lon = marker.coordinates.longitude.toFixed(2);
			const latLabel = lat >= 0 ? 'N' : 'S';
			const lonLabel = lon >= 0 ? 'E' : 'W';
			listItem.textContent = `Location ${locationIndex}: ${Math.abs(lat)}°${latLabel}, ${Math.abs(lon)}°${lonLabel}`;
			locationIndex++;
		}

		markerList.appendChild(listItem);
	});
}

/**
 * Removes all markers and paths.
 * @param {Array} markers - The array of markers.
 */
function removeMarkersAndPath(markers) {
	// Remove all markers from the Earth
	for (let i = 0; i < markers.length; i++) {
		earth.mesh.remove(markers[i]);
	}

	// Remove all lines from the scene
	for (let i = scene.children.length - 1; i >= 0; i--) {
		const object = scene.children[i];
		if (object instanceof THREE.Line) {
			scene.remove(object);
		}
	}

	// Clear the markers array
	markers.length = 0;

	// Clear the shortest path
	shortestPath.length = 0;

	// Update the marker list
	updateMarkerAndPathList(markers, satellites);
}

/**
 * Extracts the epoch (launch date) from the TLE data.
 * @param {string} tle1 - The first line of the TLE data.
 * @param {string} tle2 - The second line of the TLE data.
 * @returns {Date} The epoch as a Date object.
 */
function getTleEpoch(tle1, tle2) {
	// tle2 not used, copilot did not catch that
	const epochString = tle1.substring(18, 32);
	const year = parseInt(epochString.substring(0, 2));
	const dayOfYear = parseFloat(epochString.substring(2));

	// Convert two-digit year to full year
	const fullYear = year < 57 ? 2000 + year : 1900 + year;

	// Create a Date object for the start of the year
	const startOfYear = new Date(Date.UTC(fullYear, 0, 1));

	// Add the day of the year to the start of the year
	const epoch = new Date(
		startOfYear.getTime() + (dayOfYear - 1) * 24 * 60 * 60 * 1000
	);

	return epoch;
}