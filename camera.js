import * as THREE from "three";

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        10,
        1000000
    );
    camera.position.z = 15000;
    return camera;
}