import { useState, useEffect } from "react"
import { useScroll, useMotionValueEvent } from "motion/react"

import Canvas from "./components/Canvas/Canvas"
import Entry from "./components/Entry/Entry"
import Lightbulb from "./components/Lightbulb/Lightbulb"
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
	const [darkMode, setDarkMode] = useState(false);

  	const { scrollYProgress } = useScroll();

  	useEffect(() => {
		// ~~~ For entry transition ~~~ //
    	const timeOut = setTimeout(() => setStage(1), 10000);
		

		// ~~~ Enter button to skip entry ~~~ //
		const keyDown = (key: KeyboardEvent) => {
            if (stage === 0 && key.key === "Enter") {
                key.preventDefault();
                setStage(1);
            }
        }

        document.addEventListener("keydown", keyDown);


		// ~~~ Browser light mode/dark mode change ~~~ //
		// https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/change_event
		let darkMediaQuery;
		if (window.matchMedia) {
			darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			if (darkMediaQuery.matches) {
				setDarkMode(true);
			}

			darkMediaQuery.onchange = (mode) => {
				if (mode.matches) {
					setDarkMode(true);
				} else {
					setDarkMode(false);
				}
			};
		}


		// ~~~ Clean up ~~~ //
		return () => {
			// Entry transition
			clearTimeout(timeOut);
			
			// Entry skip 
			document.removeEventListener("keydown", keyDown);

			// You may realise there's no dark mode, its not necessary for unmounting i think
		};

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
			{!props.warning && props.device && 
			<Canvas 
				scroll={ scrollYProgress }
				stage={ stage } 
				device={ props.device } />
			}

			<div className="App">
				{ stage === 0 && <Entry /> }
				{ stage > 0 &&
				<>
					<Lightbulb 
						darkMode={darkMode}
						setDarkMode={setDarkMode}
					/>
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