export const runtime = 'edge';

export async function GET(request: Request) {
  const data = await (await fetch('https://mempool.space/api/v1/prices', {
    next: {
      revalidate: 600,
    }
  })).json();
  const response = {
    timestamp: data.time,
    price: data.USD,
  }
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=290');
  return new Response(JSON.stringify(response), {
    headers,
    status: 200,
  });
}