"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AudioPage() {
  const audioEl = useRef<HTMLMediaElement>(null);
  const audioSource = useRef<MediaElementAudioSourceNode>();
  const analyser = useRef<AnalyserNode>();

  const canvasRef = useRef<any>();

  const ctx = useRef<any>(null);

  useEffect(() => {
    ctx.current = canvasRef.current!.getContext("2d");
  }, []);

  const start = () => {
    audioEl.current?.play();

    const audioContext = new AudioContext();

    if (!audioSource.current) {
      audioSource.current = audioContext.createMediaElementSource(
        audioEl.current!
      );

      analyser.current = audioContext.createAnalyser();

      audioSource.current.connect(analyser.current);

      // const splitter = audioContext.createChannelSplitter(2);
      // audioSource.current.connect(splitter);
      // splitter.connect(analyser.current, 0, 0);

      analyser.current.connect(audioContext.destination);
    }

    analyser.current!.fftSize = 8192;
    const bufferLength = analyser.current!.frequencyBinCount;

    const dataArray = new Uint8Array(bufferLength);

    function animate() {
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      analyser.current!.getByteTimeDomainData(dataArray);

      ctx.current.fillStyle = "transparent";
      ctx.current.fillRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );

      ctx.current.lineWidth = 2;
      ctx.current.strokeStyle = "rgb(0 0 0)";
      ctx.current.beginPath();

      const sliceWidth = canvasRef.current!.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (canvasRef.current!.height / 2);

        if (i === 0) {
          ctx.current.moveTo(x, y);
        } else {
          ctx.current.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.current.lineTo(
        canvasRef.current!.width,
        canvasRef.current!.height / 2
      );
      ctx.current.stroke();
      requestAnimationFrame(animate);
    }

    animate();
  };

  return (
    <>
      <div
        onClick={start}
        className="w-full h-screen flex justify-end items-center flex-col"
      >
        <canvas ref={canvasRef} className="w-[300px] h-[35px]" />
        <audio ref={audioEl} controls src="/To_the_Edge.mp3" />
      </div>
    </>
  );
}
