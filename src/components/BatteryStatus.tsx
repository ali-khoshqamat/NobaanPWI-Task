import { useCallback, useEffect, useState } from "react";

interface BatteryManager extends EventTarget {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const NavigatorWithBattery = navigator as NavigatorWithBattery;

  const updateBatteryLevel = useCallback(() => {
    if (NavigatorWithBattery.getBattery) {
      NavigatorWithBattery.getBattery()?.then((battery) => {
        const { level } = battery;
        setBatteryLevel(Math.floor(level * 100));
      });
    }
  }, []);

  useEffect(() => {
    const NavigatorWithBattery = navigator as NavigatorWithBattery;

    if (!NavigatorWithBattery?.getBattery) {
      console.log("Battery API is not supported in this browser.");
      return;
    }
    updateBatteryLevel();

    NavigatorWithBattery.getBattery()?.then((battery) => {
      battery.addEventListener("levelChange", updateBatteryLevel);
    });
  }, [updateBatteryLevel]);

  return (
    <div className="py-1 px-3.5 fixed top-1.5 right-1.5 border border-solid border-gray-300 rounded-md bg-white">
      {batteryLevel !== null && (
        <p className="text-sm font-medium">
          Battery level: <span className="font-extrabold">{batteryLevel}%</span>
        </p>
      )}
    </div>
  );
};

export default BatteryStatus;
