import React from "react";
import { observer } from "mobx-react-lite"
import { useStores } from "../../../hooks/useStores";
import Cell from "../../../models/Cell";
import { MouseType } from "../../../types/Coordinates";
import { FinishIcon, StartIcon, StyledNode } from "./Node.styles";

interface IProps {
  col: Cell,
  onMouseDown: Function,
  onMouseEnter: Function,
  onMouseUp: Function
}

const Node: React.FC<IProps> = ({ col, onMouseDown, onMouseEnter, onMouseUp }) => {

  const { gridStore: { setFinish, setStart } } = useStores();

  const allowDrop = (ev: any) => {
    ev.preventDefault();
  }

  const drag = (ev: any, type: MouseType) => {
    ev.dataTransfer.setData("type", type);
  }

  const onDrop = (ev: any) => {
    const data = ev.dataTransfer.getData("type")
    if (data == MouseType.START) setStart(col.x, col.y)
    if (data == MouseType.FINISH) setFinish(col.x, col.y)
  }

  const handleMouseDown = (e: MouseEvent) => {
    if (col.isStart || col.isEnd) return;
    onMouseDown(e, col.x, col.y)
  }

  return (
    <div onDrop={onDrop} onDragOver={allowDrop} >
      <StyledNode
        id={`node-${col.x}-${col.y}`}
        isStart={col.isStart}
        isEnd={col.isEnd}
        isWall={col.isWall}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => onMouseEnter(col.x, col.y)}
        onMouseUp={() => onMouseUp(col.x, col.y)}
        onContextMenu={(e: MouseEvent) => e.preventDefault()}
      >

        {col.isStart && <div draggable={col.isStart || col.isEnd} onDragStart={ev => drag(ev, MouseType.START)}>
          <StartIcon movable />
        </div>}

        {col.isEnd && <div draggable={col.isStart || col.isEnd} onDragStart={ev => drag(ev, MouseType.FINISH)}>
          <FinishIcon movable />
        </div>}
      </StyledNode>
    </div>
  );
};


export default observer(Node);
