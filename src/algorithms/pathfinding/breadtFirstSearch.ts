import Cell from "../../models/Cell";

export function breadthFirstSearch(startNode: Cell, finishNode: Cell) {
  // if (!startNode || !finishNode || startNode === finishNode) {
  //   return { path: [], visitedNodes: [] };
  // }
  let path: Array<Cell> = [];
  let unvisitedNodes = [startNode];
  let visitedNodesInOrder = [];

  while (unvisitedNodes.length !== 0) {
    let closestNode: Cell | undefined = unvisitedNodes.shift();

    if (closestNode?.isWall) continue;
    if (closestNode === finishNode) {
      return {
        path: getNodesInShortestPathOrderBFS(finishNode),
        visitedNodes: visitedNodesInOrder,
      };
    }
    visitedNodesInOrder.push(closestNode);
    if (closestNode) {
      closestNode.isVisited = true;
    }
    if (closestNode != null) {
      let unvisitedNeighbours = getUnvisitedNeighbours(closestNode);
      for (let unvisitedNeighbour of unvisitedNeighbours) {
        unvisitedNeighbour.previous = closestNode;
        if (neighbourNotInUnvisitedNodes(unvisitedNeighbour, unvisitedNodes)) {
          unvisitedNodes.push(unvisitedNeighbour);
        }
      }
    }
  }
  return { path: [], visitedNodes: visitedNodesInOrder };
}

function getUnvisitedNeighbours(node: Cell) {
  return node.neighbours.filter((neighbour) => !neighbour.isVisited);
}

function neighbourNotInUnvisitedNodes(
  neighbour: Cell,
  unvisitedNodes: Array<Cell>
) {
  for (let node of unvisitedNodes) {
    if (node.y === neighbour.y && node.x === neighbour.x) {
      return false;
    }
  }
  return true;
}

export function getNodesInShortestPathOrderBFS(finishNode: Cell) {
  let nodesInShortestPathOrder = [];
  let currentNode: Cell | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previous;
  }
  return nodesInShortestPathOrder;
}
