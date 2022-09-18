import Cell from "../models/Cell";

export function breadthFirstSearch(startNode: Cell, finishNode: Cell) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  let visited = [];
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    let closestNode: Cell | undefined = unvisitedNodes.shift();
    visited.push(closestNode);
    if (closestNode?.isWall) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;
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
  return visitedNodesInOrder;
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
