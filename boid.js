class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(1, 2));

    this.acceleration = createVector();
    
    this.maxForce = 0.05;
    this.maxSpeed = 4;
    this.perception = 25;
  }

  //Wraparound the boids
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.x = height;
    }
  }

  //boid steers towards average velocity of local boids
  align(boids) {
    let alignment = createVector();
    let cohesion = createVector();
    let separation = createVector();
    let total = 0;

    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );

      if (other != this && d < this.perception) {
        //align
        alignment.add(other.velocity);
        //cohere
        cohesion.add(other.position);
        //separate
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d ** 2);
        separation.add(diff);

        total++;
      }
    }

    if (total > 0) {
      alignment = this.doobydo(alignment, total);
      cohesion.sub(this.position);
      cohesion = this.doobydo(cohesion, total);
      separation = this.doobydo(separation, total);
    }

    alignment.mult(alignSlider.value());
    cohesion.mult(cohesionSlider.value());
    separation.mult(separationSlider.value());

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  doobydo(v, total) {
    v.div(total);
    v.setMag(this.maxSpeed);
    v.sub(this.velocity);
    v.limit(this.maxForce);
    return v;
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
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