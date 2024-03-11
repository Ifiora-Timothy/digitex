import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams }: Props) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto w-full flex flex-col justify-center space-y-6  sm:w-[400px] ">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full  flex-col items-center justify-center  space-y-1">
            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/images/hippo-email-sent.png"
                fill
                alt="digitex email sent"
              />
            </div>
            <h3 className="font-semibold text-2xl ">Check your email</h3>
            {toEmail ? (
              <p className="text-muted-foreground text-center ">
                We&apos;ve sent a verification link to<span> {toEmail}</span>
              </p>
            ) : (
              <p className="text-muted-foreground text-center ">
                We&apos;ve sent a verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
