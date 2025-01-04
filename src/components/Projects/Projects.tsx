import "./Projects.css"
import IndivProject from "./IndivProject"

import img from "../../assets/image.png"

const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
`

export default function Projects() {
    return (
        <section className="Projects">
            <p className="ProjectsHeading">
                Highlighted works
            </p>    
            <IndivProject 
                projectName="Rhythm50"
                description={Rhythm50Description}
                images={[img, img]}
            />
        </section>
    )
}