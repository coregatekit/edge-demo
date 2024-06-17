import { translations } from '@/constant';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import Link from 'next/link';

type Data = {
  ip: string;
  country: string;
  specialMsg: string;
};

export const runtime = 'edge';

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const res: Data = {
    ip: context.req.headers['x-ip'] as string || 'Unknown',
    country: context.req.headers['x-country'] as string || 'Unknown',
    specialMsg: context.req.headers['x-special-msg'] as string || 'hide',
  };

  return { props: { data: res } };
}) satisfies GetServerSideProps<{ data: Data }>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-36">
          <div className="text-4xl text-slate-700 font-bold">
            {translations[data.country]}
          </div>
          <div>
            <p className="text-slate-700 text-lg">
              Your IP address is: {data.ip}
            </p>
          </div>
          <div>
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
