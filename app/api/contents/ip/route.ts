import { regionMapping } from '@/app/constant';

export const runtime = 'edge';

export function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for');

  if (!ip) {
    return new Response(JSON.stringify({ msg: 'Unable to get ip' }), { status: 400 });
  }

  const ips = ip.split('.');
  if (ips.length !== 4) {
    return new Response(JSON.stringify({ msg: 'Unable to get ip' }), { status: 400 });
  }

  const sum = ips.reduce((acc, val) => acc + parseInt(val), 0);
  const region = process.env.VERCEL_REGION || 'unknown';
  const body = {
    ip,
    sum,
    msg: `Hello, I am vercel function executed from ${region} - ${regionMapping[region]}`,
  };
  return new Response(JSON.stringify(body), { status: 200 });
}