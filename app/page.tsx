"use client";
import React, { useState, useEffect } from "react";
import ytdl from "ytdl-core";
import { HttpsProxyAgent } from "https-proxy-agent";
// Remove 'user:pass@' if you don't need to authenticate to your proxy.
const proxy = "http://localhost:8";
const agent = new HttpsProxyAgent(proxy);

console.log("req", agent);

export default function Home() {
  const submitURL = async () => {
    console.log("info");
    const info = await ytdl.getInfo(
      "https://www.youtube.com/watch?v=ueqBOGLRTT0&list=RD1sZgo0tei30&index=2"
      // {
      //   requestOptions: { agent },
      // }
    );
    console.log("info", info);
    debugger;
  };

  const [url, setUrl] = useState("");
  return <button onClick={submitURL}>Check</button>;
}
