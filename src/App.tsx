import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'

import { 
    DarkModeContext,
    StageContextProvider,
} from './common/context.js'

import Canvas from './components/Canvas/Canvas'
import Menu from './components/Menu/Menu'
import Lightbulb from './components/Lightbulb/Lightbulb'

import Home from './pages/Home.tsx'
import Entry from './pages/Entry.tsx'
import Blogs from './pages/Blogs.tsx'
import Portfolio from './pages/Portfolio.tsx'

export default function App() {
    const [device, setDevice] = useState<GPUDevice | undefined>();
    const [bgShow, setBgShow] = useState(true);
	const [htmlShow, setHtmlShow] = useState(true);
	const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        async function getDevice() {
            if (navigator.gpu) {
                const adapter = await navigator.gpu.requestAdapter();
                if (adapter) {
                    let device = await adapter.requestDevice();
                    setDevice(device);
                } else {
                    console.log("hiiiii- the uhm, device failed to fetch sooo");
                }
            } else {
                console.log("hiiiii- the uhm, device failed to fetch sooo");
            }
        }

        getDevice();

        // ~~~ Browser light mode/dark mode change ~~~ //
		// it doesnt seem to work tho bruv
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
        <StageContextProvider>
        <DarkModeContext.Provider value={darkMode}>
            {device && bgShow && 
                <Canvas 
                    darkMode={darkMode}
                    device={device} 
                />
            }
            <Menu 
                bgShow={bgShow} 
                setBgShow={setBgShow} 
                htmlShow={htmlShow} 
                setHtmlShow={setHtmlShow} 
            />
            <div
                style={{
                    color: darkMode ? "#F6F7F9" : "#23272F",
                    textShadow: darkMode ? "1px 1px 2px #23272F" : "1px 1px 2px #F6F7F9",
                    backgroundColor: device && bgShow ? "transparent" : darkMode ? "#000000" : "#FAFAFA",
                    visibility: htmlShow ? "visible" : "hidden"
                }}
                className="App"
            >
                <Lightbulb setDarkMode={setDarkMode}/> 
                <Routes>
                    {/* Path without entry... */}
                    <Route index element={<Home/>}/>
                    {/* <Route path="home" element={<Home/>}/>  */}

                    {/* Path with entry... most people dont like it :c */}
                    <Route path="entry" element={<Entry/>}/>

                    {/* A spinning blahaj */}
                    <Route path="blahaj" element={<Home/>}/>

                    <Route path="blogs" element={<Blogs/>}/>
                    <Route path="portfolio" element={<Portfolio/>}/>
                </Routes>
            </div>
        </DarkModeContext.Provider>
        </StageContextProvider>
    );
}