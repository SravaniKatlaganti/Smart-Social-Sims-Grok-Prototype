// Bootstraps the game and runs the simulation loop
import { World } from './world.js';
import { Agent } from './agent.js';
import { Memory } from './memory.js';
import { findPath } from './pathfinding.js';

// Initialize canvas and world
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const world = new World(10, 10, ctx);  // 10x10 grid

// Create agents
const agents = [
    new Agent('Alice', 'neutral', 80, {x: 1, y: 1}, world),
    new Agent('Bob', 'happy', 60, {x: 5, y: 5}, world),
    new Agent('Charlie', 'sad', 40, {x: 8, y: 8}, world)
];

// Simulation loop
let turn = 0;
const maxTurns = 10;
const memory = new Memory();

function simulate() {
    if (turn >= maxTurns) return;
    turn++;
    document.getElementById('status').textContent = `Turn ${turn}`;

    agents.forEach(agent => {
        agent.move(findPath);
        agent.updateEnergy();
        // Interactions (simplified)
        const others = agents.filter(a => a !== agent && a.position.x === agent.position.x && a.position.y === agent.position.y);
        if (others.length) {
            agent.interact(others[0], memory);
        }
    });

    world.draw(agents);
    requestAnimationFrame(simulate);
}

simulate();
