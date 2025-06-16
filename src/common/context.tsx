import { 
    useState,
    useEffect,
    createContext, 
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";
import { Outlet } from "react-router";

import { Screen } from "./vertices/Screen";
import rings from "./shaders/rings.wgsl?raw";

export const DarkModeContext = createContext(false);

// love me some typescript
interface StageContext {
    stage: number;
    setStage: Dispatch<SetStateAction<number>>
}

export const StageContext = createContext<StageContext>({
    stage: 1,
    setStage: () => {},
});

export const StageContextProvider = ({children}: {children: ReactNode}) => {
    const [stage, setStage] = useState(0);

    return (
        <StageContext.Provider value={{stage, setStage}}>
            {children}
        </StageContext.Provider>
    );
};

interface CanvasContext {
    vertices: Float32Array,
    shader: string,
    setVertices: Dispatch<SetStateAction<Float32Array>>,
    setShader: Dispatch<SetStateAction<string>>,
}

export const CanvasContext = createContext<CanvasContext>({
    vertices: new Float32Array,
    setVertices: () => {},
    shader: "",
    setShader: () => {},
});

export const CanvasContextProvider = ({children}: {children: ReactNode}) => {
    const [vertices, setVertices] = useState(Screen);
    const [shader, setShader] = useState(rings);

    return (
        <CanvasContext.Provider value={{vertices, setVertices, shader, setShader}}>
            {children}
        </CanvasContext.Provider>
    );
}

interface BlogsContext {
    blogs: {
        title: string,
        date: string,
        shortDescription: string,
        flairs: string[],
        text: string,
    }[],
}

export const BlogsContext = createContext<BlogsContext>({blogs: []});

export const BlogsContextProvider = () => {
    let [blogPosts, setBlogPosts] = useState<BlogsContext>({
        blogs: [],
        // blogs: [{
        //     title: "Currently fetching blogs...",
        //     date: "",
        //     shortDescription: "",
        //     flairs: [],
        //     text: "",
        // }],
    });
    
    useEffect(() => {
        fetch("/blogs.json")
            .then(data => data.json())
            .then(blogs => setBlogPosts(blogs));
    }, []);
    
    return (
        <BlogsContext.Provider value={blogPosts}>
            <Outlet/>
        </BlogsContext.Provider>
    );
};

interface PortfolioContext {
    portfolio: {
        name: string,
        text: string,
    }[],
}

export const PortfolioContext = createContext<PortfolioContext>({ portfolio: [] });

export const PortfolioContextProvider = () => {
    const [portfolio, setPortfolio] = useState({
        portfolio: [
              
        ],
    });

    useEffect(() => {
        fetch("./portfolion.json")
            .then(data => data.json())
            .then(portfolio => setPortfolio(portfolio));
    }, []);
    
    return (
        <PortfolioContext.Provider value={ portfolio }>
            <Outlet/>
        </PortfolioContext.Provider>
    );
}