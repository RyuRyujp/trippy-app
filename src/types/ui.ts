export type PageProps<P extends Record<string, string> = Record<string, string>> = {
  params: P;
  searchParams?: Record<string, string | string[] | undefined>;
};