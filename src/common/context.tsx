import { 
    useState,
    createContext, 
    Dispatch,
    SetStateAction
} from "react";

export const DarkModeContext = createContext(false);

// love me some typescript
interface StageContext {
    stage: number;
    setStage: Dispatch<SetStateAction<number>>
}

export const StageContext = createContext<StageContext>({
    stage: 0,
    setStage: () => {},
});

export const StageContextProvider = ({children}: any) => {
    const [stage, setStage] = useState(0);

    return (
        <StageContext.Provider value={{stage, setStage}}>
            {children}
        </StageContext.Provider>
    );
}