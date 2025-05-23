// Bootstraps the game and runs the continuous simulation loop
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

// Timing and state variables
let lastTime = performance.now();
let elapsedTime = 0;  // Total elapsed seconds
let decisionAccumulator = 0;  // For ~1s decisions
const baseDecisionInterval = 1000;  // 1 second in ms
let speed = 1;  // Default speed multiplier (from slider)
let isPaused = false;
const memory = new Memory();

// UI event listeners
document.getElementById('pauseBtn').addEventListener('click', () => {
    isPaused = true;
    document.getElementById('status').textContent = 'Paused';
});
document.getElementById('resumeBtn').addEventListener('click', () => {
    isPaused = false;
    document.getElementById('status').textContent = 'Simulation Running...';
});
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');
speedSlider.addEventListener('input', () => {
    speed = parseFloat(speedSlider.value);
    speedValue.textContent = `${speed}x`;
});

// Continuous simulation loop
function simulate(currentTime) {
    const deltaTime = (currentTime - lastTime) * speed;  // Apply speed multiplier
    lastTime = currentTime;

    if (!isPaused) {
        elapsedTime += deltaTime / 1000;  // Accumulate seconds
        decisionAccumulator += deltaTime;
        document.getElementById('clock').textContent = `Elapsed: ${Math.floor(elapsedTime)}s`;

        // Update agents with deltaTime
        agents.forEach(agent => agent.update(deltaTime));

        // Make decisions roughly every 1s (adjusted by speed)
        if (decisionAccumulator >= baseDecisionInterval) {
            agents.forEach(agent => {
                agent.decide(findPath);
                // Check for interactions
                const others = agents.filter(a => a !== agent && a.position.x === agent.position.x && a.position.y === agent.position.y);
                if (others.length) {
                    agent.interact(others[0], memory);
                }
            });
            decisionAccumulator -= baseDecisionInterval;
        }
    }

    // Render every frame (even when paused)
    world.draw(agents);

    requestAnimationFrame(simulate);
}

// Start the loop
requestAnimationFrame(simulate);
