import haj from "../../assets/haj.jpg"
import "./About.css"

export default function About() {
    return (
        <div className="About">
            <img src={haj}
                 alt="Freedom yearning Blahaj"
                 width="180"
                 height="180"
                 className="AboutAvatar" >
            </img>
            <p className="AboutText1">
                Hej! I've been working on this as a project during the holidays!
            </p>

        </div>
    )
}