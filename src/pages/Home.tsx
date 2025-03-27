import { useContext, useRef, useEffect } from "react"
import { StageContext } from "../common/context"

import Bio from "../components/Bio/Bio"
import Projects from "../components/Projects/Projects"
import Technologies from "../components/Technologies/Technologies"
import Footer from "../components/Footer/Footer"

export default function Home() {
	const {stage} = useContext(StageContext);
	const blahajRef = useRef<HTMLDivElement>(null);
	console.log(stage);
  	useEffect(() => {
		// ~~~ Scrolling on render depending on initial stage ~~~ //		
		if (stage === 2) {
			blahajRef.current!.scrollIntoView();
		}
	}, []);

	return (
		<div className="Home">
			<Bio/>
			<Projects reference={blahajRef}/>
			<Technologies/>
			<Footer />
		</div>
	);
}