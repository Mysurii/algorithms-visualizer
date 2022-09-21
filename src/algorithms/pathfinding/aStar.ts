import Cell from "../../models/Cell";
import { heuristic } from "../../utils/pathfindingUtils";

export const aStar = (
  startNode: Cell,
  endNode: Cell,
  isDijkstra: boolean = false
) => {
  let openSet: Array<Cell> = [];
  let closedSet: Array<Cell> = [];
  let path: Array<Cell> = [];
  let visitedNodes: Array<Cell> = [];

  openSet.push(startNode);

  while (openSet.length > 0) {
    let leastIdx = 0;

    openSet.forEach((node, idx) => {
      if (node.f < openSet[leastIdx].f) leastIdx = idx;
    });

    let current = openSet[leastIdx];
    visitedNodes.push(current);

    if (current === endNode) {
      let temp = current;
      path.push(current);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return { path: path.reverse(), visitedNodes };
    }

    openSet = openSet.filter((node) => node !== current);
    closedSet.push(current);

    let neighbours = current.neighbours;

    neighbours.forEach((neighbour) => {
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempG = current.g + 1;
        if (tempG < neighbour.g) {
        }
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempG < neighbour.g) {
            neighbour.g = tempG;
            newPath = true;
          }
        } else {
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.g = tempG;
          neighbour.h = isDijkstra ? 0 : heuristic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    });
  }
  return { path, visitedNodes, error: "No path found!" };
};
