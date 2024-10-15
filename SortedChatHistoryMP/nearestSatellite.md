# Adding a line from the ground location to the neares satellite, works as base for the proper path visualization

**There shouldbe a line going from the ground location to the nearest satellite to visualize a connection. Adding the line should be done with a function, which takes the world space coordinates of 2 objects, and draws a line between them. This is so that it can be used in the future to draw lines between connected satellites.**

To draw a line between two points in three.js (which I assume you're using given the `mesh` property), you can use the `THREE.Line` object. Here's a function that takes two `THREE.Vector3` objects and returns a `THREE.Line` object representing a line between those two points:

```javascript
import * as THREE from 'three';

function createLineBetweenPoints(point1, point2) {
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff }); // Change the color as needed
    const geometry = new THREE.Geometry();
    geometry.vertices.push(point1, point2);
    return new THREE.Line(geometry, material);
}
```

You can use this function in your `updateMarkers` function to create a line from each marker to its closest satellite:

```javascript
function updateMarkers(earth, satellites, markers) {
    markers.forEach(marker => {
        let closestSatellite = null;
        let closestDistance = Infinity;
        satellites.forEach(satellite => {
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            const distance = markerWorldPosition.distanceTo(satellite.mesh.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSatellite = satellite;
            }
        });
        marker.closestSatellite = closestSatellite;
        if (marker.closestSatellite) {
            marker.closestSatellite.mesh.material.color.set(0xff0000); // Set to red
            const line = createLineBetweenPoints(marker.position, marker.closestSatellite.mesh.position);
            scene.add(line); // Add the line to the scene
        }
    });
}
```

This will create a line from each marker to its closest satellite. Note that you'll need to remove the old line from the scene before adding a new one, or you'll end up with multiple lines from each marker.

-----------------------------------

**How do I remove the line once the nearest satellite changes?**

To remove the line when the nearest satellite changes, you can store the line in the marker object and remove it from the scene before creating a new one. Here's how you can modify the `updateMarkers` function to do this:

```javascript
function updateMarkers(earth, satellites, markers) {
    markers.forEach(marker => {
        let closestSatellite = null;
        let closestDistance = Infinity;
        satellites.forEach(satellite => {
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            const distance = markerWorldPosition.distanceTo(satellite.mesh.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSatellite = satellite;
            }
        });

        // If there's a line already, remove it from the scene
        if (marker.line) {
            scene.remove(marker.line);
        }

        marker.closestSatellite = closestSatellite;
        if (marker.closestSatellite) {
            marker.closestSatellite.mesh.material.color.set(0xff0000); // Set to red
            marker.line = createLineBetweenPoints(marker.position, marker.closestSatellite.mesh.position);
            scene.add(marker.line); // Add the line to the scene
        }
    });
}
```

This code will remove the old line from the scene before adding a new one, so you'll only ever have one line from each marker to its closest satellite.

-----------------------------------

**Uncaught TypeError: THREE.Geometry is not a constructor

    createLineBetweenPoints animation.js:21

    updateMarkers animation.js:49**

The error you're seeing is because `THREE.Geometry` has been deprecated since r125 and removed in r128 of three.js. You should use `THREE.BufferGeometry` instead. Here's how you can modify the `createLineBetweenPoints` function to use `THREE.BufferGeometry`:

```javascript
function createLineBetweenPoints(point1, point2) {
    const material = new THREE.LineBasicMaterial({ color: 0x0096FF });
    const points = [];
    points.push(point1, point2);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
}
```

This version of the function should work with the latest version of three.js.

-----------------------------------

**Uncaught ReferenceError: scene is not defined

    updateMarkers animation.js:44

    updateMarkers animation.js:29

    animate animation.js:82**

The error is because `scene` is not defined in the scope of the `updateMarkers` function. You need to pass `scene` as an argument to the `updateMarkers` function. Here's how you can modify the `updateMarkers` and `animate` functions to do this:

```javascript
// Function to update markers
function updateMarkers(earth, satellites, markers, scene) {
    markers.forEach(marker => {
        let closestSatellite = null;
        let closestDistance = Infinity;
        satellites.forEach(satellite => {
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            const distance = markerWorldPosition.distanceTo(satellite.mesh.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSatellite = satellite;
            }
        });

        // If there's a line already, remove it from the scene
        if (marker.line) {
            scene.remove(marker.line);
        }

        marker.closestSatellite = closestSatellite;
        if (marker.closestSatellite) {
            marker.closestSatellite.mesh.material.color.set(0x0096FF); // Set to red
            marker.line = createLineBetweenPoints(marker.position, marker.closestSatellite.mesh.position);
            scene.add(marker.line); // Add the line to the scene
        }
    });
}

// Main animation function
function animate(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerList) {
    if (isPaused) return;

    requestAnimationFrame(() => animate(scene, camera, renderer, controls, earth, earliestEpoch, satellites, markers, updateMarkerList));

    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTime) / 1000; // in seconds
    lastTime = currentTime;

    // Update the simulation time based on the speed
    const speed = speedSlider.value;
    simulationTime += deltaTime * 1000 * speed;

    // Update the date display
    const simulationDate = new Date(simulationTime);
    dateDisplay.textContent = simulationDate.toLocaleString('fi-FI');

    // Rotate the earth
    const rotationSpeed = (2 * Math.PI) / (24 * 60 * 60); // one full rotation every 24 hours
    earth.mesh.rotation.y += rotationSpeed * deltaTime * speed;

    const timeSinceTleEpoch = (simulationTime - earliestEpoch) / 60000; // in seconds

    // Update the satellites and markers
    updateSatellites(satellites, timeSinceTleEpoch);
    updateMarkers(earth, satellites, markers, scene);

    // Update the marker list
    updateMarkerList(markers);
}
```

This version of the code should work without the `scene is not defined` error.

-----------------------------------

**The origin of the line drifts away from the ground station as the earth rotates. The satellite end of the line works properly**

The issue you're experiencing is likely due to the fact that the earth is rotating but the line's origin point (the ground station) is not being updated to reflect this rotation.

To fix this, you need to update the position of the line's origin to the current position of the ground station in the `updateMarkers` function. Here's how you can do it:

```javascript
// Function to update markers
function updateMarkers(earth, satellites, markers, scene) {
    markers.forEach(marker => {
        let closestSatellite = null;
        let closestDistance = Infinity;
        satellites.forEach(satellite => {
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            const distance = markerWorldPosition.distanceTo(satellite.mesh.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSatellite = satellite;
            }
        });

        // If there's a line already, remove it from the scene
        if (marker.line) {
            scene.remove(marker.line);
        }

        marker.closestSatellite = closestSatellite;
        if (marker.closestSatellite) {
            marker.closestSatellite.mesh.material.color.set(0x0096FF); // Set to red
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            marker.line = createLineBetweenPoints(markerWorldPosition, marker.closestSatellite.mesh.position);
            scene.add(marker.line); // Add the line to the scene
        }
    });
}
```

This version of the function updates the position of the line's origin to the current position of the ground station each time it's called. This should keep the line's origin at the ground station even as the earth rotates.

-----------------------------------

**Each satellite should have a load percentage, which would change over time to simulate network traffic going through the satellites. The satellite should change colour based on the load level. Maybe green if under 33% yellow at under 66% and red over that.**

You can add a `load` property to the `Satellite` class and a method to update it. You can then use this `load` property to change the color of the satellite in the `update` method. Here's how you can do it:

```javascript
import * as THREE from "three";
import { sgp4, twoline2satrec } from "satellite.js";

export default class Satellite {
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
        this.mesh.userData.name = name;

        // Initialize load to 0
        this.load = 0;
    }

    updateLoad() {
        // Update the load here. This is just a placeholder.
        this.load = Math.random();

        // Change color based on load
        if (this.load < 0.33) {
            this.mesh.material.color.set(0x00ff00); // Green
        } else if (this.load < 0.66) {
            this.mesh.material.color.set(0xffff00); // Yellow
        } else {
            this.mesh.material.color.set(0xff0000); // Red
        }
    }

    update(date) {
        // Calculate the satellite's position at the given date
        const positionAndVelocity = sgp4(this.satrec, date);

        if (positionAndVelocity.error) {
            console.error("Error calculating satellite position:", positionAndVelocity.message);
            return;
        }

        // Update load and color
        this.updateLoad();
    }
}
```

This version of the `Satellite` class includes a `load` property and an `updateLoad` method that updates the `load` and changes the color of the satellite based on the `load`. The `updateLoad` method is called in the `update` method. You'll need to replace the `Math.random()` in the `updateLoad` method with your own logic to update the load.

-----------------------------------

**The colors are not changing, probably because of this**

Yes, you're correct. The color of the satellites is being set to white every time `updateSatellites` is called, which is overriding the color set in the `updateLoad` method.

To fix this, you should remove the line `satellite.mesh.material.color.set(0xffffff);` from the `updateSatellites` function. Here's how the updated function should look:

```javascript
// Function to update satellites
function updateSatellites(satellites, timeSinceTleEpoch) {
    satellites.forEach((satellite) => {
        satellite.update(timeSinceTleEpoch);
    });
}
```

Now, the color of the satellites should change based on their load as defined in the `updateLoad` method of the `Satellite` class.

-----------------------------------

**The colors are changing too fast. How can I slow it down a bit. Maybe once every second or 10 seconds.**

You can add a timer to the `Satellite` class to control how often the load and color are updated. Here's how you can do it:

```javascript
import * as THREE from "three";
import { sgp4, twoline2satrec } from "satellite.js";

export default class Satellite {
    constructor(tle1, tle2, name) {
        // ... rest of the constructor ...

        // Initialize load to 0
        this.load = 0;

        // Initialize last update time to current time
        this.lastUpdateTime = Date.now();

        // Set update interval to 10 seconds
        this.updateInterval = 10 * 1000; // in milliseconds
    }

    updateLoad() {
        // Check if enough time has passed since last update
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime < this.updateInterval) {
            return;
        }

        // Update the load here. This is just a placeholder.
        this.load = Math.random();

        // Change color based on load
        if (this.load < 0.33) {
            this.mesh.material.color.set(0x00ff00); // Green
        } else if (this.load < 0.66) {
            this.mesh.material.color.set(0xffff00); // Yellow
        } else {
            this.mesh.material.color.set(0xff0000); // Red
        }

        // Update last update time
        this.lastUpdateTime = currentTime;
    }

    // ... rest of the class ...
}
```

This version of the `Satellite` class includes a `lastUpdateTime` property and an `updateInterval` property. The `updateLoad` method now checks if enough time has passed since the last update before updating the load and changing the color. This should slow down the rate at which the colors change.

-----------------------------------

**The nearest one stays blue after the line disconnects until the load updates. It should change immediately after it is not the nearest.**

The color of the satellite is not being reset when it's no longer the closest to a marker. You can fix this by resetting the color of the `closestSatellite` before setting a new one. Here's how you can modify the `updateMarkers` function to do this:

```javascript
// Function to update markers
function updateMarkers(earth, satellites, markers, scene) {
    markers.forEach(marker => {
        // If there's a line already, remove it from the scene and reset the color of the closest satellite
        if (marker.line) {
            scene.remove(marker.line);
            if (marker.closestSatellite) {
                marker.closestSatellite.mesh.material.color.set(0xffffff); // Reset color
            }
        }

        let closestSatellite = null;
        let closestDistance = Infinity;
        satellites.forEach(satellite => {
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            const distance = markerWorldPosition.distanceTo(satellite.mesh.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSatellite = satellite;
            }
        });

        marker.closestSatellite = closestSatellite;
        if (marker.closestSatellite) {
            marker.closestSatellite.mesh.material.color.set(0x0096FF); // Set to blue
            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            marker.line = createLineBetweenPoints(markerWorldPosition, marker.closestSatellite.mesh.position);
            scene.add(marker.line); // Add the line to the scene
        }
    });
}
```

This version of the function resets the color of the `closestSatellite` to white before setting a new `closestSatellite`. This should make the satellite change color immediately after it's no longer the closest to a marker.

-----------------------------------

**It should be randomized to be yeloow green or red**

To randomize the color of the satellite when it's no longer the closest to a marker, you can create a helper function that returns a random color from the set {green, yellow, red}. Then, use this function to set the color of the satellite. Here's how you can do it:

```javascript
// Function to get a random color
function getRandomColor() {
    const colors = [0x00ff00, 0xffff00, 0xff0000]; // Green, Yellow, Red
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Function to update markers
function updateMarkers(earth, satellites, markers, scene) {
    markers.forEach(marker => {
        // If there's a line already, remove it from the scene and reset the color of the closest satellite
        if (marker.line) {
            scene.remove(marker.line);
            if (marker.closestSatellite) {
                marker.closestSatellite.mesh.material.color.set(getRandomColor()); // Set to a random color
            }
        }

        // ... rest of the function ...
    });
}
```

This version of the `updateMarkers` function uses the `getRandomColor` function to set the color of the satellite to a random color from the set {green, yellow, red} when it's no longer the closest to a marker.

-----------------------------------

**It should check the load value, not the color. I worded the previous one incorrectly.**

No problem, you can modify the `updateMarkers` function to check the `load` property of the satellite instead of its color. Here's how you can do it:

```javascript
// Function to update markers
function updateMarkers(earth, satellites, markers, scene) {
    markers.forEach(marker => {
        // ... existing code ...

        let closestSatellite = null;
        let closestDistance = Infinity;
        satellites.forEach(satellite => {
            // Check if the satellite load is less than 0.66 (not red)
            if (satellite.load >= 0.66) {
                return; // Skip this satellite
            }

            const markerWorldPosition = marker.position.clone();
            earth.mesh.localToWorld(markerWorldPosition); // Convert to world coordinates
            const distance = markerWorldPosition.distanceTo(satellite.mesh.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSatellite = satellite;
            }
        });

        // ... rest of the function ...
    });
}
```

This version of the `updateMarkers` function includes a condition to check if the satellite's load is less than 0.66. If it's not, the function returns early, skipping that satellite. This ensures that the ground marker only connects to satellites that are not red (i.e., their load is less than 0.66).

-----------------------------------

**I will revert back to the state where it still worked. The lines should be removed when removeMarkers is called.**

To remove the lines when `removeMarkers` is called, you need to iterate over the `markers` array and remove the line from each marker's `closestSatellite` if it exists. Here's how you can modify the `removeMarkers` function to do this:

```javascript
function removeMarkers() {
    // Remove all markers and their lines from the Earth
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].closestSatellite && markers[i].closestSatellite.line) {
            scene.remove(markers[i].closestSatellite.line);
            markers[i].closestSatellite.line = null;
        }
        earth.mesh.remove(markers[i]);
    }

    // Clear the markers array
    markers.length = 0;

    // Update the marker list
    updateMarkerList(markers);
}
```

In this version of the `removeMarkers` function, before removing each marker from the Earth, it checks if the marker's `closestSatellite` has a line. If it does, it removes the line from the scene and sets the `line` property to `null`. This ensures that all lines are removed when `removeMarkers` is called.

-----------------------------------

**The problem was here**

I see, the code you've provided is the `removeMarkers` function. If the lines are not being removed as expected, it might be because the `line` object is not being correctly accessed or removed from the scene.

Let's modify the `removeMarkers` function to ensure the lines are being correctly removed:

```javascript
function removeMarkers() {
    // Remove all markers and their lines from the Earth
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].closestSatellite && markers[i].closestSatellite.line) {
            // Remove the line from the scene
            scene.remove(markers[i].closestSatellite.line);
            // Dispose of the line geometry and material to free up resources
            markers[i].closestSatellite.line.geometry.dispose();
            markers[i].closestSatellite.line.material.dispose();
            // Set the line and closestSatellite to null
            markers[i].closestSatellite.line = null;
            markers[i].closestSatellite = null;
        }
        // Remove the marker from the Earth
        earth.mesh.remove(markers[i]);
    }

    // Clear the markers array
    markers.length = 0;

    // Update the marker list
    updateMarkerList(markers);
}
```

In this version of the `removeMarkers` function, we're also disposing of the line's geometry and material after removing it from the scene. This is a good practice to follow in Three.js to ensure that resources are freed up when they're no longer needed.

-----------------------------------

**The line is still not remove when removing all markers. This is where the lines are added.**

The issue might be due to the fact that the line is being added to the `marker` object, but being removed from the `closestSatellite` object.

To fix this, you should remove the line from the `marker` object in the `removeMarkers` function:

```javascript
function removeMarkers() {
    // Remove all markers and their lines from the Earth
    for (let i = 0; i < markers.length; i++) {
        if (markers[i].line) {
            scene.remove(markers[i].line);
            markers[i].line = null; // Remove the line from the marker
        }
        earth.mesh.remove(markers[i]);
    }

    // Clear the markers array
    markers.length = 0;

    // Update the marker list
    updateMarkerList(markers);
}
```

In this version of the `removeMarkers` function, `markers[i].line = null;` is added to remove the line from the marker. This should ensure that all lines are removed when `removeMarkers` is called.

-----------------------------------

**Now there is just the prolem of the line being left behind if the markers are not removed, but new ones are set. There can only be 2 markers, so maybe the line should be removed here.**

Yes, you're correct. If you're only allowing two markers at a time, you should remove the line from the oldest marker when a new one is added. Here's how you can modify your code to do this:

```javascript
// If there are more than 2 markers, remove the oldest one
if (markers.length > 2) {
    const removedMarker = markers.shift();
    earth.mesh.remove(removedMarker);

    // If the removed marker has a line, remove it from the scene
    if (removedMarker.line) {
        scene.remove(removedMarker.line);
        removedMarker.line = null;
    }

    // Also remove the corresponding list item
    markers.removeChild(markers.firstChild);
}
```

In this version of the code, before removing the oldest marker, it checks if the marker has a line. If it does, it removes the line from the scene and sets the `line` property to `null`. This should ensure that the line is removed when a new marker is added and there are already two markers.

-----------------------------------
