import React, { useContext, useEffect, useRef, useState } from "react";
import Cell, {
  NODE_END_COL,
  NODE_END_ROW,
  cols,
  rows,
  NODE_START_ROW,
  NODE_START_COL,
} from "../../models/Cell";
import { ICoordinates, MouseType } from "../../types/Coordinates";
import sortingAlgorithm from "../../algorithms/sorting";
import Node from "../Node/Node";
import { Container, GridContainer, Highlight, Row, SideNavContainer, StyledFlex, Text } from "./Pathfinder.styles";
import { FinishIcon, StartIcon, StyledNode } from "../Node/Node.styles.js";
import { AlgorithmsContext, AlgorithmContextType } from "../../contexts/AlgorithmsContext";
import { AlgorithmTypes } from "../../types/algorithm";
import { breadthFirstSearch } from "../../algorithms/breadtFirstSearch";
import Overlay from "react-bootstrap/esm/Overlay";
import Tooltip from "react-bootstrap/esm/Tooltip";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";

const Pathfinder: React.FC = () => {
  const [mouseType, setMouseType] = useState(MouseType.WALL)
  const [grid, setGrid] = useState<Array<Array<Cell>>>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startCoordinates, setStartCoordinates] = useState<ICoordinates>({ row: NODE_START_ROW, col: NODE_START_COL });
  const [finishCoordinates, setFinishCoordinates] = useState<ICoordinates>({
    row: NODE_END_ROW,
    col: NODE_END_COL,
  });
  const target = useRef(null);
  const { currentAlgorithm, isResetClicked, setIsResetClicked, isVisualizeClicked, setIsVisualizeClicked } = useContext(AlgorithmsContext) as AlgorithmContextType;


  const updateGridWithWalls = (row: number, col: number, makeWall = true) => {
    const node: Cell = grid[row][col];
    node.isWall = makeWall;
    const newGrid = [...grid];
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const handleType = (row: number, col: number) => {
    switch (mouseType) {
      case MouseType.WALL: return updateGridWithWalls(row, col);
      case MouseType.UNVISITED: return updateGridWithWalls(row, col, false);
      case MouseType.START: return setStart(row, col)
      case MouseType.FINISH: return setFinish(row, col)
      default: return
    }
  }

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    setMouseIsPressed(true);
    handleType(row, col)

  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    handleType(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  useEffect(() => {
    setGrid(sortingAlgorithm.initializeGrid(Math.round(rows), Math.round(cols)))
  }, []);

  const visualizePath = () => {
    const startNode = grid[startCoordinates.row][startCoordinates.col];
    const endNode = grid[finishCoordinates.row][finishCoordinates.col];

    let foundPath = sortingAlgorithm.sort(startNode, endNode, currentAlgorithm === AlgorithmTypes.DIJKSTRA);
    const visitedNodes = foundPath.visitedNodes
    const shortestPath = foundPath.path

    return new Promise((resolve) => {
      for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
          setTimeout(() => {
            for (let i = 0; i < shortestPath.length; i++) {
              setTimeout(() => {
                const node = shortestPath[i];
                const test = document.getElementById(`node-${node.x}-${node.y}`);
                test?.classList.add("node", "node-shortest-path");
              }, 10 * i);
            }
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

      setTimeout(() => {
        resolve(true)

      }, 20 * visitedNodes.length)
    })
  }

  const setStart = (x: number, y: number) => {
    const newGrid: Array<Array<Cell>> = [];

    grid.forEach(row => {
      row.forEach(col => {
        col.isStart = (col.x === x && col.y === y)
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
        col.isEnd = (col.x === x && col.y === y) 
      })
      newGrid.push(row)
    })

    setGrid(newGrid)

    setFinishCoordinates({ row: x, col: y })
  }

  const handleReset = () => {
    if (isResetClicked) {
      setGrid(sortingAlgorithm.initializeGrid(Math.round(rows), Math.round(cols)))
      const nodes = document.querySelectorAll(".node")
      nodes.forEach(node => node.classList.remove("node", "node-visited", "node-shortest-path"))
      setIsResetClicked(false)
    }
  }

  const handleVisualize = async () => {
    if (isVisualizeClicked) {
      await visualizePath()
      setIsVisualizeClicked(false)
    }
  }

  handleVisualize()
  handleReset()

  const doBFS = () => {
    const test = breadthFirstSearch(grid[startCoordinates.row][startCoordinates.col], grid[finishCoordinates.row][finishCoordinates.col])
    console.log(test)
  }


  return (
    <Container>
      <SideNavContainer>

        {currentAlgorithm == AlgorithmTypes.DIJKSTRA ? <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip>
              Dijkstra has a bug with start position. For now, you can't move start.
            </Tooltip>
          }
        >
          <StyledFlex isActive={mouseType === MouseType.START} onClick={() => setMouseType(MouseType.FINISH)}>
            <StartIcon />
            <Text>Start</Text>
          </StyledFlex>
        </OverlayTrigger> : <StyledFlex isActive={mouseType === MouseType.START} onClick={() => setMouseType(MouseType.START)}>
          <StartIcon />
          <Text>Start</Text>
        </StyledFlex>}




        <Overlay target={target.current} show={true} placement="right">
          {(props) => (
            <Tooltip  {...props}>
              My Tooltip
            </Tooltip>
          )}</Overlay>
        <StyledFlex isActive={mouseType === MouseType.FINISH} onClick={() => setMouseType(MouseType.FINISH)}>
          <FinishIcon />
          <Text>Finish</Text>
        </StyledFlex>
        <StyledFlex isActive={mouseType === MouseType.WALL} onClick={() => setMouseType(MouseType.WALL)}>
          <StyledNode isWall />
          <Text margin="0 5px">Wall Node</Text>
        </StyledFlex>
        <StyledFlex isActive={mouseType === MouseType.UNVISITED} onClick={() => setMouseType(MouseType.UNVISITED)}>
          <StyledNode />
          <Text margin="0 5px">Unvisited Node</Text>
        </StyledFlex>
        <button onClick={doBFS}>do BFS</button>
      </SideNavContainer>
      <Highlight>~~{currentAlgorithm}~~</Highlight>

      <GridContainer>
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
      </GridContainer>
    </Container>
  );
};

export default Pathfinder;
