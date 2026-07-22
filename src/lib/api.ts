export const API_BASE = '';

export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${cleanPath}`;
};

export const fetchWithAuth = async (path: string, options: RequestInit = {}): Promise<Response> => {
  let userId = '';
  try {
    const storedUserStr = localStorage.getItem('farmmate_user');
    if (storedUserStr) {
      const u = JSON.parse(storedUserStr);
      if (u && u.user_id) userId = u.user_id;
    }
  } catch (e) {
    // ignore parse error
  }

  const headers = new Headers(options.headers || {});
  if (userId) {
    headers.set('X-User-Id', userId);
  }

  return fetch(getApiUrl(path), {
    ...options,
    headers
  });
};
