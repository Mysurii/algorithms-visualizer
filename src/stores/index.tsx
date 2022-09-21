import { IRootStore } from './RootStore';
import { createContext, FC, ReactElement, ReactNode } from 'react';

export type StoreComponent = FC<{
    store: IRootStore;
    children: JSX.Element;
}>;


export const StoreContext = createContext<IRootStore>({} as IRootStore)

export const StoreProvider: StoreComponent = ({
    children,
    store
}): ReactElement => {
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}