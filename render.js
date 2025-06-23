
const cube_width = 50;
const cube_height = 50;
const cube_depth = 10;

let cube_center;
let cube_destination;
let cube_facing, eye_facing;

function render_cube(center, state, to_vec, eye_dir) {
    push();
    translate(center.x, center.y, center.z);
    fill(states[state].color);
    face_towards(to_vec, center);
    box(cube_width, cube_height, cube_depth);
    
    //eyes
  
    for (let side of [-1, 1]) {
      push();
      fill(51);
      let x = 20 * side, y = -15, z = 20;
      let c = createVector(x, y, z);
      translate(x, y, z);
      face_towards(eye_dir, c)
      translate(0, 0, cube_depth * 1.2)
      if (state === STATE.ECSTATIC) {
        // draw happy eyes
        stroke(51);
        strokeWeight(2);
        noFill();
        beginShape();
        for (let angle = 0; angle <= PI; angle += PI / 20) {
          let r = 5;
          let vx = r * cos(angle);
          let vy = - r * sin(angle);
          vertex(vx, vy, 0);
        }
        endShape();
      } else {
        noStroke();
        fill(51);
        ellipsoid(5, 10, 5);
      }
      pop();
    }
    pop();
  }
  
  
  function draw_ground_grid(y, x_start, x_end, z_start, z_end, x_offset = 100, z_offset = 100) {
    push();
    stroke(100);
    // console.log(linePerspective(false))
    // strokeWeight(1);
    for (let x = x_start; x <= x_end; x += x_offset) {
      line(x, y, z_start, x, y, z_end);
    }
    for (let z = z_start; z <= z_end; z += z_offset){
      line(x_start, y, z, x_end, y, z);
    }
    
    pop();
  }
  
  function arrive_at(facing, destination, max_speed = 10, d_threshold = 1, vicinity = 100) {
    let desire = p5.Vector.sub(destination, facing);
    let d = desire.mag();
    let factor = d < vicinity ? (d < d_threshold ? 0 : d / vicinity) : 1;
    desire.setMag(max_speed * factor);
    return p5.Vector.add(cube_facing, desire);
  }
  
  function face_towards(target, center) {
    let vec = p5.Vector.sub(target, center);
    let d = vec.mag();
    let theta = Math.atan(vec.x / vec.z);
    let phi = Math.asin(vec.y / d);
    rotateY(theta);
    rotateX(-1 * phi);
  }
  