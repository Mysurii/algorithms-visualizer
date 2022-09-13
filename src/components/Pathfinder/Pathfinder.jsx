import { useEffect, useState } from "react";
import Cell, {
  NODE_END_COL,
  NODE_END_ROW,
  cols,
  rows,
} from "../../models/Cell";
import AStar from "../algorithms/astar";
import Node from "../Node/Node";
import { Container, Row } from "./Pathfinder.styles";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isPressed, setIsPressed] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState({ row: 0, col: 0 });
  const [finishCoordinates, setFinishCoordinates] = useState({
    row: NODE_END_ROW,
    col: NODE_END_COL,
  });
  const [isErasing, setIsErasing] = useState(false);

  const updateGridWithWalls = (row, col, makeWall = true) => {
    const node = grid[row][col];
    node.isWall = makeWall;
    const newGrid = [...grid];
    newGrid[row][col] = node;
    setGrid(newGrid);
    addNeighbours(grid);
  };

  const findPath = (arr) => {
    const startNode = arr[0][0];
    const endNode = arr[NODE_END_ROW][NODE_END_COL];

    let foundPath = AStar(startNode, endNode);
    setPath(foundPath.path);
    setVisitedNodes(foundPath.visitedNodes);
  };

  const handleMouseDown = (e, row, col) => {
    e.preventDefault();
    setIsPressed(true);
    if (
      (row == startCoordinates.row && col === startCoordinates.row) ||
      (row == finishCoordinates.row && col === col.finishCoordinates)
    )
      return;

    if (e.button === 2) {
      setIsErasing(true);
      updateGridWithWalls(row, col, false);
    } else updateGridWithWalls(row, col);
  };
  const handleMouseEnter = (row, col) => {
    if (
      !isPressed ||
      (row == startCoordinates.row && col === startCoordinates.row) ||
      (row == finishCoordinates.row && col === col.finishCoordinates)
    )
      return;

    if (isErasing) {
      updateGridWithWalls(row, col, false);
    } else updateGridWithWalls(row, col);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setIsErasing(false);

    findPath(grid);
  };

  const initializeGrid = () => {
    const arr = new Array(rows);

    for (let i = 0; i < rows; i++) {
      arr[i] = new Array(cols);
      for (let j = 0; j < cols; j++) {
        arr[i][j] = new Cell(i, j);
      }
    }

    setGrid(arr);
    addNeighbours(arr);

    findPath(arr);
  };

  const addNeighbours = (arr) => {
    arr.forEach((rows) => {
      rows.forEach((cell) => {
        cell.addNeighbours(arr);
      });
    });
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const visualizeShortestPath = (shortestPathNodes) => {
    console.log(shortestPathNodes.length);
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        const test = document.getElementById(`node-${node.x}-${node.y}`);
        test.classList.add("node-shortest-path");

        console.log(test);
      }, 10 * i);
    }
  };

  const visualizePath = () => {
    console.log(visitedNodes);
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          const test = document.getElementById(`node-${node.x}-${node.y}`);
          test.classList.add("node-visited");
        }, 20 * i);
      }
    }
  };

  return (
    <Container>
      <h1>Pathfinder</h1>
      <button onClick={visualizePath}>Visualize</button>
      <div>
        {grid.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((col, colIdx) => {
              return (
                <Node
                  key={colIdx}
                  col={col}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </Row>
        ))}
      </div>
    </Container>
  );
};

export default Pathfinder;
