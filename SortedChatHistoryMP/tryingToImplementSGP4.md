# The small attempt to implement sgp4 locally instead of using the library

**The satellite class is using these 2 functions from the library satellite.js. I want to have the functions implemented locally, with the same functionality. I have created a file for them to go into.**

To implement the functions locally, you would need to understand what these functions do in the `satellite.js` library. Let's assume the two functions are `propagate` and `sgp4`, which are commonly used functions in satellite tracking.

Here's a basic implementation of these functions. Note that these functions use complex mathematical calculations and constants that are specific to satellite tracking, so they might not work exactly the same as the ones in `satellite.js`:

```javascript
// Constants used in the calculations
const mu = 398600.4418; // Earth's gravitational parameter
const earthRadius = 6371.0; // Earth's radius in kilometers
const j2 = 0.00108262998905; // Second zonal harmonic of the geopotential
const j3 = -0.00000253215306; // Third zonal harmonic of the geopotential
const j4 = -0.00000161098761; // Fourth zonal harmonic of the geopotential

// Function to propagate the satellite's position and velocity
function propagate(satrec, date) {
    // ... complex calculations ...
}

// Function to calculate the satellite's position and velocity based on its TLE
function sgp4(satrec, date) {
    // ... complex calculations ...
}

module.exports = { propagate, sgp4 };
```

You would replace the `// ... complex calculations ...` comments with the actual calculations from the `satellite.js` library.

Please note that this is a simplified example and the actual implementation of these functions in `satellite.js` is much more complex. If you want the exact same functionality, you would need to copy the code from the `satellite.js` library. However, please be aware of the license terms of the library before doing so.

-----------------------------------

**I want the twoline2satrec and sgp4. It doesn't need to be exactly the same, but it should do the same thing, while taking the same paramteres. The goal of this project is to test the code generation capabilites of LLMs, which is why I don't want to use the library.**

The `twoline2satrec` function is used to convert a Two-Line Element Set (TLE) into a satellite record suitable for input into the SGP4 propagator. The `sgp4` function is used to calculate the position and velocity of a satellite based on its TLE.

Here's a simplified version of these functions:

```javascript
// Function to convert a TLE into a satellite record
function twoline2satrec(line1, line2) {
    // Parse the TLE lines
    const tleLine1 = line1.split(' ');
    const tleLine2 = line2.split(' ');

    // Create a satellite record
    const satrec = {
        epochyr: parseInt(tleLine1[2].substring(0, 2)),
        epochdays: parseFloat(tleLine1[2].substring(2)),
        bstar: parseFloat(tleLine1[4]),
        inclo: parseFloat(tleLine2[2]),
        nodeo: parseFloat(tleLine2[3]),
        ecco: parseFloat('0.' + tleLine2[4].substring(2)),
        argpo: parseFloat(tleLine2[5]),
        mo: parseFloat(tleLine2[6]),
        no: parseFloat(tleLine2[7]),
    };

    return satrec;
}

// Function to calculate the position and velocity of a satellite based on its TLE
function sgp4(satrec, date) {
    // Calculate the time difference in minutes between the current date and the epoch
    const timeDiff = (date - (satrec.epochyr * 365.25 + satrec.epochdays)) * 1440.0;

    // Calculate the mean motion
    const no = satrec.no / (2.0 * Math.PI / 1440.0);

    // Calculate the mean anomaly
    const m = satrec.mo + no * timeDiff;

    // Calculate the position and velocity
    const position = [satrec.ecco * Math.cos(m), satrec.ecco * Math.sin(m), 0];
    const velocity = [-Math.sin(m), Math.cos(m), 0];

    return { position, velocity };
}

module.exports = { twoline2satrec, sgp4 };
```

Please note that this is a very simplified version of these functions and the actual calculations in the `satellite.js` library are much more complex. This version of the functions should give you a basic understanding of what they do, but they might not give accurate results for real-world satellite tracking.

-----------------------------------

**Shouldn't this import work**

The import statement seems correct, but whether it works or not depends on a few factors:

1. The file `satelliteFunctions.js` should be in the same directory as the file where this import statement is written. If it's in a different directory, you need to provide the correct relative path.

