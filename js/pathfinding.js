// Real-time A* pathfinding, treating 'home' as walls
export function findPath(start, goal, world) {
    const openSet = [];
    const closedSet = new Set();
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    const getKey = (pos) => `${pos.x},${pos.y}`;
    const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);  // Manhattan distance

    openSet.push(start);
    gScore[getKey(start)] = 0;
    fScore[getKey(start)] = heuristic(start, goal);

    while (openSet.length > 0) {
        // Find node with lowest fScore
        openSet.sort((a, b) => fScore[getKey(a)] - fScore[getKey(b)]);
        const current = openSet.shift();
        const currentKey = getKey(current);

        if (current.x === goal.x && current.y === goal.y) {
            // Reconstruct path
            const path = [];
            let temp = current;
            while (temp) {
                path.unshift(temp);
                temp = cameFrom[getKey(temp)];
            }
            return path;
        }

        closedSet.add(currentKey);

        // Neighbors: up, down, left, right
        const neighbors = [
            {x: current.x + 1, y: current.y},
            {x: current.x - 1, y: current.y},
            {x: current.x, y: current.y + 1},
            {x: current.x, y: current.y - 1}
        ].filter(n => 
            n.x >= 0 && n.x < world.width && n.y >= 0 && n.y < world.height &&  // Bounds
            world.grid[n.y][n.x] !== 'home' &&  // Treat 'home' as wall
            !closedSet.has(getKey(n))
        );

        for (const neighbor of neighbors) {
            const neighborKey = getKey(neighbor);
            const tentativeG = gScore[currentKey] + 1;  // Cost per move

            if (!gScore[neighborKey] || tentativeG < gScore[neighborKey]) {
                cameFrom[neighborKey] = current;
                gScore[neighborKey] = tentativeG;
                fScore[neighborKey] = tentativeG + heuristic(neighbor, goal);
                if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return [start];  // No path found, stay put
}
