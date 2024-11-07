const StarPositionGenerator = {
  sineWave(numStars, amplitudeY, amplitudeZ, frequencyY, frequencyZ, spacing) {
    const starVertices = [];

    for (let i = 0; i < numStars; i++) {
      const x = i * spacing - (numStars * spacing) / 2; // Center the wave
      const y = amplitudeY * Math.sin(frequencyY * x); // Sine wave for y-coordinate
      const z = amplitudeZ * Math.cos(frequencyZ * x); // Cosine wave for z-coordinate

      starVertices.push(x, y, z);
    }

    return starVertices;
  },

  random(numStars, minDistance, maxDistance) {
    const starVertices = [];

    for (let i = 0; i < numStars; i++) {
      const randRadius = Math.random();
      const randTheta = Math.random();
      const randPhi = Math.random();
      const radius = minDistance + randRadius * (maxDistance - minDistance);
      const theta = randTheta * 2 * Math.PI;
      const phi = Math.acos(2 * randPhi - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      starVertices.push(x, y, z);
    }

    return starVertices;
  },
};

export default StarPositionGenerator;
