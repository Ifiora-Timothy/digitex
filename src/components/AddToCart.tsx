"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  product: Product;
};

const AddToCart = ({ product }: Props) => {
  const { addItem } = useCart();

  const [state, setState] = useState({
    isLoading: false,
    isSuccess: false,
  });
  const { isSuccess, isLoading } = state;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState({
        isSuccess: true,
        isLoading: false,
      });
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.isLoading]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setState({
        isSuccess: false,
        isLoading: false,
      });
    }, 1000);
    return () => {
      clearTimeout(timeout2);
    };
  }, [state.isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setState({
          isSuccess: false,
          isLoading: true,
        });
      }}
      size="lg"
      className="w-full"
    >
      {isLoading ? (
        <span className="flex items-center ">
          <Loader2 className="animate-spin h-4 w-4  mr-1" /> Adding...
        </span>
      ) : isSuccess ? (
        "Added!"
      ) : (
        "Add to cart"
      )}
    </Button>
  );
};

export default AddToCart;
