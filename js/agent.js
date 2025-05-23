// Defines Agent class
export class Agent {
    constructor(name, mood, energy, position, world) {
        this.name = name;
        this.mood = mood;  // 'happy', 'neutral', 'sad'
        this.energy = energy;
        this.position = position;
        this.world = world;
    }

    move(findPath) {
        // Move to a random target using pathfinding
        const target = {x: Math.floor(Math.random() * this.world.width), y: Math.floor(Math.random() * this.world.height)};
        const path = findPath(this.position, target, this.world);
        if (path.length > 1) this.position = path[1];  // Move one step
        this.energy -= 10;
    }

    updateEnergy() {
        if (this.world.grid[this.position.y][this.position.x] === 'home') this.energy = Math.min(100, this.energy + 20);
        if (this.energy < 20) this.mood = 'sad';
    }

    interact(other, memory) {
        const outcome = Math.random() > 0.3 ? 'positive' : 'negative';
        if (outcome === 'positive') {
            this.mood = 'happy';
            other.mood = 'happy';
            console.log(`${this.name} and ${other.name} had a great chat!`);
        } else {
            this.mood = 'sad';
            other.mood = 'sad';
            console.log(`${this.name} and ${other.name} argued!`);
        }
        memory.store(`${this.name}-${other.name}`, outcome);
    }
}
