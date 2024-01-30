import type { NextApiRequest, NextApiResponse } from "next";
import { process } from "../../helpers/app";
import ytdl from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const info = await ytdl.getInfo(
      "https://www.youtube.com/watch?v=ueqBOGLRTT0&list=RD1sZgo0tei30&index=2"
    );

    res.json(info);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Fail" });
  }
}
