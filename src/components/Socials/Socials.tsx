import "./Socials.css"

export default function Socials(props: any) {
    return (
        <span>
            <img src={props.image}
                    className="SocialsLogo" >
            </img>
        </span>
    )
}