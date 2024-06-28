import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex-col my-20">
          <>
            <div className=" w-4/5 text-xl text-slate-700 font-bold">
              Sorry, you are unlucky today.
            </div>

            <div>
              <Image
                src="/winter-error.gif"
                alt="unlucky"
                width={250}
                height={250}
              />
            </div>
          </>
          <div>
            <Link href="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
