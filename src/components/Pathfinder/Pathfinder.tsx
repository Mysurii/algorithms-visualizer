import React, { useEffect, useState } from "react";
import Cell, {
  NODE_END_COL,
  NODE_END_ROW,
  cols,
  rows,
  NODE_START_ROW,
  NODE_START_COL,
} from "../../models/Cell";
import { ICoordinates, CoordinatesType } from "../../types/Coordinates";
import AStar, { aster } from "../../algorithms/astar";
import Node from "../Node/Node";
import { Container, GridContainer, Row } from "./Pathfinder.styles";
import Draggable from "../Draggable/Draggable";

const Pathfinder: React.FC = () => {

  const [grid, setGrid] = useState<Array<Array<Cell>>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState<ICoordinates>({ row: NODE_START_ROW, col: NODE_START_COL });
  const [finishCoordinates, setFinishCoordinates] = useState<ICoordinates>({
    row: NODE_END_ROW,
    col: NODE_END_COL,
  });
  const [isErasing, setIsErasing] = useState(false);


  const updateGridWithWalls = (row: number, col: number, makeWall = true) => {
    const node: Cell = grid[row][col];
    node.isWall = makeWall;
    const newGrid = [...grid];
    newGrid[row][col] = node;
    setGrid(newGrid);
    addNeighbours(grid);
  };

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    setIsPressed(true);

    if (e.button === 2) {
      setIsErasing(true);
      updateGridWithWalls(row, col, false);
    } else updateGridWithWalls(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    // if (isErasing) {
    //   updateGridWithWalls(row, col, false);
    // } else updateGridWithWalls(row, col);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setIsErasing(false);
  };


  const addNeighbours = (arr: Array<Array<Cell>>) => {
    arr.forEach((rows) => {
      rows.forEach((cell) => {
        cell.addNeighbours(arr);
      });
    });
  };


  useEffect(() => {
    setGrid(aster.initializeGrid(Math.round(rows), Math.round(cols)))
  }, []);

  const visualizeShortestPath = (shortestPathNodes: Array<Cell>) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        const test = document.getElementById(`node-${node.x}-${node.y}`);
        test?.classList.add("node", "node-shortest-path");
      }, 10 * i);
    }
  };

  const visualizePath = () => {
    const startNode = grid[startCoordinates.row][startCoordinates.col];
    const endNode = grid[finishCoordinates.row][finishCoordinates.col];

    let foundPath = AStar(startNode, endNode);

    const visitedNodes = foundPath.visitedNodes
    const shortestPath = foundPath.path

    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(shortestPath);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodes[i];
          if (node) {
            const test = document.getElementById(`node-${node.x}-${node.y}`);
            test?.classList.add("node", "node-visited");
          }

        }, 20 * i);
      }
    }
  };

  const setStart = (x: number, y: number) => {
    const newGrid: Array<Array<Cell>> = [];

    grid.forEach(row => {
      row.forEach(col => {
        col.isStart = (col.x == x && col.y == y) ? true : false
      })
      newGrid.push(row)
    })

    setGrid(newGrid)

    setStartCoordinates({ row: x, col: y })
  }

  const setFinish = (x: number, y: number) => {
    const newGrid: Array<Array<Cell>> = [];

    grid.forEach(row => {
      row.forEach(col => {
        col.isEnd = (col.x == x && col.y == y) ? true : false
      })
      newGrid.push(row)
    })

    setGrid(newGrid)

    setFinishCoordinates({ row: x, col: y })
  }

  const reset = () => {
    setGrid(aster.initializeGrid(Math.round(rows), Math.round(cols)))
    const nodes = document.querySelectorAll(".node")
    nodes.forEach(node => node.classList.remove("node", "node-visited", "node-shortest-path"))
  }


  return (
    <Container>
      <h1>Pathfinder</h1>
      <button onClick={visualizePath}>Visualize</button>
      <button onClick={reset}>Reset</button>
      <Draggable type={CoordinatesType.START} />
      <Draggable type={CoordinatesType.FINISH} />
      <GridContainer>
        {grid.map((row, rowIdx) => (
          <Row key={rowIdx}>
            {row.map((col, colIdx) => {
              return (
                <Node
                  key={colIdx}
                  col={col}
                  setStart={setStart}
                  setFinish={setFinish}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              );
            })}
          </Row>
        ))}
      </GridContainer>
    </Container>
  );
};

export default Pathfinder;
