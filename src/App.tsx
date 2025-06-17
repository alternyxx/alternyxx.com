import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'

import {
    CanvasStateContextProvider,
    BlogsContextProvider,
} from './common/context.js'

import Canvas from './components/Canvas/Canvas'
import Layout from "./layout.tsx"
import Home from './pages/Home.tsx'
import Entry from './pages/Entry.tsx'
import Blogs from './pages/Blogs.tsx'
import BlogPost from './pages/BlogPost.tsx'
import Portfolio from './pages/Portfolio.tsx'

export default function App() {
    const [device, setDevice] = useState<GPUDevice | undefined>();
    const [bgShow, setBgShow] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        async function getDevice() {
            if (navigator.gpu) {
                const adapter = await navigator.gpu.requestAdapter();
                if (adapter) {
                    let device = await adapter.requestDevice();
                    setDevice(device);
                } else {
                    console.log("hiiiii- the adapter failed to fetch sooo");
                }
            } else {
                console.log("hiiiii- the device failed to fetch sooo");
            }
        }

        getDevice();

        // ~~~ Browser light mode/dark mode change ~~~ //
        if (window.matchMedia) {
			let darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			if (darkMediaQuery.matches) {
				setDarkMode(true);
			} else {
				setDarkMode(false);
			}
			
			// this doesn't seem to work?
			darkMediaQuery.onchange = (mode) => {
				if (mode.matches) {
					setDarkMode(true);
				} else {
					setDarkMode(false);
				}
			};
		}
    }, []);
    
    return (
        <CanvasStateContextProvider>
            {device && bgShow && 
                <Canvas 
                    darkMode={darkMode}
                    device={device} 
                />
            }
            <Routes>
                <Route element={
                    <Layout
                        device={device}
                        bgShow={bgShow}
                        setBgShow={setBgShow}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                }>
                    <Route index element={ <Home/> }/>
                    {/* A spinning blahaj */}
                    <Route path="blahaj" element={ <Home blahaj/> }/>
                    
                    <Route element={ <BlogsContextProvider/> }>
                        <Route path="blogs">
                            <Route index element={ <Blogs/> }/>
                            <Route path=":blog" element={ <BlogPost/> }/>
                        </Route>
                    </Route>
                    
                    <Route path="portfolio" element={ <Portfolio/> }/>
                    <Route path="tools"/>
                </Route>

                {/* Path with entry... most people dont like it :c */}
                <Route path="entry/:enter" element={ <Entry/> }/>
            </Routes>
        </CanvasStateContextProvider>
    );
}