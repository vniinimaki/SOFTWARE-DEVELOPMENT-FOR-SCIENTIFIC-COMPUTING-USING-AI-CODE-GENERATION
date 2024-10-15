# Prompts used

## More accurate log of chat in chat.json.md

27.02.2024

Prompt: I have two files, index.html and main.js. I want to make an accurate simulation of satellites in low earth orbit using three.js.
Start by making an accurate model of earth in terms of size, rotation speed, and inclination.

Copilot: Only gave a partially ready answer, nothing for the html file. It also assumed I have a texture for the earth. I should have worded the prompt differently as in saying that copilot should do it.

Prompt: Make the rotation speed realistic.

Copilot: Said that realistic rotation speed for a simulation is too slow, lets represent hours as seconds, so 1 rotation / 24 seconds

Prompt: I want it to be realistic, add a slider to adjust the speed of the simulation, where the default value is real time, and the maximum is 10x the speed.

Result: Currently there is a slider on the page, but no earth visible.

Prompt: On the website, I can only see the slider, no earth.

Copilot: Make sure there are no errors on the web page, found this Uncaught SyntaxError: import declarations may only appear at top level of a module.

Prompt: Uncaught SyntaxError: import declarations may only appear at top level of a module
Result: Now the earth is visible, but still 24 s/ per rotation

Prompt: The rotation is still once every 24 seconds, how do I change it to be once every 24 hours
Copilot: fixed the problem

Prompt: What type of texture should I get to use for the earth?
Copilot: Described the type of image to use, and provided a link to NASA website, where I found a good image.
Result: The texture looks good, but the earth spins very fast, there is an error in the rotation speed calculation.

Prompt: Okay I now have the texture on the earth, but it spins very fast
Copilot: Did not offer any changes, seems it doesn’t quite understand the problem.

Prompt: The slider is at 1, and it still goes even faster than one rotation / 24 seconds. It might be doing 24 rotations / second. I think there is an error on the speed calculation.
Copilot: Now it corrected the calculations, and the earth seems to spin like it should

Prompt: Is there a way to make the earth higher resolution? It looks pixelated on the edges.
Copilot: provided a good solution, increase the segments of the sphere

Prompt: Is it possible to apply anti-aliasing on the earth?
Copilot: Correct answer

Prompt: I want to be able to use the mouse to rotate the view by clicking and dragging, and zoom in and out with the scroll wheel.
Copilot: Provided the correct tools for this, but the code output was not completely clear, as in where the lines should be added. Result was still what I wanted, where the view can be rotated with the mouse.

Prompt: What should the max be on the slider, if I want the fastest simulation speed to be 1 rotation / 24 seconds
Copilot: correct solution

Prompt: I want the UI to be better. Put the slider at the bottom centre of the screen. Under the slider should be a button to pause and play the simulation.
Copilot: Made the change, but there is a problem

Prompt: The animation window takes up the whole screen, so the controls are hidden. I can't scroll down, because that only zooms the animation. The controls are only visible in full screen mode.
Copilot: Changed the CSS, and now the controls are visible. Controls don’t work as expected.

Prompt: Now they are visible. The simulation stops when pause is pressed, but it does not resume after pressing play.
Copilot: Fixed the problem, another was introduced.

Prompt: Now the play button works, but the animation jumps forward after the pause to the point where it would be without pausing.
Copilot: Answer unclear

Prompt: I provided the code to it
Copilot: Declared that to be the correct code, which should not experience the jumps in the animation, which is not true.

Result: after clarifying that it is the incorrect code, it provided an incorrect answer, and then after one more try, the code was correct. Right now, I have spent 1 hour on this, and I have a simulation of earth spinning with a proper texture, there are controls for changing the simulation speed and pausing the simulation. The UI is very basic, it should be improved with more CSS to make it prettier.

New problem:

Prompt: When the animation is paused, I can't rotate the earth with the mouse nor zoom in. The change happens after the animation is resumed.
Copilot: Provided an almost correct solution, needed one more round of correction, then it worked as expected.

Result: Currently I have the animation I wanted, but it’s all in the same file, which is bad.

Prompt: The main.js is quite messy. I would like to split parts of this to different files. I plan to add satellites to the simulation in the future.
Copilot: Split the code into sensible parts, but it stopped working.

Prompt: Does not work x4
Copilot: Provided working code for each module. However, the animation does not start when the page is loaded, and when it starts the performance is awful.

Prompt: Now the simulation is not running when the page is opened and after clicking pause and then play the simulation starts, but the performance is terrible. The performance was fine before.
Copilot: Identified the cause of the performance issue, said to have fixed it, but the code was still the same.

Prompt: point out that nothing changed
Copilot: new code, fixed the performance, new problem

Prompt: “Uncaught ReferenceError: lastTime is not defined | animate animation.js:15”
Copilot: Fixed that problem, new introduced

Prompt: Now the animation works, and the pause button works. But when pressing play: “Uncaught ReferenceError: scene is not defined animation.js:10 EventListener.handleEvent* animation.js:5”.
Copilot: fixed this issue as well, but new problem

Prompt: Now the page is empty when loaded, but when I press pause and then play, the animation appears and works properly.
Copilot: Now it works, but an old issue was re-introduced.

Prompt: The mouse controls don't work when the animation is paused.

Result: 1 hour 45 minutes and ~35 prompts. I now have an interactable animation of the earth with the ability to pause the animation, speed up the animation and control the view using the mouse. The earth’s size might need to be changed to make it more realistic once the satellites are added. Overall, a lot of back on forth, with basically every fix of a problem introducing another problem. Copilot-plugin for VS Code is very useful, because it can read the structure of the workspace, which means it can try to figure out the relationships between different files.

28.02.2024

Prompt: The goal of this project is to simulate 1000s of LEO satellites, and their communications with each other. For example simulate the starlink satellites. I want to have a button to add satellites. The satellite should have a name and a specific orbiting altitude above the earths surface. The satellite should be represented as a sphere and its orbit should be drawn as a line. How do I implement this?

Copilot: Code that seems sensible, but not specified where to add this code. Mentioned that orbital mechanics could be used to increase the realism of the simulation. I will first try to implement basic satellites and then try to add proper orbital mechanics.

Prompt: I created a file called satellite.js and put the class inside that. Where should I define the function to add the satellite and the array of them?

Copilot: Seems to have "forgotten" the content of my files. If it could constantly have read access to the files, it would be a very powerful tool.

Prompt: This is the animation.js. (I used the plugins feature to select code and use that as a reference) Should I put the add satellite here or keep it in main. Or maybe have it in the satellite.js file?

Copilot: Kind of an ambiguos answer, with a few options telling me to do what I want.

Prompt: This is going to be very complex program so I'm going to make a separate file for managing the satellites.

Copilot: Gave the code for the new file and instructions on how to import the functions. It already forgot that the animation is handeld in animation.js.

Prompt: The animation handled in the animation.js file

Copilot: Now it showed where to put the lines of code, but also a modification to do on a function in that updates the satellites position, but didn't tell me what to do exactly. I need to change the way that I type the prompts as currently I'm asking for guidance, not for it to make the code.

Prompt: This is the function. Do the changes that you suggested.

Copilot: code

Prompt: From browser: Uncaught SyntaxError: import not found: default at satellites.js 1:8

Copilot: instructions how to fix it

Prompt: Uncaught ReferenceError: button is not defined at main.js:21

Copilot: instructions how to fix

Prompt: Uncaught ReferenceError: THREE is not defined createSphere satellite.js:10 Satellite satellite.js:5 addSatellite satellites.js:8 main.js:26 EventListener.handleEvent* main.js:23

Copilot: add the missing import

Prompt: Uncaught TypeError: geometry.vertices is undefined
    createOrbit satellite.js:19
    Satellite satellite.js:8
    addSatellite satellites.js:8
    \<anonymous> main.js:26
    EventListener.handleEvent* main.js:23

Copilot: suggested change

Prompt: I implemented the changes but I still get: Uncaught TypeError: geometry.vertices is undefined
    createOrbit satellite.js:19
    Satellite satellite.js:8
    addSatellite satellites.js:8
    \<anonymous> main.js:26
    EventListener.handleEvent* main.js:23

Copilot: Another fix, error is gone, but the satellites don't show up.

Prompt: The satellites are not visible after adding. Is it possible that they are inside the earth? (with reference to the earth.js)

Copilot: Gave a fix, but I decided to ask for a more accurate way to do it. Also suggested next prompt: How can I create a realistic starry background in my Three.js scene? I deciced to do this before trying to fix the rotation. (mistake)

Prompt: How can I create a realistic starry background in my Three.js scene?

Copilot: Provided code, but not specified where the code should be added. This is a common problem I'm facing.

Prompt: Where do I add this?

Copilot: Should be added to the main file

Prompt: Modify the main.js file

Copilot: Modified the main.js

Result: Supriringly good, worked on the first try. Some of the "stars" are a bit too close.

Prompt: Some of the stars are too close and appear as big white squares. I only want to have distant stars that apper as dots. Make the necessary changes on the main.js.

Result: No more large squares, but

Prompt: There is a weird effect where there are less stars on the edges of the screen. Also the stars apper and disapper randomly when the camera is rotated. Make the changes on the main.js file.

Result: Still a bit weird but good enough.

Prompt: I want this to be realistic, so the altitude should be in meters above the earth's surface. Should I change the radius of the earth to be what it is in real life?

Copilot: Told me to use a scaling factor of 1/1000, so the satellites are not so much smaller than earth

Prompt: Change to altitude here to be correct (referencing the main.js file, where addSatellite is called, and the altitude is set)

Copilot: Instructions how to change it.

Prompt: Uncaught TypeError: earth.rotation is undefined animate animation.js:52 animate animation.js:35 animate animation.js:34

Copilot: Provided a solution

Prompt: Make the necessary changes here: (refrence the animation.js file)

Copilot: Wrote out the entire file, with the changes.

