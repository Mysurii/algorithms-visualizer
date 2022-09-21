import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface IProps {
    children: JSX.Element
    text: string

}

const Tip: React.FC<IProps> = ({ children, text }) => {
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={
                <Tooltip>
                    {text}
                </Tooltip>
            }
        >
            {children}
        </OverlayTrigger>
    )
}

export default Tip