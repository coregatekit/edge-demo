import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ip: string;
  sum: number;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const body = {
      msg: `I am an Edge function! (executed on ${process.env.VERCEL_REGION})`,
    };
    return res.status(200).json(body);
  }

  if (req.method === 'POST') {
    const ip = req.body.ip;
    const sum = ip.split('.').reduce((acc: number, val: string) => acc + parseInt(val), 0);
    const response: Data = {
      ip,
      sum,
      msg: `I am an Edge function! (executed on ${process.env.VERCEL_REGION}) and return the sum of the IP address`,
    };
    return res.status(200).json(response);
  }
}
