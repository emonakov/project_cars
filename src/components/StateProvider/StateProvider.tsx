import React, { useContext, createContext, useReducer } from 'react';
import { StateInterface } from '../../interfaces/StateInterface';
import { ActionInterface } from '../../interfaces/ActionInterface';

export type Dispatch = (action: ActionInterface) => void
export type ProviderProps = {children: React.ReactNode}

const StateContext = createContext<[StateInterface, Dispatch] | undefined>(undefined);

const stateReducer = (state: StateInterface, action: ActionInterface) => {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const initialState = {
    manufacturers: [],
    colors: [],
    filters: {
        page: 1,
        sort: 'asc',
        manufacturer: '',
        color: '',
    },
};

const StateProvider: React.FC<ProviderProps> = ({ children }) => {
    const reducer = useReducer(stateReducer, initialState);

    return (
        <StateContext.Provider value={reducer}>
            {children}
        </StateContext.Provider>
    );
};

const useContextState = (): [StateInterface, Dispatch] => {
    const state = useContext(StateContext);
    if (state === undefined) {
        throw new Error('useContextState must be used within a Provider');
    }

    return state;
};

export { StateProvider, useContextState };
