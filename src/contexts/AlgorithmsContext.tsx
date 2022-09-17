import { createContext, useState } from "react";
import { AlgorithmTypes } from "../types/algorithm";

export interface AlgorithmContextType {
    currentAlgorithm: AlgorithmTypes
    setCurrentAlgorithm: (algorithm: AlgorithmTypes) => void

}

interface AuxProps {
    children: JSX.Element
}


export const AlgorithmsContext = createContext<AlgorithmContextType | null>(null);

export const AlgorithmsProvider = (props: AuxProps) => {

    const [currentAlgorithm, setCurrentAlgorithm] = useState(AlgorithmTypes.ASTAR);


    return (
        <AlgorithmsContext.Provider value={{ currentAlgorithm, setCurrentAlgorithm }}>
            {props.children}
        </AlgorithmsContext.Provider>
    )

}