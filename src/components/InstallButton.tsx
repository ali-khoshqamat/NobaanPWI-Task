import { useState, useEffect } from "react";

const InstallButton = () => {
  const [supportsInstallPrompt, setSupportsInstallPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  //   if ("beforeinstallprompt" in window) {
  //     console.log("beforeinstallprompt");
  //   } else {
  //     console.log("!beforeinstallprompt");
  //   }

  useEffect(() => {
    const handler = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    const handler = () => setSupportsInstallPrompt(true);
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!supportsInstallPrompt) {
    return null;
  }

  return (
    <button
      className="outline-none py-1 px-3.5 bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold"
      onClick={handleInstallClick}
    >
      Install App
    </button>
  );
};

export default InstallButton;
