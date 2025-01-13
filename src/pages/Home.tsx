import { useState, useEffect } from "react"

import { DarkModeContext } from "../common/context"

import Canvas from "../components/Canvas/Canvas"
import Entry from "../components/Entry/Entry"
import Menu from "../components/Menu/Menu"
import Lightbulb from "../components/Lightbulb/Lightbulb"
import Bio from "../components/Bio/Bio"
import Projects from "../components/Projects/Projects"
import Technologies from "../components/Technologies/Technologies"
import Footer from "../components/Footer/Footer"

interface Home {
  	device: GPUDevice | undefined
	stage: number
}

export default function Home(props: Home) {
	const [stage, setStage] = useState(props.stage);
	const [bgShow, setBgShow] = useState(true);
	const [darkMode, setDarkMode] = useState(true);

  	useEffect(() => {
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
		// You may realise there's no unmount for media query, its not necessary for unmounting i think
	}, []);

	return (
		<>
			{ props.device && bgShow && 
			<Canvas 
				darkMode={darkMode}
				stage={stage} 
				device={props.device} 
			/>
			}

			<div 
				className="Home" 
				style={{
					color: darkMode ? "#F6F7F9" : "#23272F",
					textShadow: darkMode ? "1px 1px 2px #23272F" : "1px 1px 2px #F6F7F9",
					backgroundColor: props.device && bgShow ? "transparent" : darkMode ? "#000000" : "#FFFFFF",
				}}
			>
				<DarkModeContext.Provider value={darkMode} >
					{ stage === 0 ? <Entry stage={stage} setStage={setStage} /> :
					<>
						<Menu bgShow={bgShow} setBgShow={setBgShow}/>
						<Lightbulb setDarkMode={setDarkMode} /> 
							<Bio setStage={setStage} />
							<Projects setStage={setStage} />
							<Technologies setStage={setStage} />
							<Footer />
						</> 
					}
				</DarkModeContext.Provider>
			</div>
		</>
	);
}