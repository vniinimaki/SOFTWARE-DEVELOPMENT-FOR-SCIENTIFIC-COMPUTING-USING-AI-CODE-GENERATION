import * as THREE from "three";

/**
 * Creates a ground marker at a given position.
 * @param {THREE.Vector3} position - The position where the ground marker should be created.
 * @returns {THREE.Mesh} - The created ground marker.
 */
export function createGroundMarker(position) {
    // Define the size and shape of the marker
    const markerRadius = 16; // Adjust as needed
    const markerWidthSegments = 16;
    const markerHeightSegments = 16;
    const markerGeometry = new THREE.SphereGeometry(markerRadius, markerWidthSegments, markerHeightSegments);

    // Define the material (color, texture) of the marker
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Black color

    // Create the marker mesh with the defined geometry and material
    const groundMarker = new THREE.Mesh(markerGeometry, markerMaterial);

    // Set the position of the marker
    groundMarker.position.copy(position);

    // Calculate the spherical coordinates of the marker
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(position);

    // Store the spherical coordinates in a `coordinates` property
    groundMarker.coordinates = {
        // Convert the spherical coordinates to latitude and longitude in degrees
        latitude: THREE.MathUtils.radToDeg(Math.PI / 2 - spherical.phi),
        longitude: THREE.MathUtils.radToDeg((spherical.theta - Math.PI / 2) % (2 * Math.PI))
    };

    // Store the Cartesian coordinates in a `xyz` property
    groundMarker.xyz = {
        x: position.x,
        y: position.y,
        z: position.z
    };

    // Create a mesh object to store the position
    groundMarker.mesh = new THREE.Object3D();
    groundMarker.mesh.position.copy(position);
    
    return groundMarker;
}