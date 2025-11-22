export const getBaseURL = (options?: { useCustomURL?: boolean }) => {
  const isProd = process.env.NODE_ENV === "production"
  const url = isProd
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : options?.useCustomURL
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;

  return url
    ? `https://${url}`
    : `http://localhost:${process.env.PORT || 3000}`;
};