import { z } from "zod";
import { getPayloadClient } from "../get-payload";
import { QueryValidator } from "../lib/validators/query-validator";
import { authRouter } from "./authRouter";
import { paymentRouter } from "./payment-router";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input;
      const { sort, limit, ...queryOpts } = query;

      const parsedQueryOptions: Record<string, { equals: string }> = {};

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOptions[key] = {
          equals: value,
        };
      });
      const page = cursor || 1;
      const payload = await getPayloadClient();
      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "products",
        where: {
          approvedForSale: {
            equals: "approved",
          },
          ...parsedQueryOptions,
        },
        sort,
        depth: 1,
        limit,
        page,
      });
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
});

export type AppRouter = typeof appRouter;
