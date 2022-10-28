import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import JWT from "./module/jwt";
import StreamContainer from "./components/streamContainer";
import { HOST, KEY, SECRET } from "./utils";
import List from "./components/list";

declare global {
  interface Window {
    Sinch: any;
  }
}

function Room() {
  const [appClient, setAppClient] = useState<any>();
  const listCall = useRef<Array<any>>([]);
  const listRef = useRef<any>();
  const streamRef = useRef<any>();
  const streamList = useRef<Array<any>>([]);
  const [roomCode, setRoomCode] = useState("");

  const callListeners = useCallback(
    (currentCall: any) => {
      currentCall.addListener({
        onCallProgressing: (call: any) => {
          console.log("ringggggggggg");
        },
        onCallEstablished: (call: any) => {
          streamList.current.push(call);
          streamRef.current.setList(streamList.current);
        },
        onCallEnded: (call: any) => {
          const newData = listCall.current.filter(
            (item) => item.origin.identity !== call.origin.identity
          );
          listCall.current = [...newData];
          listRef.current?.setList(newData);
          const newdt = streamList.current.filter(
            (item) => item.origin.identity !== call.origin.identity
          );
          streamList.current = [...newData];
          streamRef.current?.setList(newdt);
          console.log("end");
        },
      });
    },
    [listCall]
  );
  console.log({ callClient: appClient?.callClient }, "aaaa");

  const setUpClient = useCallback(() => {
    const client = window.Sinch.getSinchClientBuilder()
      .applicationKey(KEY)
      .environmentHost(HOST)
      .userId(roomCode)
      .build();
    client.addListener({
      onCredentialsRequired: (client: any, clientRegistration: any) => {
        new JWT(KEY, SECRET, roomCode).toJwt().then((token) => {
          clientRegistration.register(token);
        });
      },
      onClientFailed: (error: any) => {
        console.log(error);
      },

      onClientStarted: (sinchClient: any) => {
        console.log("start");
        sinchClient.callClient.addListener({
          onIncomingCall: (client: any, call: any) => {
            listCall.current.push(call);
            listRef.current?.setList(listCall.current);
            callListeners(call);
          },
        });
        setAppClient(sinchClient);
      },
    });
    client.setSupportManagedPush();
    client.start();
  }, [roomCode]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log({ listCall: listCall.current });
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      {!appClient && (
        <button disabled={roomCode.length === 0} onClick={() => setUpClient()}>
          make room
        </button>
      )}
      <List ref={listRef} list={listCall.current} />
      <div style={{ position: "fixed", top: "10px", right: "20px" }}>
        <video id="videoOut" style={{ width: "300px", height: "150px" }} />
      </div>
      <StreamContainer ref={streamRef} list={streamList.current} />

      {appClient?.isStarted() && (
        <div>
          <button
            onClick={() => {
              console.log("click");
              appClient.terminate();
            }}
          >
            end room
          </button>
        </div>
      )}
    </div>
  );
}

export default Room;
