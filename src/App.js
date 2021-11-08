import { useState, useEffect } from "react";

import * as Tone from "tone";

import Editor from "./Editor";
import Preview from "./Preview";

import "./styles.css";

const defaultValue = `# Sample

\`\`\`abc
X: 1
M: 6/4
K: Am
|Ccea|[^Gb],ecb|[Gc']ecc'|[^F^f]dA^f|
[eF]cAc-|cecA|[B,GB][A,Ac][A,Ac]4|
|Acea|[^Gb],ecb|[Gc']ecc'|[^F^f]dA^f|
[eF]cAc-|cecA|[B,GB][A,Ac][A,Ac]4|
[B,GB][^Gb][^Gb]|Acea|cccd
\`\`\``;

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

export default function App() {
  const [value, setValue] = useState(defaultValue);
  const [isPlaying, setPlaying] = useState(false);
  function onEditorChange(value, event) {
    setValue(value);
  }
  useEffect(() => {
    setPlaying(false);
  }, [value]);
  function onEvent(event) {
    if (!event) {
      return;
    }
    event.notes.forEach((n) => {
      synth.triggerAttackRelease(n.name, n.duration);

    });
    

  }

  function play() {
    setPlaying(!isPlaying);
  }

  return (
    <div className="App">
      {/* <Editor onEditorChange={onEditorChange} defaultValue={defaultValue} /> */}
      <div className="preview-wrapper">

          <button className="button" onClick={play}>Play</button>


        <Preview value={value} onEvent={onEvent} isPlaying={isPlaying} />
        {/* <footer>
          <button onClick={play}>Play</button>
        </footer> */}
      </div>
    </div>
  );
}
