import type { NextApiRequest, NextApiResponse } from "next";
import { process } from "../../helpers/app";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const url = JSON.parse(req.body).url;
  console.log("req", url);

  try {
    console.log("process.cwd()");
    const r = await process("./static")(url, {});
    res.status(200).json({ message: `localhost:8/${r}` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Fail" });
  }
}
