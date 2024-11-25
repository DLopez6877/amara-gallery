import vars from "./vars";

const starPositions = [
  {
    name: "Random",
    method: "random",
    args: [vars.NUMBER_OF_STARS, 150, 520],
    algorithm: "Generate random points in spherical coordinates.",
    explanation:
      "The random pattern creates stars distributed randomly in a sphere using spherical coordinates.",
    code: `
const random = (numStars, minDistance, maxDistance) => {
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const r = minDistance + Math.random() * (maxDistance - minDistance);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    vertices.push(x, y, z);
  }
  return vertices;
};
    `,
  },
  {
    name: "Sine Wave",
    method: "sineWave",
    args: [20, 30, 0.02, 0.015, 4],
    algorithm: "Generate a sine and cosine wave in 3D space.",
    explanation:
      "The sine wave creates a sinusoidal path along the x-axis, while the y and z coordinates oscillate.",
    code: `
const sineWave = (numStars, amplitudeY, amplitudeZ, freqY, freqZ, spacing) => {
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const x = i * spacing;
    const y = amplitudeY * Math.sin(freqY * x);
    const z = amplitudeZ * Math.cos(freqZ * x);
    vertices.push(x, y, z);
  }
  return vertices;
};
    `,
  },
  {
    name: "Ellipse",
    method: "ellipse",
    args: [vars.NUMBER_OF_STARS, 150, 50],
    algorithm: "Generate points along an elliptical path.",
    explanation:
      "The ellipse pattern creates stars along an elliptical orbit in 3D space.",
    code: `
const ellipse = (numStars, radiusX, radiusY) => {
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2;
    const x = radiusX * Math.cos(angle);
    const z = radiusY * Math.sin(angle);
    vertices.push(x, 0, z);
  }
  return vertices;
};
    `,
  },
  {
    name: "Torus",
    method: "torus",
    args: [vars.NUMBER_OF_STARS, 100, 30],
    algorithm: "Generate points on a toroidal shape.",
    explanation:
      "The torus pattern places stars in a doughnut-shaped ring in 3D space.",
    code: `
const torus = (numStars, ringRadius, tubeRadius) => {
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2;
    const x = (ringRadius + tubeRadius * Math.cos(angle)) * Math.cos(angle);
    const y = tubeRadius * Math.sin(angle);
    const z = (ringRadius + tubeRadius * Math.cos(angle)) * Math.sin(angle);
    vertices.push(x, y, z);
  }
  return vertices;
};
    `,
  },
  {
    name: "Sphere",
    method: "sphere",
    args: [vars.NUMBER_OF_STARS, 100],
    algorithm: "Generate points on a spherical surface.",
    explanation:
      "The sphere pattern distributes stars evenly on a 3D spherical surface.",
    code: `
const sphere = (numStars, radius) => {
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    vertices.push(x, y, z);
  }
  return vertices;
};
    `,
  },
  {
    name: "Helix",
    method: "helix",
    args: [vars.NUMBER_OF_STARS, 100, 10, 5],
    algorithm: "Generate points along a helical path.",
    explanation:
      "The helix pattern creates a spiral around a central axis in 3D space.",
    code: `
const helix = (numStars, radius, pitch, turns) => {
  const vertices = [];
  const height = pitch * turns;
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2 * turns;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = (i / numStars) * height - height / 2;
    vertices.push(x, y, z);
  }
  return vertices;
};
    `,
  },
  {
    name: "Spiral",
    method: "spiral",
    args: [vars.NUMBER_OF_STARS, 150, 0.05],
    algorithm: "Generate a spiral pattern in 3D space.",
    explanation:
      "The spiral pattern creates a continuously widening spiral around a central axis.",
    code: `
const spiral = (numStars, radius, spacing) => {
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const angle = (i / numStars) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = spacing * i;
    vertices.push(x, y, z);
  }
  return vertices;
};
    `,
  },
];

export default starPositions;
