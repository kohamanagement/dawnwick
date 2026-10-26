import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dawnwick.game',
  appName: 'Dawnwick',
  webDir: 'dist',
  backgroundColor: '#14121c',
  ios: { contentInset: 'never' },
  android: { backgroundColor: '#14121c' },
};

export default config;
