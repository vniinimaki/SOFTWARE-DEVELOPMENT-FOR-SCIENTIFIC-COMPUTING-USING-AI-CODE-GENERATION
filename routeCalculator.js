import { kdTree as KDTree } from 'kd-tree-javascript';

/**
 * A priority queue implemented as a binary heap.
 */
class PriorityQueueHeap {
    constructor() {
        this.heap = [null]; // We store the heap in an array, but leave the 0 index empty for easier calculations
    }

    // Add an item to the queue with a given priority
    enqueue(item, priority) {
        this.heap.push({ item, priority });

        let current = this.heap.length - 1;
        while (current > 1 && this.heap[Math.floor(current / 2)].priority > this.heap[current].priority) {
            [this.heap[Math.floor(current / 2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current / 2)]];
            current = Math.floor(current / 2);
        }
    }

    // Remove and return the item with the highest priority
    dequeue() {
        const smallest = this.heap[1];

        const end = this.heap.pop();
        if (this.heap.length > 1) {
            this.heap[1] = end;
            this.bubbleDown();
        }

        return smallest;
    }

    // Reorder the heap after an item has been dequeued
    bubbleDown() {
        let index = 1;
        const length = this.heap.length;

        while (index * 2 < length) {
            let smallerChildIndex = index * 2;
            if (index * 2 + 1 < length && this.heap[index * 2 + 1].priority < this.heap[index * 2].priority) {
                smallerChildIndex = index * 2 + 1;
            }

            if (this.heap[smallerChildIndex].priority < this.heap[index].priority) {
                [this.heap[smallerChildIndex], this.heap[index]] = [this.heap[index], this.heap[smallerChildIndex]];
                index = smallerChildIndex;
            } else {
                break;
            }
        }
    }

    // Check if the queue is empty
    isEmpty() {
        return this.heap.length === 1;
    }
}

/**
 * Dijkstra's algorithm for finding the shortest path in a graph.
 * @param {Object} graph - The graph to search, represented as an adjacency list.
 * @param {string} source - The ID of the source node.
 * @param {string} destination - The ID of the destination node.
 * @returns {Array} An array of node IDs representing the shortest path from source to destination.
 */
export function dijkstra(graph, source, destination) {
    const distances = {};
    const previous = {};
    const queue = new PriorityQueueHeap();

    distances[source] = 0;
    queue.enqueue(source, 0);

    while (!queue.isEmpty()) {
        const smallest = queue.dequeue();

        if (!smallest || smallest.item === destination) break;

        const smallestVertex = smallest.item;

        if (!graph[smallestVertex]) continue;

        for (const neighbor in graph[smallestVertex]) {
            let alt = distances[smallestVertex] + graph[smallestVertex][neighbor];

            if (distances[neighbor] === undefined || alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = smallestVertex;
                queue.enqueue(neighbor, distances[neighbor]);
            }
        }
    }

    // Reconstruct the shortest path
    let shortestPath = [];
    let currentVertex = destination;
    while (currentVertex !== undefined && currentVertex !== null) {
        shortestPath.unshift(currentVertex);
        currentVertex = previous[currentVertex];
    }

    return shortestPath;
}


/**
 * Create a graph from a set of nodes, connecting each node to its nearest neighbors.
 * @param {Object} nodesObject - An object mapping node IDs to their positions.
 * @param {number} maxEdgeDistance - The maximum distance for an edge to be created.
 * @returns {Object} The created graph, represented as an adjacency list.
 */
export function createGraph2(nodesObject, maxEdgeDistance) {
    const graph = {};
    const points = Object.entries(nodesObject).map(([id, position]) => ({id, ...position}));

    const distanceSquared = (a, b) => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        return dx * dx + dy * dy + dz * dz;
    };

    const kdTreeInstance = new KDTree(points, distanceSquared, ['x', 'y', 'z']);

    for (const point of points) {
        graph[point.id] = {};
        const nearestPoints = kdTreeInstance.nearest(point, 10, maxEdgeDistance * maxEdgeDistance);
        for (const [nearPoint] of nearestPoints) {
            graph[point.id][nearPoint.id] = Math.sqrt(distanceSquared(point, nearPoint));
        }
    }

    return graph;
}

/**
 * Calculate the Euclidean distance between two points.
 * @param {Array} position1 - The [x, y, z] coordinates of the first point.
 * @param {Array} position2 - The [x, y, z] coordinates of the second point.
 * @returns {number} The Euclidean distance between the two points.
 */
export function calculateDistance(position1, position2) {
    const dx = position2[0] - position1[0];
    const dy = position2[1] - position1[1];
    const dz = position2[2] - position1[2];

    return Math.sqrt(dx * dx + dy * dy + dz * dz); // Euclidean distance
}

// export function aStarSearch(graph, start, end) {
//     let frontier = new PriorityQueueHeap();
//     frontier.enqueue(start, 0);
//     let cameFrom = {};
//     let costSoFar = {};
//     cameFrom[start] = null;
//     costSoFar[start] = 0;

//     while (!frontier.isEmpty()) {
//         let current = frontier.dequeue().element;

//         if (current === end) {
//             break;
//         }

//         for (let next in graph[current]) {
//             let newCost = costSoFar[current] + graph[current][next];
//             if (!costSoFar.hasOwnProperty(next) || newCost < costSoFar[next]) {
//                 costSoFar[next] = newCost;
//                 let priority = newCost + calculateDistance(graph[next], graph[end]);
//                 frontier.enqueue(next, priority);
//                 cameFrom[next] = current;
//             }
//         }
//     }

//     return reconstructPath(cameFrom, start, end);
// }

// function reconstructPath(cameFrom, start, end) {
//     let current = end;
//     let path = [current];
//     while (current !== start) {
//         current = cameFrom[current];
//         path.unshift(current);
//     }
//     return path;
// }