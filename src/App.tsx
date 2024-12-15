import { useState, useEffect } from "react"
import Canvas from "./components/Canvas"
import BasicAbout from "./components/BasicAbout"
import "./components/BasicAbout.css"

export default function App(props: any) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setTimeout(() => setStage(1), 7000);
  }, []);

  return (
    <div>
      <div className="App">
        <Canvas stage={stage} device={props.device} />
        <BasicAbout />
      </div>
    </div>
  );
}