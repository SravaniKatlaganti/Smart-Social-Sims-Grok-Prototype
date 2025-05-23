// Basic A* pathfinding helper
export function findPath(start, goal, world) {
    // Simplified A* (returns a dummy path for prototype)
    const path = [start];
    for (let i = 0; i < 5; i++) {  // Simulate steps
        const nextX = Math.min(Math.max(start.x + (goal.x > start.x ? 1 : -1), 0), world.width - 1);
        const nextY = Math.min(Math.max(start.y + (goal.y > start.y ? 1 : -1), 0), world.height - 1);
        path.push({x: nextX, y: nextY});
        start = {x: nextX, y: nextY};
        if (nextX === goal.x && nextY === goal.y) break;
    }
    return path;
}
