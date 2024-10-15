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

export { sgp4, twoline2satrec};