Prompt: THREE.Object3D.add: object not an instance of THREE.Object3D.
Object { earthTexture: {…}, mesh: {…} }
three.module.js:7494:11
    add three.module.js:7494
    \<anonymous> main.js:14

Copilot: provided a fix

Result: The page now works and the simulation runs, but when adding satellites a circle representing its orbit appears, which spins like a coin wouls spin on its edge around.

Prompt: When a satellite is added the orbit is added as expected. But the orbit spins around itself, like a coin would spin on its edge. I also don't see the satellite. The orbits should also be at different inclinations, now all of they go around the poles. Make the changes to the satellites.js. (referenced satellites.js)

Copilot: Fixed the issue of the orbits spinnning, but satellites are not visible.

Prompt: Now the orbits don't spin themselves and different inclinations are used. But the satellites are still not visible. You also mentioned earlier that the position of the satellites could be calculated using actual orbital mechanics. Implement the changes.

Copilot: Satellites position is now calculated using Kepler's laws. The satellites are still not visible though.

Prompt: Okay the satellites are still not visible. Could they be too small to see? Also the orbits are quite blocky. Here is the satellite class. (referenced satellite.js)

Copilot: Now it gave me the whole modified file instead of just the parts I need to change without explicitly asking. Still no satellites.

Prompt: The lines look good now. I changed the size of the satellites to 1, but I still can't see them. Could they still be inside the earth?

Copilot: More changes to the updateSatellites function

Prompt: The scale was missing from this file so I added it. Now I can see the satellites, but they appear some distance away from the orbits, all of them at the same location slightly different distances away from earth, and they just vibrate in place there.

Prompt: Now the satellites don't vibrate anymore. But they are added again varying distances away from earth. All of them go on the same plane. They don't seem to follow the inclinations of the orbits. They form a half circle from equator, over the north pole to the other side of the planet, stopping at equator again. They also appear stationary. Maybe the position calculation does not account for the changes in simulation speed.

Prompt: Exact same behavior except the half circle is at the equatorial plane.

Prompt: Now the satellites form a line away from earth at a point on the equator. Increasing the simulation speed using the slider makes the satellite move along its orbit a small distance and then vibrate in that place back and forth following its orbit. The satellites are not on the orbital rings, but some distance away form it. If this approach does not work, would it be simpler to first make the satellite orbit the earth correctly and then draw the orbit?

Result: Finally some progress, now the satellites orbit the earth, but

Prompt: Now the satellites orbit the earth, but they are further away than the orbits. The orbits spin around the earth again like coins spin on their edges.

Prompt: Now when I click the button to add the satellite, one occasionally flashes on the screen and then disappears. The orbit does not flash on the screen only the satellite.

Copilot: Modified the addSatellite function, and overrode the Satellite class, by adding a bunch of parameters to the satellite, which did not exist in the class. This introduces some problems.

Prompt: This is the satellite class (referencing satellite.js), it seems to need some modifications. Also the addSatellite function is called from main.js so I don't know how the raan and other parameters you added can be accessed there.

Copilot: added the parameters to the class.

Prompt: The satellites.js needs some changes as well. Currently the imported Satellite class is not used at all.

Copilot: Modified the satellites.js as well.

Prompt: Modify this as well (referencing main.js)

Copilot: modified the file

Prompt: Uncaught ReferenceError: scene is not defined
    addSatellite satellites.js:15
    \<anonymous> main.js:46
    EventListener.handleEvent* main.js:40

Copilot: Fixed this by adding scene as argument

Prompt: Now the orbits spin like coins, and this time the satellites orbit the earth at its surface. I can't tell if the satellites follow the initial orbit, before the circles start spinning.

Prompt: Same behavior as before. Satellite orbits at the surface and the circle spins

Copilot: "The issue seems to be more complex than initially thought." Provided a simplified version. A suggested prompt: How can I accurately simulate the orbits of satellites in Three.js, taking into account the eccentricity and true anomaly?

Prompt: How can I accurately simulate the orbits of satellites in Three.js, taking into account the eccentricity and true anomaly?

Copilot: gave a very detailed answer and complex code with a lot of math. It also suggested that SGP4 model should be used for maximum accuracy. This is what the Github reposotory we use as a baseline uses.

Prompt: Implementing this would mean quite a bit more changes are needed to the other files. Can the sgp 4 be implemented with this library? What changes do I need to make to the other files?

Copilot: SGP4 model is included in a js library called satellite.js. I will try to use that. It also requires the use of TLE data, which can be acuired online. This was also used in the baseline example repository. Suggested prompt:

Prompt: How can I visualize the satellite orbits in Three.js using the SGP4 model and TLE data?

Copilot: New satellite class which implements this funcitonality

Prompt: What other changes do I need to make to be able to animate the satellites using the SGP4 and TLE data? I downloaded noaa tle data as a text file.

Copilot: Gave a generic solution, it has forgotten again how the project is structured.

Prompt: /@workspace These are the different files I have. I will provide the code for each of them one by one and you will make the necessary modifications.

Copilot: Asked for the first file

Prompt x4: main.js (referencing it) and each of the files individually.

Prompt: Uncaught (in promise) TypeError: THREE.Geometry is not a constructor
    Satellite satellite.js:13
    \<anonymous> main.js:53
    promise callback* main.js:44

Copilot: Changes to the Satellite class, it was trying to use a thing that was removed from three.js

Prompt: Does this now look correct? (referencing the Satellite class)

Copilot: corrected some issues

Prompt: Uncaught SyntaxError: import not found: eciToEcef

Copilot: function was not directly available provided alternative approach.

Prompt: Uncaught (in promise) TypeError: THREE.SphereBufferGeometry is not a constructor
    Satellite satellite.js:12
    \<anonymous> main.js:53
    promise callback* main.js:44

    VSCode warned about this, but I didn't change it

Copilot: Stubbornly says that SphereBufferGeometry is a valid constructor. I didn't find this from the current documentation, so I run into the trainging cutoff date problem. Few more prompts arguing about this.

Prompt: Okay is the sphere used to model a single satellite? If yes that can be a square as well.

Copilot: Another not anymore existing solution

Prompt: Once again boxbuffer does not exist anymore. I will use just BufferGeometry, which will generate a square.

Copilot: Finally agreed that the version is different. Provided a general solution.

Prompt: Change it here (referencing the code)

Prompt: Uncaught (in promise) ReferenceError: eciToGeodetic is not defined
    generateOrbit satellite.js:85
    \<anonymous> main.js:60
    promise callback* main.js:44

Copilot: eciToGeodetic is a custom function, but it does not exist anywhere.

Prompt: I have not defined that anywhere. You generated the code which wants to use it.

Copilot: Provided the general solution

Prompt: Change it here (reference the file)

Copilot: made the changes

Prompt: Uncaught (in promise) TypeError: eci is undefined
    eciToGeodetic satellite.es.js:2917
    generateOrbit satellite.js:89
    \<anonymous> main.js:60
    promise callback* main.js:44

Prompt: Uncaught (in promise) TypeError: this.orhis is undefined
    generateOrbit satellite.js:119
    \<anonymous> main.js:60
    promise callback* main.js:44

Result: No more errors, but the satellites are not visible. I will get back on this later. Time spent in total 5 hours and 15-ish minutes and ~80 prompts. We are in the correct track now as it is using the accurate models and real data for the satellites. Main weakness of LLMs is that they can't see all the code when it is split into different files.

29.2.2024

Prompt: I don't see any satellites, am I supposed to?

Copilot: Several possible reasons why they are not visible. "Without seeing the full code I can't say for sure" It forgot the code again.

Prompt: (reference the satellite class)

Copilot: explained what the class does, and then why it does not visualize the orbits. Suggested prompt:

Prompt: How can I visualize the orbit of a satellite using the Satellite class and Three.js?

Copilot: Code to implement that, unclear again where to put some lines

Prompt: Uncaught (in promise) TypeError: THREE.Geometry is not a constructor
    generateOrbit satellite.js:81
    \<anonymous> main.js:60
    promise callback* main.js:44

Prompt: Uncaught (in promise) ReferenceError: geodeticToEcef is not defined
    generateOrbit satellite.js:96
    \<anonymous> main.js:60
    promise callback* main.js:44

Copilot: Fixes to these, errors disappeared but no satellites

Prompt: This the TLE data I'm using, is it correct? (reference the data file)

Copilot: data is formatted correctly

Prompt: Okay the satellites are still not visible. I will show the code of all the relevant files. Here is the main.js.

Copilot: After showing the Satellite class: Satellite could be too small.

Prompt: How do I change the size of hte satellites to be bigger?

Copilot: Provided the wrong code, even though I just showed it the current code.

Prompt: That is not what the code looks like right now. This is the code currently.

Copilot: changed some values to be bigger, made no difference.

Prompt: This is the animation.js. Is there something wrong? (reference animation.js)

Copilot: Seems to be correct, but without seeing the rest of the code it's hard to say. I might be running out of context length with copilot.

Prompt: This is the update function that is being called from the animation.js

Copilot: Code looks correct, here are some reasons why it might not work. Suggested prompt:

Prompt: How can I ensure that the satellite's position is being calculated correctly using the sgp4 function?

Copilot: add console.log

Prompt: There is nothing printed to the console.

Copilot: More log

Prompt: This is the animation.js. I added a console.log to the animate function and that is being called. Does the simulation date need to match the date of the TLE data, as in it can't show them if the current time is "in the future"?

Copilot: Finally got something useful, the sgp4 uses minutespastepoch instead of normal date, which it is now getting.

Prompt: How do I get the epoch of the data?

Copilot: Epoch is included in the data here is how to extract it.

Prompt: Should i get it here and then pass it to the startAnimation (reference main.js where the TLE data is loaded)

Copilot: Add this to main.js

Prompt: Make the necessary changes here to use the epoch (reference animation.js)

Copilot: Did the changes

