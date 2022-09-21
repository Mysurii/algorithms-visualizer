import React, { useState } from "react";
import { aStar } from "../../../algorithms/pathfinding/aStar";
import Node from "../Node/Node";
import { Container, GridContainer, Highlight, Row, SideNavContainer, StyledFlex } from "./Pathfinder.styles";
import { AlgorithmTypes } from "../../../types/algorithm";
import { breadthFirstSearch } from "../../../algorithms/pathfinding/breadtFirstSearch";
import { useStores } from "../../../utils/hooks/useStores";
import { observer } from "mobx-react-lite";
import { FinishIcon, StartIcon, StyledNode } from "../Node/Node.styles";
import Cell from "../../../models/Cell";
import Tip from "../../../components/Tip";

const Pathfinder: React.FC = () => {
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isErase, setIsErase] = useState(false);

  const { algorithmsStore: { currentAlgorithm, isResetClicked, isVisualizeClicked, setIsResetClicked, setIsVisualizeClicked },
    gridStore: { grid, resetGrid, resetVisited, updateGridWithWalls, startCoordinates, finishCoordinates }
  } = useStores();

  const handleType = (row: number, col: number) => {
    if (isErase) {
      updateGridWithWalls(row, col, false)
    } else {
      updateGridWithWalls(row, col)
    }
  }

  const handleMouseDown = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (isVisualizeClicked) return;
    setMouseIsPressed(true);
    setIsErase(e.button != 0)
    handleType(row, col)
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isVisualizeClicked) return;
    handleType(row, col);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };


  const visualizePath = () => {
    const startNode = grid[startCoordinates.row][startCoordinates.col];
    const endNode = grid[finishCoordinates.row][finishCoordinates.col];

    let foundPath;

    switch (currentAlgorithm) {
      case AlgorithmTypes.BFS: foundPath = breadthFirstSearch(startNode, endNode); break;
      case AlgorithmTypes.ASTAR: foundPath = aStar(startNode, endNode); break;
      case AlgorithmTypes.DIJKSTRA: foundPath = aStar(startNode, endNode, true); break; // dijkstra algorithm build in astar
      default: foundPath = aStar(startNode, endNode); break;
    }

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

  const removeColors = () => {
    const nodes = document.querySelectorAll(".node")
    nodes.forEach(node => node.classList.remove("node", "node-visited", "node-shortest-path"))
  }


  const handleReset = () => {
    if (isResetClicked) {
      resetGrid();
      removeColors();
      setIsResetClicked(false)
    }
  }

  const handleVisualize = async () => {
    if (isVisualizeClicked) {
      const nodes = document.querySelectorAll(".node")
      if (nodes.length > 0) {
        if (currentAlgorithm === AlgorithmTypes.BFS) resetVisited();
        removeColors();
      }
      await visualizePath()
      setIsVisualizeClicked(false)
    }
  }

  handleVisualize()
  handleReset()

  return (
    <Container>
      <SideNavContainer>
        <Tip text="Drag the starticon on the grid around to change its location">
          <StyledFlex>
            <StartIcon />
            Start
          </StyledFlex>
        </Tip>
        <Tip text="Drag the finishicon on the grid around to change its location">
          <StyledFlex>
            <FinishIcon />
            Finish
          </StyledFlex>
        </Tip>
        <Tip text="Click on the left-mouse-button and drag around the grid to build up walls">
          <StyledFlex>
            <StyledNode isWall style={{ marginRight: '10px' }} />
            Wall Node
          </StyledFlex>
        </Tip>
        <Tip text="Click on the right-mouse-button and drag around the grid to remove walls">
          <StyledFlex>
            <StyledNode style={{ marginRight: '10px' }} />
            Unvisited Node
          </StyledFlex>
        </Tip>
      </SideNavContainer>
      <Highlight>~~{currentAlgorithm}~~</Highlight>
      <GridContainer>
        {grid.map((row: Array<Cell>, rowIdx: number) => (
          <Row key={rowIdx}>
            {row.map((col: Cell, colIdx: number) => {
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

export default observer(Pathfinder);
