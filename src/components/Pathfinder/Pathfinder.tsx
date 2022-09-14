import React, { useEffect, useState } from "react";
import Cell, {
  NODE_END_COL,
  NODE_END_ROW,
  cols,
  rows,
} from "../../models/Cell";
import AStar from "../algorithms/astar";
import Node from "../Node/Node";
import { End, Start } from "../Node/Node.styles";
import { Container, Row } from "./Pathfinder.styles";

interface Coordinates {
  row: number
  col: number
}

export enum CoordinatesType {
  START,
  FINISH
}

const Pathfinder: React.FC = () => {
  const [grid, setGrid] = useState<Array<Array<Cell>>>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState<Coordinates>({ row: 0, col: 0 });
  const [finishCoordinates, setFinishCoordinates] = useState<Coordinates>({
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
    if (
      (row == startCoordinates.row && col === startCoordinates.row) ||
      (row == finishCoordinates.row && col === finishCoordinates.col)
    )
      return;

    if (e.button === 2) {
      setIsErasing(true);
      updateGridWithWalls(row, col, false);
    } else updateGridWithWalls(row, col);
  };
  const handleMouseEnter = (row: number, col: number) => {
    if (
      !isPressed ||
      (row == startCoordinates.row && col === startCoordinates.row) ||
      (row == finishCoordinates.row && col === finishCoordinates.col)
    )
      return;

    if (isErasing) {
      updateGridWithWalls(row, col, false);
    } else updateGridWithWalls(row, col);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setIsErasing(false);
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
  };

  const addNeighbours = (arr: Array<Array<Cell>>) => {
    arr.forEach((rows) => {
      rows.forEach((cell) => {
        cell.addNeighbours(arr);
      });
    });
  };


  useEffect(() => {
    initializeGrid();
  }, []);

  const visualizeShortestPath = (shortestPathNodes: Array<Cell>) => {
    for (let i = 0; i < shortestPathNodes.length; i++) {
      setTimeout(() => {
        const node = shortestPathNodes[i];
        const test = document.getElementById(`node-${node.x}-${node.y}`);
        test?.classList.add("node-shortest-path");
      }, 10 * i);
    }
  };

  const visualizePath = () => {
    const startNode = grid[startCoordinates.row][startCoordinates.col];
    const endNode = grid[finishCoordinates.row][finishCoordinates.col];

    let foundPath = AStar(startNode, endNode);

    const visitedNodess = foundPath.visitedNodes
    const shortestPath = foundPath.path

    for (let i = 0; i <= visitedNodess.length; i++) {
      if (i === visitedNodess.length) {
        setTimeout(() => {
          visualizeShortestPath(shortestPath);
        }, 20 * i);
      } else {
        setTimeout(() => {
          const node = visitedNodess[i];
          if (node) {
            const test = document.getElementById(`node-${node.x}-${node.y}`);
            test?.classList.add("node-visited");
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

  // const setStartOrFinish = (x: number, y: number, type: CoordinatesType) => {
  //   const newGrid: Array<Array<Cell>> = [];


  //   grid.forEach(row => {
  //     row.forEach(col => {
  //       if (col.x == x && col.y == y) type == CoordinatesType.START ? col.isStart = true : col.isEnd = true;
  //       else CoordinatesType.START ? col.isStart = false : col.isEnd = false;
  //     })
  //     newGrid.push(row)
  //   })

  //   setGrid(newGrid)

  //   CoordinatesType.START ? setStartCoordinates({ row: x, col: y }) : setFinishCoordinates({ row: x, col: y })

  // }

  function drag(ev: any, type: CoordinatesType) {
    ev.dataTransfer.setData("type", type);
  }


  return (
    <Container>
      <h1>Pathfinder</h1>
      <button onClick={visualizePath}>Visualize</button>
      <div draggable onDragStart={e => drag(e, CoordinatesType.START)}>
        <Start />
      </div>
      <div draggable onDragStart={(e) => drag(e, CoordinatesType.FINISH)}>
        <End />
      </div>
      <div>
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
      </div>
    </Container>
  );
};

export default Pathfinder;
