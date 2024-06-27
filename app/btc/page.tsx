import Image from 'next/image';
import Link from 'next/link';

async function getData() {
  const res = await fetch('https://edge.coregate.dev/api/contents/btc-price');

  if (!res.ok) {
    return { error: true, msg: 'Unable to fetch data!' };
  }

  return res.json();
}

export default async function Page() {
  const today = new Date().toDateString();
  const data = await getData();

  return (
    <div>
      <div>
        <div className="flex justify-center">
          <div className="flex-col my-20">
            <div>
              <p className="text-slate-700 text-lg">Today is {today}.</p>
              {data.error ? (
                <>
                  <p className="text-slate-700 text-lg">{data.msg}</p>
                </>
              ) : (
                <>
                  <p className="text-slate-700 text-lg">
                    Current Bitcoin Price: {data.price}
                  </p>
                  <p className="text-slate-500 text-md">
                    Last update {new Date(data.timestamp).toLocaleTimeString()}
                  </p>
                </>
              )}
            </div>
            <div>
              {data.error ? (
                <Image src="/winter-error.gif" alt="error" width={200} height={200} />
              ) : (
                <Image src="/btc.gif" alt="btc gif" width={500} height={500} />
              )}
            </div>
            <div>
              <Link href="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
