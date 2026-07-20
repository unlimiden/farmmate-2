export const API_BASE = (
  window.location.hostname.includes('run.app') || 
  window.location.hostname.includes('aistudio') ||
  window.location.port === '3000'
) ? '' : 'http://localhost:5000';

export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
};
