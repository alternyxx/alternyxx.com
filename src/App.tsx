import { useState, useEffect } from "react"
import Canvas from "./components/Canvas"
import BasicAbout from "./components/BasicAbout/BasicAbout"
import About from "./components/About/About"

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
        <Canvas stage={stage} device={props.device} />
        <BasicAbout />
        {stage === 1 &&
          <>
            <About />
          </> }
      </div>
    </div>
  );
}