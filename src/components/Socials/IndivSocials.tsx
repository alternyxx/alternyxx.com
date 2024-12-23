import "./Socials.css"

export default function IndivSocial(props: any) {
    return (
        <div className="IndivSocial">
            { props.image && 
            <img src={props.image}
                className="SocialsLogo" >
            </img> }
            <p className="SocialsText">
                {props.text}
            </p>
        </div>
    )
}