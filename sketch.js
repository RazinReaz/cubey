let z = -20;
const screen_z = 150;
const WIDTH = 700;
const HEIGHT = 500;

const ground_y = 100;

const STATE = {
  HAPPY: 0,
  FRANTIC:1
}

const states = [
  {name: "Happy", color: [248, 225, 100], speed: 8},
  {name: "frantic", color: [80, 80, 180], speed: 20}
]

const cube_width = 50;
const cube_height = 50;
const cube_depth = 10;

let cube_center;
let cube_destination;
let cube_facing, eye_facing;
let cube_state = STATE.FRANTIC;

let mouse_vec;
let frantic_timer;




function update_state(target) {
  if (target.x < -width/2 || target.x > width/2 || target.y < -height / 2 || target.y > height/2){
    return STATE.FRANTIC;
  } else {
    return STATE.HAPPY;
  }
}

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
    ellipsoid(5, 10, 5);
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

function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  cube_center = createVector(0, 0, z);
  mouse_vec = createVector(0, 0, screen_z);
  cube_destination = createVector(random(-0.5, 0.5) * width, random(-0.5, 0.5) * height, screen_z)
  cube_facing = createVector(random(-0.5, 0.5) * width, random(-0.5, 0.5) * height, screen_z)
  frantic_timer = new Timer(100);
}

function draw() {
  background(251);
  draw_ground_grid(ground_y, -1000, 1000, -1000, 1000)
  // noStroke()
  // lights()

  mouse_vec.set(mouseX - width / 2, mouseY - height/ 2, screen_z);
  
  cube_state = update_state(mouse_vec)

  if (cube_state == STATE.FRANTIC) {
    if(frantic_timer.time_over()) {
      console.log("time over. seeking new vector");
      cube_destination = createVector(random(-0.5, 0.5) * width, random(-0.5, 0.5) * height, screen_z)
    }
    frantic_timer.start_with_random_duration(50, 200);
  } else if (cube_state == STATE.HAPPY) {
    cube_destination = mouse_vec
    frantic_timer.reset()
  }

  // Not the cube facing vector should arrive at the cube_destination vector
  cube_facing = arrive_at(cube_facing, cube_destination, states[cube_state].speed);
  eye_facing = arrive_at(cube_facing, cube_destination, states[cube_state].speed * 1.3);

  
  
  render_cube(cube_center, cube_state, cube_facing, eye_facing)
  frantic_timer.update()
  // orbitControl()
}
