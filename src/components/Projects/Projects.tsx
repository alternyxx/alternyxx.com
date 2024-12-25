import "./Projects.css"
import IndivProject from "./IndivProject"

const Rhythm50Description = `
Rhythm50 is a VSRG (Vertically Scrolling Rhythm Game) developed solely by me.
It is developed in pygame-ce and was my submission for the final project of CS50P.
`

export default function Projects() {
    return (
        <div className="Projects">
            <p className="ProjectsHeading">
                Highlighted works
            </p>
            <IndivProject 
                projectName="Rhythm50"
                description={Rhythm50Description}
            />
        </div>
    )
}