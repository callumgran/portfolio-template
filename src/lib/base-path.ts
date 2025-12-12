export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const withBasePath = (p: string) => {
  if (!p) return p;
  if (p.startsWith('http://') || p.startsWith('https://')) return p;
  if (p.startsWith(basePath + '/')) return p;
  return `${basePath}${p.startsWith('/') ? p : `/${p}`}`;
};
