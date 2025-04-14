import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "revalidate error" });
  }
}
