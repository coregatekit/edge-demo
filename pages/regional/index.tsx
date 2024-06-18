import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';

type Data = {
  ip?: string;
  sum: number;
  msg: string;
};

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const ip = context.query.ip as string;
  const res: Data = {
    ip,
    sum: 0,
    msg: 'Hello!',
  };
  return { props: { data: res } };
}) satisfies GetServerSideProps<{ data: Data }>;

export default function Regional({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-36">
          <div className="text-4xl text-slate-700 font-bold">{data.msg}</div>
          <div>
            <p className="text-slate-700 text-lg">
              Your IP address is: {data.ip}
            </p>
            <p className="text-slate-700 text-lg">
              Sum of IP address is: {data.sum}
            </p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
