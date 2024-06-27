import Image from 'next/image';
import Link from 'next/link';

async function getData() {
  const res = await fetch('https://edge.coregate.dev/api/contents/ip');

  if (!res.ok) {
    return { error: true, msg: 'Unable to fetch data!' };
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-20">
          {data.error ? (
            <>
              <div className=" w-full text-xl text-slate-700 font-bold">
                {data.msg}
              </div>
              <div>
                <Image
                  src="/winter-error.gif"
                  alt="error"
                  width={200}
                  height={200}
                />
              </div>
            </>
          ) : (
            <>
              <div className=" w-4/5 text-xl text-slate-700 font-bold">
                {data.msg}
              </div>
              <div>
                <p className="text-slate-700 text-lg">
                  Your IP address is: {data.ip}
                </p>
                <p className="text-slate-700 text-lg">
                  Sum of IP address is: {data.sum}
                </p>
              </div>
              <div>
                <Image
                  src="/winter-supernova.gif"
                  alt="winter-supernova"
                  width={500}
                  height={500}
                />
              </div>
            </>
          )}
          <div>
            <Link href="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
