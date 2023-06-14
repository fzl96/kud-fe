import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const saleSchema = z.object({
  id: z.string(),
  // cashier: z.string(),
  // member: z.string(),
  paymentMethod: z.string(),
  total: z.number(),
  createdAt: z.string(),
  status: z.string(),
});

export type Sale = z.infer<typeof saleSchema>;
