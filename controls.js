import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // optional, for smoother rotation
    return controls;
}