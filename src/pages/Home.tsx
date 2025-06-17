import { useContext, useRef, useEffect } from "react"
import { motion } from "motion/react"

import Bio from "../components/Bio/Bio"
import Project from "../components/Project/Project"
import Technologies from "../components/Technologies/Technologies"

import { CanvasStateContext } from "../common/context"

import Blahaj from "../common/vertices/Blahaj"
import blahajShader from "../common/shaders/blahaj.wgsl?raw"

/* temp, will prob switch to json in the future */
const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
Later down the line, when I have more free time, I plan to repurpose the game as
a more fleshed-out rhythm game with my own custom music. For now, you can simply download 
the compiled version via 
`

export default function Home({blahaj}: {blahaj?: boolean}) {
	const { setCanvasState } = useContext(CanvasStateContext);
	const blahajRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// ~~~ Scrolling on render depending on initial stage ~~~ //		
		if (blahaj) {
			blahajRef.current!.scrollIntoView();
		}
	}, []);

	return (
		<div className="Page">
			<Bio/>

			<motion.section
				className="Projects"
				viewport={{amount: 0.25}}
				onViewportEnter={() => {
					setCanvasState({
						vertices: Blahaj,
						dimensions: 3,
						shader: blahajShader,
					});
				}}
				ref={blahajRef}
			>
				<motion.p 
					initial={{opacity: 0, y: 50}}
					whileInView={{opacity: 1, y: 0,}}
					viewport={{margin: "200px 0px 0px 0px"}}
					transition={{ duration: 1.5, }}
					className="Heading"
				>
					Highlighted works
				</motion.p>    
				<Project 
					projectName="Rhythm50"
					description={Rhythm50Description}
					media={[
						"https://static.alternyxx.com/mp4/ByYourSide.mp4", 
						"https://static.alternyxx.com/mp4/NacreousSnowmelt.mp4",
						"https://static.alternyxx.com/png/ByYourSidePaused.png",
						"https://static.alternyxx.com/png/NacreousSnowmeltPaused.png"
					]}
					thumbnails={[
						"https://static.alternyxx.com/png/ByYourSide.png", 
						"https://static.alternyxx.com/png/NacreousSnowmelt.png"
					]}
				/>
			</motion.section>
			
			<Technologies/>
		</div>
	);
}