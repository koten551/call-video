export const KEY = "9e827e5f-1cfe-4d0f-a540-e094e0bd5820";
export const SECRET = "iYN0FwNe1EeKczTqUsP7zA==";
export const HOST = "https://ocra.api.sinch.com";

const handleAddVideo = (call: any, way: string) => {
  const id = call?.origin?.identity || "userid";
  const videoContainer = document.querySelector("#video-container");
  const videoElement: HTMLVideoElement = document.createElement("video");
  videoElement.id = `video-${id}`;
  videoElement.srcObject = call.incomingStream;
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  videoElement.muted = way === "videoOut";
  if (videoElement) {
    videoContainer?.appendChild(videoElement);
  }
};

const handleRemoveVideo = (call: any) => {
  const id = call?.origin?.identity || "userid";
  const videoContainer = document.querySelector("#video-container");
  const element = document.getElementById(`video-${id}`);
  if (element && videoContainer) {
    videoContainer.removeChild(element);
  }
};
