import { z } from 'zod';

export const ReviewResponseSchema = z.object({
  prTitle: z.string(),
  prSummary: z.string(),
  criticalPoints: z.array(
    z.object({
      description: z.string(),
      suggestions: z.array(z.string()),
    }),
  ),
  mediumPoints: z.array(
    z.object({
      description: z.string(),
      suggestions: z.array(z.string()),
    }),
  ),
  goodPoints: z.array(
    z.object({
      description: z.string(),
      suggestions: z.array(z.string()),
    }),
  ),
});

export type TReviewResponse = z.infer<typeof ReviewResponseSchema>;
