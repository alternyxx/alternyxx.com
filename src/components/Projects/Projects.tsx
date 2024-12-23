import "./Projects.css"
import IndivProject from "./IndivProject"

export default function Projects() {
    return (
        <div className="Projects">
            <p className="ProjectsHeading">
                What I've worked on
            </p>
            <IndivProject 
                ProjectName="Rhythm50"
            />
        </div>
    )
}