Prompt: Uncaught (in promise) ReferenceError: getTleEpoch is not defined main.js:64 promise callback* main.js:44

Copilot: add this function to main.js

Prompt: I still can't see the satellites. Is it possible that they are inside the earth? (reference earth.js)

Copilot: add this to satellite class, unclear where

Prompt: Make the necessary changes here (reference Satellite class)

Copilot: Did some changes but nothing. Here I changed the data used from noaa to starlink and now there is something in the scene.

Prompt: I changed the TLE data to this and now there are what I assume to be the orbits, but they are spikes that come out of the earth.

Copilot: Need to make changes

Prompt: Is this correct? (reference the update function withour changes)

Copilot: Says that it looks correct. I'm going to try chatgpt for this.

Prompt: (to chatgpt) I'm trying to do a LEO satellite simulation using three.js and satellite.js. I'm using TLE data of the starlink satellites, and on the simulation I only get spikes that come out of the earth. I think these are the satellite orbits, but they are wrong for some reason. I will show the code to you in parts.

Prompt: main.js

ChatGPT: okay lets see the Satellite class.

Prompt: Satellite class

ChatGPT: Some possible fault points, basically the same as Copilot.

Prompt: The orbits are supposed to be circles that go around the earth. Now they are going through the earth. The "spikes" are 2 lines that form a triangle with the 2 lines and the earths surface. The orbits could be in a () shape going through the earth but it is hard to tell. I tried to use only a small amount of the satellites from the TLE data, but then nothing is drawn.

ChatGPT: more possible fault points, maybe I should just say to fix the code.

Prompt: (Copilot) I think there could be some simplifications. eciToEcf could be used without converting to geodetic coordinates. I have imported eciToEcf, make the necessary changes to use it.

Copilot: yes here is the changed code

Prompt: I changed the size variable to 10, and then the satellite appeared as a massive red square a long way from the earth. Then I changed it to 5 and the satellite was clipping into the earth. So the position is affected by the size of the satellite. When the size variable is set to 6.371 the satellite is very large and it is touching the planets surface.

Copilot: The size should not affect the position

Prompt: Change this code so that it is correct. Could the scale multiplication be the reason it is affected by the size? (refrenceing satellite)

Copilot: Made some changes, which did nothing.

Prompt: I think you missed my point. When the satellite size is set to 0.01 or 1 it is positioned inside the earth. When the size is increased to 4, the corners of the square are visible through the earth. And as size increases it gets further away from the center of the earth. This should not happen.

Copilot: Changed the code so the satellites position is static

Prompt: Yes now the satellite does not change position when the size is changed. But the satellite is positioned at the center of the earth, which is incorrect. It should be positioned on its orbit.

Copilot: Did not fix the issue

Prompt: This is the data I'm using. The updated code still has the satellite at the center (refrenceing the test TLE data)

Copilot: no fix

Prompt: Nothing changed. Should I stop using scaling and just use the real size for the earth and then make the satellite bigger so that it is visible?

Copilot: Yes the scale can be changed.

Prompt: The satellite is still positioned at the center of the earth. When it is created, the position is set to 0,0,0 based on the FloatArray. This is evidently using the global coordinate system. In the update function, should the position have the earth radius added to it rather than being multiplied by it, because 0 * anything is still 0.

Copilot: Yes that makes sense. The satellite is still in the center.

Prompt: Its still in the center. Could the problem be somewhere else? Does the TLE data provide a location for the satellite that could be used as the starting position?

Copilot: explained how the TLE data works, and added some console.logs

Prompt: None of those are printed. I think I found the problem. In the animate function in this part, the Updating satellites is never printed. The log above it prints this: Child:
Object { isObject3D: true, uuid: "8d486fc7-e947-43af-a341-8945877dc697", name: "", type: "Mesh", parent: {…}, children: [], up: {…}, position: {…}, rotation: {…}, quaternion: {…}, … } alternating between type: mesh and line.

Copilot: Finally the problem was solved, the update method was not being called. Now the satellites are orbiting the earth.

Prompt: Okay now I have the satellites doing orbits. However they seem to be going way too fast and be too far away. I'm using the TLE data for starlink satellites, and they should have and orbital period of 95 minutes and they should be at about 500 km above the surface. Right now they orbit around the earth in some seconds, and the distance to the surface seems to be about the earths radius.

Copilot: something about using the scale, does not work.

Prompt: I have now removed all the scalings, but the satellites are still too far away and they move too fast.

Copilot: simulation time might be wrong.

Prompt: here is the animation.js, is it correct?

Copilot: The time might be wrong

Prompt: The default value for speed is 1 and that should correspond to one real second to be one simulation second. The simulations current time is on the screen and at speed value 1, one real time seconds is one simulation second.

Copilot: nothing useful, repeated existing code

Prompt: Is delta time converted to seconds and then back to milliseconds? Could this be the issue?

Copilot: No this is correct. Looks correct to me as well.

Prompt: Here is the update method (reference update)

Copilot: Found a problem did some changes

Prompt: I can't see the satellites anymore

Copilot: suggested that I change the size of them, even though the changes it just did made them disappear

Prompt: The satellites were visible before the changes to the update function

Copilot: nothing useful

Prompt: The scale is 1 so that does not matter. Also this is the original update method. With this the satellites are visible, but too far away from the earth. Could the problem be some where else?

Copilot: Remove the addition of earths radius

Prompt: Yes now the distance seems correct. Now it's only the speed that seems to be wrong.

Copilot: repeated exiting code

Prompt: This is the animation.js where that is done, but it looks correct to me

Copilot: divide the speed by 10, not correct

Prompt: But the default value for it is 1, which should correspond to real time

Copilot: some changes to the way time is calculated, no effect

Prompt: This function extracts the TLE epoch (refrence the function)

Copilot: yes it does that

Prompt: So this should give the correct epoch to use in the calculations? (refrence animations.js)

Copilot: Yes it is correct, check the update method

Prompt: Here is the update method

Copilot: yes looks correct, check the date parameter and other things for correctness

Prompt: The date parameter is this value here: const timeSinceTleEpoch = (simulationTime - earliestEpoch) / 60000; // in seconds

Copilot: Yes that is correct. check if sgp4 is implemetned correctly and maybe use a different method to update

Prompt: Is the sgp4 implemented correctly?

Copilot: its in the satellit.js so yes should be

Prompt: How do I do the interpolation of the positions you mentioned earlier?

Copilot: Made changes to the code

Prompt: Uncaught ReferenceError: deltaTime is not defined
    update satellite.js:74
    animate animation.js:58

Copilot: Two solutions, error disappeared but so did the satellites. Quite a bit of hallucination on this reply.

Prompt: The satellites are not visible after implementing this change.

Copilot: List of things to check, one of which is a variable that does not exist.

Prompt: There is no variable named speed in the satellite class

Copilot: Well there should be

Prompt: It seems you have forgotten what the class looks like. Here is the current code.

Copilot: Something weird, I reverted the code back to the working state.

Prompt: Lets forget the speed issue for now. The satellites orbit around the earth on a different planes. The planes are stacked through the earth like plates would be on a drying rack. For example some satellites would follow the artcic circle, which I don't think is possible. It looks like it would if satellites orbited around the equator, arctic circle and other latitude lines, but rotated 90 degrees so that they go around the earth vertically. (very hard to explain in plain text)

Copilot: Seems to have understood what I meant.

Prompt: (refrence code) Add that here

Copilot: Some confusion about what the code is

Prompt: (refrence the whole satellite class)

Copilot: Did some changes

Prompt: The satellites are not visible anymore after these changes

Prompt: I increased the size of the satellites, and the satellites are at the center of the earth. (again)

Prompt: Still at the center of the earth. I have set the earths radius as 6371 units.

Copilot: more changes, now the satellites are visible, but they don't orbit correctly.

Prompt: Yes now they are visible. But they still don't orbit correctly. They should take the "longest" orbit around the earth. Currently they orbit along different latitude lines, which is not physically possible. Essentially they should orbit along the equator at different inclinations. (it did not understand what I meant earlier, but neither did I)

Copilot: Provided code that does not change between coordinate systems.

Result: This solved all the problems. Now the satellites orbit correctly and the speed is also correct. The orbits are not drawn though.

Prompt: Is there a way to change the satellites to be spheres instead of squares?

Copilot: Working code on the first try, I changed the values a bit to be more suitable.

Prompt: How can I make the satellites clickable and then show the name of the satellite on the screen?

Copilot: Add lines to these files

Prompt: This is the HTML, I want the name to be in the top left corner of the screen.

Copilot: Instuctions

Prompt: This does not seem to work

Prompt: Uncaught TypeError: object.layers is undefined
    intersectObject three.module.js:51316
    intersectObjects three.module.js:51296
    onDocumentMouseClick main.js:100
    EventListener.handleEvent* main.js:18

Copilot: ensure things

Prompt: the satellites are added here, is it correct? (refrence main.js)

Prompt: Still does not work

Copilot: Lets try a different approach.

Prompt: This is the main.js file. Should I do this here or in the animations file?

Copilot: Some more changes does not work, mentioned the orbits, which don't currently work.

Prompt: Speaking of orbits they don't work proprely. I have seen a small piece of an orbit and they are way larger than the earth and the actula orbits. (reference satellite class)

Copilot: Suggests that the scale might be wrong.

Prompt: 1 unit should be 1 kilometer as I have the earths radius as 6371 and everythign else works properly.

Copilot: generic reply, somehow forgot the satellite class already

Prompt: The orbits are defined here in the satellite class

Copilot: this looks correct

Prompt: The orbit is generated here. (main.js) It seems the start and end dates are wrong. How could those be interpreted from the TLE file?

Copilot: something, which does not work

Prompt: This does not work either

Copilot: Some more generic things

Prompt: This is the generateOrbit function. The geometry for the lines is defined in the constructor of the satellite like this: this.orbitGeometry = new THREE.BufferGeometry(); this.orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); this.orbit = new THREE.Line(this.orbitGeometry, this.orbitMaterial);

