const StarPositionGenerator = {
  sineWave(numStars, amplitudeY, amplitudeZ, frequencyY, frequencyZ, spacing) {
    const starVertices = [];
    for (let i = 0; i < numStars; i++) {
      const x = i * spacing - (numStars * spacing) / 2;
      const y = amplitudeY * Math.sin(frequencyY * x);
      const z = amplitudeZ * Math.cos(frequencyZ * x);
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

  ellipse(numStars, majorAxis, minorAxis) {
    const maxDistance = 520;
    majorAxis = Math.min(majorAxis, maxDistance / 2);
    minorAxis = Math.min(minorAxis, maxDistance / 2);

    const starVertices = [];
    for (let i = 0; i < numStars; i++) {
      const angle = (i / numStars) * 2 * Math.PI;
      const x = majorAxis * Math.cos(angle);
      const y = minorAxis * Math.sin(angle);
      const z = 0;
      if (Math.sqrt(x ** 2 + y ** 2 + z ** 2) <= maxDistance) {
        starVertices.push(x, y, z);
      }
    }
    return starVertices;
  },

  torus(numStars, radius, tubeRadius) {
    const maxDistance = 520;
    radius = Math.min(radius, maxDistance / 2);
    tubeRadius = Math.min(tubeRadius, maxDistance / 10);

    const starVertices = [];
    for (let i = 0; i < numStars; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
      const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
      const z = tubeRadius * Math.sin(v);

      if (Math.sqrt(x ** 2 + y ** 2 + z ** 2) <= maxDistance) {
        starVertices.push(x, y, z);
      }
    }
    return starVertices;
  },

  sphere(numStars, radius) {
    const maxDistance = 300;
    radius = Math.min(radius, maxDistance);

    const starVertices = [];
    const offset = 2 / numStars;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numStars; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y ** 2);
      const phi = i * increment;

      const x = Math.cos(phi) * r * radius;
      const z = Math.sin(phi) * r * radius;

      if (Math.sqrt(x ** 2 + y ** 2 + z ** 2) <= maxDistance) {
        starVertices.push(x, y * radius, z);
      }
    }
    return starVertices;
  },

  helix(numStars, radius, height, spacing) {
    const maxDistance = 520;
    radius = Math.min(radius, maxDistance / 2);
    height = Math.min(height, maxDistance / 4);

    const starVertices = [];
    for (let i = 0; i < numStars; i++) {
      const angle = i * spacing;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = (height / numStars) * i - height / 2;

      if (Math.sqrt(x ** 2 + y ** 2 + z ** 2) <= maxDistance) {
        starVertices.push(x, y, z);
      }
    }
    return starVertices;
  },

  doubleHelix(
    numStars,
    radius = 100,
    height = 300,
    turns = 5,
    separation = 20
  ) {
    const starVertices = [];
    const angularStep = (2 * Math.PI * turns) / numStars;
    const heightStep = height / numStars;

    for (let i = 0; i < numStars; i++) {
      const theta = i * angularStep;
      const y = i * heightStep - height / 2;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);

      starVertices.push(x, y, z);

      const x2 = radius * Math.cos(theta + Math.PI) + separation;
      const z2 = radius * Math.sin(theta + Math.PI);

      starVertices.push(x2, y, z2);
    }

    return starVertices;
  },

  spiral(numStars, radius, density) {
    const maxDistance = 520;
    radius = Math.min(radius, maxDistance / 2);

    const starVertices = [];
    for (let i = 0; i < numStars; i++) {
      const angle = i * density;
      const r = radius * (i / numStars);

      const x = r * Math.cos(angle);
      const z = r * Math.sin(angle);
      const y = 0;

      if (Math.sqrt(x ** 2 + y ** 2 + z ** 2) <= maxDistance) {
        starVertices.push(x, y, z);
      }
    }
    return starVertices;
  },
};

export default StarPositionGenerator;
