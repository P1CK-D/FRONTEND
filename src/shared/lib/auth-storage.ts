import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_NAME_KEY = '@user_name';

export const authStorage = {
  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Failed to save token:', error);
      throw error;
    }
  },

  async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Failed to remove token:', error);
      throw error;
    }
  },

  async hasToken(): Promise<boolean> {
    const token = await this.getToken();
    return token !== null;
  },

  async saveUserName(name: string): Promise<void> {
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, name);
      console.log('User name saved successfully');
    } catch (error) {
      console.error('Failed to save user name:', error);
      throw error;
    }
  },

  async getUserName(): Promise<string | null> {
    try {
      const name = await AsyncStorage.getItem(USER_NAME_KEY);
      return name;
    } catch (error) {
      console.error('Failed to get user name:', error);
      return null;
    }
  },

  async removeUserName(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_NAME_KEY);
      console.log('User name removed successfully');
    } catch (error) {
      console.error('Failed to remove user name:', error);
      throw error;
    }
  },
};
