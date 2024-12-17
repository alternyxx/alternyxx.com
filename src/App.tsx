import { useState, useEffect } from "react"
import Canvas from "./components/Canvas"
import BasicAbout from "./components/BasicAbout/BasicAbout"
import About from "./components/About/About"
import Bio from "./components/Bio/Bio"
import Socials from "./components/Socials/Socials"

import discord from "../../assets/discord-mark-white.svg"

interface App {
  device: GPUDevice,
  warning: boolean
}

export default function App(props: any) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setTimeout(() => setStage(1), 9000);
  }, []);

  return (
    <div>
      <div className="App">
        {!props.warning && <Canvas width={window.innerWidth}
                height={stage > 0 ? window.innerHeight * 3 : window.innerHeight - 1}
                stage={stage} 
                device={props.device} />}
        {stage === 0 && <BasicAbout />}
        {stage === 1 &&
          <>
            <About />
            <Bio />
          </> }
      </div>
    </div>
  );
}