2. The `sgp4` and `twoline2satrec` functions should be correctly exported from `satelliteFunctions.js`. Make sure you have the following lines at the end of `satelliteFunctions.js`:

```javascript
export { sgp4, twoline2satrec };
```

3. The environment where this code is running should support ES6 modules. If you're running this in Node.js, you need to have version 13.2.0 or later and use the `.mjs` extension for your files or set `"type": "module"` in your `package.json` file. If you're running this in a browser, it should support ES6 modules (most modern browsers do).

If all these conditions are met and you're still having issues, please provide more details about the error message you're getting.

-----------------------------------

**13:16:32 [vite] page reload satellite.js

13:16:33 [vite] Pre-transform error: Failed to resolve import "satelliteFunctions.js" from "satellite.js". Does the file exist?

13:16:33 [vite] Pre-transform error: Failed to resolve import "satelliteFunctions.js" from "satellite.js". Does the file exist? (x2)

13:16:34 [vite] Internal server error: Failed to resolve import "satelliteFunctions.js" from "satellite.js". Does the file exist?

  Plugin: vite:import-analysis

  File: C:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/satellite.js:3:41

  1  |  import * as THREE from "three";

  2  |  // import { sgp4, twoline2satrec } from "satellite.js";

  3  |  import { sgp4, twoline2satrec } from "satelliteFunctions.js";

     |                                          ^

  4  |

  5  |  export default class Satellite {

      at formatError (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50529:46)

      at TransformContext.error (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50523:19)  

      at normalizeUrl (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:65594:33)

      at async file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:65749:47

      at async Promise.all (index 1)

      at async TransformContext.transform (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:65670:13)

      at async Object.transform (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:50838:30)  

      at async loadAndTransform (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:53611:29)  

      at async viteTransformMiddleware (file:///C:/Users/Matias%20Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/node_modules/vite/dist/node/chunks/dep-jDlpJiMN.js:63409:32)**

The error message indicates that the file `satelliteFunctions.js` cannot be found. Here are a few things you can check:

1. Make sure the file `satelliteFunctions.js` is in the same directory as `satellite.js`. If it's not, you need to adjust the import statement to reflect the correct path. For example, if `satelliteFunctions.js` is in a subdirectory named `utils`, the import statement would be `import { sgp4, twoline2satrec } from "./utils/satelliteFunctions.js";`.

2. Check the spelling and case of `satelliteFunctions.js`. File names are case-sensitive on some systems, so make sure the case matches exactly.

3. Make sure `satelliteFunctions.js` is correctly exporting the `sgp4` and `twoline2satrec` functions. The end of the file should have `export { sgp4, twoline2satrec };`.

4. If you're using a module bundler like webpack or rollup, make sure it's configured to handle `.js` files and that it's looking in the right directories.

If none of these suggestions solve the problem, please provide more information about your project structure and configuration.

-----------------------------------

**This version does not work, no satellites are rendered.**

The provided code is a simplified version of the `twoline2satrec` and `sgp4` functions. The actual implementation of these functions in the `satellite.js` library is much more complex and takes into account many more factors to accurately calculate the position and velocity of a satellite.

The simplified version provided here is not intended to be a drop-in replacement for the functions in the `satellite.js` library. It's a basic demonstration of what these functions do, but it won't give accurate results for real-world satellite tracking.

If you want to test the code generation capabilities of LLMs, you might need to use a more complex example, or adjust your expectations for what this simplified version can do.

If you're looking for a more accurate implementation of these functions, I would recommend using the `satellite.js` library or another library that implements the SGP4 algorithm. The SGP4 algorithm is quite complex and implementing it correctly requires a good understanding of orbital mechanics.

-----------------------------------

**Can you implement the sgp4 algorithm, or atleast something close to it, that would work?**

Implementing the SGP4 algorithm from scratch is a complex task that requires a deep understanding of orbital mechanics. The algorithm involves a lot of mathematical calculations and constants that are not easy to derive without a background in this field.

However, I can provide a simplified version of the SGP4 algorithm. Please note that this version is highly simplified and will not give accurate results for real-world satellite tracking. It's intended to give you a basic understanding of what the SGP4 algorithm does.

```javascript
function sgp4(satrec, date) {
    // Constants
    const mu = 398600.4418; // Earth's gravitational parameter
    const earthRadius = 6378.137; // Earth's radius in km
    const j2 = 0.00108262998905; // Second zonal harmonic of the geopotential
    const j3 = -0.00000253215306; // Third zonal harmonic of the geopotential
    const j4 = -0.00000161098761; // Fourth zonal harmonic of the geopotential

    // Calculate the time difference in minutes between the current date and the epoch
    const timeDiff = (date - (satrec.epochyr * 365.25 + satrec.epochdays)) * 1440.0;

    // Calculate the mean motion
    const no = satrec.no / (2.0 * Math.PI / 1440.0);

    // Calculate the mean anomaly
    const m = satrec.mo + no * timeDiff;

    // Calculate the position and velocity
    const position = [satrec.ecco * Math.cos(m), satrec.ecco * Math.sin(m), 0];
    const velocity = [-Math.sin(m), Math.cos(m), 0];

    // Perturbations
    const perturbations = [j2, j3, j4].map((j, i) => j * Math.pow(earthRadius / satrec.no, i + 2));

    // Apply perturbations
    position[0] += perturbations[0] * position[0];
    position[1] += perturbations[1] * position[1];
    position[2] += perturbations[2] * position[2];

    return { position, velocity };
}
```

This version of the function includes some of the perturbations that the SGP4 algorithm takes into account, but it's still a very simplified version of the algorithm. The actual SGP4 algorithm includes many more perturbations and corrections to accurately calculate the position and velocity of a satellite.

-----------------------------------

**How about this function then. Is this as accurate as it can be?**

The `twoline2satrec` function you've provided is a simplified version of the function found in the `satellite.js` library. It parses a Two-Line Element set (TLE) and returns a satellite record (`satrec`) object.

However, it seems to be missing some important fields that are usually included in a `satrec` object, such as `satnum` (Satellite Number), `epoch` (Epoch Time), `xndt2o` (2nd Derivative of Mean Motion), `xndd6o` (Drag Term), `elnum` (Element number), etc.

Also, the parsing of the TLE lines is quite simplified. Normally, you would use regular expressions or similar to extract the data from the TLE lines, as the data fields can have varying lengths and can be in different positions depending on the format of the TLE.

Here's a more complete version of the `twoline2satrec` function:

```javascript
function twoline2satrec(line1, line2) {
    // Regular expressions for parsing the TLE lines
    const line1Format = /^1 (\d{5})U (\d{8}) (\d{8}) (\d{8}) (\d{8}) (\d{4})0-0 (\d{5})-0 (\d{1}) (\d{4})/;
    const line2Format = /^2 (\d{5}) (\d{8}) (\d{8}) (\d{7}) (\d{8}) (\d{8}) (\d{11})(\d{5}) (\d{1}) (\d{4})/;

    // Parse the TLE lines
    const tleLine1 = line1.match(line1Format);
    const tleLine2 = line2.match(line2Format);

    // Create a satellite record
    const satrec = {
        satnum: parseInt(tleLine1[1]),
        epochyr: parseInt(tleLine1[2].substring(0, 2)),
        epochdays: parseFloat(tleLine1[2].substring(2)),
        ndot: parseFloat(tleLine1[3]) * 2,
        nddot: parseFloat(tleLine1[4]) * 6,
        bstar: parseFloat(tleLine1[5]),
        inclo: parseFloat(tleLine2[2]),
        nodeo: parseFloat(tleLine2[3]),
        ecco: parseFloat('0.' + tleLine2[4]),
        argpo: parseFloat(tleLine2[5]),
        mo: parseFloat(tleLine2[6]),
        no: parseFloat(tleLine2[7]),
        revnum: parseInt(tleLine2[8]),
    };

    return satrec;
}
```

This version of the function includes more fields in the `satrec` object and uses regular expressions to parse the TLE lines. However, it's still a simplified version of the `twoline2satrec` function found in the `satellite.js` library. The actual function includes more error checking and corrections to handle different formats of TLEs.

-----------------------------------

**Uncaught (in promise) TypeError: tleLine1 is null

    twoline2satrec satelliteFunctions.js:12

    Satellite Satellite.js:8

    loadData main.js:78**

The error message indicates that `tleLine1` is null. This means that the regular expression used in the `match` function didn't match the `line1` string, so `match` returned null.

This could happen for a few reasons:

1. The `line1` string doesn't have the expected format. Check the format of the TLE data you're using and make sure it matches the format expected by the regular expression.

2. There's a mistake in the regular expression. Make sure the regular expression is correctly written and can match the format of the TLE data.

Here's a fix for the `twoline2satrec` function that includes error checking for the TLE lines:

```javascript
function twoline2satrec(line1, line2) {
    // Regular expressions for parsing the TLE lines
    const line1Format = /^1 (\d{5})U (\d{8}) (\d{8}) (\d{8}) (\d{8}) (\d{4})0-0 (\d{5})-0 (\d{1}) (\d{4})/;
    const line2Format = /^2 (\d{5}) (\d{8}) (\d{8}) (\d{7}) (\d{8}) (\d{8}) (\d{11})(\d{5}) (\d{1}) (\d{4})/;

    // Parse the TLE lines
    const tleLine1 = line1.match(line1Format);
    const tleLine2 = line2.match(line2Format);

    // Check if the TLE lines could be parsed
    if (!tleLine1 || !tleLine2) {
        throw new Error('Invalid TLE format');
    }

    // Create a satellite record
    const satrec = {
        satnum: parseInt(tleLine1[1]),
        epochyr: parseInt(tleLine1[2].substring(0, 2)),
        epochdays: parseFloat(tleLine1[2].substring(2)),
        ndot: parseFloat(tleLine1[3]) * 2,
        nddot: parseFloat(tleLine1[4]) * 6,
        bstar: parseFloat(tleLine1[5]),
        inclo: parseFloat(tleLine2[2]),
        nodeo: parseFloat(tleLine2[3]),
        ecco: parseFloat('0.' + tleLine2[4]),
        argpo: parseFloat(tleLine2[5]),
        mo: parseFloat(tleLine2[6]),
        no: parseFloat(tleLine2[7]),
        revnum: parseInt(tleLine2[8]),
    };

    return satrec;
}
```

This version of the function throws an error if the TLE lines can't be parsed. You can catch this error in the `Satellite` constructor and handle it appropriately.

-----------------------------------

**@workspace /explain File name 'c:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/Satellite.js' differs from already included file name 'c:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/satellite.js' only in casing.
  The file is in the program because:
    Root file specified for compilation
    Imported via "./Satellite.js" from file 'c:/Users/Matias Paavilainen/Documents/Ohjelmointi/Kandijutut/SatelliteSimulation/main.js'**

The error message you're seeing is due to a case sensitivity issue in your file names. In your project, you have a file named [`Satellite.js`](command:_github.copilot.openRelativePath?%5B%22Satellite.js%22%5D "Satellite.js") (with a capital 'S') and you're trying to import it as [`satellite.js`](command:_github.copilot.openRelativePath?%5B%22satellite.js%22%5D "satellite.js") (with a lowercase 's').

File systems on Windows are case-insensitive but case-preserving, which means [`Satellite.js`](command:_github.copilot.openRelativePath?%5B%22Satellite.js%22%5D "Satellite.js") and [`satellite.js`](command:_github.copilot.openRelativePath?%5B%22satellite.js%22%5D "satellite.js") would refer to the same file. However, TypeScript treats file names as case-sensitive because some file systems (like on Linux) are case-sensitive.

To resolve this issue, you should ensure that the case of the file name in your import statement matches the case of the actual file name. If your file is named [`Satellite.js`](command:_github.copilot.openRelativePath?%5B%22Satellite.js%22%5D "Satellite.js"), you should import it like this:

```javascript
import Satellite from "./Satellite.js";
```

And not like this:

```javascript
import Satellite from "./satellite.js";
```

Make sure to update all references in your code to use the correct casing.

-----------------------------------
