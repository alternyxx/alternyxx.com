import "./Contact.css"

export default function Contact() {
    return (
        <div className="Contact">
            <p className="ContactHeading">Get in contact!</p>
            <p className="ContactText">
                I'm very opportunistic about freelancing!
            </p>
            <p className="ContactText">
                Moreover, if you have any other commission, request or even a question, feel
                free to reach out!
            </p>
            <div className="Mail">
                {/* <img src={email} className="EmailImg"/> */}
                <p className="Email">nyx@alternyxx.com</p>
            </div>
        </div>
    )
}