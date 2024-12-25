import { useState, useEffect } from "react"
import { useSkip } from "./components/useSkip"
import { useScroll, useMotionValueEvent } from "motion/react"

import Canvas from "./components/Canvas"
import Entry from "./components/BasicAbout/Entry"
import Hej from "./components/Hej/Hej"
import Bio from "./components/Bio/Bio"
import Technologies from "./components/Technologies/Technologies"
import Contact from "./components/Contact/Contact"
import Projects from "./components/Projects/Projects"

interface App {
  	device: GPUDevice | undefined,
  	warning: boolean
}

export default function App(props: App) {
	const [stage, setStage] = useState(0);

  	const { scrollYProgress } = useScroll();

  	// This hook is entirely for entry and to transition
  	useEffect(() => {
    	setTimeout(() => setStage(1), 10000);
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
		// console.log(stage);
	})

	// Custom hook to skip entry if enter is pressed
	useSkip(stage, setStage);

	return (
		<>
			{!props.warning && props.device && 
			<Canvas width={ window.innerWidth }
					height={ window.innerHeight - 1 }
					scroll={ scrollYProgress }
					stage={ stage } 
					device={ props.device } />}
			<div className="App">
				{ stage === 0 && <Entry /> }
				{ stage > 0 &&
				<>
					<Hej />
					<Bio />
					<Technologies />
					{/* <Socials /> */}
					<Projects />
					<Contact />
				</> }
			</div>
		</>
	);
	}