const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");

const downloadAndConvertVideoToMp3 = ({
  title,
  videoUrl,
  startTime,
  duration,
  filePath,
}: any) =>
  new Promise((resolve, reject) =>
    ffmpeg(ytdl(videoUrl, { filter: "audioonly" }))
      .toFormat("mp3")
      .setStartTime(startTime)
      .duration(duration)
      .on("error", (err: Error) => reject(err))
      .on("end", () => resolve(`${title}.mp3`))
      .saveToFile(`${filePath}/${title}.mp3`)
  );

export const process = (path: string) => (url: string, params: any) =>
  ytdl
    .getInfo(url)
    .then((info: any) => {
      const { title, start, duration } = params;
      return {
        title: title ?? info.videoDetails.title,
        videoUrl: info.videoDetails.video_url,
        startTime: start ?? "00:00:00",
        duration: duration ?? info.videoDetails.lengthSeconds,
        filePath: path ?? __dirname,
      };
    })
    .then(downloadAndConvertVideoToMp3);
