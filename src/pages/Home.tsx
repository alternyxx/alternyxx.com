import { useState, useEffect } from "react"
import { useScroll, useMotionValueEvent } from "motion/react"

import { DarkModeContext } from "../common/context"

import Canvas from "../components/Canvas/Canvas"
import Entry from "../components/Entry/Entry"
import Menu from "../components/Menu/Menu"
import Lightbulb from "../components/Lightbulb/Lightbulb"
import Hej from "../components/Hej/Hej"
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

  	const { scrollYProgress } = useScroll();

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

	// Hook to set stage depending on scrollYProgress
	useMotionValueEvent(scrollYProgress, "change", (scrollY) => {
		if (stage > 0 ) {
			setStage(
				(scrollY < 0.25) ? 1 :
				(scrollY < 0.70) ? 2 :
				(scrollY < 0.90) ? 3 : 
				3
			);
		}
	});

	return (
		<>
			{ props.device && bgShow && 
			<Canvas 
				scroll={scrollYProgress}
				darkMode={darkMode}
				stage={stage} 
				device={props.device} 
			/>
			}

			<DarkModeContext.Provider value={darkMode} >
				{/* i think the below is beautiful */}
				<div 
					className="Home" 
					style={{
						color: darkMode ? "#F6F7F9" : "#23272F",
						textShadow: darkMode ? "1px 1px 2px #23272F" : "1px 1px 2px #F6F7F9",
						backgroundColor: props.device && bgShow ? "transparent" : darkMode ? "#000000" : "#FFFFFF",
				}}
				>
					{ stage === 0 && <Entry stage={stage} setStage={setStage} /> }
					{/* why is this conditionally rendered and not whileInView?, idk */}
					{ stage > 0 && 
					<>
						<Menu bgShow={bgShow} setBgShow={setBgShow}/>
						<Lightbulb setDarkMode={setDarkMode} /> 
						<Footer />
					</> }
					{ stage === 1 && 
					<>
						<Hej />
						<Bio />
					</>
					}
					{ stage === 2 && <Projects /> }
					{ stage === 3 && <Technologies /> }
					{/* <Contact /> */}
				</div>
			</DarkModeContext.Provider>
		</>
	);
	}