export function GET(request: Request) {
  return new Response(`Hello ip from ${process.env.VERCEL_REGION}`);
}