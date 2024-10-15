import * as THREE from "three";

export class Earth {
	constructor() {
		// Load texture
		const textureLoader = new THREE.TextureLoader();
		this.earthTexture = textureLoader.load("/earthTextureSmaller.png");

		// Create a sphere (Earth)
		const earthGeometry = new THREE.SphereGeometry(6371, 128, 96);
		const earthMaterial = new THREE.MeshBasicMaterial({
			map: this.earthTexture,
		});

		this.mesh = new THREE.Mesh(earthGeometry, earthMaterial);
	}
}
