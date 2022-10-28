import React, { useLayoutEffect, useRef } from "react";

const Stream: React.FC<{ call: any }> = ({ call }) => {
  const id = "video-" + call.origin.identity;
  const root = useRef<any>();
  useLayoutEffect(() => {
    root.current.srcObject = call.incomingStream;
    root.current.autoplay = true;
    root.current.playsInline = true;
  }, [call]);
  return <video id={id} ref={root} />;
};

export default React.memo(Stream);
