import Link from 'next/link';
import { translations } from './constant';

export default function Home() {
  const data = {
    country: 'TH',
    ip: '127.0.0.1',
    specialMsg: 'show',
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-36">
          <div className="text-4xl text-slate-700 font-bold">
            {translations[data.country]}
          </div>
          <div>
            <p className="text-slate-700 text-2xl">
              Your IP address is: {data.ip}
            </p>
          </div>
          <div className='py-2 px-2 rounded-full text-center text-white bg-blue-500'>
            <Link
              href={{
                pathname: '/regional',
                query: { ip: data.ip },
              }}
            >
              Go to regional
            </Link>
          </div>
        </div>
      </div>
      {data.specialMsg === 'show' && (
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
