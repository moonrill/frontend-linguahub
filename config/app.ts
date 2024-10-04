export const config = {
  baseUrl: (typeof window !== 'undefined' ? (window as any).serverEnv?.DYNAMIC_ENV_BASE_URL : '') || process.env.NEXT_PUBLIC_BASE_URL || 'https://official-joke-api.appspot.com'
};
