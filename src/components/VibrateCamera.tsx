import { useEffect, useRef, useState } from "react";

const VibrateCamera = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    requestMediaStream();
  }, []);

  const handleVibrate = () => {
    navigator.vibrate([200, 100, 200]);
  };

  async function requestMediaStream() {
    try {
      const constraints: MediaStreamConstraints = { audio: true, video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices", error);
    }
  }

  const startHandler = async () => {
    try {
      await requestMediaStream();
    } catch (error) {
      console.error("Error accessing media devices", error);
    }
  };

  const stopHandler = () => {
    if (mediaStream) {
      console.log(mediaStream);
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
    }
  };

  const captureImageHandler = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/png"));
      }
    }
  };

  return (
    <section className="flex flex-col w-11/12 bg-white p-2.5 border border-solid border-gray-300 rounded-md mb-5">
      <>
        <div className="flex justify-between items-center mb-5">
          <button
            className="outline-none py-1 px-3.5 bg-red-700 text-stone-50 border border-solid border-red-700 rounded-md font-bold"
            onClick={handleVibrate}
          >
            Vibrate
          </button>
          <button
            className={`outline-none py-1 px-3.5 bg-green-700 text-stone-50 border border-solid border-green-700 rounded-md font-bold ${
              isShow && "!text-red-700 border-red-700 bg-stone-100"
            } `}
            onClick={() => {
              setIsShow((prevState) => !prevState),
                !isShow ? startHandler() : stopHandler();
            }}
          >
            {!isShow ? "Start Camera" : "Stop Camera"}
          </button>
        </div>
        {isShow && (
          <>
            <video
              ref={videoRef}
              className="rounded-md mb-2.5"
              autoPlay
              muted
            />
            <div className="relative">
              <button
                className="absolute bottom-0 w-14 h-14 rounded-full bg-white mx-1 my-3.5"
                onClick={captureImageHandler}
              ></button>
            </div>
          </>
        )}
        <canvas ref={canvasRef} style={{ display: "none" }} />
        {capturedImage && (
          <img
            src={capturedImage}
            className="border border-solid border-gray-300 rounded-md"
          />
        )}
      </>
    </section>
  );
};

export default VibrateCamera;
