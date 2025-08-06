import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'

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
// import Portfolio from './pages/Portfolio.tsx'
// import Tools from './pages/tools/Tools.tsx'
// import Playground from './pages/tools/Playground.tsx'

export default function App() {
    const [device, setDevice] = useState<GPUDevice | undefined>();
    const [bgShow, setBgShow] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [lightbulb, setLightbulb] = useState({
        enabled: true,
        lowHanging: false,
        noScrolling: false,
    });

    const location = useLocation();

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

    useEffect(() => {
        if (location.pathname.startsWith("/tools/") 
            && location.pathname.length > "/tools/".length)
        {
            setLightbulb({
                enabled: false,
                lowHanging: false,
                noScrolling: false,
            });
        } else if (location.pathname.startsWith("/blogs")) {
            if (location.pathname.length > 7) {
                setLightbulb({
                    enabled: false,
                    lowHanging: false,
                    noScrolling: false,
                });
            } else {
                setLightbulb({
                    enabled: true,
                    lowHanging: true,
                    noScrolling: false,                    
                });
            }
        } else {
            setLightbulb({
                enabled: true,
                lowHanging: false,
                noScrolling: false,
            });
        }
    }, [location]);

    return (
        <CanvasStateContextProvider>
            { device && bgShow &&
                <div className="fixed z-[-10]">
                    <Canvas
                        darkMode={darkMode}
                        device={device}
                    />
                </div>
            }
            <Routes>
                <Route element={
                    <Layout
                        device={device}
                        bgShow={bgShow}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        menu={{ enabled: true, setBgShow: setBgShow }} // no reason for this to be a state rn
                        lightbulb={lightbulb}
                        footer={{ enabled: true }}
                    />
                }>
                    <Route index element={ <Home/> }/>
                    {/* A spinning blahaj */}
                    <Route path="blahaj" element={ <Home blahaj /> }/>
                    
                    <Route element={ <BlogsContextProvider/> }>
                        <Route path="blogs">
                            <Route index element={ <Blogs/> }/>
                            <Route path=":blog" element={ <BlogPost/> }/>
                        </Route>
3                    </Route>
                    
                    {/* <Route path="portfolio" element={ <Portfolio/> }/>
                    <Route path="tools">
                        <Route index element={ <Tools/> }/>
                        <Route path="playground" element={
                            <Playground device={ device } setBgShow={ setBgShow }/>
                        }/>
                    </Route> */}
                </Route>

                {/* Path with entry... most people dont like it :c */}
                <Route path="entry/*" element={ <Entry/> }/>
            </Routes>
        </CanvasStateContextProvider>
    );
}