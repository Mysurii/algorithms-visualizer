import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AlgorithmContextType, AlgorithmsContext } from '../../contexts/AlgorithmsContext';
import { AlgorithmTypes } from "../../types/algorithm";

const pathfinding = [
    { name: "Astar", type: AlgorithmTypes.ASTAR },
    { name: "Dijkstra", type: AlgorithmTypes.DIJKSTRA },
    { name: "BFS", type: AlgorithmTypes.BFS },
    { name: "DFS", type: AlgorithmTypes.DFS },
];


const Header = () => {
    const { currentAlgorithm, setCurrentAlgorithm, isResetClicked, setIsResetClicked, isVisualizeClicked, setIsVisualizeClicked } = useContext(AlgorithmsContext) as AlgorithmContextType;



    const handleVisualize = () => {
        const hasPath = document.querySelectorAll('.node')
        if (hasPath.length <= 0) {
            setIsVisualizeClicked(true)
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Algorithms Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" />


                    <Nav className="me-auto">
                        <Button variant={isVisualizeClicked ? "danger" : "primary"} onClick={handleVisualize}>Visualize</Button>
                        <Nav.Link onClick={() => setIsResetClicked(true)}>Reset</Nav.Link>
                    </Nav>

                    <Nav>
                        <NavDropdown title="Pathfinding" id="collasible-nav-dropdown">
                            {pathfinding.map(algorithm => <NavDropdown.Item key={algorithm.name} onClick={() => setCurrentAlgorithm(algorithm.type)} active={currentAlgorithm === algorithm.type}>
                                {algorithm.name}
                            </NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header