Copilot: Thought I was using the sgp4 library, so gave a wrong solution

Prompt: Uncaught (in promise) TypeError: (intermediate value).jday is not a function generateOrbit satellite.js:72 main.js:91 promise callback* main.js:60

Copilot: realized im using satellite.js

Prompt: Here is the entire file with the imports, that does not seem like correct usage of propagate

Copilot: some changes

Prompt: Now there are some lines visible, but they are far away from the earth and they look straight instead of circles.

Copilot: blames the scale

Prompt: My scence should be in kilometers

Copilot: makes some changes

Prompt: Uncaught (in promise) TypeError: this.satellite is undefined
    generateOrbit satellite.js:97
    \<anonymous> main.js:91
    promise callback* main.js:60

Copilot: the line should be

Prompt: There might be circles but they are massive

Copilot: change time calculation

Result: Now the orbits look more like expected

Prompt: Yes now the orbits look like they should. None of the satellites follow the orbits though.

Copilot: unclear code

Prompt: This is the satellite class

Copilot: Explains what the class does

Prompt: Yes and the satellites don't follow the orbits

Copilot: something about the animationt

Prompt: Here is the animation file

Copilot: there might be a problem in the update method in the satellite class

Prompt: here is the satellite class

Copilot: starts somethign but stops replying.

Prompt: This is the update method. The satellites are orbiting, but they don't follow the orbits that are drawn.

Copilot: suggests that the date is different for the functions

Prompt: The date is different. Update gets minutes since epoch and generateOrbit seems to get just the epoch

Copilot: change the update to take something else

Prompt: Wouldn't it be better to set the startdate to be the current date, which is also what the update kind of gets?

Copilot: Agrees, but code makes no sense

Prompt: I meant in this part of the main.js file

Copilot: does the channges there

Prompt: They still don't follow the orbits. The orbits are offset from the satellites

Copilot: some weird code

Prompt: How can I ensure that the satellite positions and generated orbits are accurately synchronized in my visualization?

Copilot: General advice

Prompt: This is what the update gets as its time. It requires minutes since the TLE epoch. What should the orbit get?

Copilot: Changed the time again

Prompt: Now the orbits are not visible at all

Copilot: more something about time

Prompt: Should the orbits be updated in the update function?

Copilot: No that would be very computationally expensive

Prompt: Yes that makes sense. If the update function uses minutes since epoch as its time format, what shouldn't the orbits work with that as well?

Copilot: Some code that does not seem correct

Prompt: That does not seem correct. This is the current generateOrbit.

Copilot: Code that looks more correct

Prompt: Are the start and end here correct, with that change in the function?

Copilot: Says they are correct, I dont agree

Prompt: Isn't the conversion now done twice?

Copilot: Yes it is, here is a change. It still did not work.

Prompt: That still does not synchronize the satellites and the orbits

Copilot: A list of things and "without seeing all the code can't help"

Prompt: How do I make a toggle for the visibility of the orbits?

Copilot: Yes add these lines

Prompt: This is the satellite class, where do I add those?

Copilot: Detailed instructions

Prompt: I want to toggle all of them at the same time.

Copilot: solution

Prompt: I now have those in my main.js file. How do I make a toggle with HTML?

Result: Now we can simulate satellites using TLE files. Their orbits can be toggled on and off, but the orbits are not correct. Time spent in total: 10 hours 45 minutes and total amount of prompts: ~200

1.3.2024

Prompt: I think the satellites are spinning in the wrong direction. I have TLE data of all the geostationary satellites, and they orbit clockwise around the earth when viewed from the north pole. The earth rotates counter clockwise. Shouldn't they both go the same direction?

Copilot: change values

Prompt: Now the satellites have polar orbits. They should be orbiting aroung the equator.

Copilot: change values more, now they orbit in the correct direction.

Prompt: I want to show the amount of satellites at the top of the screen

Copilot: Black text, not visible

Prompt: How can I make all the text in my html to be white?

Prompt: Now I can see it but it is slightly above the bottom left corner

Prompt: How do I move it to top center

Copilot: Now the text is at top center

Prompt: I want to be able to tick boxes from a list to select which satellites to show. As in I want to change the file where the data is taken from based on the selected boxes. Only one should be active at a time.

Copilot: Instructions, bit unclear and not the best

Prompt: This is the current code for fetching the data, make the changes needed

Copilot: did that

Prompt: In the HTML the different inputs should probably be in a div?

Copilot: yes good idea

Prompt: \@workspace In the public folder I have the satellite data in .txt files, can you take the filenames, and put them in the HTML code.

Copilot: Yes

Suggested prompt: \@workspace How can I dynamically update the satellite count on the screen when a checkbox is selected?

Prompt: How do I set a default, checkbox that is selected when the page loads?

Copilot: add checked to HTML

Prompt: The selector is not visible. Maybe the z index is too small. I want it to be at the top left corner of the screen.

Prompt: The previous satellites are not removed, when another checkbox is selected

Copilot: working code

Prompt: The selector is right at the corner, I would like it to have a small gap

Prompt: The performance is now much worse than it was before adding the selector. Why would that be?

Copilot: look at performance in dev tools

Prompt: The memory usage seems to go up over time, when I select different datasets

Copilot: remove previous elements properly

Prompt: Memory usage still goes up

Prompt: Arrays, satellites and objects seem to take the most memory

Copilot: clear the arrays when not needed, helped at least a little bit

Prompt: How can I optimize memory usage in my JavaScript application?

Copilot: a lot of options

Prompt: Does the material need to be double sided when it is on a sphere? (satellite class)

Copilot: no

Prompt: How can I optimize the rendering performance of my Three.js application?

Copilot: Some general advice

Prompt: The pause button just does not work sometimes. Then when the animation is paused, on some datasets the satellites jump to a different position, what I assume to be the starting position defined by the TLE data, and when resumed they jump back to where they were.

Copilot: Changes to animation

Prompt: This change absolutely destroyed the performance, it is not usable at all.

Copilot: some changes

Prompt: Pausing no longer makes the positions jump, but it still does not work on all the datasets. Also the controls don't work when the animation is paused which is not good.

Prompt: Yes now that works. But the pause button does not work when I have a large dataset loaded. All the other controls such as the speedslider work.

Copilot: use web workers

Prompt: How can I implement web workers?

Copilot: step by step guide, bit unclear

Prompt: Can you provide the full code for both the satelliteworker and the main.js, with web worker implemented based on the existing main.js

Copilot: full code, ran on the first try, didn't fix the problem

Prompt: The pause button still does not work. It seems quite random when it works and when it does not.

Copilot: changes

Prompt: It still does not work consistently, and now the simulation continues in the background. After resuming the animation jumps forward the amount it woul have progressed during the pause.

Copilot: Introduced more problems.

Prompt: That introduced even more problems. I will revert the code back to the point where it still worked and test if the inconsistent pause issue sitll exists.

Prompt: With this code, pause works inconsistently and on some datasets, the positions are set to the starting position when paused. One of them actually looks more correct when paused, need to see what that is about. Could this be because the web worker? Maybe I should not use that either. I removed the largest datasets as they were irrelevant.

Prompt: The pause is still inconsistent, and sometimes, when I clicked pause, the animation was not paused, but the satellites jumped to different orbits. Then on one dataset when paused, the satellites jump to positions which look more correct than when the animation is playing.

Copilot: some general advice

Prompt: I removed the web worker so there should not be a race condition. This is where the TLE data is parsed, and the data should be good as it is from celestrak. Are there other sources for TLE data about satellites I could try?

Copilot: some sources for data

Prompt: Does the generateOrbit affect the positions of the satellites? I'm using three.js, is that right or left handed? This is the animation function. These problems appeared after adding the ability to choose what dataset is displayed.

Copilot: time is calculated wrong.

Prompt: How do I change it to be in minutes

Prompt: The pause button still either pauses the animation and the positions change, changes the positions of the satellites. Could this be the reason? (reference a piece of code)

Copilot: probably not, need more info

Prompt: All of the problems started when the selector for the data was added. (reference main.js)

Copilot: somethign that could be useful

Prompt: Add the modifications needed to the animation file

Copilot: implemented something completely different than what it just said to do

Prompt: This is not what you just said to do in the previous reply. The pause button still behaves the same.

Copilot: repeat existing code

Suggested prompt: How can I ensure consistent pausing of the animation and prevent satellite positions from changing when paused?

Copilot: something useless

Prompt: Still not working properly. This is the main.js which loads the data. The issues started when the selector was added so that is where the problem should be. Is it starting a new animation loop everytime a new dataset is loaded? That would also explain the performance issues.

Copilot: yes

Prompt: Still the same inconsistent pause

Copilot: new solution seems to kind of work

Prompt: Now the pause almost works. If the dataset is changed when the animation is paused, it can't be resumed anymore. Also the orbits of one dataset are now completely different, so there is some sort of problem with that as well.

Prompt: Uncaught (in promise) TypeError: Assignment to constant variable. at main.js:95:16

Copilot: repeated the existing code

Prompt: It is like that

Copilot: oh it seems it is

Prompt: This is the current animation.js. Now the pause sometimes works, but the animation can't be resumed.

Copilot: nothign useful

Prompt: Yeah still does the same. I think I will just remove the ability to choose the data.

Prompt: How do I change the format to be what it would be in Finland, like dd/mm/yyyy and 24 hour time

Result: 3 hours, 20 minutes and ~50 prompts, nothing has changed, absolute waste of time. Actually I added the satellite count on the screen and I guess optimized the satellite a little bit.

Prompt: \@workspace I want to add the ability for the user to click 2 locations on the earth. The locations should be visible on the surface, and they need to be tracked as the earth rotates. It also needs to have some sort of coordinate system that works with the satellite's locations. The goal is to simulate connections between the 2 positions on earth via the satellite network, so it needs to be accurate.

