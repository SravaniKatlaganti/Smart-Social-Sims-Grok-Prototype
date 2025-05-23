# Smart Social Sims Prototype

A web-based social simulation game inspired by social sims. Agents move on a grid, interact socially, and update moods/energy in real-time. This prototype features a continuous animation loop, interactive controls, and pathfinding that avoids obstacles.

## Features
- **World**: 10x10 grid with locations (Home as walls/obstacles, Park, Cafe).
- **Agents**: 3 agents (Alice, Bob, Charlie) with moods (happy/neutral/sad), energy levels, and behaviors like moving and interacting.
- **Real-Time Simulation**: Runs continuously using `requestAnimationFrame` for smooth rendering at the browser's frame rate. Decisions (e.g., movement, interactions) occur roughly every second, adjusted by a speed multiplier.
- **Pathfinding**: Real-time A* algorithm for agent movement, treating 'home' tiles as impassable walls. Agents find the shortest path or stay put if blocked.
- **Interactions**: Agents chat or argue when in the same location, affecting moods. Uses a simple memory store for past interactions.
- **HUD and Controls**:
  - Elapsed time display (#clock).
  - Pause/Resume buttons to stop/resume simulation updates (rendering continues for paused state visualization).
  - Speed slider (0.5x to 2x) to adjust simulation speed (affects decision timing and energy updates).
- **Time-Based Updates**: Energy and moods update gradually using deltaTime for frame-rate independence.

## Setup
1. Clone this repo or create the file structure locally.
2. Ensure you have the full file tree (see below).
3. Open `index.html` in a modern browser (e.g., Chrome, Firefox). The simulation starts automatically.
4. Use the on-screen buttons and slider to control the simulation.

No external dependencies required—just vanilla JavaScript.

## Controls
- **Pause Button**: Stops simulation updates (e.g., no movement or energy changes). #status shows "Paused".
- **Resume Button**: Resumes the simulation.
- **Speed Slider**: Adjusts speed from 0.5x (slower) to 2x (faster). The current speed is displayed next to the slider.
- **Canvas**: Visualizes the grid, agents, and their states in real-time.

## File Tree
smart-social-sims/
├── index.html              # Main entry point (HTML with canvas and controls)
├── README.md               # Project overview and instructions
├── /css
│   └── styles.css          # Styling for canvas, HUD, and controls
├── /js
│   ├── main.js             # Bootstraps the game, handles loop, pause/resume, and speed
│   ├── world.js            # Grid world and canvas drawing
│   ├── agent.js            # Agent class with behaviors and updates
│   ├── memory.js           # Simple memory store for interactions
│   └── pathfinding.js      # A* pathfinding with obstacle handling
└── /assets
├── npc-blue.png        # Blue NPC sprite (placeholder)
├── npc-red.png         # Red NPC sprite (placeholder)
└── tiles.png           # Grid tiles (placeholder)

## How It Works
- The simulation runs indefinitely until paused.
- Agents decide to move (via A*) and interact ~every second (scaled by speed).
- Energy drains over time and restores at non-home locations; moods change based on energy and interactions.
- Console logs show interaction details for debugging.

## Extending
- **Add More Agents**: Modify the `agents` array in `main.js`.
- **Customize Pathfinding**: Adjust obstacles or heuristics in `pathfinding.js`.
- **Improve Visuals**: Replace placeholder images in `/assets` with custom PNGs.
- **Advanced Features**: Add user input for agent control or integrate web search for dynamic events.
- For performance on larger grids, optimize A* (e.g., limit search depth).

If you encounter issues, check the browser console. Built on May 22, 2025—feel free to contribute or suggest improvements!
