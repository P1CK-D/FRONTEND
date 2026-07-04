export interface DecodedToken {
  name?: string;
  email?: string;
  sub?: string;
  exp?: number;
  iat?: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const getNameFromToken = async (
  getToken: () => Promise<string | null>
): Promise<string | null> => {
  const token = await getToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.name || null;
};
