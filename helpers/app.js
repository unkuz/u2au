import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import { path } from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(path);

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
      .on("end", () => resolve(`${filePath}/${title}.mp3`))
      .saveToFile(`${filePath}/${title}.mp3`)
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

process()("https://www.youtube.com/watch?v=jPYh0TIVAvM", {});
