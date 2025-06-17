import { 
    useState,
    useEffect,
    createContext, 
    Dispatch,
    SetStateAction,
    ReactNode,
} from "react";
import { Outlet } from "react-router";

import Screen from "./vertices/Screen";
import rings from "./shaders/rings.wgsl?raw";

export const DarkModeContext = createContext(false);

// love me some typescript
interface CanvasState {
    vertices: Float32Array,
    dimensions: 2 | 3,
    shader: string,    
}

interface CanvasStateContext extends CanvasState {
    setCanvasState: Dispatch<SetStateAction<CanvasState>>,
}

export const CanvasStateContext = createContext<CanvasStateContext>({
    vertices: new Float32Array,
    dimensions: 2,
    shader: "",
    setCanvasState: () => {},
});

export const CanvasStateContextProvider = ({children}: {children: ReactNode}) => {
    const [{vertices, dimensions, shader}, setCanvasState] = useState<CanvasState>({
        vertices: Screen,
        dimensions: 2,
        shader: rings,
    });

    return (
        <CanvasStateContext.Provider value={{
            vertices,
            dimensions,
            shader,
            setCanvasState,
        }}>
            {children}
        </CanvasStateContext.Provider>
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