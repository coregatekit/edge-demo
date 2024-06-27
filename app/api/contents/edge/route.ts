export function GET(request: Request) {
  return new Response(`Hello edge from ${process.env.VERCEL_REGION}`);
}