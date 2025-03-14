// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/hacZU523FyM

var colors = [[248, 12, 18], [238, 17, 0], [255, 51, 17], [255, 68, 34], [255, 102, 68], [255, 153, 51], [254, 174, 45], [204, 187, 51], [208, 195, 16], [170, 204, 34], [105, 208, 37], [34, 204, 170], [18, 189, 185], [17, 170, 187], [68, 68, 221], [51, 17, 187], [59, 12, 189], [68, 34, 153]]

function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);
  this.color = colors[floor(random(0,colors.length-1))];

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    stroke(this.color[0], this.color[1], this.color[2]);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) {
    var last_pos = p5.Vector.sub(this.pos, this.vel);
    var last_angle = p5.Vector.sub(last_pos, asteroid.pos).heading();
    var new_angle = p5.Vector.sub(this.pos, asteroid.pos).heading();
    var asteroid_vertices = asteroid.verticesFromAngles(last_angle, new_angle);
    for(var i = 0; i < asteroid_vertices.length - 1; i++) {
      if(lineIntersect(last_pos, this.pos, asteroid_vertices[i], asteroid_vertices[i + 1])) {
        return true;
      }
    }
    return false;
  }

  this.offscreen = function() {
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }


}