Copilot: this involves several steps

Prompt: \@workspace Where in my project should I add this? The raycaster probably on the main.js, but should I make a new file for the ground marker?

Prompt: Write the code for the ground marker. It could be represented as a black sphere.

Prompt: Then the code for clicking and setting the positions. There also should be a button to remove the markers, and only 2 should be able to exist at a time for now.

Prompt: @workspace /explain Already included file name 'c:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/groundMarker.js' differs from file name 'c:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/GroundMarker.js' only in casing. The file is in the program because: Imported via "./groundMarker.js" from file 'c:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/main.js' Root file specified for compilation

Prompt: Okay the markers apppear and they are on the planets surface in the correct places. The problem is that the mouse is used to rotate the view by clicking and dragging. Add a button to toggle the location placing on.

Prompt: That works fine. There should be a visual change to show that the toggle is on. The controls for markers should also be separated from the animation controls. I want the marker buttons to be in the top left corner.

Prompt: When the earth has rotated for some time, the markers are still placed in the location that would have been there some time ago.

Prompt: The markers don't get placed anymore. Atleast not on the surface of the planet.

Observation: I don't know if the things I'm doing are easier, but copilot seems a lot more competent now, basically everything has worked on the first try.

Prompt: The markers don't get placed anymore. Atleast not on the surface of the planet.

Prompt: Can we first add a list under the marker buttons, that shows the coordinates of the current markers

Prompt: After these changes the markers are not being set

Prompt: Now they show up. The latitude calculation is correct, but the longitude is wrong. I get a longitude fo 115, for a location that should be 25.

Prompt: Now I get 205 instead of 25

Prompt: Now it is correct. When I remove the markers and add new ones, they are not removed from the list on the screen, and new ones are added. Also When the list is empty and a marker is added, the buttons change locations, which looks annoying, There could also be a background to the whole button and list area, so that it is like a control panel.

Prompt: Now the marker list is correctly updated. The buttons still move then an item is added to the list. They should also be next to eachother, not stacked. There should be a small gap between the control box and the edges of the screen.

Prompt: The list should still go under the buttons, now it goes next to them. The coordinate format could also be changed to be shorter, with just the coordinate numbers after the Marker number

Observation: The context lenght seems to also be larger or it can now read the files. It can now remeber the code very well, even after some time. Edit: Almost, now it hallucinated a little bit, but it still feels way better than a few days ago.

Prompt: I still want to keep the accurate coordinates on the coordinate property, just format them shorter when added to the display list

Prompt: The coordinates on the screen are still very long. Also the text color inside the markerControls should be black.

Prompt: Yes that looks good now. The markercontrols box should have rounded corners. When the view is very zoomed in, so that the earth is behind the marker toggle, when trying to toggle it off a marker is placed at that location at the same time.

Prompt: That works very nicely. How can I separate the CSS to another file?

Prompt: The markercontrols is not visible anymore

Prompt: According to the Inspector, the markercontrols are now at the bottom of the screen, but I can't see them. When refresing the page, they are briefly visible at the bottom, before the animation loads.

Prompt: Now it is visible, but it is at the bottom of the screen instead of top left

Prompt: Yes now it works. The buttons should be the same size.

Observation: Using "should" gives good results, as it makes copilot to give the modified code.

Prompt: Each marker should have it's closest satellite, which is updated constantly, and it's name should be shown under the marker in the list. Can the closest satellite change color?

Prompt: Should I separate the updatemarker as a function

Prompt: Sorry I meant updateMarkerList in main.js

Prompt: And what was needed in the animation?

Prompt: Yes, but in terms of calculating the nearest satellite and changing it's color

Prompt: Uncaught ReferenceError: markers is not defined
    animate animation.js:62

Prompt: It seems to almost work. When both markers are placed, only the first one gets the text: "Closest satellite: undefined". Also when the simulation progresses, and earth spins, the original position of the marker is used to calculate the closest satellite.

Prompt: That is the same code as before, and the text is still saying closest is undefined on the screen.

Prompt: The problem is that the markers updated position does not seem to be used in the calculation of the distance. The initial location is used as the location for the marker, even after it has moved with the earth as it rotates.

Prompt: After adding that, now when the markers are added, the nearest satellite does not turn red as expected, and also after the markers are added, the satellites stop moving

Prompt: \@workspace Where is the distance to method from? I don't think that is implemented anywhere. Where should it be implemented?

Prompt: Okay I'm using three.js so that should be fine. Could the problem be in the main.js file instead?

Prompt: The color resetting won't work as marker is not defined in that scope

Prompt: Uncaught TypeError: earth.localToWorld is not a function
    animate animation.js:67

Prompt: This is the earth. It could be possible that that function is deprecated as the current version of three.js is r162

Prompt: Okay now the position of the marker is udpated. Only on of the markers gets the closest satellite as red. It's propably because the color of satellites is reset every time.

Prompt: The text on the screen still shows undefined, this is how the satellite class is implemented.

Prompt: This is the main.js, how should it look like

Prompt: The satellites are no longer visible

Prompt: Okay, my bad I put the parameters in the wrong order, it works. The closest satellite is added to the list on the screen only after the second marker is selected, and then only the first one gets it.

Prompt: No the closest satellite is being calculated, as both of them have a red satellite close to them. The name of the satellite is only shown after adding both markers. And then only the first one has the name next to it.

Prompt: Update marker list does not exist in animation.js it is in the main.js file. Should I pass it to the animation? The location of the markers is shown correctly.

Prompt: Now it's shown correctly. The closest satellite should be displayed under each marker.

Prompt: The box keeps changing size as the satellite name changes form shorter to longer. It should remain constant with the buttons centered. The closest satellite text should also be smaller than the marker text.

Prompt: There should be buttons next to the pause button, which sets the speedslider to real time, then lets say 1 simulation min = 1 real sec, and then 1 simulation hour = 1 real sec.

Prompt: The buttons should be next to the pause not stacked

Prompt: The slider should still be above them, and the div should be at bottom center

Prompt: Now they are stacked again. Should I add a div for the buttons?

Prompt: The coordinate formatting looks a bit weird on the screen as it is now just numbers

Prompt: Yes that looks good. The remove markers button does not work. It removes, the marker geometry, but it remains in the list on the screen, and it still calculates the closest satellite.

Prompt: That works. The simulation speed remains the same even after refresing the page. It should reset to real time.

Prompt: Reformat this file so it is a bit more cleaner and clearer. Similar things are being done in different places. The dataloading should be its own fucntion as well.

Prompt: Clean this one up as well

Prompt: And same for this

Prompt: Uncaught ReferenceError: earth is not defined
    animate animation.js:51

Prompt: There are a lot of unaccesible variables here after the reformat

Prompt: Uncaught (in promise) ReferenceError: isPaused is not defined
    animate animation.js:25
    startAnimation animation.js:2
    loadData main.js:91
    promise callback*loadData main.js:66
    onload main.js:38
    EventHandlerNonNull* main.js:35

Prompt: Uncaught ReferenceError: lastTime is not defined
    animate animation.js:32

If there are any other missing definitions add them as well

Note: I reverted the changes back to when it was working to try again.

Prompt: Reformat this file to be cleaner. Remember to define the variables and keep the funcitonality same.

Result: Total time spent: 16 hours 55 minutes, ~310 prompts. Now it is possible to set 2 locations on the surface, their coordinates are shown on the screen. The nearest satellite is calculated and shown on the screen as well. Cleaned up few of the messiest files. Got new data, which fixed the issue with the simulation not being correct.

Prompt: There shouldbe a line going from the ground location to the nearest satellite to visualize a connection. Adding the line should be done with a function, which takes the world space coordinates of 2 objects, and draws a line between them. This is so that it can be used in the future to draw lines between connected satellites.

Prompt: How do I remove the line once the nearest satellite changes?

Prompt: Uncaught TypeError: THREE.Geometry is not a constructor
    createLineBetweenPoints animation.js:21
    updateMarkers animation.js:49

Prompt: Uncaught ReferenceError: scene is not defined
    updateMarkers animation.js:44
    updateMarkers animation.js:29
    animate animation.js:82

Prompt: The origin of the line drifts away from the ground station as the earth rotates. The satellite end of the line works properly

Prompt: Each satellite should have a load percentage, which would change over time to simulate network traffic going through the satellites. The satellite should change colour based on the load level. Maybe green if under 33% yellow at under 66% and red over that.

Prompt: The colors are not changing, probably because of this

Prompt: The nearest one stays blue after the line disconnects until the load updates. It should change immediately after it is not the nearest.

Prompt: It should be randomized to be yellow green or red

Prompt: The ground marker should also check that the satellite it is connecting to is not red.

Prompt: It should check the load value, not the color. I worded the previous one incorrectly.

Prompt: If I place new markers without removing the old ones, the lines stay, wihtout being connected to anything.

Prompt: Should I add this function to the main.js?

Prompt: Where should I call it and how do I modify the rest of the code

Prompt: Shouldn't the earth.mesh.add marker line be removed

Prompt: The lines still remain, and now only one marker exists at a time.

Prompt: Now the nearest satellite is not calculated at all and the locations are not displayed on the list.

Prompt: I will revert back to the state wher it still worked. The lines should be removed when removeMarkers is called.

Prompt: The lines are not removed.

Prompt: The line is still not removed. Also the color of the satellite does not change from blue until the next update.

Prompt: Now there is just the prolem of the line being left behind if the markers are not removed, but new ones are set. There can only be 2 markers, so maybe the line should be removed here.

Result: Total time 17 hours 55 minutes, ~335 prompts. Draws a line between the ground location and the nearest satellite using a function, which should be usable for addding lines for the whole connection. Satellites have a simulated load that is updated every 10 seconds.

Prompt: The satellite class is using these 2 functions from the library satellite.js. I want to have the functions implemented locally, with the same functionality. I have created a file for them to go into.

