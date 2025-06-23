let z = -20;
const screen_z = 150;
const WIDTH = 500;
const HEIGHT = 500;

const ground_y = 100;


let mouse_vec;
let frantic_timer;


function setup() {
  createCanvas(WIDTH, HEIGHT, WEBGL);
  cube_center = createVector(0, 0, z);
  mouse_vec = createVector(-10000, -10000, screen_z);
  
  cube_destination = createVector(random(-0.5, 0.5) * width, random(-0.5, 0.5) * height, screen_z)
  cube_facing = createVector(random(-0.5, 0.5) * width, random(-0.5, 0.5) * height, screen_z)
  frantic_timer = new Timer(100);
}

function draw() {
  background(251);
  draw_ground_grid(ground_y, -1000, 1000, -1000, 1000)
  // noStroke()
  // lights()

  cube_state = update_state(mouse_vec)
  mouse_vec.set(mouseX - width / 2, mouseY - height/ 2, screen_z);

  state_behaviour(cube_state);

  // Not the cube facing vector should arrive at the cube_destination vector
  cube_facing = arrive_at(cube_facing, cube_destination, states[cube_state].speed);
  eye_facing = arrive_at(cube_facing, cube_destination, states[cube_state].speed * 1.3);

  
  
  render_cube(cube_center, cube_state, cube_facing, eye_facing)
  frantic_timer.update()
  // orbitControl()
}
