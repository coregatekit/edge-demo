export function GET(request: Request) {
  console.log(request.headers);
  const ip = request.headers.get('x-forwarded-for');

  if (!ip) {
    return new Response(JSON.stringify({ msg: 'Unable to get ip' }), { status: 400 });
  }

  const ips = ip.split('.');
  if (ips.length !== 4) {
    return new Response(JSON.stringify({ msg: 'Unable to get ip' }), { status: 400 });
  }

  const sum = ips.reduce((acc, val) => acc + parseInt(val), 0);
  const body = {
    ip,
    sum,
    msg: `Hello, I am vercel function executed from ${process.env.VERCEL_REGION}`,
  };
  return new Response(JSON.stringify(body), { status: 200 });
}