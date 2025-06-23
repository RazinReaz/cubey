
const STATE = {
    HAPPY: 0,
    FRANTIC: 1,
    ECSTATIC: 2
}
  
const states = [
    {name: "Happy", color: [248, 225, 100], speed: 12},
    {name: "Frantic", color: [80, 80, 180], speed: 25},
    {name: "Ecstatic", color: [255, 0, 110], speed: 20}
]


let cube_state = STATE.FRANTIC;

let jumping_t = 0;
let jumping_t_direction = 1;


function jumping_behaviour(cube_center) {
    const jumping_height = 50;
    cube_center.y = -jumping_height * Math.sin(jumping_t)
}

function return_slowly_from_ecstatic(cube_center) {
    if (cube_center.y < 0) {
        jumping_t_direction = -1;
        const res = oscillateVar(jumping_t, jumping_t_direction);
        jumping_t = res.value;
        jumping_t_direction = res.direction;
        jumping_behaviour(cube_center);
    }
}

function oscillateVar(value, direction, min = 0, max = PI, speed = 0.08) {
    value += direction * speed;
    if (value >= max) {
        value = max;
        direction = -1;
    } else if (value <= min) {
        value = min;
        direction = 1;
    }
    return { value, direction };
}


function update_state(target) {
    if ((target.x) ** 2 + (target.y) ** 2  < 15000) {
        return STATE.ECSTATIC;
    } else if (target.x > -width/2 && target.x < width/2 && target.y > -height / 2 && target.y < height/2){
        return STATE.HAPPY;
    } else {
        return STATE.FRANTIC;
    }
  }
  
  
function state_behaviour(cube_state) {
    if (cube_state == STATE.FRANTIC) {
        return_slowly_from_ecstatic(cube_center);
        if (frantic_timer.time_over()) {
            cube_destination = createVector(random(-0.5, 0.5) * width, random(-0.5, 0.5) * height, screen_z);
        }
        frantic_timer.start_with_random_duration(50, 100);
    } else if (cube_state == STATE.HAPPY) {
        return_slowly_from_ecstatic(cube_center);
        cube_destination = mouse_vec;
        frantic_timer.reset();
    } else if (cube_state == STATE.ECSTATIC) {
        const res = oscillateVar(jumping_t, jumping_t_direction);
        jumping_t = res.value;
        jumping_t_direction = res.direction;
        jumping_behaviour(cube_center);
    }
}