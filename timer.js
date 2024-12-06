class Timer{
    constructor(duration){
        this.count = 0;
        this.duration = duration;
    }

    start() {
        if (this.count == 0)
            this.count++;
    }

    start_with_random_duration(min_duration, max_duration) {
        if (this.count == 0) {
            this.duration = Math.floor(random(min_duration, max_duration))
            this.count++;
        }
    }

    update() {
        if (this.count != 0) {
            this.count = (this.count + 1) % this.duration;
        }
    }

    time_over() {
        return this.count == 0;
    }

    reset() {
        this.count = 0;
    }
}