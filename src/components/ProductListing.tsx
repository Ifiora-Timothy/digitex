"use client";
import { PRODUCT_CATEGORIES } from "@/app/config";
import { cn, formatPrice } from "@/lib/utils";
import { Product } from "@/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { Skeleton } from "./ui/skeleton";

type Props = {
  product: Product | null;
  index: number;
};

const ProductListing = ({ product, index }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 75 * index);

    return () => clearTimeout(timeout);
  }, [index]);

  if (!product || !isVisible) {
    return <ProductPlaceholder />;
  }

  const label = PRODUCT_CATEGORIES.find(
    (category) => category.value === product.category
  )?.label;
  //return the valid images if they are string or their urls if object
  const validUrls = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url!))
    .filter(Boolean);

  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/product/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={validUrls} />
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  );
};

export default ProductListing;
