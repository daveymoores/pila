/**
 * ISR + Prismic webhook revalidation settings.
 *
 * Git-only deploy: secret lives here (and in the Prismic webhook URL) when
 * PRISMIC_REVALIDATE_SECRET is not set on Vercel.
 *
 * Prismic webhook URL (configure in Prismic → Settings → Webhooks):
 *   https://pilaproject.org/api/revalidate?secret=<PRISMIC_REVALIDATE_SECRET>
 *
 * Triggers: "A page is published", "A page is unpublished"
 */
export const PRISMIC_REVALIDATE_SECONDS = Number(
  process.env.PRISMIC_REVALIDATE_SECONDS ?? 60,
);

/** Shared with Prismic webhook query param ?secret= */
export const PRISMIC_REVALIDATE_SECRET =
  process.env.PRISMIC_REVALIDATE_SECRET ??
  "pila-cms-revalidate-8f3k2m9x7q4w1n6j";
