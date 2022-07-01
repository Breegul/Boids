const flock = [];
const numBoids = 100;

function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < numBoids; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);

  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}