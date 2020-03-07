import React, { useState, useEffect, useCallback, useRef } from "react";
import randomColor from "randomcolor";
import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import useWindowSize from "./components/WindowSize";
import Name from "./components/Name";
import RefreshButton from "./components/RefreshButton";
import "./styles.css";

export default function App() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState("");

  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then(res => res.json())
      .then(res => {
        setColors(res.colors.map(color => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  }, []);

  useEffect(getColors, []);

  const [visible, setVisible] = useState(false);
  let timeoutId = useRef();
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setVisible(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setVisible(false), 500);
  });

  return (
    <div className="App">
      <header style={{ borderTop: `10px solid ${activeColor}` }}>
        <div>
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <RefreshButton cb={getColors} />
        </div>
      </header>

      {activeColor && (
        <Canvas color={activeColor} height={window.innerHeight} />
      )}

      <div className={`window-size ${visible ? "" : "hidden"}`}>
        {windowWidth} x {windowHeight}
      </div>
    </div>
  );
}
