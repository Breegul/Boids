class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(1, 2));
    this.acceleration = createVector();
  }
  
  align(boids) {
    let perception = 50;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x, 
        this.position.y, 
        other.position.x,  
        other.position.y
      );
      if (other != this && d < perception) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.velocity);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration = alignment;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }
  
  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y);
  }
}

/*
  Separation: steer to avoid crowding local flockmates
  Alignment: steer towards the average heading of local flockmates
  Cohesion: steer to move toward the average position of local flockmates
*/