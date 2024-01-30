"use client";
import axios from "axios";
import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function Home() {
  const submitURL = async () => {
    console.log("info");
    const { data } = await axios("/api/info-back");
    console.log("dta", data.formats[0].url);

    const a = await axios.post("/api/fetch-file", { url: data.formats[0].url });
    console.log("a");
    // debugger;
  };

  const [url, setUrl] = useState("");
  return <button onClick={submitURL}>Check</button>;
}
