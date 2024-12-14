// import { useState } from "react"
import Canvas from "./components/Canvas"
import BasicAbout from "./components/BasicAbout"
import "./components/BasicAbout.css"

export default function App(props: any) {
  // const [time, setTime] = useState(0);

  return (
    <div>
      {<div className="App">
        <Canvas device={props.device} />
        <BasicAbout />
      </div>}
    </div>
  );
}