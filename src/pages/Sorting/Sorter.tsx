import { observer } from 'mobx-react-lite';
import { useEffect } from 'react'
import { useStores } from '../../utils/hooks/useStores';

const Sorter = () => {

    const { sorterStore, algorithmsStore, } = useStores()


    useEffect(() => {
        sorterStore.createNewArray();
    }, [])

    return (
        <div style={{ overflow: 'hidden' }}>
            <div className="p-3 bg-dark text-white" style={{ height: '95vh' }}>
                <div id="bars" className="flex-container" />
            </div>
        </div>
    )
}


export default observer(Sorter);