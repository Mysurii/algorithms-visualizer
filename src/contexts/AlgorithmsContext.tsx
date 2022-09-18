import { createContext, useState } from "react";
import { AlgorithmTypes } from "../types/algorithm";

export interface AlgorithmContextType {
    currentAlgorithm: AlgorithmTypes
    isResetClicked: boolean
    isVisualizeClicked: boolean
    setCurrentAlgorithm: (algorithm: AlgorithmTypes) => void
    setIsResetClicked: (bool: boolean) => void
    setIsVisualizeClicked: (bool: boolean) => void

}

interface AuxProps {
    children: JSX.Element
}


export const AlgorithmsContext = createContext<AlgorithmContextType | null>(null);

export const AlgorithmsProvider = (props: AuxProps) => {

    const [currentAlgorithm, setCurrentAlgorithm] = useState(AlgorithmTypes.ASTAR);
    const [isResetClicked, setIsResetClicked] = useState(false);
    const [isVisualizeClicked, setIsVisualizeClicked] = useState(false);


    return (
        <AlgorithmsContext.Provider value={{ currentAlgorithm, setCurrentAlgorithm, isResetClicked, setIsResetClicked, isVisualizeClicked, setIsVisualizeClicked }}>
            {props.children}
        </AlgorithmsContext.Provider>
    )

}