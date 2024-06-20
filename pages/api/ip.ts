import { regionMapping } from '@/constant';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const fetchCache = 'force-no-store';

export default async function handler(
  req: NextRequest,
) {
  try {
    if (req.method === 'GET') {
      const ip = req.headers.get('x-ip');
      const sum = ip?.split('.').reduce((acc: number, val: string) => acc + parseInt(val), 0);
      const region = process.env.VERCEL_REGION || 'Unknown';
      const body = {
        ip,
        sum,
        msg: `I am an Edge function! (executed on ${region} - ${regionMapping[region]})`,
      };
      return new Response(JSON.stringify(body), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ msg: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify({ msg: 'Unknown error has occured!' }), { status: 500 });
  }
}