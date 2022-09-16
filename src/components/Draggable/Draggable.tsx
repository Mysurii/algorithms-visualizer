import React from 'react'
import { CoordinatesType } from '../../types/Coordinates'
import { StartIcon, FinishIcon } from './Draggable.styles'

interface IProps {
    type: CoordinatesType
}

const Draggable: React.FC<IProps> = ({ type }) => {

    const drag = (ev: any) => {
        ev.dataTransfer.setData("type", type);
    }

    return (
        <div draggable onDragStart={e => drag(e)}>
            {type == CoordinatesType.START && <StartIcon movable="true" />}
            {type == CoordinatesType.FINISH && <FinishIcon movable="true" />}
        </div>
    )
}

export default Draggable