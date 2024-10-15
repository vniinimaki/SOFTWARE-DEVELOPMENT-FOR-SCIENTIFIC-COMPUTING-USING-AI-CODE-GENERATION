import * as THREE from "three";
import { sgp4, twoline2satrec } from "satellite.js";

export default class Satellite {
	/**
	 * Satellite class constructor
	 * @param {string} tle1 - First line of the Two-Line Element Set Format
	 * @param {string} tle2 - Second line of the Two-Line Element Set Format
	 * @param {string} name - Name of the satellite
	 */
	constructor(tle1, tle2, name) {
		// Create a satellite record from the two-line element set
		const satrec = twoline2satrec(tle1, tle2);

		this.satrec = satrec;

		// Create a sphere to represent the satellite
		const radius = 10;
		const widthSegments = 6;
		const heightSegments = 4;
		const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

		this.mesh = new THREE.Mesh(
			geometry,
			new THREE.MeshBasicMaterial({
				color: 0x00ff00, // Start with green color
				side: THREE.FrontSide,
			})
		);

		// Store the satellite's name in the mesh's userData
		// Overly complex, could have been just a variable
		this.mesh.userData.name = name;

		// Initialize load to 0
		this.load = 0;

		// Set update interval to 1 seconds
		this.updateInterval = 1 * 1000; // in milliseconds
	}

	/**
	 * Set color of the satellite
	 * @param {number} color - Color of the satellite
	 */
	setColor(color) {
		this.mesh.material.color.set(color);
	}

	/**
	 * Update load of the satellite and change its color based on the load
	 */
	updateLoad() {
		// Check if enough time has passed since last update
		const currentTime = Date.now();
		if (currentTime - this.lastUpdateTime < this.updateInterval) {
			return;
		}

		// Update the load here. This is just a placeholder.
		this.load = Math.random();

		// Change color based on load
		if (this.load < 0.40) {
			this.mesh.material.color.set(0x00ff00); // Green
		} else if (this.load < 0.80) {
			this.mesh.material.color.set(0xffff00); // Yellow
		} else {
			this.mesh.material.color.set(0xff0000); // Red
		}

		// Update last update time
		this.lastUpdateTime = currentTime;
	}

	/**
	 * Update position of the satellite
	 * @param {Date} date - Date for which the position needs to be updated
	 */
	update(date) {
		// Calculate the satellite's position at the given date
		// Misleading comments, as the "date" is minutes passed since epoch, not and actual date
		const positionAndVelocity = sgp4(this.satrec, date);

		if (positionAndVelocity.error) {
			console.error("Error calculating satellite position:", positionAndVelocity.message);
			return;
		}

		if (positionAndVelocity.position) {
			const positionEci = positionAndVelocity.position;

			// Convert the ECI coordinates to a right-handed Cartesian coordinate system
			const positionVector = new THREE.Vector3(positionEci.x, positionEci.z, -positionEci.y);

			// Update the mesh's position
			this.mesh.position.set(positionVector.x, positionVector.y, positionVector.z);
		}
	}
}