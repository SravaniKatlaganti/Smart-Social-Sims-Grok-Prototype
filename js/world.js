// Handles the grid world and drawing
export class World {
    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.grid = Array.from({length: height}, () => Array(width).fill('neutral'));  // e.g., 'home', 'park', 'cafe'
        // Randomly assign locations
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.grid[y][x] = ['home', 'park', 'cafe'][Math.floor(Math.random() * 3)];
            }
        }
    }

    draw(agents) {
        const tileSize = 50;
        this.ctx.clearRect(0, 0, this.width * tileSize, this.height * tileSize);
        // Draw tiles (using placeholder Base64 for tiles.png)
        const tileImg = new Image();
        tileImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='; // Gray placeholder
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.ctx.fillStyle = this.grid[y][x] === 'home' ? '#ccc' : this.grid[y][x] === 'park' ? '#0f0' : '#ff0';
                this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
        // Draw agents
        agents.forEach(agent => {
            const img = new Image();
            img.src = agent.mood === 'happy' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='; // Blue or Red placeholder
            this.ctx.drawImage(img, agent.position.x * tileSize, agent.position.y * tileSize, tileSize, tileSize);
            this.ctx.fillText(`${agent.name} (${agent.mood})`, agent.position.x * tileSize, agent.position.y * tileSize + 10);
        });
    }
}
