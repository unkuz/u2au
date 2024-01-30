import type { NextApiRequest, NextApiResponse } from "next";
import { process } from "../../helpers/app";
import ytdl from "ytdl-core";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("rq", req.body.url);
    // const url = JSON.parse(req.body);
    // console.log("url", url);
    const a = await fetchFile(req.body.url);
    res.json(a);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Fail" });
  }
}