Prompt: I want the twoline2satrec and sgp4. It doesn't need to be exactly the same, but it should do the same thing, while taking the same paramteres. The goal of this project is to test the code generation capabilites of LLMs, which is why I don't want to use the library.

Prompt: This version does not work, no satellites are rendered.

Prompt: Can you implement the sgp4 algorithm, or atleast something close to it, that would work?

Prompt: How about this function then. Is this as accurate as it can be?

Prompt (ChatGPT): I'm doing a satellite simulation using javascript, and I need a SGP4 function to calculate the orbits. It should take a satrec object and date.

ChatGPT: Use satellite.js library.

Prompt: I'm doing a research project to test the code generation capabilities of LLMs, which is why I don't want to use the library.

ChatGPT: Here is an outline that you can fill. SGP4 is very complex.

Prompt: Can you implement a more complete version of the algorithm?

ChatGPT: A bit more code. Nothing close to proper.

Result: 30 minutes more time used, 8 prompts, it seems neither of them are capable of doing it like this. The original files in the library should be read and then try to get the LLM to do what it does. Total time now 18 hours 25 minutes.

Prompt: This code was implemented by my colleague. It is supposed to use djikstras algorithm to claculate the shortest routing between the two ground locations. However it has big performance issues, because there are over 5500 satellites. I need a network routing alogrithm that is more performant. I would also like to use the updateMarkers function in the animation.js for it.

Prompt: Is this calculatedistance sufficient enough for this. What else do I need to change?

Prompt: The satellites are stored in an array, which I can pass to the astar. There should also be a function to visualize the route by drawing lines between the satellites. I have a function for drawing a line between 2 locations, which I can also pass to it.

Prompt: It should only draw the final shortest path. The shortest path should be updated once per second.

Prompt: This is where the current djikstra based implemetation is called. I want to change the updatemarkers function so that it is called from there. Here is also the create line between points function that I want to use. The updatemarker function does not need to calculate the closest satellite anymore, as it will be replaced by the routing.

Prompt: astar is not imported and there needs to be the limitation to call it only once a second

Note: aStar does not have an export, im adding it manually

Prompt: No lines are drawn, and the performance is still very bad. As I said, there are over 5000 satellites.

Prompt: I think this function calculates the edges and vertices. Can it be improved in terms of performance?

Prompt: The nodes are not static as they are satellites orbiting earth.

Prompt: Uncaught TypeError: graph[\current] is not iterable

Prompt: Uncaught TypeError: graph[\current] is not iterable
    aStar routeCalculator.js:194

Prompt: Now the error is gone, but the lines are still not being drawn.

Prompt: Now the error is gone, but the lines are still not being drawn.

Prompt: Still not drawing. The markers are passed to visualize, but they are not used.

Prompt: It's still not drawing the lines.

Prompt: Still nothing

Prompt: The markers have no identifiers, there will never be more than 2.

Prompt: The markers should bever have a line between each other, it should always pass through atleast one satellite.

Prompt: It still does not draw the lines.

Prompt: Did not work

Prompt: That does get printed.

Prompt: Shortest path prints false. So the problem should be in the aStar function

Prompt: The problem could also be here, because the markers don't have an id property?

Prompt: The problem could also be here, because the markers don't have an id property?

Note: Maybe context size limitation, it did not catch this when the whole code was provided to it previously, when the markers having no id was discussed.

Prompt: Shortestpath still prints false. The source and destination are object objects

Prompt: This is the function that creates a marker. What should I use as the id as I don't know what numbers are already used by the satellites?

Prompt: Uncaught TypeError: "id" is read-only
    createGroundMarker groundMarker.js:30

Note: proper hallucination from this

Prompt: This is the marker function, there is no class for it.

Prompt: Okay so then the markers have some sort of id already, as they are Three.mesh so I don't need to add one to them manually.

Note: small hallucination, corrected code manually

Prompt: The shortestpath is still false. It probably happens because it is only called once every six seconds. The path should be calculated entirely before anything is returned to the animate function.

Note: again I had to notice the problem

Prompt: The shortestPath, gets an array or similar, which consists of the satellites that belong on the shortestPath correct? This means that visualizeshortestpath should be called every frame like the rest of the animated things, like satellites, so that the lines correctly follow the satellites as they move. And the calculation for the shortest path should run in the background every 5 or so seconds. Also in the visualizeshortestpath, it is checked if the position of the satellite in the shortest path is equal to the position of another satellite. This does not work as the satellite's positions are updated every frame. Instead it should just check the id of the satellites and draw the line between them.

Prompt: The visualization and the calculation should still only be done when there are 2 markers

Prompt: No the visualization should still be done every frame, but only when there are 2 markers. Alternatively it could check if shortestpath exists before drawing anything to avoid null reference errors.

