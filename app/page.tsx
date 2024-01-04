"use client";
import React, { useState } from "react";

export default function Home() {
  const submitURL = () => {
    console.log("url", url);

    console.log("process.cwd()", process.cwd());

    fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
  };

  const [url, setUrl] = useState("");
  return (
    <div>
      <input
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        type="text"
        className="border-[1px] border-black"
      />
      <button onClick={submitURL}>SUbmit</button>
    </div>
  );
}
