import { NextApiRequest, NextApiResponse } from 'next';

type PostBody = {
  ip: string;
};

type Data = {
  ip: string;
  sum: number;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const body = {
        msg: `I am an Edge function! (executed on ${process.env.VERCEL_REGION})`,
      };
      return res.status(200).json(body);
    }

    if (req.method === 'POST') {
      const body = JSON.parse(req.body) as PostBody;
      const ip = body.ip;
      if (!ip) {
        return res.status(400).json({ msg: 'IP address is required!' });
      }
      const sum = ip.split('.').reduce((acc: number, val: string) => acc + parseInt(val), 0);
      const response: Data = {
        ip,
        sum,
        msg: `I am an Edge function! (executed on ${process.env.VERCEL_REGION}) and return the sum of the IP address`,
      };
      return res.status(200).json(response);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    res.status(500).end();
  }
}
