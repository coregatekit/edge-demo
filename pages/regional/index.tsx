import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

type Data = {
  ip?: string;
  sum: number;
  msg: string;
};

export const getServerSideProps = (async (
  context: GetServerSidePropsContext
) => {
  const ip = context.query.ip as string;
  const response = await fetch(process.env.URL + '/api/regional', {
    method: 'POST',
    body: JSON.stringify({ ip }),
  });
  if (!response.ok) {
    const error = await response.json();
    return { props: { data: { msg: error.msg } } };
  }
  return { props: { data: await response.json() } };
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
          </div>
        </div>
      </div>
    </div>
  );
}
