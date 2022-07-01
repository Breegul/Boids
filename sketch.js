const flock = [];
const numBoids = 200;

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(680, 500);
  createP("Alignment");
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  createP("Cohesion");
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  createP("Separation");
  separationSlider = createSlider(0, 2, 1, 0.1);

  for (let i = 0; i < numBoids; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);

  for (let boid of flock) {
    boid.edges();
    boid.align(flock);
    boid.update();
    boid.show();
  }
}