import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description: "Get your assets instantly after purchase in minutes.",
  },
  {
    name: "Quality Assurance",
    Icon: CheckCircle,
    description:
      "Every asset is verified by our team to ensure the highest quality standards.",
  },
  {
    name: "Secure Payments",
    Icon: Leaf,
    description: "Your payments are secure and your data is encrypted.",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto flex flex-col text-center items-center max-w-3xl">
          <h1 className="text-4xl font-bold  tracking-tight text-gray-900 sm:text-6xl ">
            Your marketplace for highquality
            <span className=" text-violet-600"> Digital assets.</span>
          </h1>
          <p className="mt-6  text-lg max-w-prose text-muted-foreground">
            Welcome to Digiket. Every asset on our platform is verified by our
            team to ensure the highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link className={buttonVariants()} href="/product">
              Browse Trending
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        <ProductReel
          query={{ sort: "desc", limit: 4 }}
          href="/products"
          title="Brand New"
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50 ">
        <MaxWidthWrapper className="py-20 ">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3  lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="md:flex text-center md:flex-row md:items-start lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0  flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center  rounded-full  bg-violet-100 text-violet-900 ">
                    {<perk.Icon className="w-1/3  h-1/3 " />}
                  </div>
                </div>
                <div className="mt-6  md:ml-4 md:mt-0  lg:ml-0 lg:mt-6 ">
                  <h3 className="text-base font-medium  text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm  text-muted-foreground ">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
