import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { path } from "@ffmpeg-installer/ffmpeg";
import stream from "stream";

ffmpeg.setFfmpegPath(path);

const buffers = [];
const bufferStream = new stream.PassThrough();

bufferStream
  .on("start", () => {
    console.log("Pass-through stream has started");
  })
  .on("data", function (buf) {
    // console.log("bufferStream data", buf);
    buffers.push(buf);
  })
  .on("end", function () {
    const outputBuffer = Buffer.concat(buffers);
    console.log("Done preparing bufferStream");

    // console.log("Uint8Array", new Uint8Array(outputBuffer));
    console.log(
      "URL",
      URL.createObjectURL(new Blob([outputBuffer], { type: "audio/mp3" }))
    );
  });

const downloadAndConvertVideoToMp3 = ({
  title,
  videoUrl,
  startTime,
  duration,
  filePath,
}) =>
  new Promise((resolve, reject) =>
    ffmpeg(ytdl(videoUrl, { filter: "audioonly" }))
      .toFormat("mp3")
      .setStartTime(startTime)
      .duration(duration)
      .on("error", (err) => reject(err))
      .on("end", () =>
        resolve({
          buff: buffers,
        })
      )
      .writeToStream(bufferStream)
  );

export const process = (path) => (url, params) =>
  ytdl
    .getInfo(url)
    .then((info) => {
      const { title, start, duration } = params;
      return {
        title: title ?? info.videoDetails.title,
        videoUrl: info.videoDetails.video_url,
        startTime: start ?? "00:00:00",
        duration: duration ?? info.videoDetails.lengthSeconds,
        filePath: path ?? "../static",
      };
    })
    .then(downloadAndConvertVideoToMp3);