Prompt: Now it still does not draw the lines. This is what the print from the graph looks like: graph: \{"5636":{"51107":718.0505814904066,"53392":792.4486626171798,"53393":579.2335580588293,"53933":717.6653738697192,"55576":730.5181127831257,"55699":370.4639457222998,"59028":765.4103325223891,"59036":752.8593791804108,"70401":602.5715024630042},"5637":{"46325":673.5085866669289,"57508":796.1324289751049},"44713":\{"44937":650.532324231041,"44944":379.92438306555107,"45771":773.3434605774448,"46760":551.6284478525756,"47635":494.1579087654338,"48463":476.6470814596297,"48465":318.5396450788735,"48467":606.4037644453942,"48469":491.1413706105545,"51725":151.5757270314109,"51780":759.1690641920719,"52378":654.6559419417484,"53257":593.1432518618661,"53277":719.6293641190844,"53891":777.6066253264796,"55573":653.9910347900774,"55575":28.765709760019448,"57346":649.953193269435,"57352":190.0582140317298,"57355":489.7327504609384,"57411":630.9705034778182,"57417":771.0778480965112,"57829":436.34107773660486,"58352":790.4055053869802,"58355":791.1927269081061,"58836":573.3521056642862,"5…

Note: just explained how the aStar function works, as if it forgot everything

Prompt: basically the same again

Prompt: I changed the algorithm back to djikstra, but the graph is still not drawn. The djikstra returns the shortest path as an array as expected, but no lines are drawn.

Prompt: Is there anything wrong here. The shortestpath is printed so the function is called.

Prompt: Node1 and node2 are the same satellite based on the satnum, but that satnum is not on the shortest path.

Prompt: shortestpath is not objects, but what seems to be the satnums of the satellites in it and the id's of the markers at both ends

Prompt: Now it does not print the node1 and node2 anymore. What is node.id? If it is the id of the Three.js object, then it wont work as the satnum is not the same as that.

Prompt: Yes djikstra returns the code in the correct format, being either the satnun for satellites or the three.js id for the markers. So how do I make the mapping to nodes work with both of these values.

Prompt: is the node either a satellite or a marker?

Prompt: Then why is this printed: Uncaught TypeError: node.satrec is undefined
    node1 animation.js:38
    visualizeShortestPath animation.js:38

Prompt: It might be more efficient to add the type only to the marker as there are 5500 satellites

Prompt: Okay now there is a line. The line does not start from the markers, but from the first and last satellite in the path. Also the lines don't connect to the satellites, but are somewhere near it, UNLESS I pause the animation while it is calculating the new fastest route. Then when the calculation is finished and the pause command goes through, the lines go exactly from satellite to satellite, until I unpause again.

Prompt: But isn't visualizeshrtestpath called every frame like the rest here? Also the lines don't start from the ground markers as they should.

Note: small hallucination

Prompt: this is how the lines are created

Note: Bad prompt

Prompt: I meant in terms of the previous code you provided, which was not how the lines are created in my project. How do I add these changes to my existing code?

Prompt: The visualizeshortestpath should probably be moved to be called only every 6 seconds

Prompt: This did not fix the problem where the lines don't follow the satellites, nor the problem that the lines don't connect to the ground stations.

Prompt: It still behaves the exact same. The lines are correct only when the animation is paused while the route is being calculated. The animation freezes while the calculation is being done, so there is time to pause it while it is doing it, meaning the pause happens instantly after the route is calculated.

Prompt: Still the same. How about the lines not beginning from the ground markers?

Prompt: It does start with the ids. I tried to print the nodes, but the startign and ending ones are undefined.

Prompt: The marker ids are numbers. They are always the three.js mesh ids of the ground markers.

Prompt: The path is correct and has the expected ids for the ground markers at the beginning and end of the path, meaning the problem is in these lines.

Prompt: It shouldn't be the mesh.id, as this is where the ids and satnums are given to djukstra, so the resulting path has the same numbers

Prompt: No I meant that it should be just node.id and not node.mesh.id

Prompt: I printed the marker ids and they are the exact same as they are in the path, meaning the issue is in the comparisions for the nodes.

Prompt: Now it finds markers, but the satellites are undefined.

Prompt: No that can't be the issue, as the satellites were correct, but only the markers were undefinded. After adding the Number(), it flipped, so that the markers are correct and satellites undefined.

Prompt: Can something else be used to do the comparision than ===, which would allow for them to be different types. I can now see that the path has the numbers as strings.

Prompt: Now it prints the 2 first objects as excpexted, but then: Uncaught TypeError: node1.mesh is undefined
    visualizeShortestPath animation.js:43

Prompt: All the satellites should have a mesh as they are rendered in the scene. I looked at all of the nodes that were printed, and they had matching numbers to the path.

Prompt: The satellites are made before it is called.

Prompt: Did not work. The "One of the nodes does not have a mesh property" is printed after the first and last 2 nodes, indicating that the problem is in the markers. This is the marker creation.

Prompt: It's returning the whole groundmarker object, would that not already have a mesh

Prompt: Uncaught TypeError: point is undefined
    setFromPoints three.module.js:10738
    createLineBetweenPoints animation.js:26
    visualizeShortestPath animation.js:43

Prompt: It seems that somehow now none of the satellites have a position, even though the drawing between satellites worked. Something in the previous change broke it.

Prompt: That did not work. Previously the position was accessed vie node.mesh.position, which worked for the satellites, but not for the markers.

Prompt: It might be easier to change the way the position is stored in the groundmarker, though it would mean that I need to probably change it in other locations as well. Unless it can be stored in both.

Prompt: This needs to be updated aswell

Prompt: Yes now it start from the ground. However, the line is not updated every frame as it should be, so the line is not accurate. Also the line does not follow the satellites and the ground when the earth rotates. I had this problem previously and it had something to do with local and global coordinates.

Prompt: Now the line is drawn very far from the earth.

Prompt: I think the earth is at 0.0.0, but the satellites and markers might not be children of it. The markers are placed using a raycaster at the earths surface and the satellites go where the TLE data puts them. The earth mesh has a radius of 6371.

Prompt: I had the same problem previously with this, but this is correctly functioning code. Something similar should work for the current issue.

Prompt: How about here?

Prompt: For some reason the updateLines is not called every frame like it should be.

Prompt: The issue is clearly becuase shortest path is reset every frame

Result: Now the line is drawn correctly, it uses the pre existing functions to do the drawing. When changing the algorithm, it should be enough to only change the function call to the algorithm in on place, assuming it will return the shortest path as an array. Time spent: 4 hours, total time: 22 hours 25 minutes and 407 prompts

Prompt: Before implementing the rounting algorithms,  only the markers, with their closest satellite were added to the list to be displayed on the screen. I would like to have in the list the first marker, then all the satellites in order from that marker and then the last marker in the shortest path. Also when clicking remove markers, all the lines should be removed as well.

Prompt: The shortest path includes the markers and the satellites, so it should be enoguh to just take all the objects from it.

Prompt: Now i just need to get the shortest path here somehow

Note: response was filtered by responsible ai services

Prompt: The shortestpath is being calculated here, I need to get it to the update and removemarkers functions in main.js

Prompt: Updatemarkerlist is called here, so it could be passed as a parameter to that. Can the function call be moved to be after the calculation is done?

Prompt: Now how do I get the shortestpath to the remove function as well?

Note: Fixing some function calls manually

Prompt: There are some problems with how this is implemented as the updaetmarkerlist was used when adding new markers as well. So the updatemarkers should retain that functionality. Maybe it could use the markers array to update the markers and then only take the satellites from the shortestpath.

Prompt: I should probably add shortestpath as a varibale to the main.js, because it needs to be accessed in many different places.

Prompt: It should be updated in the updatemarkersfunction, because that is where it gets passed to the main,js from animation.js

Prompt: Sorry I meant updateMarkerlist is called in animation.js

Prompt: Uncaught TypeError: shortestPath is undefined
    updateMarkerList main.js:199

Prompt: It is defined as an empty array at the top of main.js

Prompt: Should the other ones also be changed to arrow functions?

Prompt: I'm still getting the type error about shortestpath from line 194

Prompt: Uncaught TypeError: undefined has no properties
    updateMarkerList main.js:194

Prompt: I noticed a weird incosistency here, where sometimses shortestpath is a parameter and sometimes not, it also seems that it is not used when it is a parameter.

Prompt: But is it needed as a parameter? It is defined at the top of this file as an empty array, and it is filled with the actual path in the animate function. I think it was at one point defined in main.js, then passed to animation.js via the startanimation function.

Prompt: It is used in the main.js as well, but right now it gets there through updateMarkerList, where it updates the local value in main.js to be the same as it is in the animation.js.

Prompt: This functionality exists in the updateMarkerList function, which is called after the shortestpath is updated in the animate function.

Prompt: I want to change the name of these functions to better reflect what they do, as now they handle the markers and satellites on the shortest path.

Prompt: Now the whole path should be displayed in the browser as a list, where the groundmarkers are displayed as they are now, but the satellites should be in between them.

Prompt: It is done here.

Prompt: The markers and satellites are added to the markerList here, after they have been formatted, correct? The satellites are not displayed on the list, only the markers are. I want them both to be on this list in the order they appear in the shortestpath array.

Prompt: There is no marker class. Only the satellite needs to be checked to be of the satellite class.

Prompt: Uncaught TypeError: node.coordinates is undefined
    updateMarkerAndPathList main.js:189
    updateMarkerAndPathList main.js:183

Prompt: The groundmarkers should have that, as it worked previously. There are only either markers or satellites in the shortest path.

Prompt: Sorry actually, the shortest path only contains the satellitenumbers and then the three.js ids for the markers. Also the markers were supposed to be taken from the markers array. So the code should take the markers from the markers array, and then I think it needs to find the correct satellites based on the satnum.

Note: added satrec to sat.satnum manually

Prompt: shortestPath is again undefined in line 183, somehow

Note: fixed some function calls manually

Prompt: No it is empty, when the route is being visualized, and the button to remove the markers has not been pressed. The point is that when the route has been calculated, it is visualized as a line, which works, and then as a list on the screen as well, which does not work.

Prompt: It is called here every animation frame, after the shortestpath is being calculated.

Prompt: No that is correct. The path is calculated only once every 5 seconds, but the path stays visible for the whole time. If the path is not visualized, it should not be on the list either. But after the path is visualized, it should be on the list, but now it is empty. I think the problem is in the updateMarkerList function.

Prompt: It gets the array, and finds the satellites, but not the markers. The names are undefined. Here is the satellite class.

Prompt: Satnum is not set because it is in the satrec. There are only ever 2 markers at a time, so they should be taken directly from the markers array. The first marker in that is the first marker in the shortest path.

Prompt: This is part of the satellite class. How do I access the name in the updateMarkersAndPath function?

Prompt: Yes now the satellites show up correctly. The markers are still missing. Using find() should not be necessary, as the first marker in markers is also the first element in the shortest path.

Prompt: Yes now it works. But the first marker and first satellite are correctly set as location 1 and marker 1. The second marker is set as location 10 instead of location 2.

Prompt: Remove the console.logs

Prompt: Can the satellites in the list be changed to have their text smaller and a different color from the markers?

Result: Now the list displays the current shortest path. Routing algorithm needs to be improved, does not take into account the load levels of satellites, and is super slow. Maybe multithreading could be useful. Time: 1 hour 30 minutes, total time 24 hours, prompts: 450

Prompt: After the simulation has been running for a while, the route start drifting to the side. It still runs through satellites, but it seems to use the original positions of the ground markers as the basis of the calculation. It seems that the positions, that go to the creategraph and djikstra are not updated correctly.

Prompt: Can the satellites on the shortest path be set to the same color as the lines?

Prompt: After setting the markers and waiting for the path to be visualized, if I then click the remove markers button, the lines are not removed. Then if I try to add new markers I get this: Uncaught TypeError: node.satrec is undefined
    node1 animation.js:65
    updateLines animation.js:65
    updateLines animation.js:64

Note: reply was almost completely nonsense

Prompt: Isn't that now just removing the node.line and not the node itself? Also is node.line something built into three.js, because I don't think that the satellites nor markers have a line property.

Prompt: It still does the same thing. Starts printing the node is undefined. The problem is probably because the shortestpath in the main.js is a copy of the original one. How can I make them both use the same variable?

Note: manually fixing the function calls again

Prompt: Okay now it works. Now how do I make a super simple routing algorithm, that would just go to the closest satellite, which is also closest to the destination?

Prompt: It should use the graph created by this, and return the shortest path as an array containing the items from the graph that belong to the path. Also there are over 5500 satellites, so iterating over all of them is not sensible.

Prompt: I already have this djikstra, but it is way too slow. It freezes the animation for a few seconds every time it is run.

Prompt: There was a sligth increase, but not enough. The algorithm should be some actual networking algorithm as we are simulating network connections using satellites. Alternatively the graph creation could be optimized, so that the algorithm has a smaller dataset to work with

Prompt: I have this aStar, but it does not work.

Prompt: Where should the openset delete be placed?

Prompt: The drawLine should not be used anywhere here, as the visualization is handled elsewhere. aStar should only return the shortest path it finds as an array.

Prompt: @workspace Uncaught ReferenceError: graph is not defined heuristicCostEstimate routeCalculator.js:259 aStar routeCalculator.js:223

Prompt: Yes this is how it is in the animate function.

Prompt: Uncaught TypeError: position2 is undefined
    calculateDistance routeCalculator.js:208
    heuristicCostEstimate routeCalculator.js:259
    aStar routeCalculator.js:223

Prompt: The objects in the graph are key value pairs consiting of the id of the object and some sort of distance

Prompt: The aStar gets a graph in that form, so they don't have their positions.

Prompt: Uncaught TypeError: (intermediate value).forEach is not a function
    updateMarkerAndPathList main.js:177
    animate animation.js:137
    animate animation.js:105

Prompt: The error is most likely due to aStar returning false

Prompt: The problem is not the error but the fact that it does not find the path.

Problem: It's going through the open set and removing the current one, until the open set is empty, and then returns the empty array.

Prompt: The graph is very long and there definitely is a valid path that it can take.

Prompt: I think the graph creation could be optimized. Currently there are no limits to the amount of edges, correct? What if it only added a set amount of closest neighbours or something?

Prompt: I tested this with the dijkstra, and it seems to have removed all the other nodes except the starting ones from the graph.

Prompt: Now it does find a path, but it is even slower than before, most likely due to sorting an array

Prompt: I have this, does it work and is it optimal?

Prompt: It's still quite slow. Are there other ways to improve the performance of the graph creation? The simulation has satellites orbiting the earth and then when 2 locations on the ground are clicked it will try to find the shortest path through satellites to connect them, like a phone call.

Prompt: And how do I implement these, for example the octree and distance limit. Precomputing is not possible. Also parallelization could be a possibility. Or simplofying the distance calculation.

Prompt: There are over 5500 satellites, so maybe octree is not the best. Can the distance calculation be simplified?

Prompt: I changed the code back to the original state, which was faster than the k nearest neighbour, but using the squared distance. Now the path is only on element.

Prompt: I reverted everything to a working state. This works, but it is too slow. What can I optimize?

Prompt: It still takes about three seconds to calculate the shortest path. How do I implement the better graph creation?

Prompt: Uncaught Error: Unpexpected numItems value: -1258.3179939239928,2187.8875205188965,5847.348158526407,2187.7411824729156,638.041061265251,5948.118316500293,-2752.485203218618,5348.696087148623,3416.715519389033,6335.197561469207,-2794.688743626273,-271.1353457470697,-4218.1627571612935,-3622.2395182330706,-4137.039054931701,6420.131570939165,-2604.852676917181,-92.44557267969743,6471.243836089063,-1798.3701809023796,-1701.6746616596545,-6732.468677644547,1115.0979166577526,-1175.6240695167314,-2391.3573024146235,-4739.479911931037,-4456.901605712218,-6525.332220545033,2289.959161737877,-219.61403379040638,6601.405470181197,115.9506342053251,2092.339378568893,992.2453202322938,5231.721899567553,4416.3278154703,-6732.998763889982,858.5937037663826,-1375.336950544408,-6900.816799929197,-603.6346746529349,-87.42979145617318,-6209.58376983942,-1197.7413746900395,-2829.2605091493983,4361.650359933261,3536.7928087247233,-3573.069804258102,-4929.332648976717,3749.1364324926276,3090.011724519304,-6711.174711335…
    _KDBush index.js:48
    createGraph2 routeCalculator.js:117

Prompt: Max edge distance is just a number, currently 1000, so it should not care about that?

Prompt: Still the same error

Prompt: I know it is a positive number it is always 1000

Prompt: The points array consists of arrays of three, being probably the coordinates. Some of the coordinates are negative, as the center of the earth is 0.0.0

Prompt: Lets change to the 3d library.

Prompt: three-kd-tree gives 404 when trying to install

Prompt: Okay I have again reverted the code to a working state. Are there any other ways to improve the performance? How could I implement the web workers for the graph and djikstra?

Prompt: Does the graph need to be created everytime, when djikstra is used ot find the shortest path? The satellites are constantly moving.

Prompt: I would like to update it every second, but running the graph and dijkstra takes about 3 seconds. That is why im trying to optimize them, or alternatively offload them to another thread so the animation does not freeze for 3 seconds.

Prompt: Now the graph that is retuned only contains one element

Prompt: It stopped working after the previous "improvement" to it

Prompt: Now it works. Can it be optimized further?

Prompt: How do I implemetn greedy best first, so that it returns the same type of array as djikstra currently?

Prompt: Can that distance calucaltion be used as the heuristic?

Note: "Sorry, but I can only assist with programming related questions."

Prompt: Can the calculate distance function be used as the heuristic?

Prompt: It's somehow even more inefficient as it freezes for a very long time. Its way slower than the djikstra.

Prompt: This is also insanely slow. I have determined from the browsers performance analytics, that majority of the time is spent in creategraph. Running the dijkstra algorithm takes very little time. So the focus should be on the graph creation.

Prompt: Does this work in 3d space, as the nodes are satellites in 3d space?

Prompt: 15:29:50 [vite] error while updating dependencies:
Error: ENOENT: no such file or directory, open 'C:\Users\Matias Paavilainen\Documents\Ohjelmointi\Kandijutut\SatelliteSimulation\node_modules\kdbush\index.js'

Prompt: Do I need kdbush to use the kd-tree-javascript

Prompt: Uncaught TypeError: KDTree is not a constructor
    createGraph2 routeCalculator.js:104

Prompt: Uncaught TypeError: kdTree is not a function
    createGraph2 routeCalculator.js:104

Prompt: Okay now it only take half as long, but still over 1000 milliseconds.

Prompt: Very good, now it only takes >100 ms to find the graph.

Result: Massive performance improvement, now the algorithm can be run once per second and there is only a small stutter. Time: 3 more hours, Total time now 27 hours, prompts: 500

Prompt: This is the satellite class. The updateLoad should be isolated from the update function, so that it can be called from the animate function in animation.js.

Prompt: The load of the satellites should be updated right before the graph is created, because I want to modify the graph creating fucntion to take into account the load of the satellites.

Prompt: The graph creation should be modified so, that satellites whose load is over 0.66 are not included.

Prompt: This is the satellite class how should the id and load be accessed?

Prompt: The id for satellites is actually the satnum that can be found in the satrec provided by the tle data

Prompt: The satelliteloads should be updated even when there are less than 2 markers

Prompt: The timing should still be done with the same "clock" as I want the satelliteload updates and route calculation to be in sync, but route should only be calculated when there are the 2 markers.

Prompt: The for loop does not have a timing mechanism

Prompt: All of this should run once a second like it is now. The only difference being that the calculation for the route is only done id there are the 2 markers.

Prompt: I want the marker to instantly visible on the list when it has been placed.

Prompt: That does not work

Prompt: Removing works fine, but when placing it does not show up in the list.

Prompt: I think it is because the shortestpath does not yet exist at that point.

Prompt: Yes that works very well

Prompt: When placing new markers when the old ones still exist, the old ones don't get removed from the surface, even though they are removed from the list, as it will calculate a new route between the 2 new markers.

Prompt: If the markers are very close to each other, there won't be a line drawn.

Prompt: Okay now I see the problem. The markes connect to each other if they are too close. This should not happen, even if it is possible. The connection should always go through atleast 1 satellite.

Prompt: They still connect to each other

Prompt: That won't work as the satellite and marker ids don't have the word satellite or marker in them. Is there a way to force the route to be atleast 3 long? Alternatively, the markers have ids that consist of only numbers, whereas the satellites will have letters in them as well.

Prompt: Now it does not create a graph at all.

Prompt: That still does not work, even over longer distances, which worked fine before. Only the really short distances were a problem.

Prompt: This is the djikstra i have. Modify it to force the path to be 3 long.

Prompt: It still connects the 2 markers if they are close enough.

Prompt: Now there is no line between them, but it also does not go through a satellite.

Note: Same answer 2 times in a row.

Prompt: After 2 markers have been placed, the marker placing should be toggled off automatically.

Prompt: Can you clean up the code while retaining the same functionality? There is the mesh position calculation thing that looks to be almost identical code in 2 places.

Prompt: The code no longer works after this change

Prompt: Are there other improvements that could be made to enhance readability or otherwise better?

Prompt: It does not work. It seems you removed a lot of necessary function calls and updateShortestPath does not exist.

Prompt: The last few changes broke everything, so I reverted it back. Could this be improved, while retaining the functionality?

Prompt: Uncaught ReferenceError: earth is not defined
    rotateEarth animation.js:116

Prompt: Yes now it works. Can this be made more readable, also aStar is not used so it should probably be removed.

Prompt: Add comments and maybe docstring on complex functions and any other improvements that seem fit.

Note: very impressive, it managed to process the entire file

Prompt: Add docstrings for the more complex funtions and useful comments

Prompt: There are some unused variables and overall it is quite messy. Add docstrings for the more complex funtions and useful comments.

Note: This was done on the main.js which is 266 lines long, and it managed to process almost all of it. One function was left untouched, and it seems to have forgotten what the prompt was as it fell back to it's default behavior and explained what the code does, after adding all the comments.

Note: the last function seems to have gone completely missing as it is not even called when it should.

Prompt: This function should be called in the loadTLEdata function as it is necessary. Add docstring to it too.

Prompt: The route is no longer being drawn after the changes

Note: actually it is now wihtout cahnging anything not sure why.

Note: There are some mistakes i can see, for example tleEpoch gets tle2 even though it does not need it, and Satellite() has epoch for no reason.

Prompt: I think the doc could be better for this function as it does not really describe what happens in it.

Prompt: That is a bit too much text, it shouldn't explain how it does something, only what it does.

Prompt: Sometimes, when 2 locations are selected it just does not draw the route. Most of the time it works normally.

Prompt: There are only satellites and markers in the scene and a valid path should exist almost always, as the whole planet is quite evenly covered in satellites.

Note: it forgot the question. probably because i used the whole file as context 260 lines

Prompt: It should be called every frame as the satellites are moving so fast that the line drifts off them in 1 second.

Prompt: When the bug happens, and it happens more often over longer distances, the shortestpath returned only has 1 element in it, most likely one of the ground locations.

Prompt: Here is the djikstra and graph  creation

Prompt: Increasing the maxdistance seems to have mostly fixed the problem. However there is a new problem, when I add a new ground marker when 2 already exist, I get this: Uncaught TypeError: node.satrec is undefined
    node1 animation.js:105

Prompt: It could also have something to do with this as I think it was working fine before refactoring the code and adding this function.

Prompt: Yes it does not seem to be that. Now I get this: Uncaught TypeError: undefined has no properties
    node1 animation.js:105
    updateLines animation.js:105
    updateLines animation.js:104

Prompt: Actually the issue could be here

Prompt: When I add a new marker after there are already 2 i get this: Uncaught TypeError: undefined has no properties node1 animation.js:105 updateLines animation.js:105 , but the problem could be here as this was changed and it is responsible for the marker list.

Prompt: That is how it is currently. I think the problem comes from here, where the markers are added to the markers array. Specifically when a new one is added when 2 already exist.

Prompt: What is the longest distance a satellite could transmit data to another satellite over, before the curvature of the earth gets in the way, assuming the satellite orbit at 550 kilometers.

Prompt: What would be a common transmit distance from satellite to satellite?

Note: I can only assist with programming questions

ChatGPT: answered that 2000 kilometers is fine for simulation

Result: 2 hours 40 minutes, total time now 29 hours 40 minutes. 685 prompts. Bunch of QoL changes and small bug fixes. Added docstrings and comments. Updated the TLE data. Refactoring animation.js seems to have introduced a new bug, when 2 markers exist and a new one is added it does not work like it used to at one point.
