import React, { useContext, createContext, useReducer } from 'react';

interface State {
    manufacturers?: { name: string }[];
    colors?: string[];
}

interface Action {
    type: string;
    payload: {
        manufacturers?: { name: string }[],
        colors?: string[];
    }
}

type Dispatch = (action: Action) => void
type ProviderProps = {children: React.ReactNode}

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(
    undefined,
);

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'manufacturers':
        case 'colors':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

const initialState = {
    manufacturers: [],
    colors: [],
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
