import { apiClient } from '@/shared/api/client';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

export interface LoginResult {
  success: boolean;
  token?: string;
  error?: string;
}

WebBrowser.maybeCompleteAuthSession();

export const initiateGoogleLogin = async (): Promise<LoginResult> => {
  try {
    const redirectUrl = Linking.createURL('auth/callback', {
      scheme: 'pickdo'
    });

    const oauthUrl = `${apiClient.defaults.baseURL}/oauth2/authorization/google?redirect_uri=${encodeURIComponent(redirectUrl)}`;

    const result = await WebBrowser.openAuthSessionAsync(oauthUrl, redirectUrl, {
      preferEphemeralSession: true
    });

    if (result.type === 'success') {
      const url = result.url;
      const token = extractTokenFromUrl(url);

      if (token) {
        return { success: true, token };
      } else {
        const error = extractErrorFromUrl(url);
        return {
          success: false,
          error: error || 'oauth_failed',
        };
      }
    } else if (result.type === 'cancel') {
      return { success: false, error: 'user_cancelled' };
    } else {
      return { success: false, error: 'oauth_failed' };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'unknown_error',
    };
  }
};

const extractTokenFromUrl = (url: string): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('token');
};

const extractErrorFromUrl = (url: string): string | null => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get('error');
};
