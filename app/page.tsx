import Link from 'next/link';
import { translations } from './constant';
import { headers } from 'next/headers';

export default async function Page() {
  const headersList = headers();
  const country = headersList.get('x-country')!;
  const ip = headersList.get('x-forwarded-for');
  const specialMsg = headersList.get('x-special-msg');

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-36">
          <div className="text-4xl text-slate-700 font-bold">
            {translations[country]}
          </div>
          <div>
            <p className="text-slate-700 text-2xl">
              Your IP address is: {ip}
            </p>
          </div>
          <div className="mt-4 py-2 px-2 rounded-full text-center text-white bg-blue-500">
            <Link
              href={{
                pathname: '/btc',
              }}
            >
              Check BTC
            </Link>
          </div>
          <div className="mt-4 py-2 px-2 rounded-full text-center text-white bg-blue-500">
            <Link
              href={{
                pathname: '/ip',
              }}
            >
              Sum Your IP
            </Link>
          </div>
        </div>
      </div>
      {specialMsg === 'show' && (
        <div
          className="fixed top-0 w-full bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold">อย่าลืม!</p>
          <p className="text-sm">อย่าลืมดื่มน้ำวันละ 8 แก้วนะ!!!</p>
        </div>
      )}
    </div>
  );
}
