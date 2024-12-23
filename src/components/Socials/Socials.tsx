import IndivSocial from "./IndivSocials";

import discord from "../../assets/discord-mark-white.svg"

export default function Socials() {
    <div className="Socials">
        <IndivSocial text="alternyxx@gmail.com"/>
        <IndivSocial image={discord} text="@alternyxx" />
    </div>
}