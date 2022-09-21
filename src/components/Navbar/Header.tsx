import { observer } from "mobx-react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useStores } from "../../utils/hooks/useStores";
import { AlgorithmTypes } from "../../types/algorithm";
import bubble from "../../algorithms/sorting/bubble";
import mergeSort from "../../algorithms/sorting/merge";
import quickSort from "../../algorithms/sorting/quick";
import insertion from "../../algorithms/sorting/insertion";
import selection from "../../algorithms/sorting/selection";

const pathfinding = [
    { name: "Astar", type: AlgorithmTypes.ASTAR },
    { name: "Dijkstra", type: AlgorithmTypes.DIJKSTRA },
    { name: "BFS", type: AlgorithmTypes.BFS },
];

const sorting = [
    { name: "Bubble", type: AlgorithmTypes.BUBBLE },
    { name: "Quicksort", type: AlgorithmTypes.QUICK },
    { name: "Insertion Sort", type: AlgorithmTypes.INSERTION },
    { name: "Selection Sort", type: AlgorithmTypes.SELECTION },
    { name: "Mergesort", type: AlgorithmTypes.MERGE },
];

const Header = () => {
    const { algorithmsStore: { currentAlgorithm, isVisualizeClicked, setIsResetClicked, setIsVisualizeClicked, setCurrentAlgorithm },
        sorterStore: { delay, createNewArray } } = useStores();

    const handleVisualize = () => {
        setIsVisualizeClicked(true);
    }

    const handleReset = () => {
        if (!isVisualizeClicked) setIsResetClicked(true)
    }

    const handleSort = () => {
        switch (currentAlgorithm) {
            case AlgorithmTypes.BUBBLE: bubble(delay); break;
            case AlgorithmTypes.INSERTION: insertion(delay); break;
            case AlgorithmTypes.SELECTION: selection(delay); break;
            case AlgorithmTypes.MERGE:
                const element = document.querySelectorAll('.bar');
                const left = 0;
                const right = element.length - 1;
                mergeSort(element, left, right, delay); break;
            case AlgorithmTypes.QUICK:
                let ele = document.querySelectorAll('.bar');
                const l = 0;
                const r = ele.length - 1;
                quickSort(ele, l, r, delay);
                break;
            default: bubble(delay); break;
        }
    }

    const newArray = () => {
        createNewArray();
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Algorithms Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" />

                    {pathfinding.map(x => x.type).includes(currentAlgorithm) ? <Nav className="me-auto">
                        <Button variant={isVisualizeClicked ? "danger" : "primary"} onClick={handleVisualize}>Visualize</Button>
                        <Nav.Link onClick={handleReset}>Reset</Nav.Link>
                    </Nav> :
                        <Nav className="me-auto">
                            <Button variant={isVisualizeClicked ? "danger" : "primary"} onClick={handleSort}>Sort</Button>
                            <Nav.Link onClick={newArray}>New Array</Nav.Link>
                        </Nav>
                    }

                    <Nav>
                        <NavDropdown title="Pathfinding" id="collasible-nav-dropdown">
                            <>
                            {pathfinding.map(algorithm => <NavDropdown.Item key={algorithm.name} onClick={() => setCurrentAlgorithm(algorithm.type)} active={currentAlgorithm === algorithm.type}>
                                {algorithm.name}
                            </NavDropdown.Item>)}
                            </>
                        </NavDropdown>
                        <NavDropdown title="Sorting" id="collasible-nav-dropdown2">
                            <>
                                {sorting.map(algorithm => <NavDropdown.Item key={algorithm.name} onClick={() => setCurrentAlgorithm(algorithm.type)} active={currentAlgorithm === algorithm.type}>
                                    {algorithm.name}
                                </NavDropdown.Item>)}
                            </>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default observer(Header);