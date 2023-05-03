import { useEffect, useState } from "react";
import InstallButton from "./components/InstallButton";
import VibrateCamera from "./components/VibrateCamera";
import BatteryStatus from "./components/BatteryStatus";
import Header from "./components/Header";
import Animation from "./components/Animation";
import List from "./components/List";
// import type { MediaStream, MediaStreamConstraints } from "@types/webrtc";
// import { MediaStream, MediaStreamConstraints } from "webrtc";

function App() {
  const [isLandscape, setIsLandscape] = useState(false);
  // const [isLandscape, setIsLandscape] = useState(
  //   window.matchMedia("(orientation: landscape)").matches
  // );
  // console.log("isLandscapt: ", isLandscape);

  useEffect(() => {
    const orientationChangeHandler = (event: DeviceOrientationEvent) => {
      console.log("event: ", event);
      // window.alert(`gamma: ${event.gamma}`);
      if (event.gamma !== null && event.beta !== null) {
        const gamma = event.gamma * (Math.PI / 180);
        const beta = event.beta * (Math.PI / 180);
        // const radians = 90 * (Math.PI / 180);
        const radians = 45 * (Math.PI / 180);
        console.log("gamma: ", gamma);
        // window.alert(`gamma: ${gamma}`);
        console.log("abs(gamma): ", Math.abs(gamma));
        // setIsLandscape(Math.abs(gamma) > 90);
        // setIsLandscape(Math.abs(gamma) > 1.5708 && Math.abs(beta) < 1.5708);
        setIsLandscape(Math.abs(gamma) > radians && Math.abs(beta) < radians);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", orientationChangeHandler);
    }
    return () => {
      window.removeEventListener("deviceorientation", orientationChangeHandler);
    };
  }, []);

  return (
    <>
      <div
        className={`w-full min-h-screen flex flex-col items-center text-[#0d1d2c] pt-14 font-body ${
          isLandscape ? "bg-lime-100" : "bg-slate-100"
        }`}
      >
        <BatteryStatus />
        <Header />
        <VibrateCamera />
        <InstallButton />
        <Animation />
        <List />
      </div>
    </>
  );
}

export default App;
