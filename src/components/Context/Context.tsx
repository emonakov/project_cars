import React, { useContext, createContext, useReducer } from 'react';

export interface State {
    manufacturers?: { name: string }[];
    colors?: string[];
    cars?: any[];
    totalCarsCount?: number;
    totalPageCount?: number;
    filters: {
        manufacturer: string;
        color: string;
        [key: string]: string | number;
    }
}

export interface Action {
    type: string;
    payload: {
        manufacturers?: { name: string }[],
        colors?: string[];
        cars?: any[];
        totalCarsCount?: number;
        totalPageCount?: number;
        filters?: {
            manufacturer: string;
            color: string;
            [key: string]: string | number;
        };
    }
}

export type Dispatch = (action: Action) => void
export type ProviderProps = {children: React.ReactNode}

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(
    undefined,
);

const reducer = (state: State, action: Action) => {
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

const ContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

const useContextState = (): State => {
    const state = useContext(StateContext);
    if (state === undefined) {
        throw new Error('useContextState must be used within a Provider');
    }

    return state;
};

const useContextDispatch = (): Dispatch => {
    const dispatch = useContext(DispatchContext);
    if (dispatch === undefined) {
        throw new Error('useContextDispatch must be used within a Provider');
    }

    return dispatch;
};

export { ContextProvider, useContextState, useContextDispatch };
