import { observer } from 'mobx-react-lite';
import { useEffect } from 'react'
import { Container, StyledFlex } from './Sorting.styles';
import { useStores } from '../../utils/hooks/useStores';
import { MAX_ARRAY_SIZE, MAX_DELAY, MIN_ARRAY_SIZE, MIN_DELAY } from '../../constants';
import { Flex } from '../../components/globalStyles';

const Sorter = () => {

    const { sorterStore: { createNewArray, setDelay, setArraySize }, algorithmsStore, } = useStores()

    useEffect(() => {
        createNewArray();
    }, [])

    return (
        <Container className="bg-dark">
            <StyledFlex>
                <Flex flexDirection="column">
                    <p className='text-white'>Speed</p>
                    <input type="range" onChange={(e: any) => setDelay(MAX_DELAY - e.target.value)}
                        min={MIN_DELAY} max={MAX_DELAY} />
                </Flex>


                <h3 className='text-white mx-5'>~~{algorithmsStore.currentAlgorithm}~~</h3>
                <Flex flexDirection="column">
                    <p className='text-white'>Amount</p>
                    <input type="range" onChange={(e: any) => setArraySize(e.target.value)} min={MIN_ARRAY_SIZE} max={MAX_ARRAY_SIZE} />
                </Flex>

            </StyledFlex>

            <div className="p-3 bg-dark text-white" style={{ height: '90vh' }}>
                <div id="bars" className="flex-container" />
            </div>
        </Container>
    )
}


export default observer(Sorter);